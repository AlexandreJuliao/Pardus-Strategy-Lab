"use client";

import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import HeroBackdrop from "@/components/lp/HeroBackdrop";
import MockMonitor from "@/components/lp/MockMonitor";
import MockAlDurr from "@/components/lp/mock/MockAlDurr";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

/** Entrada escalonada, em CSS (ver .lp-rise em globals.css). */
const up = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

/** As paragens do percurso da maquete, na ordem em que aparecem. */
const CHAPTERS = ["Início", "Modelos", "Engenharia", "Processo", "Interiores", "Contacto"];

/**
 * Cada palavra sobe de dentro da sua própria máscara, com um atraso a
 * aumentar. O título continua a ser um `<h1>` com o texto todo lá dentro
 * para quem lê e para o Google; as janelas são só apresentação.
 */
function MaskedWords({
  text,
  from = 0,
  accent = false,
}: {
  text: string;
  from?: number;
  accent?: boolean;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`lp-word ${accent ? "lp-word-accent" : ""}`}
          style={{ marginRight: "0.24em" }}
        >
          <span style={{ animationDelay: `${0.05 + (from + i) * 0.06}s` }}>{word}</span>
        </span>
      ))}
    </>
  );
}

/**
 * Herói: o monitor com um site de cliente a percorrer-se sozinho ocupa a
 * esquerda, a tipografia fica à direita numa coluna estreita.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  const preWords = h.pre.split(" ").length;

  return (
    <section className="seam-bottom relative overflow-hidden pb-16 pt-28 md:pt-32 lg:pb-24 lg:pt-36">
      <HeroBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 40% 24%, transparent 32%, rgba(5,7,14,0.55) 74%, var(--bg) 100%)" }}
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ maskImage: "radial-gradient(120% 82% at 45% 16%, #000 22%, transparent 80%)" }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <span className="lp-bracket left-6 top-24 border-l border-t md:left-10" aria-hidden />
      <span className="lp-bracket right-6 top-24 border-r border-t md:right-10" aria-hidden />

      <div className="shell relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        {/* ── o monitor ── */}
        <div {...up(0.3)} className="lp-rise order-2 lg:order-1">
          <MockMonitor>
            <div className="h-[300px] overflow-hidden sm:h-[360px] lg:h-[400px]">
              <div className="lp-site-read">
                <MockAlDurr />
              </div>
            </div>
          </MockMonitor>

          <ol className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5">
            {CHAPTERS.map((c, i) => (
              <li
                key={c}
                className={`lp-chap lp-chap-${i + 1} flex items-center gap-1.5 whitespace-nowrap font-sans text-[9.5px] font-medium uppercase tracking-[0.13em]`}
              >
                <span className="lp-chap-dot h-1 w-1 rounded-full bg-current" />
                {c}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-center font-sans text-[12px] text-text-muted">
            Site que fizemos para a <span className="text-text-secondary">Al Durr</span>, casas modulares.
          </p>
        </div>

        {/* ── a tipografia ── */}
        <div className="order-1 max-w-xl lg:order-2">
          <h1 className="font-display text-[clamp(38px,4.6vw,62px)] font-bold leading-[0.98] tracking-[-0.035em] text-text-primary">
            <MaskedWords text={h.pre} />
            <span className="accent-serif text-gold">
              <MaskedWords text={h.accent} from={preWords} accent />
            </span>
          </h1>

          <p {...up(0.42)} className="lp-rise hero-sub mt-6 max-w-md [text-wrap:pretty]">
            {h.sub}
          </p>

          <div {...up(0.5)} className="lp-rise mt-8 border-t border-line pt-5">
            <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-text-muted">{h.metricPre}</p>
            <p className="mt-2 font-display text-[clamp(20px,2.1vw,27px)] font-bold leading-tight tracking-[-0.028em] text-text-primary">
              <span className="stat-figure">{h.metricNumber}</span> {h.metric}
            </p>
          </div>

          <div {...up(0.6)} className="lp-rise mt-8 flex flex-wrap items-center gap-3">
            <CtaButton size="lg">
              {h.cta} <ArrowRight size={17} />
            </CtaButton>
            {h.ctaSecondary && (
              <Button
                variant="ghost"
                size="lg"
                className="px-1 underline-offset-[6px] hover:underline"
                onClick={() => scrollToId(h.ctaSecondary!.targetId)}
              >
                {h.ctaSecondary.label}
              </Button>
            )}
          </div>

          <p {...up(0.66)} className="lp-rise mt-5 font-sans text-[13.5px] text-text-secondary">
            {h.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
