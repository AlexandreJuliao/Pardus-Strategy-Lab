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

/**
 * Id único deste envio. Vai no pixel do browser E no evento server-side
 * (Conversions API), para a Meta perceber que são o mesmo lead e não o contar
 * duas vezes. Gerar antes do fetch e enviar no corpo do pedido.
 */
export function newEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Dispara o evento de lead no Meta Pixel e no GA4. Chamar após submit com sucesso. */
export function trackLead(origem: string, eventId: string) {
  if (typeof window === "undefined") return;

  // Meta Pixel — evento standard "Lead", o que as campanhas otimizam.
  // O eventID (maiúsculas, é o nome que o fbq espera) faz a deduplicação.
  window.fbq?.(
    "track",
    "Lead",
    { content_name: origem, content_category: "Consultoria gratuita" },
    { eventID: eventId },
  );

  // GA4 — evento equivalente, para o funil no Analytics.
  window.gtag?.("event", "generate_lead", { form_origem: origem });
}
