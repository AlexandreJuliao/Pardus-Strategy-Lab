"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";

/**
 * Cinematic leopard leap tied to scroll.
 * A real slow-motion clip (generated with AI, then extracted to a frame
 * sequence) is scrubbed frame-by-frame as the band travels through the
 * viewport — the leopard bounds across the screen in sync with the scroll.
 * A dark scrim sits over the footage so the leap reads as atmosphere behind
 * the headline, not as a photo. `direction="rl"` mirrors the leap.
 * Degrades to a single still frame under reduced-motion or if assets fail.
 */

const FRAME_COUNT = 61;
const framePath = (i: number) =>
  `/img/leopard-seq/frame_${String(i + 1).padStart(3, "0")}.jpg`;

export default function LeopardBand({
  direction = "lr",
  title,
  sub,
}: {
  direction?: "lr" | "rl";
  title: React.ReactNode;
  sub?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>([]);
  const drawn = useRef<number>(-1);
  const raf = useRef<number>(0);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Preload the frame sequence
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

  const draw = useCallback(
    (frame: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let f = frame;
      if (!loaded.current[f]) {
        let best = -1;
        let bd = Infinity;
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (loaded.current[i]) {
            const d = Math.abs(i - frame);
            if (d < bd) {
              bd = d;
              best = i;
            }
          }
        }
        if (best < 0) return;
        f = best;
      }
      const img = imgs.current[f];
      if (!img || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const tw = Math.round(cw * dpr);
      const th = Math.round(ch * dpr);
      const resized = canvas.width !== tw || canvas.height !== th;
      if (resized) {
        canvas.width = tw;
        canvas.height = th;
      }
      if (f === drawn.current && !resized) return;
      drawn.current = f;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      if (direction === "rl") {
        ctx.translate(W, 0);
        ctx.scale(-1, 1);
      }
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = W / H;
      let dw: number;
      let dh: number;
      let dx: number;
      let dy: number;
      if (ir > cr) {
        dh = H;
        dw = H * ir;
        dx = (W - dw) / 2;
        dy = 0;
      } else {
        dw = W;
        dh = W / ir;
        dx = 0;
        dy = (H - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    },
    [direction],
  );

  const frameFor = (p: number) =>
    Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));

  useEffect(() => {
    if (!ready) return;
    if (reduce) {
      draw(Math.floor(FRAME_COUNT / 2));
      return;
    }
    draw(frameFor(scrollYProgress.get()));
    const unsub = scrollYProgress.on("change", (p) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => draw(frameFor(p)));
    });
    const onResize = () => {
      drawn.current = -1;
      draw(frameFor(scrollYProgress.get()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [ready, reduce, draw, scrollYProgress]);

  return (
    <section
      ref={ref}
      className="relative flex items-center overflow-hidden border-y border-line"
      style={{ height: "clamp(380px, 48vw, 660px)", background: "#04060c" }}
    >
      {/* leopard footage */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full will-change-transform"
        style={{ opacity: ready ? 0.85 : 0, transition: "opacity 0.9s ease" }}
      />

      {/* cinematic scrim — the leap stays a presence, not a photo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(4,6,12,0.62)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 50%, transparent 15%, rgba(4,6,12,0.72) 100%)",
        }}
      />
      {/* blend the clip edges into the page */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[22%]"
        style={{ background: "linear-gradient(90deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[22%]"
        style={{ background: "linear-gradient(270deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(180deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(0deg, #05070e, transparent)" }}
      />
      <div className="noise-overlay" />

      {/* headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="shell relative z-10 mx-auto flex w-full flex-col items-center text-center"
      >
        <h2
          className="font-display font-bold leading-[1.02] text-text-primary [font-size:clamp(30px,5.4vw,80px)] [letter-spacing:-0.03em] [text-shadow:0_8px_40px_rgba(0,0,0,0.75)] [text-wrap:balance]"
        >
          {title}
        </h2>
        {sub && (
          <p className="mt-5 max-w-xl font-sans text-[clamp(14px,1.4vw,18px)] text-text-secondary [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
            {sub}
          </p>
        )}
      </motion.div>
    </section>
  );
}
