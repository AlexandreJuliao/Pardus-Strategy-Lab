import { NextResponse } from "next/server";

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
const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Accept silently so bots
  // don't learn they were caught, but never forward it.
  if (s(data.website, 1)) {
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
  };

  // Entrega em DOIS sítios em paralelo: (1) webhook n8n → Google Sheets + email (fluxo
  // antigo), (2) caixa de Leads do Pardus OS. O envio tem sucesso se PELO MENOS UM
  // recebeu — assim a lead nunca se perde por um dos destinos estar em baixo.
  const toN8n = fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12000),
  }).then((r) => r.ok).catch(() => false);

  const toOffice = fetch(OFFICE_LEADS_URL, {
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
      message: payload.mensagem || null,
      // Campos extra do site preservados no meta (empresa, negócio, tipo, budget).
      meta: {
        empresa: payload.empresa || null,
        negocio: payload.negocio || null,
        tipo: payload.tipo || null,
        budget: payload.budget || null,
        origem: payload.origem || "Website",
      },
    }),
    signal: AbortSignal.timeout(12000),
  }).then((r) => r.ok).catch(() => false);

  const [n8nOk, officeOk] = await Promise.all([toN8n, toOffice]);
  if (!n8nOk && !officeOk) {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
