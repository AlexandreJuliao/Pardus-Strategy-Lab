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
 * «subir de nível», escrito a subir: cada palavra fica um degrau acima da
 * anterior e um traço dourado desenha a escada por baixo, cobertor e espelho,
 * até um ponto que pulsa no topo. As palavras continuam separadas por
 * espaços no texto, para leitores de ecrã e para o Google.
 */
function Escada({ text, from }: { text: string; from: number }) {
  const palavras = text.split(" ");
  return (
    <span className="lp-escada">
      {palavras.map((word, i) => {
        const entra = 0.06 + (from + i) * 0.055;
        return (
          <span
            key={`${word}-${i}`}
            className="lp-degrau"
            style={{ ["--d" as string]: i, ["--t" as string]: `${entra + 0.7 + i * 0.28}s` }}
          >
            <span className="lp-word lp-word-accent">
              <span style={{ animationDelay: `${entra}s` }}>{word}</span>
            </span>
            {i < palavras.length - 1 ? " " : <span className="lp-topo" aria-hidden />}
          </span>
        );
      })}
    </span>
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
 * sempre ao fim da secção. Em ecrã largo o texto desenha um L à volta do
 * computador — o título grande em cima, a passar por cima do monitor, a
 * pergunta no canto de baixo à esquerda. Em coluna única, tudo empilha pela
 * ordem natural.
 *
 * Sem rótulos, sem métricas, sem botões — a ação vive no cabeçalho, que
 * acompanha a página.
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
        {/* ── o título: em ecrã largo, por cima do monitor ── */}
        <h1 className="lp-titulo relative z-10 order-1 font-display font-medium text-text-primary lg:mt-[clamp(8px,3.5vh,56px)]">
          {h.lines.map((l) => {
            const from = palavras;
            palavras += l.t.split(" ").length;
            return (
              <span key={l.t} className={`block lg:whitespace-nowrap ${l.escada ? "lp-linha-escada" : ""}`}>
                {l.accent ? (
                  <span className="accent-serif lp-titulo-acento text-gold">
                    {l.escada ? <Escada text={l.t} from={from} /> : <MaskedWords text={l.t} from={from} accent />}
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
          {h.tagline && (
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
          )}
        </div>

        {/* ── a pergunta: canto de baixo à esquerda, à altura da secretária ── */}
        <p
          {...up(0.95)}
          className="lp-rise lp-pergunta relative z-10 order-3 mb-10 mt-8 max-w-[26ch] font-display text-text-primary lg:mb-[7vh] lg:mt-auto lg:max-w-none lg:whitespace-nowrap"
        >
          <span className="lp-sinal lg:absolute lg:-left-7 lg:top-[0.55em] lg:m-0" aria-hidden />
          {h.question.pre}{" "}
          <span className="accent-serif whitespace-nowrap text-[1.32em] leading-none text-gold">{h.question.figure}</span>{" "}
          <span className="lg:block">{h.question.post}</span>
          {h.question.tail && (
            <>
              {" "}
              <span className="mt-1 block text-text-secondary">{h.question.tail}</span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
