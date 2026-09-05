"use client";

import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import MockImporwood, { MockBrowserBar } from "@/components/lp/mock/MockImporwood";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

/** Entrada escalonada, em CSS (ver .lp-rise em globals.css). */
const up = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

/**
 * Herói assimétrico: a tipografia ocupa a esquerda sobre navy, e um painel
 * corta a direita do ecrã com um site de cliente a ser percorrido sozinho.
 *
 * O painel sangra pelo fundo de propósito. Uma maquete inteira, centrada e a
 * flutuar com sombra é a composição que todas as landing pages geradas usam;
 * cortada pelo limite da secção lê-se como uma página real que continua.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;

  const site = (
    <>
      <MockBrowserBar url="imporwood.pt" />
      <div className="h-full overflow-hidden">
        <div className="lp-site-read">
          <MockImporwood />
        </div>
      </div>
    </>
  );

  return (
    <section className="relative overflow-hidden lg:h-[100svh] lg:max-h-[900px] lg:min-h-[680px]">
      {/* atmosfera à esquerda */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 8% 18%, rgba(46,84,132,0.26), transparent 62%), radial-gradient(40% 40% at 2% 96%, rgba(212,175,96,0.09), transparent 70%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.18]" />

      {/* painel do cliente — corta a direita do ecrã e sangra pelo fundo */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46vw] border-l border-line bg-bg-2/70 lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58% 44% at 50% 24%, rgba(212,175,96,0.16), transparent 72%)",
          }}
        />
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute left-1/2 top-[92px] h-[calc(100%-52px)] w-[min(552px,82%)] -translate-x-1/2 overflow-hidden rounded-t-[10px] border border-white/[0.08] shadow-[0_-10px_80px_-20px_rgba(0,0,0,0.9)]">
          {site}
        </div>
      </div>

      <div className="shell relative z-10 flex h-full items-center pb-14 pt-28 md:pt-32 lg:py-0">
        <div className="w-full lg:w-[min(600px,42vw)]">
          <h1
            {...up(0)}
            className="lp-rise font-display text-[clamp(38px,4.6vw,64px)] font-semibold leading-[0.98] tracking-[-0.032em] text-text-primary [text-wrap:balance]"
          >
            {h.pre}{" "}
            <span className="accent-serif text-gold">{h.accent}</span>
            {h.post ? <> {h.post}</> : null}
          </h1>

          <p {...up(0.08)} className="lp-rise hero-sub mt-7 max-w-lg [text-wrap:pretty]">
            {h.sub}
          </p>

          <div {...up(0.16)} className="lp-rise mt-9 max-w-md">
            <span className="block h-px w-full bg-gradient-to-r from-gold/55 to-transparent" />
            <p className="mt-4 font-sans text-[13px] tracking-wide text-text-muted">
              {h.metricPre}
            </p>
            <p className="mt-1.5 font-display text-[clamp(19px,1.9vw,25px)] font-semibold leading-tight tracking-[-0.02em] text-text-primary">
              <span className="text-gold">{h.metricNumber}</span> {h.metric}
            </p>
          </div>

          <div {...up(0.24)} className="lp-rise mt-9 flex flex-wrap items-center gap-3">
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
      </div>

      {/* painel em ecrã pequeno: entra por baixo do texto, na mesma a percorrer */}
      <div className="relative z-10 lg:hidden">
        <div className="shell">
          <div className="relative h-[420px] overflow-hidden rounded-t-[10px] border border-white/[0.08] border-b-0 shadow-[0_-8px_50px_-18px_rgba(0,0,0,0.9)]">
            {site}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
