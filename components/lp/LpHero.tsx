"use client";

import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import HeroBackdrop from "@/components/lp/HeroBackdrop";
import MockImporwood, { MockBrowserBar } from "@/components/lp/mock/MockImporwood";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

/** Entrada escalonada, em CSS (ver .lp-rise em globals.css). */
const up = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

const CHAPTERS = ["Página inicial", "Serviços", "Frota em direto", "Rastreio", "Prova", "Pedido de carga"];

/**
 * Cada palavra sobe de dentro da sua própria máscara, com um atraso a
 * aumentar. É o que dá vida à headline sem lhe mexer no conteúdo: o título
 * continua a ser um `<h1>` com o texto todo lá dentro para quem lê e para o
 * Google, e as janelas são só apresentação.
 */
function MaskedWords({
  text,
  from = 0,
  accent = false,
  className = "",
}: {
  text: string;
  /** índice da primeira palavra, para o atraso continuar entre blocos */
  from?: number;
  accent?: boolean;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`lp-word ${accent ? "lp-word-accent" : ""} ${className}`}
          style={{ marginRight: "0.24em" }}
        >
          <span style={{ animationDelay: `${0.05 + (from + i) * 0.06}s` }}>{word}</span>
        </span>
      ))}
    </>
  );
}

export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  const preWords = h.pre.split(" ").length;

  return (
    <section className="seam-bottom relative overflow-hidden pt-32 md:pt-36">
      {/* malha de luz a mexer, grelha fina e grão por cima */}
      <HeroBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(115% 78% at 50% 22%, transparent 30%, rgba(5,7,14,0.5) 72%, var(--bg) 100%)" }}
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ maskImage: "radial-gradient(120% 80% at 50% 12%, #000 20%, transparent 78%)" }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* cantos de enquadramento */}
      <span className="lp-bracket left-6 top-24 border-l border-t md:left-10" aria-hidden />
      <span className="lp-bracket right-6 top-24 border-r border-t md:right-10" aria-hidden />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <h1 className="max-w-4xl font-display text-[clamp(40px,6vw,84px)] font-bold leading-[0.98] tracking-[-0.035em] text-text-primary">
          <MaskedWords text={h.pre} />
          <span className="accent-serif text-gold">
            <MaskedWords text={h.accent} from={preWords} accent />
          </span>
        </h1>

        <p {...up(0.42)} className="lp-rise hero-sub mt-7 max-w-2xl [text-wrap:pretty]">
          {h.sub}
        </p>

        <div {...up(0.5)} className="lp-rise mt-9 flex items-center gap-4">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <p className="font-sans text-[12.5px] uppercase tracking-[0.2em] text-text-muted">{h.metricPre}</p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
        <p {...up(0.55)} className="lp-rise mt-3 font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-tight tracking-[-0.028em] text-text-primary">
          <span className="stat-figure">{h.metricNumber}</span> {h.metric}
        </p>

        <div {...up(0.62)} className="lp-rise mt-10 flex flex-wrap items-center justify-center gap-3">
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

        <p {...up(0.67)} className="lp-rise mt-5 font-sans text-[13.5px] text-text-secondary">
          {h.footnote}
        </p>
      </div>

      {/* o site do cliente, a percorrer sozinho, só a espreitar por baixo */}
      <div {...up(0.74)} className="lp-rise shell relative z-10 mt-14 md:mt-16">
        <ol className="mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 px-2 md:justify-between">
          {CHAPTERS.map((c, i) => (
            <li
              key={c}
              className={`lp-chap lp-chap-${i + 1} flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em]`}
            >
              <span className="lp-chap-dot h-1 w-1 rounded-full bg-current" />
              {c}
            </li>
          ))}
        </ol>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute inset-x-[6%] -top-10 h-[75%] blur-3xl"
            style={{ background: "radial-gradient(50% 60% at 50% 40%, rgba(212,175,96,0.22), rgba(46,84,132,0.18) 55%, transparent 80%)" }}
          />
          <div className="relative h-[440px] overflow-hidden rounded-t-[14px] border border-b-0 border-white/[0.09] shadow-[0_-14px_90px_-26px_rgba(0,0,0,0.95)] md:h-[520px]">
            <MockBrowserBar url="imporwood.pt" />
            <div className="h-full overflow-hidden">
              <div className="lp-site-read">
                <MockImporwood />
              </div>
            </div>
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg via-bg/85 to-transparent" />
        </div>
      </div>
    </section>
  );
}
