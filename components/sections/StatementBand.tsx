"use client";

import { motion } from "framer-motion";
import FlowField from "@/components/canvas/FlowField";
import CtaButton from "@/components/ui/CtaButton";

/**
 * Arestas de papel rasgado. Um perfil por aresta (onda lenta + dente fino,
 * semente constante: igual no servidor e no browser), com a inclinação do
 * corte original. A folha segue o perfil; a fibra clara acompanha-o 1–3px
 * por fora e, de vez em quando, abre num rasgo mais largo — é a franja
 * branca que o papel mostra onde rasga.
 */
function arestasRasgadas() {
  let semente = 41;
  const r = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };
  const N = 180;
  const INCL = 26; // px, a mesma inclinação do corte original
  const BASE = 10; // px para dentro, para o rasgo ter onde morder
  const perfil = () => {
    const ys: number[] = [];
    const fibra: number[] = [];
    let onda = 0;
    let rasgo = 0;
    for (let i = 0; i <= N; i++) {
      onda = (onda + (r() - 0.5) * 2.2) * 0.9;
      const dente = (r() - 0.5) * 2.4;
      ys.push(onda * 2.2 + dente);
      // a fibra: fina quase sempre, com rasgos largos que duram alguns pontos
      if (rasgo <= 0 && r() < 0.05) rasgo = 3 + Math.floor(r() * 6);
      const largura = rasgo > 0 ? 3.5 + r() * 3.5 : 1.2 + r() * 1.6;
      rasgo--;
      fibra.push(largura);
    }
    return { ys, fibra };
  };
  const cima = perfil();
  const baixo = perfil();
  const poligono = (comFibra: boolean) => {
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * 100;
      const y = BASE + INCL * (1 - x / 100) + cima.ys[i] - (comFibra ? cima.fibra[i] : 0);
      pts.push(`${x.toFixed(2)}% ${Math.max(0, y).toFixed(1)}px`);
    }
    // em baixo, da direita para a esquerda: a direita fica mais alta
    for (let i = N; i >= 0; i--) {
      const x = (i / N) * 100;
      const y = BASE + INCL * (x / 100) + baixo.ys[i] - (comFibra ? baixo.fibra[i] : 0);
      pts.push(`${x.toFixed(2)}% calc(100% - ${Math.max(0, y).toFixed(1)}px)`);
    }
    return `polygon(${pts.join(",")})`;
  };
  return { papel: poligono(false), fibra: poligono(true) };
}
const RASGO = arestasRasgadas();

/**
 * The site's colour-contrast beats, ported from the social system:
 *   gold — the surface IS the colour: solid gold, navy ink, grain. The
 *          scroll-stopping inverted panel (posts D2/4, C3/4).
 *   blue — deep petrol gradient with the living FlowField underneath
 *          (posts D1/4, C4/4). Light ink, gold accent survives.
 * Both keep the slanted clip so they read as cut into the page.
 */
export default function StatementBand({
  title,
  sub,
  cta,
  tone = "gold",
  rasgada = false,
}: {
  title: React.ReactNode;
  sub?: string;
  cta?: string;
  tone?: "gold" | "blue";
  /** arestas de papel rasgado, com franja clara e sombra (só no dourado) */
  rasgada?: boolean;
}) {
  const gold = tone === "gold";
  const papel = gold && rasgada;

  return (
    <section
      className={`relative ${papel ? "lp-papel text-cream-ink" : `overflow-hidden ${gold ? "section-gold" : "section-petrol"}`}`}
      style={
        papel
          ? undefined
          : {
              // slanted silhouette — the section reads as cut into the page
              clipPath: "polygon(0 26px, 100% 0, 100% calc(100% - 26px), 0 100%)",
            }
      }
    >
      {papel && (
        // a folha: a franja clara por baixo, o dourado por cima, e uma sombra
        // curta que a descola da página
        <div className="lp-papel-sombra pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[#f3e6c6]" style={{ clipPath: RASGO.fibra }} />
          <div className="section-gold absolute inset-0" style={{ clipPath: RASGO.papel }}>
            <div className="grain-section lp-papel-grao" />
            <div className="lp-papel-fibras" />
          </div>
        </div>
      )}
      {!gold && (
        <>
          <FlowField tone="blue" />
          {/* calm the centre so the words read */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 62% 74% at 50% 50%, rgba(10,18,36,0.72) 0%, rgba(10,18,36,0.28) 44%, transparent 74%)",
            }}
          />
        </>
      )}
      {!papel && <div className="grain-section" />}

      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center"
        style={{
          minHeight: "clamp(340px, 44vw, 560px)",
          paddingBlock: "clamp(72px,10vw,120px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl font-display font-semibold leading-[1.03] [font-size:clamp(30px,5vw,68px)] [letter-spacing:-0.028em] [text-wrap:balance] ${
            gold
              ? "text-cream-ink"
              : "text-text-primary [text-shadow:0_6px_40px_rgba(0,0,0,0.55)]"
          }`}
        >
          {title}
        </motion.h2>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-6 max-w-xl font-sans text-[clamp(15px,1.5vw,19px)] leading-relaxed ${
              gold
                ? "text-[#3b2d16]"
                : "text-[#c8d4e6] [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]"
            }`}
          >
            {sub}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9"
          >
            <CtaButton size="lg" variant={gold ? "inverse" : "primary"}>
              {cta}
            </CtaButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
