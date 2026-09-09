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
 * As duas máscaras cruzadas que apagam as pontas da fotografia no fundo da
 * página. Só três lados: em baixo a foto vai até ao fim da secção e a
 * secretária encosta na régua dos números, sem se desfazer antes.
 */
const MASCARA =
  "linear-gradient(90deg, transparent 0%, #000 14%, #000 84%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 22%, #000 100%)";

/**
 * Herói: uma fotografia de um computador, a sério, com o site do cliente a
 * passar dentro do ecrã — em perspetiva, como se estivesse a acontecer neste
 * momento (ver ScreenMap).
 *
 * A fotografia ancora no canto de baixo à direita da secção e mede-se em
 * largura de ecrã: cresce com o monitor de quem vê, e a secretária chega
 * sempre ao fim da secção. Em ecrã largo o texto vive nos dois cantos da
 * esquerda — o título ao centro, a pergunta em baixo — e a assinatura fica
 * pousada na secretária, ao lado do pé do computador. Em coluna única, tudo
 * empilha pela ordem natural.
 *
 * Três frases e só três; sem rótulos, sem métricas, sem botões — a ação vive
 * no cabeçalho, que acompanha a página.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  let palavras = 0;

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-24 md:pt-28 lg:pb-0">
      <span className="lp-bracket left-9 top-[11vh] hidden border-l border-t md:block" aria-hidden />
      <span className="lp-bracket right-9 top-[11vh] hidden border-r border-t md:block" aria-hidden />

      {/* ── o texto, nos dois cantos da esquerda ── */}
      <div className="shell relative flex w-full flex-1 flex-col lg:static">
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
          className="lp-rise relative order-2 -mx-[6%] mt-6 lg:absolute lg:bottom-0 lg:right-0 lg:z-0 lg:mx-0 lg:mt-0 lg:w-[clamp(600px,min(60vw,112dvh),1400px)]"
        >
          <div
            style={{
              maskImage: MASCARA,
              WebkitMaskImage: MASCARA,
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

          {/* a assinatura, pousada na secretária, alinhada ao canto direito do ecrã */}
          <p
            {...up(0.55)}
            className="lp-rise accent-serif mt-2 text-center text-[clamp(20px,1.55vw,30px)] leading-none text-[#efe9dc] lg:absolute lg:bottom-[8%] lg:right-[29%] lg:mt-0 lg:whitespace-nowrap lg:text-right"
            style={{ textShadow: "0 1px 18px rgba(3,6,14,0.7)" }}
          >
            {h.tagline}
          </p>
        </div>

        {/* a pergunta: canto de baixo à esquerda, à altura da secretária */}
        <p
          {...up(0.72)}
          className="lp-rise relative z-10 order-3 mb-10 mt-8 max-w-[34ch] font-sans text-[clamp(15px,1.15vw,18px)] leading-relaxed text-text-secondary lg:mb-[7vh] lg:mt-0"
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
