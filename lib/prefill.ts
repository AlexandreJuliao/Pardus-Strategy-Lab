// Pré-preencher a mensagem do formulário de contacto a partir de outra parte
// da página (ex.: o calendário da homepage escreve o dia e a hora escolhidos).
export const PREFILL_EVENT = "pardus:prefill";

export type PrefillDetail = { mensagem: string };

export function prefillLead(detail: PrefillDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}
