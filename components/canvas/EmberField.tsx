"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number;
  blue: boolean;
}

/**
 * Lightweight atmospheric particle field for the hero.
 * Embers drift slowly upward with gentle sway; subtle cursor repulsion.
 * Robust against hidden-tab rAF throttling (paints a static frame on build).
 */
export default function EmberField({ density = 0.00009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let embers: Ember[] = [];
    let ready = false;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        ready = false;
        return;
      }
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(180, Math.max(40, Math.floor(w * h * density)));
      embers = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.08 + Math.random() * 0.28),
        r: 0.6 + Math.random() * 1.6,
        a: 0.12 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
        blue: i % 4 === 0,
      }));
      ready = true;
      paintStatic();
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of embers) drawEmber(p, 0);
    };

    const drawEmber = (p: Ember, t: number) => {
      const flick = 0.7 + 0.3 * Math.sin(t * 0.002 + p.tw);
      const alpha = p.a * flick;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.blue
        ? `rgba(110,155,255,${alpha * 0.8})`
        : `rgba(212,175,96,${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.blue
        ? "rgba(110,155,255,0.5)"
        : "rgba(212,175,96,0.55)";
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    let raf = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!ready) return;
      if (document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of embers) {
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.sin(t * 0.0006 + p.tw) * 0.12;

        // cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000;
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * f * 1.6;
          p.y += (dy / d) * f * 1.6;
        }

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        drawEmber(p, t);
      }
    };

    build();
    if (!reduced) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}
