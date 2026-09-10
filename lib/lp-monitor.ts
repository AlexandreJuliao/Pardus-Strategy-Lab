/**
 * As fotografias dos aparelhos do herói e os quatro cantos do ecrã de cada
 * uma, em píxeis da imagem. Geradas a partir de fotos com o ecrã em
 * verde-chroma; ver components/lp/ScreenMap.tsx para o que se faz com isto.
 *
 * `assinatura` é onde a frase pousa em cima da secretária, em percentagem da
 * foto; `mascara` são as pontas que se desvanecem no fundo da página (a de
 * baixo nunca: a secretária vai até ao fim da secção).
 */
export type Aparelho = {
  src: string;
  largura: number;
  altura: number;
  /** [cima-esq, cima-dir, baixo-dir, baixo-esq] */
  cantos: [[number, number], [number, number], [number, number], [number, number]];
  assinatura: { bottom: string; right: string };
  mascara: { esq: number; dir: number; topo: number };
};

/** Monitor de secretária, ligeiramente de lado. Os 170px de cima são fundo
 *  prolongado por síntese, para a foto ter ar antes do monitor. */
export const MONITOR: Aparelho = {
  src: "/img/lp/aldurr/monitor.webp",
  largura: 1030,
  altura: 900,
  cantos: [
    [234, 336],
    [730, 287],
    [687, 682],
    [183, 674],
  ],
  assinatura: { bottom: "8%", right: "29%" },
  mascara: { esq: 14, dir: 84, topo: 22 },
};

/** Portátil aberto, de lado. Cantos medidos depois da geração (ver scratchpad). */
export const LAPTOP: Aparelho = {
  src: "/img/lp/softwares/laptop.webp",
  largura: 1160,
  altura: 918,
  cantos: [
    [508, 300],
    [971, 296],
    [926, 692],
    [481, 705],
  ],
  assinatura: { bottom: "5%", right: "16%" },
  mascara: { esq: 11, dir: 89, topo: 20 },
};

export const APARELHOS = { monitor: MONITOR, laptop: LAPTOP } as const;
