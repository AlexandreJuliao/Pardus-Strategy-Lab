// Matemática das animações da home. As cenas são funções do tempo (t, em
// segundos desde que a secção entrou no ecrã) e do progresso do scroll (p, 0→1);
// estas curvas transformam esses números em movimento.

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0→1 enquanto t vai de a a b (fora do intervalo fica preso a 0 ou 1). */
export const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

/** ease-out cúbica */
export const eo = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
/** ease-in cúbica */
export const ei = (x: number) => Math.pow(clamp01(x), 3);
/** ease-in-out cúbica */
export const eio = (x: number) => {
  const v = clamp01(x);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};
/** ease-out com um pequeno ressalto no fim (passa de 1 e volta) */
export const eob = (x: number, s = 1.6) => {
  const v = clamp01(x) - 1;
  return 1 + (s + 1) * v * v * v + s * v * v;
};

export const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  root.querySelector(sel) as T | null;
export const qa = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll(sel)) as T[];

/** Sobe e aparece: o padrão de entrada de quase todos os textos. */
export function rise(el: HTMLElement | null | undefined, p: number, dy = 40) {
  if (!el) return;
  const v = clamp01(p);
  el.style.opacity = v.toFixed(3);
  el.style.transform = v >= 1 ? "" : `translateY(${lerp(dy, 0, v).toFixed(1)}px)`;
}

/** Texto que vai sendo escrito, letra a letra, a `cps` caracteres por segundo. */
export const streamed = (text: string, t: number, t0: number, cps: number) =>
  t <= t0 ? "" : text.slice(0, Math.min(text.length, Math.floor((t - t0) * cps)));

/** Muda o texto de um nó só quando é diferente (evita repintar à toa). */
export function setText(el: Element | null | undefined, v: string) {
  if (el && el.textContent !== v) el.textContent = v;
}
