"use client";

import { useEffect, useRef } from "react";

/**
 * Malha de luz por trás do herói das landing pages.
 *
 * Seis centros de cor (dourado, petrol, bronze) andam em órbitas lentas e são
 * pintados num canvas pequeno (~1/6 da resolução) com composição aditiva. Ao
 * ser esticado por CSS, esse canvas ganha uma interpolação suave de graça: sai
 * uma malha orgânica a sério, sem o custo de desfocar em tamanho real e sem a
 * cara de "três bolas com blur" que qualquer landing page gerada tem.
 *
 * Comporta-se como os outros canvas do site: pára fora do ecrã e em separadores
 * ocultos, limita o DPR, e desenha um fotograma parado quando o sistema pede
 * menos movimento.
 */

type Node = {
  /** centro da órbita, em fração do quadro */
  cx: number;
  cy: number;
  /** raio da órbita */
  rx: number;
  ry: number;
  /** velocidade e fase */
  speed: number;
  phase: number;
  /** raio do gradiente, em fração da diagonal */
  size: number;
  color: [number, number, number];
  alpha: number;
};

const GOLD: [number, number, number] = [212, 175, 96];
const PETROL: [number, number, number] = [46, 84, 132];
const STEEL: [number, number, number] = [28, 58, 96];
const BRONZE: [number, number, number] = [156, 111, 52];

const NODES: Node[] = [
  { cx: 0.22, cy: 0.28, rx: 0.1, ry: 0.07, speed: 0.055, phase: 0.0, size: 0.4, color: PETROL, alpha: 0.26 },
  { cx: 0.78, cy: 0.22, rx: 0.09, ry: 0.08, speed: -0.042, phase: 1.7, size: 0.36, color: STEEL, alpha: 0.22 },
  { cx: 0.52, cy: 0.6, rx: 0.13, ry: 0.06, speed: 0.036, phase: 3.1, size: 0.34, color: GOLD, alpha: 0.1 },
  { cx: 0.12, cy: 0.72, rx: 0.08, ry: 0.09, speed: -0.05, phase: 4.4, size: 0.28, color: BRONZE, alpha: 0.11 },
  { cx: 0.9, cy: 0.66, rx: 0.1, ry: 0.07, speed: 0.047, phase: 2.2, size: 0.3, color: GOLD, alpha: 0.085 },
  { cx: 0.46, cy: 0.06, rx: 0.14, ry: 0.05, speed: -0.031, phase: 5.5, size: 0.32, color: PETROL, alpha: 0.18 },
];

/** o canvas é pintado pequeno e esticado — a suavização faz de desfoque */
const SCALE = 6;

export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width / SCALE));
      h = Math.max(1, Math.round(r.height / SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const paint = (t: number) => {
      const diag = Math.hypot(w, h);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const n of NODES) {
        const a = t * n.speed + n.phase;
        const x = (n.cx + Math.cos(a) * n.rx) * w;
        const y = (n.cy + Math.sin(a * 1.3) * n.ry) * h;
        const r = n.size * diag;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = n.color;
        // curva de queda suave: três paragens leem-se como um gradiente de
        // malha, uma só lê-se como um círculo
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${n.alpha})`);
        g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${n.alpha * 0.42})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      paint((now - start) / 1000);
    };

    resize();
    paint(0);

    const ro = new ResizeObserver(() => {
      resize();
      paint(still ? 0 : (performance.now() - start) / 1000);
    });
    ro.observe(canvas);

    if (!still) {
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(canvas);
      start = performance.now();
      raf = requestAnimationFrame(frame);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
      };
    }

    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        // a malha morre antes do fim da secção: o navy volta a mandar e o
        // herói entrega-se à secção seguinte sem degrau
        maskImage: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.35) 74%, transparent 94%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 42%, rgba(0,0,0,0.35) 74%, transparent 94%)",
      }}
    />
  );
}
