"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Stat {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 0, suffix: "€", label: "Primeira consultoria" },
  { target: 24, suffix: "h", label: "Tempo de resposta" },
  { target: 24, suffix: "/7", label: "Sistemas a trabalhar por ti" },
  { target: 100, suffix: "%", label: "Código e acessos teus" },
];

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(stat.target);
      return;
    }
    const duration = 1500;
    let raf = 0;
    let s = 0;
    const tick = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setValue(Math.round(easeOut(p) * stat.target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.target]);

  return (
    <span className="font-display font-bold leading-none text-gold [font-size:clamp(48px,6vw,80px)] [text-shadow:0_10px_54px_rgba(212,175,96,0.26)]">
      {stat.prefix}
      {value}
      {stat.suffix}
    </span>
  );
}

export default function Numbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2 section-pad">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
      <div ref={ref} className="shell relative">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center overflow-hidden bg-surface px-4 py-12 text-center"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(212,175,96,0.10),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />
              <Counter stat={s} run={inView} />
              <span className="mt-3 font-sans text-[13.5px] text-text-secondary">
                {s.label}
              </span>
              <motion.span
                aria-hidden
                className="mt-5 h-px w-12 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
