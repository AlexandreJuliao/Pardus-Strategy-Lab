"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { NAV_OFFSET, SCROLL_EVENT, type ScrollRequest } from "@/lib/scrollTo";

export default function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Chegadas com hash (#consultoria vindo de um anúncio, de um link partilhado
    // ou de outra página). O browser tenta o salto nativo antes de o Lenis montar
    // e o Lenis assume o scroll a zero, por isso a âncora era ignorada e a pessoa
    // ficava no topo. Repetimos o salto aqui, já com o Lenis a controlar.
    const timers: number[] = [];

    const jumpToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      // A secção alvo pode ainda não existir (hidratação) e a página cresce à
      // medida que imagens e secções carregam, o que desloca o destino. Por isso
      // repetimos o salto durante os primeiros segundos em vez de tentar uma vez
      // só — e paramos assim que a pessoa fizer scroll, para não a arrastar.
      let cancelado = false;
      const parar = () => {
        cancelado = true;
      };
      window.addEventListener("wheel", parar, { once: true, passive: true });
      window.addEventListener("touchstart", parar, { once: true, passive: true });

      [0, 150, 400, 800, 1400, 2200, 3000].forEach((atraso) => {
        timers.push(
          window.setTimeout(() => {
            if (cancelado) return;
            const el = document.getElementById(id);
            if (!el) return;
            lenis.scrollTo(el, { offset: NAV_OFFSET, immediate: true, force: true });
          }, atraso),
        );
      });
    };
    jumpToHash();
    window.addEventListener("hashchange", jumpToHash);

    // Lenis owns the scroll position, so CTAs ask it to move (lib/scrollTo.ts).
    // The listener closes over the live instance and is removed with it, which
    // a `window.__lenis` handle can't guarantee across Fast Refresh.
    const onScrollTo = (e: Event) => {
      const detail = (e as CustomEvent<Partial<ScrollRequest>>).detail;
      if (!detail?.el) return;
      const offset = detail.offset ?? 0;
      const distancia = Math.abs(
        detail.el.getBoundingClientRect().top + offset,
      );

      // Saltos longos (o FAB do telemóvel salta ~20.000px até ao formulário) não
      // sobrevivem a uma animação: o Lenis não a conclui e o utilizador fica
      // parado onde estava. Acima de dois ecrãs vamos direitos ao destino — que
      // além de fiável é o que se espera de um botão "leva-me lá".
      if (distancia > window.innerHeight * 2) {
        lenis.scrollTo(detail.el, { offset, immediate: true, force: true });
      } else {
        // Percursos curtos (menu → secção) mantêm o deslize suave.
        lenis.scrollTo(detail.el, { offset, duration: 1.1, force: true });
      }
      detail.handled = true;
    };
    window.addEventListener(SCROLL_EVENT, onScrollTo);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener(SCROLL_EVENT, onScrollTo);
      window.removeEventListener("hashchange", jumpToHash);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
