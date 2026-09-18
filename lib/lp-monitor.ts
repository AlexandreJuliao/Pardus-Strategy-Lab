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
  /** a foto já traz o fundo do herói inteiro: enche a secção, sem máscaras */
  palco?: { posicao: [number, number] };
};

/** Monitor de secretária, ligeiramente de lado. Os 170px de cima são fundo
 *  prolongado por síntese, para a foto ter ar antes do monitor; em baixo a foto
 *  é cortada rente à aresta da secretária, para encostar na secção seguinte
 *  sem a faixa escura da frente da mesa. */
export const MONITOR: Aparelho = {
  src: "/img/lp/aldurr/monitor-v2.webp",
  largura: 1030,
  altura: 866,
  cantos: [
    [234, 336],
    [730, 287],
    [687, 682],
    [183, 674],
  ],
  assinatura: { bottom: "8%", right: "29%" },
  mascara: { esq: 14, dir: 84, topo: 22 },
};

/** O mesmo monitor, com a parede e a mesa prolongadas por síntese (690px à
 *  esquerda, 457px em cima) até dar para cobrir o herói todo em qualquer
 *  proporção de ecrã de secretária. Ancora em baixo à direita: a mesa toca
 *  sempre o fim da secção e o monitor fica sempre a ~60% da largura. */
export const MONITOR_PALCO: Aparelho = {
  src: "/img/lp/aldurr/monitor-palco.webp",
  largura: 1720,
  altura: 1323,
  cantos: [
    [924, 793],
    [1420, 744],
    [1377, 1139],
    [873, 1131],
  ],
  assinatura: { bottom: "8%", right: "17%" },
  mascara: { esq: 0, dir: 100, topo: 0 },
  palco: { posicao: [1, 1] },
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

export const APARELHOS = { monitor: MONITOR, "monitor-palco": MONITOR_PALCO, laptop: LAPTOP } as const;
