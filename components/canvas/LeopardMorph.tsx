"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";

/**
 * The hero centrepiece: a leopard head that begins as a cloud of glowing
 * "atoms" and materialises into a real, roaring leopard as the page scrolls.
 *
 * Two layers on one canvas, both driven by `progress` (0 at the top of the
 * hero, 1 when it has scrolled through):
 *   1. Real footage — a frame sequence extracted from an AI-generated clip of
 *      a leopard head roaring, scrubbed by scroll (reuses the frame-scrub idea
 *      from LeopardBand).
 *   2. Atoms — particles whose targets are sampled from the leopard's bright
 *      pixels. Scattered at progress 0, they converge into the head, then fade
 *      as the real footage takes over (reuses EmberField's rAF/DPR/static-frame
 *      robustness).
 *
 * Reduced motion / no-JS-anim: paints one sharp real frame, no morph.
 */

const FRAME_COUNT = 61;
const framePath = (i: number) =>
  `/img/leopard-roar/frame_${String(i + 1).padStart(3, "0")}.jpg`;

// Frame whose silhouette the atoms form (a roaring frame reads most dramatic).
const SAMPLE_FRAME = 42;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Particle = {
  u: number; // target (normalised to the sampled image)
  v: number;
  su: number; // scattered start (normalised to the canvas)
  sv: number;
  r: number;
  blue: boolean;
  ph: number;
  amp: number;
};

export default function LeopardMorph({
  progress,
  reduced = false,
}: {
  progress: MotionValue<number>;
  reduced?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>([]);
  const particles = useRef<Particle[]>([]);
  const [ready, setReady] = useState(false);

  // Preload the roar frames.
  useEffect(() => {
    let alive = true;
    const arr: HTMLImageElement[] = [];
    const done: boolean[] = new Array(FRAME_COUNT).fill(false);
    let first = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        done[i] = true;
        if (!first && alive) {
          first = true;
          setReady(true);
        }
      };
      img.onerror = () => {
        done[i] = true;
      };
      img.src = framePath(i);
      arr[i] = img;
    }
    imgs.current = arr;
    loaded.current = done;
    return () => {
      alive = false;
    };
  }, []);

  // Build atom targets by sampling the leopard's bright pixels.
  useEffect(() => {
    let alive = true;
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      if (!alive) return;
      const SW = 240;
      const SH = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * SW));
      const off = document.createElement("canvas");
      off.width = SW;
      off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, SW, SH);
      const data = octx.getImageData(0, 0, SW, SH).data;

      const targets: { u: number; v: number; lum: number }[] = [];
      for (let y = 0; y < SH; y += 2) {
        for (let x = 0; x < SW; x += 2) {
          const idx = (y * SW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = (r + g + b) / 3;
          if (lum > 46) targets.push({ u: x / SW, v: y / SH, lum });
        }
      }
      // Cap for performance; keep the brightest so the head reads clearly.
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const MAX = isMobile ? 1000 : 2000;
      targets.sort((a, b) => b.lum - a.lum);
      const chosen = targets.slice(0, Math.min(MAX, targets.length));

      particles.current = chosen.map((t, i) => ({
        u: t.u,
        v: t.v,
        su: Math.random(),
        sv: Math.random(),
        r: 0.7 + Math.random() * 1.5,
        blue: i % 4 === 0,
        ph: Math.random() * Math.PI * 2,
        amp: 0.02 + Math.random() * 0.06,
      }));
      setReady((v) => v || true);
    };
    img.src = framePath(SAMPLE_FRAME);
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Cover-fit transform for a frame, with an optional zoom.
    const cover = (img: HTMLImageElement, scale: number) => {
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = W / H;
      let dw: number;
      let dh: number;
      if (ir > cr) {
        dh = H * scale;
        dw = dh * ir;
      } else {
        dw = W * scale;
        dh = dw / ir;
      }
      return { dx: (W - dw) / 2, dy: (H - dh) / 2, dw, dh };
    };

    const nearestFrame = (i: number) => {
      if (loaded.current[i]) return i;
      let best = -1;
      let bd = Infinity;
      for (let k = 0; k < FRAME_COUNT; k++) {
        if (loaded.current[k]) {
          const d = Math.abs(k - i);
          if (d < bd) {
            bd = d;
            best = k;
          }
        }
      }
      return best;
    };

    const draw = (t: number) => {
      const p = clamp(progress.get());
      const form = smooth(0, 0.52, p);
      const realOp = reduced ? 1 : smooth(0.26, 0.86, p);
      const partOp = reduced ? 0 : 0.92 * (1 - smooth(0.55, 0.86, p));
      const scale = reduced ? 1.02 : lerp(1.08, 1.0, p);

      ctx.clearRect(0, 0, W, H);

      // 1. real footage
      const fi = reduced
        ? nearestFrame(Math.round(FRAME_COUNT * 0.62))
        : nearestFrame(
            Math.round(lerp(0, FRAME_COUNT - 1, smooth(0.24, 0.96, p))),
          );
      if (fi >= 0 && realOp > 0.001) {
        const img = imgs.current[fi];
        if (img && img.naturalWidth) {
          const { dx, dy, dw, dh } = cover(img, scale);
          ctx.globalAlpha = realOp;
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.globalAlpha = 1;
        }
      }

      // 2. atoms (aligned to the same cover transform as the sample frame)
      const list = particles.current;
      if (partOp > 0.004 && list.length) {
        const ref = imgs.current[SAMPLE_FRAME];
        const box = ref && ref.naturalWidth ? cover(ref, scale) : { dx: 0, dy: 0, dw: W, dh: H };
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < list.length; i++) {
          const pt = list[i];
          const tx = box.dx + pt.u * box.dw;
          const ty = box.dy + pt.v * box.dh;
          const sx = pt.su * W;
          const sy = pt.sv * H;
          const jitter = reduced ? 0 : (1 - form) * pt.amp;
          const x = lerp(sx, tx, form) + Math.sin(t * 0.0011 + pt.ph) * jitter * W;
          const y = lerp(sy, ty, form) + Math.cos(t * 0.0013 + pt.ph) * jitter * H;
          const tw = 0.6 + 0.4 * Math.sin(t * 0.004 + pt.ph);
          ctx.globalAlpha = partOp * tw;
          ctx.beginPath();
          ctx.arc(x, y, pt.r, 0, Math.PI * 2);
          ctx.fillStyle = pt.blue ? "rgba(120,160,255,1)" : "rgba(226,193,120,1)";
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      draw(t);
    };

    resize();
    // paint one frame immediately (covers reduced-motion + first paint)
    draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(canvas);

    // redraw on scroll even if the loop is throttled, so reduced-motion and
    // slow devices still track progress
    const unsub = progress.on("change", () => {
      if (reduced) draw(0);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsub();
    };
  }, [progress, reduced, ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full will-change-transform"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
    />
  );
}
