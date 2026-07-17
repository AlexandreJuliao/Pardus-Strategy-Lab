"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { SCROLL_EVENT, type ScrollRequest } from "@/lib/scrollTo";

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

    // Lenis owns the scroll position, so CTAs ask it to move (lib/scrollTo.ts).
    // The listener closes over the live instance and is removed with it, which
    // a `window.__lenis` handle can't guarantee across Fast Refresh.
    const onScrollTo = (e: Event) => {
      const detail = (e as CustomEvent<Partial<ScrollRequest>>).detail;
      if (!detail?.el) return;
      lenis.scrollTo(detail.el, {
        offset: detail.offset ?? 0,
        duration: 1.4,
        force: true, // move even if the instance thinks it is stopped
        lock: true, // don't let a stray input event abort a long jump
      });
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
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
