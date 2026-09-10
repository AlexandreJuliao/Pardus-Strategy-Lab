"use client";

import MockSiteVideo from "@/components/lp/MockSiteVideo";
import MockPlatform from "@/components/lp/mock/MockPlatform";
import ScreenMap from "@/components/lp/ScreenMap";
import { APARELHOS } from "@/lib/lp-monitor";
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
 * Herói: uma fotografia de um computador, a sério, com o que a vertical faz
 * a passar dentro do ecrã — em perspetiva, como se estivesse a acontecer
 * neste momento (ver ScreenMap). Nos Websites é o site de um cliente a ser
 * percorrido; nos Softwares é a plataforma a trabalhar.
 *
 * A fotografia ancora no canto de baixo à direita da secção e mede-se em
 * largura de ecrã: cresce com o monitor de quem vê, e a secretária chega
 * sempre ao fim da secção. Em ecrã largo o texto vive nos dois cantos da
 * esquerda — o título ao centro, a pergunta em baixo — e a assinatura fica
 * pousada na secretária. Em coluna única, tudo empilha pela ordem natural.
 *
 * Três frases e só três; sem rótulos, sem métricas, sem botões — a ação vive
 * no cabeçalho, que acompanha a página.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  const ap = APARELHOS[h.device];
  const mascara = `linear-gradient(90deg, transparent 0%, #000 ${ap.mascara.esq}%, #000 ${ap.mascara.dir}%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 ${ap.mascara.topo}%, #000 100%)`;
  // nunca mais alta que a secção: a largura máxima em dvh sai da proporção da foto
  const larguraFoto = `clamp(600px, min(60vw, ${Math.round((ap.largura / ap.altura) * 100)}dvh), 1400px)`;
  let palavras = 0;

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-24 md:pt-28 lg:pb-0">
      <span className="lp-bracket left-9 top-[11vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[11vh] hidden border-r border-t md:block" aria-hidden />

      <div className="shell relative flex w-full flex-1 flex-col lg:static">
        {/* ── o título ── */}
        <h1 className="relative z-10 order-1 font-display text-[clamp(36px,3.7vw,54px)] font-semibold leading-[1.0] tracking-[-0.03em] text-text-primary lg:my-auto lg:max-w-[14ch] lg:pb-[6vh]">
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

        {/* ── o computador: em ecrã largo, ancorado em baixo à direita e medido em vw ── */}
        <div
          {...up(0.22)}
          className="lp-rise relative order-2 -mx-[6%] mt-6 lg:absolute lg:bottom-0 lg:right-0 lg:z-0 lg:mx-0 lg:mt-0 lg:w-[var(--lp-foto)]"
          style={{ ["--lp-foto" as string]: larguraFoto }}
        >
          <div
            style={{
              maskImage: mascara,
              WebkitMaskImage: mascara,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <ScreenMap src={ap.src} largura={ap.largura} altura={ap.altura} cantos={ap.cantos} className="w-full">
              {h.screen.kind === "video" ? (
                <MockSiteVideo webm={h.screen.webm} mp4={h.screen.mp4} poster={h.screen.poster} alt={h.screen.alt} />
              ) : (
                <MockPlatform />
              )}
            </ScreenMap>
          </div>

          {/* a assinatura, pousada na secretária */}
          <p
            {...up(0.55)}
            className="lp-rise accent-serif mt-2 text-center text-[clamp(20px,1.55vw,30px)] leading-none text-[#efe9dc] lg:absolute lg:mt-0 lg:whitespace-nowrap lg:text-right"
            // em coluna única a assinatura é static e ignora isto; em ecrã largo é absolute e pousa na secretária
            style={{
              textShadow: "0 1px 18px rgba(3,6,14,0.7)",
              bottom: ap.assinatura.bottom,
              right: ap.assinatura.right,
            }}
          >
            {h.tagline}
          </p>
        </div>

        {/* ── a pergunta: canto de baixo à esquerda, à altura da secretária ── */}
        <p
          {...up(0.72)}
          className="lp-rise relative z-10 order-3 mb-10 mt-8 max-w-[34ch] lg:max-w-[40ch] font-sans text-[clamp(15px,1.15vw,18px)] leading-relaxed text-text-secondary lg:mb-[7vh] lg:mt-0"
        >
          <span className="mb-4 block h-px w-9 bg-gold/70" aria-hidden />
          {h.question.pre}{" "}
          <span className="font-display text-[1.2em] font-semibold leading-none text-gold">{h.question.figure}</span>{" "}
          {h.question.post}
        </p>
      </div>
    </section>
  );
}
