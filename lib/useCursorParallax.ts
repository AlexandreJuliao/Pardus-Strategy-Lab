"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

/**
 * Tracks pointer position relative to viewport centre, normalized to [-1, 1],
 * smoothed with a spring. Returns motion values to drive layered parallax.
 * Disabled on touch / reduced-motion (stays at 0).
 */
export function useCursorParallax(stiffness = 60, damping = 18): {
  px: MotionValue<number>;
  py: MotionValue<number>;
} {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness, damping, mass: 0.6 });
  const py = useSpring(y, { stiffness, damping, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      x.set(nx);
      y.set(ny);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return { px, py };
}
