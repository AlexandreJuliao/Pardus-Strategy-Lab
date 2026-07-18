import { NextResponse } from "next/server";

// Ingest endpoint for the site's lead forms. Validates, drops obvious bots,
// then forwards a normalized payload to the n8n webhook, which writes the row
// to Google Sheets and emails geral@pardus-lab.com.
// The webhook URL is not a secret (it's a public ingest endpoint), but it lives
// server-side here so the client never sees it and validation happens in one place.
const WEBHOOK =
  process.env.N8N_LEAD_WEBHOOK ?? "https://n8n.pardus-lab.com/webhook/pardus-lead";

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

  try {
    const r = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
  } catch {
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
