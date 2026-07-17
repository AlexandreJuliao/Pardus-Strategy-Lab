"use client";

import { useEffect, useRef } from "react";

/**
 * A living field of light — hundreds of particles streaming along an animated
 * flow field, leaving glowing gold/blue trails that react to the cursor.
 * Reads as "intelligence in motion": bespoke, alive, and clearly not stock.
 *
 * Robust like the other canvases here: pauses off-screen and on hidden tabs,
 * caps DPR, scales particle count to the surface, and paints a calm static
 * frame under prefers-reduced-motion.
 */

type Tone = "gold" | "blue";

interface P {
  x: number;
  y: number;
  px: number;
  py: number;
  speed: number;
  life: number;
  maxLife: number;
  blue: boolean;
  w: number;
}

const GOLD = "233,197,120";
const BLUE = "108,150,250";

export default function FlowField({ tone = "gold" }: { tone?: Tone }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blueBias = tone === "blue" ? 0.55 : 0.16;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    // Cheap animated flow field — no noise library needed.
    const angleAt = (x: number, y: number, t: number) => {
      const a =
        Math.sin(x * 0.0022 + t * 0.00016) +
        Math.cos(y * 0.0026 - t * 0.00012) +
        Math.sin((x + y) * 0.0016 + t * 0.00022);
      return a * 1.4;
    };

    const spawn = (p: P) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.px = p.x;
      p.py = p.y;
      p.speed = 0.5 + Math.random() * 1.7;
      p.life = 0;
      p.maxLife = 120 + Math.random() * 260;
      p.blue = Math.random() < blueBias;
      p.w = 0.6 + Math.random() * 1.3;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const count = Math.min(
        isMobile ? 520 : 1300,
        Math.max(240, Math.floor((w * h) / 900)),
      );
      parts = Array.from({ length: count }, () => {
        const p: P = {
          x: 0, y: 0, px: 0, py: 0, speed: 1, life: 0, maxLife: 1, blue: false, w: 1,
        };
        spawn(p);
        p.life = Math.random() * p.maxLife;
        return p;
      });

      ctx.fillStyle = "#060912";
      ctx.fillRect(0, 0, w, h);
      if (reduced) paintStatic();
    };

    const paintStatic = () => {
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        const ang = angleAt(p.x, p.y, 0);
        const ex = p.x + Math.cos(ang) * 14;
        const ey = p.y + Math.sin(ang) * 14;
        ctx.strokeStyle = `rgba(${p.blue ? BLUE : GOLD},0.28)`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;

      // fade previous frame → trails
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(6,9,18,0.085)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.px = p.x;
        p.py = p.y;
        const ang = angleAt(p.x, p.y, t);
        p.x += Math.cos(ang) * p.speed;
        p.y += Math.sin(ang) * p.speed;

        // cursor swirl
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 161) * 2.2;
            // tangential push (swirl) + slight outward
            p.x += (-dy / d) * f + (dx / d) * f * 0.25;
            p.y += (dx / d) * f + (dy / d) * f * 0.25;
          }
        }

        p.life++;
        if (
          p.life > p.maxLife ||
          p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20
        ) {
          spawn(p);
          continue;
        }

        const fade =
          Math.min(1, p.life / 24) * Math.min(1, (p.maxLife - p.life) / 40);
        const alpha = (p.blue ? 0.5 : 0.62) * fade;
        ctx.strokeStyle = `rgba(${p.blue ? BLUE : GOLD},${alpha})`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    build();
    if (!reduced) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);
    const io = new IntersectionObserver(
      (e) => {
        visible = e[0]?.isIntersecting ?? true;
      },
      { rootMargin: "15% 0px" },
    );
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x > -40 && mouse.x < w + 40 && mouse.y > -40 && mouse.y < h + 40;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}
