"use client";

import { ArrowRight, Search } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/lp/Reveal";
import type { Vertical } from "@/lib/verticals";

/**
 * O site como canal de aquisição, não como montra.
 *
 * A prova é uma lista de resultados do Google onde o site do cliente sobe de
 * posição sozinha, com o funil por baixo a mostrar o que isso dá em pedidos.
 * A subida é uma animação CSS: a linha destacada muda de lugar, as outras
 * abrem-lhe espaço. Sem JavaScript, e parada para quem pede menos movimento.
 */

const ROWS = ["Concorrente · anúncio", "Diretório de empresas", "Concorrente local", "Portal do setor"];

const FUNNEL = [
  { k: "Aparições no Google", v: "12.400", w: 100 },
  { k: "Cliques no site", v: "890", w: 46 },
  { k: "Pedidos de contacto", v: "47", w: 16 },
];

export default function LpOrganic({ v }: { v: Vertical }) {
  const o = v.organic;
  return (
    <section className="seam-top relative overflow-hidden section-pad">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <span className="block h-px w-10 bg-gold/50" />
          <h2 className="text-h2 mt-6 text-text-primary [text-wrap:balance]">
            {o.pre} <span className="accent-serif text-gold">{o.accent}</span>
          </h2>
          <p className="hero-sub mt-5 max-w-lg text-[clamp(15px,1.4vw,18px)]">{o.intro}</p>

          <ul className="mt-7 space-y-3">
            {o.points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <CtaButton size="lg">
              {o.cta} <ArrowRight size={17} />
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* ── a subida nos resultados ── */}
          <div className="rounded-[12px] border border-line bg-surface/60 p-4 md:p-5">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2">
              <Search size={13} className="text-text-muted" />
              <span className="font-sans text-[12.5px] text-text-primary">{o.query}</span>
            </div>

            <div className="relative mt-4 h-[212px]">
              {/* as outras posições, que abrem espaço */}
              {ROWS.map((r, i) => (
                <div
                  key={r}
                  className={`lp-rank-other lp-rank-other-${i + 1} absolute inset-x-0 flex h-[48px] flex-col justify-center gap-1.5 rounded-[6px] px-3`}
                >
                  <span className="block h-1.5 w-24 rounded-full bg-white/[0.1]" />
                  <span className="block h-1.5 rounded-full bg-white/[0.05]" style={{ width: `${58 + i * 9}%` }} />
                </div>
              ))}

              {/* o site do cliente, a subir */}
              <div className="lp-rank-ours absolute inset-x-0 flex h-[48px] items-center gap-3 rounded-[6px] border border-gold/40 bg-gold/[0.07] px-3">
                <span className="lp-rank-pos flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold font-display text-[11px] font-bold text-[#0a0a0a]" />
                <span className="min-w-0 leading-tight">
                  <span className="block truncate font-sans text-[12.5px] font-medium text-gold">{o.result}</span>
                  <span className="block truncate font-sans text-[10.5px] text-text-muted">{o.resultUrl}</span>
                </span>
              </div>
            </div>

            {/* ── o funil ── */}
            <div className="mt-4 space-y-3 border-t border-line pt-4">
              {FUNNEL.map((f) => (
                <div key={f.k}>
                  <div className="flex items-baseline justify-between font-sans">
                    <span className="text-[12px] text-text-secondary">{f.k}</span>
                    <span className="stat-figure text-[15px]">{f.v}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${f.w}%`, background: "linear-gradient(90deg, var(--gold-bright), var(--gold-deep))" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
