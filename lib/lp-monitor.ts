/**
 * A fotografia do computador do herói e os quatro cantos do ecrã, em píxeis
 * da imagem. Gerado a partir da foto com o ecrã em verde-chroma; ver
 * components/lp/ScreenMap.tsx para o que se faz com isto. Os 170px de cima
 * são fundo prolongado por síntese, para a foto ter ar antes do monitor.
 */
export const MONITOR = {
  src: "/img/lp/aldurr/monitor.webp",
  largura: 1030,
  altura: 900,
  /** [cima-esq, cima-dir, baixo-dir, baixo-esq] */
  cantos: [
    [234, 336],
    [730, 287],
    [687, 682],
    [183, 674],
  ] as [[number, number], [number, number], [number, number], [number, number]],
};
