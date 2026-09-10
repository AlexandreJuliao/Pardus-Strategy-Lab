"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/lp/Reveal";
import type { Vertical } from "@/lib/verticals";

/**
 * O que o sistema faz sozinho. À esquerda, três frases; à direita, um dia de
 * trabalho a acontecer — as linhas do feed entram uma a uma, como se fosse
 * agora. Um intervalo só, parado fora do ecrã.
 */
function Feed({ items }: { items: { time: string; text: string; tone?: "gold" | "green" }[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(items.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let visivel = false;
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visivel || document.hidden) return;
      setN((k) => (k >= items.length ? 3 : k + 1));
    }, 2600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [items.length]);

  const vis = items.slice(0, n);
  return (
    <div ref={ref} className="rounded-[12px] border border-line bg-surface/60 p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-text-primary">
          <i className="lp-live h-1.5 w-1.5 rounded-full bg-gold" /> Hoje, na tua empresa
        </span>
        <span className="font-sans text-[10.5px] text-text-muted">sem ninguém tocar</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {vis.map((f, i) => (
          <li
            key={`${f.time}-${i}`}
            className={`flex gap-3 rounded-[7px] border border-white/[0.06] bg-[#0b0f1a] px-3 py-2.5 ${i === vis.length - 1 && n > 3 ? "lp-feed-in" : ""}`}
          >
            <span className="shrink-0 font-sans text-[11px] tabular-nums text-text-muted">{f.time}</span>
            <span
              className={`font-sans text-[13px] leading-snug ${
                f.tone === "gold" ? "text-gold" : f.tone === "green" ? "text-[#5fd0a8]" : "text-text-secondary"
              }`}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LpAutomations({ v }: { v: Vertical }) {
  const a = v.automations;
  if (!a) return null;
  return (
    <section className="seam-top seam-bottom relative overflow-hidden section-pad">
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <span className="block h-px w-10 bg-gold/50" />
          <h2 className="text-h2 mt-6 text-text-primary [text-wrap:balance]">
            {a.pre} <span className="accent-serif text-gold">{a.accent}</span>
          </h2>
          <p className="hero-sub mt-5 max-w-lg text-[clamp(15px,1.4vw,18px)]">{a.intro}</p>
          <ul className="mt-7 space-y-3">
            {a.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 font-sans text-[14.5px] leading-relaxed text-text-secondary"
              >
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaButton size="lg">
              {a.cta} <ArrowRight size={17} />
            </CtaButton>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Feed items={a.feed} />
        </Reveal>
      </div>
    </section>
  );
}
