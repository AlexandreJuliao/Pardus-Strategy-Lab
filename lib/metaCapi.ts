import crypto from "node:crypto";

// Conversions API da Meta — envia o evento de lead a partir do servidor, em
// paralelo com o pixel do browser (lib/tracking.ts). O pixel é bloqueado por
// adblockers e pela ITP do Safari/iOS; este caminho não é, por isso as campanhas
// deixam de perder conversões e a Meta aprende melhor quem converte.
//
// O `eventId` é o mesmo nos dois caminhos: é assim que a Meta deduplica e não
// conta a mesma lead duas vezes.
//
// Token em META_CAPI_TOKEN (variável de ambiente na Vercel). Sem ele o envio é
// simplesmente ignorado — o site continua a funcionar na mesma.

const PIXEL_ID = "1818427879129367";
const API_VERSION = "v21.0";

/** SHA-256 em minúsculas, o formato que a Meta exige para dados pessoais. */
const hash = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/** Telefone só com dígitos e indicativo (PT por defeito) antes do hash. */
function hashPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 9) return undefined;
  const e164 = digits.startsWith("351") ? digits : `351${digits.slice(-9)}`;
  return hash(e164);
}

export type CapiLead = {
  eventId: string;
  email: string;
  nome?: string;
  telefone?: string;
  origem?: string;
  /** URL da página onde a pessoa submeteu. */
  sourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  /** Cookies _fbc / _fbp — o que mais melhora o Event Match Quality. */
  fbc?: string;
  fbp?: string;
};

/**
 * Envia o evento `Lead`. Nunca lança: uma falha da Meta não pode impedir que a
 * lead do cliente seja entregue.
 */
export async function sendLeadToMeta(lead: CapiLead): Promise<boolean> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return false;

  const [primeiro, ...resto] = (lead.nome ?? "").split(/\s+/).filter(Boolean);

  const userData: Record<string, unknown> = {
    em: [hash(lead.email)],
    ...(primeiro ? { fn: [hash(primeiro)] } : {}),
    ...(resto.length ? { ln: [hash(resto.join(" "))] } : {}),
    ...(lead.telefone && hashPhone(lead.telefone)
      ? { ph: [hashPhone(lead.telefone)!] }
      : {}),
    ...(lead.clientIp ? { client_ip_address: lead.clientIp } : {}),
    ...(lead.userAgent ? { client_user_agent: lead.userAgent } : {}),
    ...(lead.fbc ? { fbc: lead.fbc } : {}),
    ...(lead.fbp ? { fbp: lead.fbp } : {}),
    country: [hash("pt")],
  };

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId, // deduplicação com o pixel do browser
        action_source: "website",
        ...(lead.sourceUrl ? { event_source_url: lead.sourceUrl } : {}),
        user_data: userData,
        custom_data: {
          content_name: lead.origem ?? "Website",
          content_category: "Consultoria gratuita",
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.error("[meta-capi] falhou:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[meta-capi] erro de rede:", err);
    return false;
  }
}
