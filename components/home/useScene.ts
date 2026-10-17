"use client";

import { useEffect, useRef } from "react";
import { clamp01 } from "./anim";

export type Frame = {
  /** segundos desde que a secção entrou no ecrã; -1 antes disso */
  t: number;
  /** relógio contínuo em segundos, para movimentos em loop (0 com movimento reduzido) */
  T: number;
  /**
   * progresso do scroll, 0→1. Numa secção presa (pin) vai do topo da secção
   * a bater no topo do ecrã até ao fim do pin; nas outras, da entrada pelo
   * fundo do ecrã à saída pelo topo.
   */
  p: number;
  /** px reais por px do desenho de 1920×1080 (só no computador; 1 no telemóvel) */
  u: number;
  desk: boolean;
  /** prefers-reduced-motion */
  rm: boolean;
  vw: number;
  vh: number;
};

export type Render = (f: Frame) => void;

const DESK = "(min-width: 1024px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Liga uma cena a uma secção. `setup` corre depois de montar (e outra vez se o
 * ecrã mudar de tamanho ou passar de telemóvel a computador): apanha os
 * elementos de que precisa e devolve a função que desenha cada fotograma.
 * O ciclo de fotogramas só corre enquanto a secção está perto do ecrã.
 *
 * As cenas escrevem estilos diretamente nos elementos, como num filme: o React
 * só desenha o HTML (que fica completo para o Google e para quem não tem JS).
 */
export function useScene<T extends HTMLElement = HTMLElement>(
  setup: (root: T, desk: boolean) => Render | void,
  opts: { pin?: boolean; at?: number } = {},
) {
  const ref = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;
  const { pin = false, at = 0.78 } = opts;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mqDesk = window.matchMedia(DESK);
    const mqReduced = window.matchMedia(REDUCED);
    let render: Render | void;
    let desk = mqDesk.matches;
    let rm = mqReduced.matches;
    let raf = 0;
    let running = false;
    let t0 = -1;

    const build = () => {
      desk = mqDesk.matches;
      rm = mqReduced.matches;
      render = setupRef.current(root, desk);
    };

    const frame = (now: number) => {
      if (!render) return;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      if (t0 < 0 && r.top < vh * at && r.bottom > vh * 0.1) t0 = now;
      const p = pin
        ? clamp01(-r.top / Math.max(1, r.height - vh))
        : clamp01((vh - r.top) / (vh + r.height));
      render({
        t: t0 < 0 ? -1 : rm ? 999 : (now - t0) / 1000,
        T: rm ? 0 : now / 1000,
        p,
        u: desk ? Math.min(vw / 1920, vh / 1080) : 1,
        desk,
        rm,
        vw,
        vh,
      });
    };

    const loop = (now: number) => {
      frame(now);
      raf = running ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    frame(performance.now());

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { rootMargin: "15% 0px 15% 0px" },
    );
    io.observe(root);

    const rebuild = () => {
      build();
      frame(performance.now());
    };
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(rebuild, 120);
    };
    mqDesk.addEventListener("change", rebuild);
    mqReduced.addEventListener("change", rebuild);
    window.addEventListener("resize", onResize);
    // As fontes mudam a largura dos textos medidos no setup.
    document.fonts?.ready.then(() => {
      if (ref.current) rebuild();
    });

    return () => {
      stop();
      io.disconnect();
      window.clearTimeout(rt);
      mqDesk.removeEventListener("change", rebuild);
      mqReduced.removeEventListener("change", rebuild);
      window.removeEventListener("resize", onResize);
    };
  }, [pin, at]);

  return ref;
}
