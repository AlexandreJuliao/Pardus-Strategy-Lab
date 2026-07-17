"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A surface with a soft glow that follows the cursor. Adds tactile life to
 * card grids without the generic hover-lift-only feel. The glow overlay sits
 * at z-0; put real content above it (the wrapper is `position: relative`).
 * Under reduced-motion the tracking is disabled (glow stays centered/idle).
 */
export default function SpotlightCard({
  className = "",
  glowColor = "rgba(212,175,96,0.16)",
  children,
}: {
  className?: string;
  glowColor?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card ${className}`}
      style={{ ["--glow-color" as string]: glowColor }}
    >
      <span className="spotlight-glow" aria-hidden />
      {children}
    </div>
  );
}
