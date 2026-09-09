"use client";

import MockSiteVideo from "@/components/lp/MockSiteVideo";
import ScreenMap from "@/components/lp/ScreenMap";
import { MONITOR } from "@/lib/lp-monitor";
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
 * Herói: uma fotografia de um computador, a sério, com o site do cliente a
 * passar dentro do ecrã — em perspetiva, como se estivesse a acontecer neste
 * momento (ver ScreenMap). Três frases, e só três, cada uma no seu sítio:
 * o título no canto de cima à esquerda, a assinatura no canto de baixo à
 * esquerda, a pergunta em legenda de rodapé, ao centro, como num filme.
 *
 * Sem pilhas de texto, sem rótulos, sem métricas, sem botões: a ação vive no
 * cabeçalho, que acompanha a página.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="seam-bottom relative flex min-h-[100dvh] flex-col overflow-hidden pb-8 pt-24 md:pt-24">
      <span className="lp-bracket left-9 top-[11vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[11vh] hidden border-r border-t md:block" aria-hidden />

      <div className="shell relative z-10 flex w-full flex-1 flex-col">
        <div className="grid flex-1 grid-cols-1 items-center gap-y-8 lg:grid-cols-[0.4fr_0.6fr] lg:gap-x-4">
          {/* ── o título, à esquerda; escapa da coluna para a parte vazia da foto ── */}
          <h1 className="relative z-20 lg:min-w-0 font-display text-[clamp(33px,3.6vw,50px)] font-bold leading-[1.02] tracking-[-0.036em] text-text-primary lg:w-[160%]">
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

          {/* ── o computador, com o site a correr lá dentro; sangra para a direita ── */}
          <div {...up(0.22)} className="lp-rise relative -mx-[6%] lg:mx-0 lg:min-w-0 lg:-mr-[40%] lg:w-[140%]">
            {/* as quatro arestas da fotografia desvanecem-se no fundo da
                página: duas máscaras lineares cruzadas, e não uma elipse, para
                o monitor ficar inteiro e só as pontas irem à cor de fundo */}
            <div
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, #000 13%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 5%, #000 88%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, #000 13%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 5%, #000 88%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <ScreenMap
                src={MONITOR.src}
                largura={MONITOR.largura}
                altura={MONITOR.altura}
                cantos={MONITOR.cantos}
                className="w-full"
              >
                <MockSiteVideo
                  webm="/img/lp/aldurr/site.webm"
                  mp4="/img/lp/aldurr/site.mp4"
                  poster="/img/lp/aldurr/site-poster.jpg"
                  alt="O site da Al Durr a ser percorrido, com as animações a correr"
                />
              </ScreenMap>
            </div>

            {/* a assinatura, pousada na secretária, alinhada ao canto do ecrã */}
            <p
              {...up(0.5)}
              className="lp-rise accent-serif absolute bottom-[6%] right-[29%] text-right text-[clamp(19px,1.7vw,25px)] leading-snug text-[#ece6d8]"
            >
              {h.tagline}
            </p>
          </div>
        </div>

        {/* ── legenda de rodapé, ao centro, como num filme ── */}
        <p
          {...up(0.7)}
          className="lp-rise mx-auto mt-8 flex max-w-[64ch] flex-col items-center text-center font-sans text-[clamp(14px,1.2vw,17px)] leading-relaxed text-text-secondary lg:mt-2"
        >
          <span className="mb-4 h-px w-9 bg-gold/70" aria-hidden />
          <span>
            {h.question.pre} <span className="font-display font-semibold text-gold">{h.question.figure}</span>{" "}
            {h.question.post}
          </span>
        </p>
      </div>
    </section>
  );
}
