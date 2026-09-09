"use client";

import HeroBackdrop from "@/components/lp/HeroBackdrop";
import MonitorFoto from "@/components/lp/MonitorFoto";
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
 * Herói: o computador — uma fotografia de estúdio, com o site a passar mesmo
 * lá dentro — ancorado à esquerda, a sair pela margem, e o título à
 * direita a passar-lhe por cima. As linhas mais compridas avançam mais para
 * dentro do monitor — é o texto a andar à volta do objeto em vez de ficar
 * arrumado ao lado dele.
 *
 * O ambiente é azul petrol claro, não navy quase preto: é a luz que faz o
 * ecrã parecer aceso e o objeto parecer estar num sítio.
 *
 * Sem botões, por pedido: a ação vive no cabeçalho, que acompanha a página.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="seam-bottom relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-12 pt-24 md:pt-28">
      {/* o ambiente: azul petrol aceso ao centro, a morrer nas pontas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 92% at 46% 44%, #2b4a79 0%, #223c66 26%, #17294a 52%, #0d1729 76%, var(--bg) 100%)",
        }}
        aria-hidden
      />
      <HeroBackdrop />
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ maskImage: "radial-gradient(105% 72% at 50% 20%, #000 16%, transparent 74%)" }}
        aria-hidden
      />
      <span className="lp-bracket left-9 top-[13vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[13vh] hidden border-r border-t md:block" aria-hidden />

      <div className="shell relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          {/* ── o computador, ancorado à esquerda ── */}
          <div
            {...up(0.3)}
            className="lp-rise relative order-2 -mx-[13%] mt-2 w-[126%] lg:order-none lg:col-start-1 lg:row-start-1 lg:-ml-[21vw] lg:mr-0 lg:mt-0 lg:w-[166%]"
          >
            <MonitorFoto className="w-full">
              <MockSiteVideo
                webm="/img/lp/aldurr/site.webm"
                mp4="/img/lp/aldurr/site.mp4"
                poster="/img/lp/aldurr/site-poster.jpg"
                alt="O site da Al Durr a ser percorrido, com as animações a correr"
              />
            </MonitorFoto>
          </div>

          {/* ── o texto, à direita, a passar por cima do computador ── */}
          <div className="relative z-20 order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:-ml-[31%] lg:text-right">
            {/* véu só do lado do texto: é o que deixa o branco assentar em
                cima do ecrã sem lhe tirar a imagem */}
            <span
              className="pointer-events-none absolute -inset-y-40 -right-[40vw] left-[22%] hidden lg:block"
              style={{
                // elipse, não retângulo: assim o véu não deixa arestas à vista
                background:
                  "radial-gradient(52% 42% at 60% 50%, rgba(8,15,29,0.7) 0%, rgba(8,15,29,0.45) 46%, rgba(8,15,29,0.16) 72%, transparent 90%)",
              }}
              aria-hidden
            />

            <p
              {...up(0.02)}
              className="lp-rise flex items-center gap-3 font-sans text-[9.5px] uppercase tracking-[0.16em] text-text-secondary md:text-[11px] md:tracking-[0.3em] lg:justify-end"
            >
              <span className="h-px w-7 bg-gold/80 lg:order-2" aria-hidden />
              {h.kicker}
            </p>

            <h1
              className="relative mt-5 font-display text-[clamp(31px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-0.036em] text-text-primary md:mt-6"
              style={{ textShadow: "0 2px 8px rgba(5,10,20,0.55), 0 4px 34px rgba(5,10,20,0.85)" }}
            >
              {h.lines.map((l, i) => {
                const from = palavras;
                palavras += l.t.split(" ").length;
                return (
                  <span key={l.t} className="block">
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
              className="lp-rise relative mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-3 lg:ml-auto lg:mt-9 lg:max-w-[330px] lg:grid-cols-1 lg:gap-0"
            >
              {h.credits.map((c, i) => (
                <div
                  key={c.label}
                  className={
                    i > 0
                      ? "mt-4 border-t border-white/10 pt-4 sm:mt-0 sm:border-t-0 sm:pt-0 lg:mt-4 lg:border-t lg:pt-4"
                      : ""
                  }
                >
                  <dt className="font-sans text-[10px] uppercase tracking-[0.26em] text-text-secondary/70">
                    {c.label}
                  </dt>
                  {c.figure && <p className="stat-figure mt-2 text-[28px] leading-none">{c.figure}</p>}
                  <dd
                    className={`font-sans text-[13.5px] leading-snug ${c.figure ? "mt-1.5 text-text-primary" : "mt-2 text-[#cbd8ea]"}`}
                  >
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
