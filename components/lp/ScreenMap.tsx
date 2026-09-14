"use client";

import { useEffect, useRef } from "react";

/**
 * Encaixa o que está lá dentro (o vídeo do site, a plataforma) no ecrã de
 * uma fotografia, em perspetiva.
 *
 * A fotografia foi feita com o ecrã em verde-chroma e os quatro cantos desse
 * verde estão em `cantos`, em píxeis da imagem original. Daí calcula-se a
 * homografia H que leva o retângulo de partida a esse quadrilátero.
 *
 * Como se aplica: não como um `matrix3d` com linha de perspetiva no próprio
 * elemento — o WebKit (Safari) deita essa linha fora quando o elemento tem um
 * vídeo, e fica um paralelogramo com verde à volta. Em vez disso, a
 * perspetiva vive no pai (`perspective` + `perspective-origin` no canto do
 * ecrã) e o filho leva uma transformação 3D *afim*: X = h11x+h12y+h13,
 * Y = h21x+h22y+h23, Z = -d(h31x+h32y). A divisão pela profundidade que o
 * pai faz (w = 1 - Z/d = 1 + h31x + h32y) devolve exatamente H. É CSS 3D
 * normal, e todos os motores o compõem bem, vídeo incluído.
 *
 * A matriz depende do tamanho a que a imagem está a ser mostrada, por isso
 * recalcula-se sempre que o contentor muda de largura — uma conta pequena,
 * uma vez por redimensionamento, nada por fotograma.
 */
export type Canto = [number, number];

/** distância de perspetiva do pai; qualquer valor positivo serve, este mantém Z pequeno */
const PROF = 1200;

export default function ScreenMap({
  src,
  largura,
  altura,
  cantos,
  children,
  className = "",
}: {
  src: string;
  largura: number;
  altura: number;
  /** cantos do ecrã na imagem original: [cima-esq, cima-dir, baixo-dir, baixo-esq] */
  cantos: [Canto, Canto, Canto, Canto];
  children: React.ReactNode;
  className?: string;
}) {
  const caixa = useRef<HTMLDivElement | null>(null);
  const ecra = useRef<HTMLDivElement | null>(null);

  // o retângulo de partida é a caixa que envolve o quadrilátero, em píxeis da
  // imagem original; o vídeo preenche-a e a matriz trata do resto
  const xs = cantos.map((c) => c[0]);
  const ys = cantos.map((c) => c[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const w0 = Math.max(...xs) - x0;
  const h0 = Math.max(...ys) - y0;

  useEffect(() => {
    const el = caixa.current;
    const alvo = ecra.current;
    if (!el || !alvo) return;

    const aplica = () => {
      const sc = el.clientWidth / largura;
      // origem = canto superior esquerdo da caixa de partida, já à escala
      const de: [number, number][] = [
        [0, 0],
        [w0 * sc, 0],
        [w0 * sc, h0 * sc],
        [0, h0 * sc],
      ];
      const para = cantos.map(([x, y]) => [(x - x0) * sc, (y - y0) * sc] as [number, number]);
      const h = homografia(de, para);
      const [h11, h12, h13, h21, h22, h23, h31, h32] = h;
      // 3D afim, por colunas, com a profundidade a carregar a perspetiva
      const m = [h11, h21, -PROF * h31, 0, h12, h22, -PROF * h32, 0, 0, 0, 1, 0, h13, h23, 0, 1];
      alvo.style.transform = `matrix3d(${m.map((n) => n.toFixed(6)).join(",")})`;
    };

    aplica();
    const ro = new ResizeObserver(aplica);
    ro.observe(el);
    return () => ro.disconnect();
    // cantos/largura são constantes de módulo por foto; não mudam em runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={caixa}
      className={`relative ${className}`}
      style={{
        aspectRatio: `${largura} / ${altura}`,
        perspective: `${PROF}px`,
        perspectiveOrigin: `${(x0 / largura) * 100}% ${(y0 / altura) * 100}%`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={largura}
        height={altura}
        className="block h-auto w-full select-none"
        draggable={false}
        aria-hidden
      />

      {/* o ecrã: a caixa de partida, posicionada em percentagem para acompanhar a imagem */}
      <div
        ref={ecra}
        data-lp-ecra=""
        className="absolute overflow-hidden"
        style={{
          left: `${(x0 / largura) * 100}%`,
          top: `${(y0 / altura) * 100}%`,
          width: `${(w0 / largura) * 100}%`,
          height: `${(h0 / altura) * 100}%`,
          transformOrigin: "0 0",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
        {/* o vidro: um reflexo largo e uma vinheta, por cima do que está a dar */}
        <span
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(112deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 16%, transparent 36%, transparent 72%, rgba(255,255,255,0.03) 100%)",
          }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: "radial-gradient(120% 96% at 50% 46%, transparent 60%, rgba(0,0,0,0.28) 100%)" }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Os oito coeficientes da homografia (h33 = 1) que leva quatro pontos a outros quatro. */
function homografia(de: [number, number][], para: [number, number][]): number[] {
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = de[i];
    const [u, v] = para[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  return resolve(A, b);
}

/** eliminação de Gauss com pivotagem parcial; 8x8, chega de sobra */
function resolve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((linha, i) => [...linha, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    const piv = M[c][c] || 1e-12;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const k = M[r][c] / piv;
      for (let j = c; j <= n; j++) M[r][j] -= k * M[c][j];
    }
  }
  return M.map((linha, i) => linha[n] / (linha[i] || 1e-12));
}
