import { Check, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";
import Reveal from "@/components/lp/Reveal";
import type { Vertical } from "@/lib/verticals";

/** Só nas verticais de produto. "desde" = chão; o preço fecha-se na conversa. */
export default function LpPricing({ v }: { v: Vertical }) {
  const p = v.pricing;
  if (!p) return null;
  return (
    <section
      id="investimento"
      className="seam-top seam-bottom relative overflow-hidden scroll-mt-24 section-pad"
    >
      <AuroraGlow variant="pricing" />
      <div className="shell relative z-10">
        <SectionHeader
          title={<>Preços claros, <span className="accent-serif text-gold">sem letra pequena.</span></>}
          intro={p.intro}
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {p.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.12} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[12px] border p-7 md:p-8 ${
                  plan.featured ? "border-gold/50 bg-surface gold-glow" : "border-line bg-surface/60"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]">
                    Mais escolhido
                  </span>
                )}
                <p className="font-display text-xl font-semibold text-text-primary">{plan.name}</p>
                <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-text-secondary">{plan.desc}</p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="mono-tiny text-text-muted">desde</span>
                  <span className="stat-figure text-[40px] leading-none">{plan.price}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 font-sans text-[14px] text-text-secondary">
                      <Check size={15} strokeWidth={2.6} className="mt-0.5 shrink-0 text-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <CtaButton variant={plan.featured ? "primary" : "outline"} size="md" className="w-full">
                    Começar com {plan.name.toLowerCase()} <ArrowRight size={15} />
                  </CtaButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-[14px] leading-relaxed text-text-secondary">
          {p.note}
        </p>
      </div>
    </section>
  );
}
