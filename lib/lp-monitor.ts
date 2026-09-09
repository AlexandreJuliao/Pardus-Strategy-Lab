/**
 * A fotografia do computador do herói e os quatro cantos do ecrã, em píxeis
 * da imagem. Gerado a partir da foto com o ecrã em verde-chroma; ver
 * components/lp/ScreenMap.tsx para o que se faz com isto.
 */
export const MONITOR = {
  src: "/img/lp/aldurr/monitor.webp",
  largura: 1030,
  altura: 660,
  /** [cima-esq, cima-dir, baixo-dir, baixo-esq] */
  cantos: [
    [234, 96],
    [730, 47],
    [687, 442],
    [183, 434],
  ] as [[number, number], [number, number], [number, number], [number, number]],
};
