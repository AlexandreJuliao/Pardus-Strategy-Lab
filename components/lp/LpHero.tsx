"use client";

import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import AuroraGlow from "@/components/ui/AuroraGlow";
import MockImporwood, { MockBrowserBar } from "@/components/lp/mock/MockImporwood";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

/** Entrada escalonada, em CSS (ver .lp-rise em globals.css). */
const up = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

/**
 * As legendas acompanham o percurso da maquete: cada uma acende na janela
 * de tempo em que a secção correspondente está à vista (mesmos 38s da
 * animação .lp-site-read, ver .lp-chap-N em globals.css).
 */
const CHAPTERS = ["Página inicial", "Serviços", "Frota em direto", "Rastreio", "Prova", "Pedido de carga"];

/**
 * Herói centrado: a tipografia em cima, a promessa em número, e por baixo o
 * site de um cliente a ser percorrido sozinho, cortado pelo fundo da secção.
 * Só uma parte do site está à vista de cada vez, e as legendas dizem qual.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;

  return (
    <section className="relative overflow-hidden pt-32 md:pt-36">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.16]" />
      <AuroraGlow variant="cta" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{ background: "radial-gradient(55% 45% at 50% 0%, rgba(46,84,132,0.26), transparent 70%)" }}
      />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <h1
          {...up(0)}
          className="lp-rise max-w-4xl font-display text-[clamp(40px,6vw,84px)] font-semibold leading-[0.96] tracking-[-0.032em] text-text-primary [text-wrap:balance]"
        >
          {h.pre} <span className="accent-serif text-gold">{h.accent}</span>
          {h.post ? <> {h.post}</> : null}
        </h1>

        <p {...up(0.08)} className="lp-rise hero-sub mt-7 max-w-2xl [text-wrap:pretty]">
          {h.sub}
        </p>

        <div {...up(0.16)} className="lp-rise mt-8 flex flex-col items-center">
          <p className="font-sans text-[13px] tracking-wide text-text-muted">{h.metricPre}</p>
          <p className="mt-1.5 font-display text-[clamp(20px,2vw,27px)] font-semibold leading-tight tracking-[-0.02em] text-text-primary">
            <span className="text-gold">{h.metricNumber}</span> {h.metric}
          </p>
        </div>

        <div {...up(0.24)} className="lp-rise mt-9 flex flex-wrap items-center justify-center gap-3">
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

        <p {...up(0.3)} className="lp-rise mt-5 font-sans text-[13.5px] text-text-secondary">
          {h.footnote}
        </p>
      </div>

      {/* o site do cliente, a percorrer sozinho, só a espreitar por baixo */}
      <div {...up(0.42)} className="lp-rise shell relative z-10 mt-14 md:mt-16">
        <ol className="mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-1.5 px-2 md:justify-between">
          {CHAPTERS.map((c, i) => (
            <li
              key={c}
              className={`lp-chap lp-chap-${i + 1} flex items-center gap-2 font-sans text-[11.5px] uppercase tracking-[0.2em]`}
            >
              <span className="lp-chap-dot h-1.5 w-1.5 rounded-full bg-current" />
              {c}
            </li>
          ))}
        </ol>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute inset-x-[8%] -top-8 h-[70%] blur-3xl"
            style={{ background: "radial-gradient(50% 60% at 50% 40%, rgba(212,175,96,0.2), rgba(46,84,132,0.16) 55%, transparent 80%)" }}
          />
          <div className="relative h-[440px] overflow-hidden rounded-t-[12px] border border-b-0 border-white/[0.08] shadow-[0_-12px_80px_-24px_rgba(0,0,0,0.9)] md:h-[520px]">
            <MockBrowserBar url="imporwood.pt" />
            <div className="h-full overflow-hidden">
              <div className="lp-site-read">
                <MockImporwood />
              </div>
            </div>
          </div>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
