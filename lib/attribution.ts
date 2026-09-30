// Origem da visita, enviada com a lead sem perguntar nada a quem preenche:
// UTMs e identificadores de clique dos anúncios (Google e Meta).
//
// Lê-se só do URL no momento do envio, sem guardar nada no browser: a política
// de privacidade promete apenas tecnologias essenciais, e os anúncios caem na
// própria LP, onde está o formulário (o scroll até #consultoria mantém a query).

const PARAMS = [
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

export type Atribuicao = Partial<Record<(typeof PARAMS)[number], string>> & {
  pagina?: string;
  referrer?: string;
};

export function atribuicao(): Atribuicao {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const out: Atribuicao = { pagina: window.location.pathname };
  for (const k of PARAMS) {
    const v = q.get(k);
    if (v) out[k] = v;
  }
  // Só interessa quem mandou a visita de fora (Instagram, Google…), não a
  // navegação dentro do próprio site.
  if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
    out.referrer = document.referrer;
  }
  return out;
}
