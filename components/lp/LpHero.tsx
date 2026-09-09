"use client";

import MockSiteVideo from "@/components/lp/MockSiteVideo";
import TiltStage from "@/components/lp/TiltStage";
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
          <span style={{ animationDelay: `${0.06 + (from + i) * 0.055}s` }}>{word}</span>
        </span>
      ))}
    </>
  );
}

/**
 * Herói: texto à esquerda com muito ar, e à direita o site do cliente a
 * correr num ecrã sem moldura — uma placa de vidro em perspetiva, a flutuar,
 * que roda de leve atrás do rato. Sem monitor, sem secretária, sem cenário:
 * o próprio site é o objeto.
 *
 * O fundo é o navy da página, limpo, com uma só luz atrás da placa e uma
 * grelha de pontos quase invisível. As linhas finas (a do horizonte, os
 * cantos, os separadores) são o que dá a leitura de instrumento.
 *
 * Sem botões, por pedido: a ação vive no cabeçalho, que acompanha a página.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="seam-bottom relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-16 pt-28 md:pt-32">
      {/* uma luz só, atrás da placa */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 58% at 70% 46%, rgba(46,84,132,0.38) 0%, rgba(46,84,132,0.12) 46%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage: "radial-gradient(70% 70% at 62% 50%, #000 20%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(70% 70% at 62% 50%, #000 20%, transparent 78%)",
        }}
        aria-hidden
      />
      {/* linha do horizonte: passa por trás da placa, de lado a lado */}
      <span
        className="pointer-events-none absolute inset-x-0 top-[66%] hidden h-px lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border-strong) 30%, var(--border-strong) 70%, transparent 100%)",
        }}
        aria-hidden
      />
      <span className="lp-bracket left-9 top-[12vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[12vh] hidden border-r border-t md:block" aria-hidden />

      <div className="shell relative z-10 w-full">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-x-10">
          {/* ── o texto ── */}
          <div className="relative">
            <p
              {...up(0.02)}
              className="lp-rise flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em] text-text-muted md:text-[11px] md:tracking-[0.3em]"
            >
              <span className="h-px w-7 bg-gold/80" aria-hidden />
              {h.kicker}
            </p>

            <h1 className="mt-7 font-display text-[clamp(31px,3.55vw,46px)] font-bold leading-[1.04] tracking-[-0.036em] text-text-primary md:mt-8">
              {h.lines.map((l) => {
                const from = palavras;
                palavras += l.t.split(" ").length;
                return (
                  <span key={l.t} className="block lg:whitespace-nowrap">
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

            <p
              {...up(0.3)}
              className="lp-rise mt-7 max-w-[42ch] font-sans text-[clamp(15px,1.25vw,17px)] leading-relaxed text-text-secondary"
            >
              {h.sub}
            </p>

            {/* leituras: um número que interessa e o que está no ecrã */}
            <dl
              {...up(0.42)}
              className="lp-rise mt-10 grid grid-cols-2 gap-x-8 border-t border-line pt-6 sm:max-w-[460px]"
            >
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.24em] text-text-muted">{h.metric.label}</dt>
                <dd className="mt-2">
                  <span className="stat-figure block whitespace-nowrap text-[30px] leading-none">
                    {h.metric.figure}
                  </span>
                  <span className="mt-1.5 block font-sans text-[13px] leading-snug text-text-secondary">
                    {h.metric.unit}
                  </span>
                </dd>
              </div>
              <div className="border-l border-line pl-6 sm:pl-8">
                <dt className="font-sans text-[10px] uppercase tracking-[0.24em] text-text-muted">No ecrã</dt>
                <dd className="mt-2">
                  <span className="flex items-center gap-2 font-sans text-[17px] font-semibold leading-none text-text-primary">
                    <span className="lp-live inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {h.live.name}
                  </span>
                  <span className="mt-1.5 block font-sans text-[13px] leading-snug text-text-secondary">
                    {h.live.note}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* ── a placa de vidro com o site a correr ── */}
          <div {...up(0.24)} className="lp-rise relative lg:-mr-[8vw]">
            <div className="lp-float" style={{ perspective: "1700px" }}>
              <TiltStage className="relative">
                <div
                  className="relative overflow-hidden rounded-[14px] md:rounded-[18px]"
                  style={{
                    background: "#0b1120",
                    boxShadow: [
                      "0 0 0 1px rgba(255,255,255,0.09)",
                      "0 1px 0 rgba(255,255,255,0.16) inset",
                      "0 70px 120px -50px rgba(0,0,0,0.9)",
                      "0 30px 60px -30px rgba(5,10,24,0.8)",
                    ].join(", "),
                  }}
                >
                  <div className="aspect-[16/10]">
                    <MockSiteVideo
                      webm="/img/lp/aldurr/site.webm"
                      mp4="/img/lp/aldurr/site.mp4"
                      poster="/img/lp/aldurr/site-poster.jpg"
                      alt="O site da Al Durr a ser percorrido, com as animações a correr"
                    />
                  </div>

                  {/* o endereço, para se perceber que é um site a sério */}
                  <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#05070e]/75 px-3 py-1.5 md:bottom-4 md:left-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                    <span className="font-sans text-[11px] tracking-wide text-text-primary">{h.live.url}</span>
                  </div>

                  {/* aresta de luz em cima, dourada e curta */}
                  <span
                    className="pointer-events-none absolute inset-x-[18%] top-0 z-20 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,96,0.7), transparent)" }}
                    aria-hidden
                  />
                  {/* varrimento de luz no vidro, uma vez, à entrada */}
                  <span
                    className="lp-sweep pointer-events-none absolute -inset-y-10 left-0 z-20 w-[34%]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.11) 50%, rgba(255,255,255,0.05) 60%, transparent)",
                    }}
                    aria-hidden
                  />
                </div>
              </TiltStage>
            </div>

            {/* a placa a pousar luz no chão */}
            <div
              className="pointer-events-none absolute inset-x-[12%] -bottom-10 h-16 blur-2xl"
              style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(46,84,132,0.5), transparent 70%)" }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
