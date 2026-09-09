"use client";

import { useEffect, useRef } from "react";

/**
 * Encaixa o que está lá dentro (o vídeo do site) no ecrã de uma fotografia,
 * em perspetiva.
 *
 * A fotografia foi feita com o ecrã em verde-chroma e os quatro cantos desse
 * verde estão em `cantos`, em píxeis da imagem original. Daí calcula-se a
 * homografia que leva o retângulo do vídeo a esse quadrilátero, e aplica-se
 * como `matrix3d`. Como a matriz depende do tamanho a que a imagem está a ser
 * mostrada, recalcula-se sempre que o contentor muda de largura — uma conta
 * pequena, uma vez por redimensionamento, nada por fotograma.
 *
 * O resultado: o site passa mesmo dentro do ecrã, com a inclinação certa,
 * em qualquer tamanho.
 */
export type Canto = [number, number];

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
      const s = el.clientWidth / largura;
      // origem = canto superior esquerdo da caixa de partida, já à escala
      const de: [number, number][] = [
        [0, 0],
        [w0 * s, 0],
        [w0 * s, h0 * s],
        [0, h0 * s],
      ];
      const para = cantos.map(([x, y]) => [(x - x0) * s, (y - y0) * s] as [number, number]);
      const m = homografia(de, para);
      alvo.style.transform = `matrix3d(${m.join(",")})`;
    };

    aplica();
    const ro = new ResizeObserver(aplica);
    ro.observe(el);
    return () => ro.disconnect();
    // cantos/largura são constantes de módulo por foto; não mudam em runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={caixa} className={`relative ${className}`} style={{ aspectRatio: `${largura} / ${altura}` }}>
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

/**
 * Homografia que leva quatro pontos a outros quatro, devolvida já na ordem
 * (coluna a coluna) que o `matrix3d` do CSS espera.
 */
function homografia(de: [number, number][], para: [number, number][]): number[] {
  // sistema de 8 equações para os 8 coeficientes (h33 = 1)
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
  const h = resolve(A, b);
  const [a, bb, c, d, e, f, g, hh] = h;
  // matriz 3x3 [[a,bb,c],[d,e,f],[g,hh,1]] → matrix3d 4x4 por colunas
  return [a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1];
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
