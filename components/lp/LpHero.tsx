"use client";

import HeroBackdrop from "@/components/lp/HeroBackdrop";
import MockMonitor from "@/components/lp/MockMonitor";
import MockSiteVideo from "@/components/lp/MockSiteVideo";
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
 * Herói em formato de cartaz: uma lousa curta no topo, o título a ocupar o
 * ecrã, o site do cliente como plano largo por baixo e uma linha de créditos
 * a fechar. Tudo dentro de um enquadramento com barras escuras em cima e em
 * baixo — é isso que dá a leitura de sala, e não mais efeitos.
 *
 * Sem botões, por pedido: a ação vive no cabeçalho, que acompanha a página
 * inteira.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="seam-bottom relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-10 pt-24 md:pt-28">
      <HeroBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(130% 80% at 50% 24%, transparent 26%, rgba(5,7,14,0.55) 72%, var(--bg) 100%)",
        }}
        aria-hidden
      />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          maskImage: "radial-gradient(110% 74% at 50% 16%, #000 18%, transparent 76%)",
        }}
        aria-hidden
      />

      {/* barras de enquadramento */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[8vh] bg-gradient-to-b from-bg to-transparent"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[8vh] bg-gradient-to-t from-bg to-transparent"
        aria-hidden
      />
      <span className="lp-bracket left-9 top-[13vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[13vh] hidden border-r border-t md:block" aria-hidden />

      <div className="shell relative z-10 flex w-full flex-col">
        {/* ── a lousa ── */}
        <p
          {...up(0.02)}
          className="lp-rise flex items-center gap-3 font-sans text-[9.5px] uppercase tracking-[0.16em] text-text-muted md:text-[11px] md:tracking-[0.3em]"
        >
          <span className="h-px w-7 bg-gold/70" aria-hidden />
          {h.kicker}
        </p>

        {/* ── o título, com os créditos a acompanhar à direita ── */}
        <div className="mt-6 flex flex-col md:mt-7 lg:grid lg:grid-cols-[1fr_260px] lg:items-end lg:gap-x-10">
          <h1 className="relative z-20 order-1 lg:order-none lg:col-start-1 lg:row-start-1 font-display text-[clamp(30px,4.5vw,58px)] font-bold leading-[1.0] tracking-[-0.036em] text-text-primary">
            {h.lines.map((l, i) => {
              const from = palavras;
              palavras += l.t.split(" ").length;
              return (
                <span key={l.t} className="block" style={{ marginLeft: `calc(${i} * clamp(0px, 3vw, 62px))` }}>
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

          {/* os créditos: rótulo pequeno em cima, o que interessa por baixo */}
          <dl
            {...up(0.5)}
            className="lp-rise order-3 mt-9 grid grid-cols-1 gap-x-8 sm:grid-cols-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:mt-0 lg:grid-cols-1 lg:gap-0 lg:border-l lg:border-line lg:pl-6"
          >
            {h.credits.map((c, i) => (
              <div
                key={c.label}
                className={
                  i > 0
                    ? "mt-4 border-t border-line pt-4 sm:mt-0 sm:border-t-0 sm:pt-0 lg:mt-4 lg:border-t lg:pt-4"
                    : ""
                }
              >
                <dt className="font-sans text-[10px] uppercase tracking-[0.26em] text-text-muted">{c.label}</dt>
                {c.figure && <p className="stat-figure mt-2 text-[28px] leading-none">{c.figure}</p>}
                <dd
                  className={`font-sans text-[13.5px] leading-snug ${c.figure ? "mt-1.5 text-text-primary" : "mt-2 text-text-secondary"}`}
                >
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* ── o plano largo: o site do cliente ── */}
          <div
            {...up(0.38)}
            className="lp-rise relative z-10 order-2 mt-7 md:mt-8 lg:order-none lg:col-span-2 lg:row-start-2"
          >
            <MockMonitor className="mx-auto w-full max-w-[648px]">
              <div className="aspect-[2/1]">
                <MockSiteVideo
                  webm="/img/lp/aldurr/site.webm"
                  mp4="/img/lp/aldurr/site.mp4"
                  poster="/img/lp/aldurr/site-poster.jpg"
                  alt="O site da Al Durr a ser percorrido, com as animações a correr"
                />
              </div>
            </MockMonitor>
          </div>
        </div>
      </div>
    </section>
  );
}
