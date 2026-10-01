import { NextResponse } from "next/server";
import { sendLeadToMeta } from "@/lib/metaCapi";

// Ingest endpoint for the site's lead forms. Validates, drops obvious bots,
// then forwards a normalized payload to the n8n webhook, which writes the row
// to Google Sheets and emails geral@pardus-lab.com.
// The webhook URL is not a secret (it's a public ingest endpoint), but it lives
// server-side here so the client never sees it and validation happens in one place.
const WEBHOOK =
  process.env.N8N_LEAD_WEBHOOK ?? "https://n8n.pardus-lab.com/webhook/pardus-lead";

// Pardus OS — caixa de Leads (Métricas do Negócio). A lead da própria Pardus cai no
// cliente interno is_agency. Intake público; opcionalmente protegido por token.
const OFFICE_LEADS_URL =
  process.env.OFFICE_LEADS_URL ?? "https://office.pardus-lab.com/api/leads";
const OFFICE_CLIENT_ID =
  process.env.OFFICE_LEADS_CLIENT_ID ?? "38b3c985-3f13-41d5-b202-956fb086bd9d";
const OFFICE_LEADS_TOKEN = process.env.OFFICE_LEADS_TOKEN; // opcional (x-leads-token)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATRIBUICAO = [
  "pagina",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;
const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/**
 * Entrega a lead a um destino, com uma segunda tentativa quando a falha pode
 * ser passageira (rede, timeout, 5xx, 429). Um 4xx que não seja 429 (token
 * errado, validação) não melhora com nova tentativa. Cada falha fica nos logs
 * da Vercel com o nome do destino, sem dados da pessoa.
 */
async function entregar(destino: string, url: string, init: RequestInit): Promise<boolean> {
  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    try {
      const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
      if (r.ok) return true;
      console.error(`[lead] ${destino} respondeu ${r.status} (tentativa ${tentativa})`);
      if (r.status < 500 && r.status !== 429) return false;
    } catch (err) {
      console.error(`[lead] ${destino} sem resposta (tentativa ${tentativa}): ${(err as Error).name}`);
    }
    if (tentativa < 2) await new Promise((res) => setTimeout(res, 800));
  }
  return false;
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Accept silently so bots
  // don't learn they were caught, but never forward it. O campo chamava-se
  // `website`, um nome que o preenchimento automático do browser pode apanhar
  // (e ao lado do "Site ou Instagram" ainda mais); passou a `pardus_hp`. O nome
  // antigo continua a contar enquanto houver páginas abertas com o código velho.
  if (s(data.pardus_hp, 1) || s(data.website, 1)) {
    console.warn(`[lead] armadilha preenchida — descartada (${s(data.origem, 40) || "sem origem"})`);
    return NextResponse.json({ ok: true });
  }

  const nome = s(data.nome, 200);
  const email = s(data.email, 200);
  if (!nome || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const payload = {
    origem: s(data.origem, 40) || "Website",
    nome,
    email,
    telefone: s(data.telefone, 60),
    empresa: s(data.empresa, 200),
    negocio: s(data.negocio, 200),
    tipo: s(data.tipo, 100),
    budget: s(data.budget, 100),
    mensagem: s(data.mensagem, 4000),
    localidade: s(data.localidade, 120),
    site: s(data.site, 300),
  };

  // Origem da visita, que o formulário junta sem perguntar (lib/attribution.ts).
  // Só as chaves que vieram, para não encher a folha e o meta de vazios.
  const atribuicao = Object.fromEntries(
    ATRIBUICAO.map((k) => [k, s(data[k], 500)] as const).filter(([, v]) => v),
  );
  // Hora do servidor e não do browser: o relógio de quem preenche pode estar errado.
  const recebidoEm = new Date().toISOString();

  // Entrega em DOIS sítios em paralelo: (1) webhook n8n → Google Sheets + email (fluxo
  // antigo), (2) caixa de Leads do Pardus OS. O envio tem sucesso se PELO MENOS UM
  // recebeu — assim a lead nunca se perde por um dos destinos estar em baixo. Cada
  // destino tem uma segunda tentativa, porque o CRM do office é onde a lead tem de
  // acabar e uma falha passageira não a pode deixar só na Sheet.
  const toN8n = entregar("n8n", WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ...atribuicao, recebidoEm }),
  });

  const toOffice = entregar("office", OFFICE_LEADS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(OFFICE_LEADS_TOKEN ? { "x-leads-token": OFFICE_LEADS_TOKEN } : {}),
    },
    body: JSON.stringify({
      client_id: OFFICE_CLIENT_ID,
      source: (payload.origem || "website").toLowerCase(),
      name: payload.nome,
      email: payload.email,
      phone: payload.telefone || null,
      // O nome do negócio (LeadFormCard). `empresa` só existe em pedidos antigos.
      company: payload.negocio || payload.empresa || null,
      message: payload.mensagem || null,
      // Campos extra do site preservados no meta. É daqui que o briefing parte:
      // negócio + localidade + site chegam para o procurar online.
      meta: {
        empresa: payload.empresa || null,
        negocio: payload.negocio || null,
        localidade: payload.localidade || null,
        site: payload.site || null,
        tipo: payload.tipo || null,
        budget: payload.budget || null,
        origem: payload.origem || "Website",
        ...atribuicao,
        recebidoEm,
      },
    }),
  });

  // Conversions API da Meta. Corre em paralelo com a entrega da lead e o
  // resultado não afeta a resposta: se a Meta estiver em baixo, a lead entra na
  // mesma. O eventId vem do browser para a Meta deduplicar com o pixel.
  const cookies = req.headers.get("cookie") ?? "";
  const cookie = (nome: string) =>
    cookies.match(new RegExp(`(?:^|;\\s*)${nome}=([^;]+)`))?.[1];

  const toMeta = sendLeadToMeta({
    eventId: s(data.eventId, 100) || crypto.randomUUID(),
    email,
    nome,
    telefone: payload.telefone,
    origem: payload.origem,
    sourceUrl: s(data.sourceUrl, 500) || undefined,
    clientIp: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbc: cookie("_fbc"),
    fbp: cookie("_fbp"),
    // Permite validar a ligação na aba "Testar eventos" sem sujar os dados reais.
    testEventCode: s(data.testEventCode, 40) || process.env.META_CAPI_TEST_CODE,
  });

  const [n8nOk, officeOk] = await Promise.all([toN8n, toOffice, toMeta]);
  if (!n8nOk && !officeOk) {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
