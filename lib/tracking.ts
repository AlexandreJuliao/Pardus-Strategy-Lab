// Eventos de conversão para os anúncios.
// O Meta Pixel e o GA4 são carregados em components/Analytics.tsx; aqui só
// disparamos os eventos de negócio. Sem isto o Pixel só vê PageView e as
// campanhas não conseguem otimizar para quem realmente preenche o formulário.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara o evento de lead no Meta Pixel e no GA4. Chamar após submit com sucesso. */
export function trackLead(origem: string) {
  if (typeof window === "undefined") return;

  // Meta Pixel — evento standard "Lead", o que as campanhas otimizam.
  window.fbq?.("track", "Lead", {
    content_name: origem,
    content_category: "Consultoria gratuita",
  });

  // GA4 — evento equivalente, para o funil no Analytics.
  window.gtag?.("event", "generate_lead", { form_origem: origem });
}
