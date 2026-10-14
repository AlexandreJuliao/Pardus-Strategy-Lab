import { NextResponse } from "next/server";
import { sendLeadToMeta } from "@/lib/metaCapi";
import { escolhaNoPedido } from "@/lib/consent";
import { OFFICE_CLIENT_ID, postOffice } from "@/lib/office";
import {
  TEXTO_CONSENTIMENTO,
  emailValido,
  limparRespostas,
  limparUtm,
  telefonePT,
  uuidValido,
} from "@/lib/calculadora";

// Envio final da Calculadora de Crescimento (só depois do último ecrã).
// Valida tudo outra vez aqui (o browser não conta), e reencaminha para o
// office, do lado do servidor, como lead com source "calculadora". O office
// devolve o id da lead, que o browser usa no evento «concluiu».
//
// Se o office não responder, a lead não se perde: segue para o webhook do n8n
// (Google Sheets + email para geral@), o mesmo destino de reserva do /api/lead.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK = process.env.N8N_LEAD_WEBHOOK ?? "https://n8n.pardus-lab.com/webhook/pardus-lead";

const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const texto = await req.text().catch(() => "");
  if (texto.length > 30_000) return NextResponse.json({ ok: false, error: "invalid" }, { status: 413 });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(texto);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Armadilha: um campo escondido que pessoas nunca preenchem. Responde-se
  // "ok" para o robô não aprender que foi apanhado, e não segue nada.
  if (s(data.pardus_hp, 1)) {
    console.warn("[calculadora] armadilha preenchida — descartada");
    return NextResponse.json({ ok: true, lead_id: null });
  }

  const nome = s(data.nome, 80);
  const negocio = s(data.negocio, 120);
  const email = s(data.email, 200).toLowerCase();
  const telefone = telefonePT(s(data.telefone, 40));
  const respostas = limparRespostas(data.respostas);
  const sessao = uuidValido(data.sessao) ? data.sessao.toLowerCase() : null;

  const campos: string[] = [];
  if (!nome) campos.push("nome");
  if (!negocio) campos.push("negocio");
  if (!emailValido(email)) campos.push("email");
  if (!telefone) campos.push("telefone");
  if (data.consentimento !== true) campos.push("consentimento");
  if (!respostas) campos.push("respostas");
  if (!sessao) campos.push("sessao");
  if (campos.length || !respostas || !telefone || !sessao) {
    return NextResponse.json({ ok: false, error: "validation", campos }, { status: 422 });
  }

  const utm = limparUtm(data.utm);
  const fbclid = s(data.fbclid, 500);
  const pagina = s(data.pagina, 300) || "/calculadora";
  const referrer = s(data.referrer, 500);
  // Hora do servidor e não do browser: o relógio de quem preenche pode estar
  // errado, e é esta a hora do consentimento (a caixa é obrigatória para enviar).
  const recebidoEm = new Date().toISOString();

  const corpoOffice = {
    client_id: OFFICE_CLIENT_ID,
    name: nome,
    company: negocio,
    email,
    phone: telefone,
    source: "calculadora",
    message: "Calculadora de Crescimento Pardus",
    meta: {
      calculadora: { versao: 1, sessao, respostas },
      utm: { ...utm, ...(fbclid ? { fbclid } : {}) },
      consentimento: { aceitou: true, texto: TEXTO_CONSENTIMENTO, em: recebidoEm },
      // As mesmas chaves planas que o /api/lead põe no meta, para o CRM e o
      // briefing lerem esta lead como lêem as outras.
      negocio,
      site: respostas.site ?? null,
      origem: "Calculadora",
      pagina,
      ...(referrer ? { referrer } : {}),
      ...Object.fromEntries(Object.entries(utm).map(([k, v]) => [`utm_${k}`, v])),
      ...(fbclid ? { fbclid } : {}),
      recebidoEm,
    },
  };

  // Conversions API da Meta, em paralelo e sem afetar a resposta. O eventId é o
  // mesmo do Pixel no browser, para a Meta não contar a lead duas vezes. Os
  // cookies _fbp/_fbc só seguem se a pessoa aceitou no aviso de cookies.
  const cookies = req.headers.get("cookie") ?? "";
  const cookie = (n: string) => cookies.match(new RegExp(`(?:^|;\\s*)${n}=([^;]+)`))?.[1];
  const consentiu = escolhaNoPedido(cookies) === "aceite";
  const eventId = s(data.eventId, 100);
  const toMeta = sendLeadToMeta({
    eventId: eventId || crypto.randomUUID(),
    email,
    nome,
    telefone,
    origem: "Calculadora de Crescimento",
    categoria: "Calculadora de Crescimento",
    sourceUrl: s(data.sourceUrl, 500) || undefined,
    clientIp: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    fbc: consentiu ? cookie("_fbc") : undefined,
    fbp: consentiu ? cookie("_fbp") : undefined,
    testEventCode: process.env.META_CAPI_TEST_CODE,
  });

  const office = await postOffice("/api/leads", corpoOffice, { tentativas: 2 });
  let leadId: string | null = null;
  if (office.ok) {
    const id = (office.corpo as { id?: unknown } | null)?.id;
    leadId = uuidValido(id) ? id : null;
  } else {
    // Reserva: a lead chega ao Alexandre na mesma (Sheet + email), sem o
    // processo automático da Calculadora.
    const reserva = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origem: "Calculadora",
        nome,
        email,
        telefone,
        negocio,
        site: respostas.site ?? "",
        mensagem: `Calculadora de Crescimento Pardus (o office não respondeu: ${office.status || "sem resposta"}). Prioridade: ${respostas.prior}. Prazo: ${respostas.prazo}.`,
        pagina,
        ...Object.fromEntries(Object.entries(utm).map(([k, v]) => [`utm_${k}`, v])),
        recebidoEm,
      }),
      signal: AbortSignal.timeout(8000),
    })
      .then((r) => r.ok)
      .catch(() => false);
    if (!reserva) {
      await toMeta.catch(() => false);
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
    console.error("[calculadora] office falhou; lead entregue só ao n8n (reserva)");
  }

  await toMeta.catch(() => false);
  return NextResponse.json({ ok: true, lead_id: leadId });
}
