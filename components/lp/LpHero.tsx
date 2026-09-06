"use client";

import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import HeroBackdrop from "@/components/lp/HeroBackdrop";
import MockMonitor from "@/components/lp/MockMonitor";
import MockSiteVideo from "@/components/lp/MockSiteVideo";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

/** Entrada escalonada, em CSS (ver .lp-rise em globals.css). */
const up = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

/**
 * Cada palavra sobe de dentro da sua própria máscara, com um atraso a
 * aumentar. O título continua a ser um `<h1>` com o texto todo lá dentro
 * para quem lê e para o Google; as janelas são só apresentação.
 */
function MaskedWords({ text, from = 0, accent = false }: { text: string; from?: number; accent?: boolean }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`lp-word ${accent ? "lp-word-accent" : ""}`}
          style={{ marginRight: "0.24em" }}
        >
          <span style={{ animationDelay: `${0.05 + (from + i) * 0.055}s` }}>{word}</span>
        </span>
      ))}
    </>
  );
}

/**
 * Herói em composição sobreposta: a headline atravessa o topo em degraus,
 * recuando mais a cada linha, e o monitor entra por baixo à esquerda, mais
 * pequeno e descido, a passar por trás da primeira linha. Só fica na secção
 * o que faz falta: o título, a promessa em duas linhas e uma ação.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="seam-bottom relative overflow-hidden pb-20 pt-28 md:pt-32 lg:pb-20 lg:pt-36">
      <HeroBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 45% 20%, transparent 34%, rgba(5,7,14,0.55) 76%, var(--bg) 100%)" }}
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ maskImage: "radial-gradient(120% 82% at 50% 14%, #000 22%, transparent 80%)" }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <span className="lp-bracket left-6 top-24 border-l border-t md:left-10" aria-hidden />
      <span className="lp-bracket right-6 top-24 border-r border-t md:right-10" aria-hidden />

      <div className="shell relative z-10">
        {/* ── a headline, em degraus, por cima de tudo ── */}
        <h1 className="relative z-20 font-display text-[clamp(34px,5.2vw,68px)] font-bold leading-[1.02] tracking-[-0.036em] text-text-primary">
          {h.lines.map((l, i) => {
            const from = palavras;
            palavras += l.t.split(" ").length;
            return (
              <span
                key={l.t}
                className="block"
                // o recuo cresce de linha para linha; em ecrã pequeno alinha tudo
                style={{ marginLeft: `calc(${i} * clamp(0px, 4.4vw, 92px))` }}
              >
                {l.accent ? (
                  <span className="accent-serif text-gold">
                    <MaskedWords text={l.t} from={from} accent />
                  </span>
                ) : (
                  <MaskedWords text={l.t} from={from} />
                )}
              </span>
            );
          })}
        </h1>

        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:mt-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ── o monitor: mais pequeno, descido, a passar por trás da headline ── */}
          <div {...up(0.34)} className="lp-rise relative z-10 order-2 lg:order-1 lg:pr-6">
            <MockMonitor className="mx-auto max-w-[560px] lg:mx-0">
              <div className="h-[240px] sm:h-[300px] lg:h-[326px]">
                <MockSiteVideo
                  webm="/img/lp/aldurr/site.webm"
                  mp4="/img/lp/aldurr/site.mp4"
                  poster="/img/lp/aldurr/site-poster.jpg"
                  alt="O site da Al Durr a ser percorrido, com as animações a correr"
                />
              </div>
            </MockMonitor>
            <p className="mt-6 text-center font-sans text-[12.5px] text-text-muted lg:text-left">{h.proof}</p>
          </div>

          {/* ── a promessa, em duas linhas, e uma ação ── */}
          <div className="order-1 max-w-md lg:order-2 lg:pt-3">
            <p {...up(0.44)} className="lp-rise hero-sub [text-wrap:pretty]">
              {h.sub}
            </p>

            <p
              {...up(0.52)}
              className="lp-rise mt-4 font-display text-[clamp(19px,1.9vw,25px)] font-bold leading-tight tracking-[-0.028em] text-text-primary"
            >
              <span className="stat-figure">{h.metricNumber}</span> {h.metric}
            </p>

            <div {...up(0.62)} className="lp-rise mt-9 flex flex-wrap items-center gap-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
