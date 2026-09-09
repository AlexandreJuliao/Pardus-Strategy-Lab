"use client";

import { useEffect, useRef } from "react";

/**
 * Plano em perspetiva que acompanha o rato de leve.
 *
 * O ecrã do herói vive aqui dentro, inclinado como uma placa de vidro a
 * olhar para o texto. Quando o rato anda pela página a placa roda uns graus
 * atrás dele — pouco, com inércia — e é isso que a faz parecer um objeto no
 * espaço em vez de uma imagem colada.
 *
 * Tudo por transform, fora do ciclo do React: um rAF por movimento, sem
 * estado. Em ecrãs de toque e para quem pede menos movimento fica parado na
 * inclinação base. Abaixo de `lg` a inclinação é zero: numa coluna só, um
 * ecrã de lado não se lê.
 */
const BASE_Y = 11;
const BASE_X = 4;
const ALCANCE_Y = 4;
const ALCANCE_X = 3;

export default function TiltStage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const largo = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rato = window.matchMedia("(pointer: fine)").matches;

    let baseY = 0;
    let baseX = 0;
    let alvoX = 0;
    let alvoY = 0;
    let atualX = 0;
    let atualY = 0;
    let raf = 0;

    const pinta = () => {
      el.style.transform = `rotateY(${baseY + atualX * ALCANCE_Y}deg) rotateX(${baseX - atualY * ALCANCE_X}deg)`;
    };

    const base = () => {
      baseY = largo.matches ? BASE_Y : 0;
      baseX = largo.matches ? BASE_X : 0;
      pinta();
    };
    base();
    largo.addEventListener("change", base);

    if (still || !rato) return () => largo.removeEventListener("change", base);

    const tick = () => {
      raf = 0;
      atualX += (alvoX - atualX) * 0.08;
      atualY += (alvoY - atualY) * 0.08;
      pinta();
      if (Math.abs(alvoX - atualX) > 0.002 || Math.abs(alvoY - atualY) > 0.002) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!largo.matches) return;
      alvoX = (e.clientX / window.innerWidth - 0.5) * 2;
      alvoY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      largo.removeEventListener("change", base);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
      {children}
    </div>
  );
}
