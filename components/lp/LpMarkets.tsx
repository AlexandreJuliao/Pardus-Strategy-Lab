import Reveal from "@/components/lp/Reveal";
import type { Vertical } from "@/lib/verticals";

/**
 * Os mercados para os quais já há plataforma. À esquerda o título fica preso
 * enquanto a lista corre; à direita, uma régua de linhas — número, mercado,
 * o que a plataforma faz, os módulos em fichas — e o estado em que está.
 * Uma lista, não uma grelha de cartões: lê-se como um índice.
 */
export default function LpMarkets({ v }: { v: Vertical }) {
  const m = v.markets;
  if (!m) return null;
  return (
    <section className="seam-top relative overflow-hidden section-pad">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="shell relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="block h-px w-10 bg-gold/50" />
          <h2 className="text-h2 mt-6 text-text-primary [text-wrap:balance]">
            {m.pre} <span className="accent-serif text-gold">{m.accent}</span>
          </h2>
          <p className="hero-sub mt-5 max-w-md text-[clamp(15px,1.4vw,18px)]">{m.intro}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-sans text-[12px] text-text-muted">
            <span className="flex items-center gap-2">
              <i className="lp-live h-1.5 w-1.5 rounded-full bg-gold" /> Em produção
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full border border-text-muted" /> Pronta a adaptar
            </span>
          </div>
        </Reveal>

        <ol className="border-t border-line">
          {m.items.map((it, i) => (
            <Reveal
              tag="li"
              key={it.name}
              delay={i * 0.07}
              className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-6 transition-colors md:grid-cols-[auto_1fr_auto] md:gap-x-8 md:py-7"
            >
              <span className="mono-tiny pt-1.5 text-text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(20px,2vw,26px)] font-semibold leading-tight tracking-[-0.02em] text-text-primary transition-colors group-hover:text-gold">
                  {it.name}
                </h3>
                <p className="mt-1.5 font-sans text-[14.5px] leading-relaxed text-text-secondary">{it.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {it.modules.map((mod) => (
                    <li
                      key={mod}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-sans text-[11.5px] text-text-secondary"
                    >
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="col-start-2 mt-3 flex items-center gap-2 self-start font-sans text-[11px] uppercase tracking-[0.14em] md:col-start-3 md:mt-1.5">
                {it.status === "producao" ? (
                  <>
                    <i className="lp-live h-1.5 w-1.5 rounded-full bg-gold" />
                    <span className="text-gold">Em produção</span>
                  </>
                ) : (
                  <>
                    <i className="h-1.5 w-1.5 rounded-full border border-text-muted" />
                    <span className="text-text-muted">Pronta a adaptar</span>
                  </>
                )}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
