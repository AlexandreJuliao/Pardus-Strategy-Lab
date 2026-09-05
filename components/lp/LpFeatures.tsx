import { FileText, Globe, ShieldCheck, Zap, LineChart, Phone, type LucideIcon } from "lucide-react";
import type { Vertical } from "@/lib/verticals";

const ICONS: Record<Vertical["features"][number]["icon"], LucideIcon> = {
  text: FileText,
  globe: Globe,
  shield: ShieldCheck,
  zap: Zap,
  chart: LineChart,
  phone: Phone,
};

/**
 * O que vem incluído: uma lista com réguas, não três caixas iguais. O título
 * à esquerda fixa o assunto; cada linha é um item com o ícone a abrir.
 */
export default function LpFeatures({ v }: { v: Vertical }) {
  return (
    <section className="relative border-y border-line bg-bg-2/40">
      <div className="shell grid grid-cols-1 gap-10 py-14 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="block h-px w-10 bg-gold/50" />
          <h2 className="text-h2 mt-6 text-text-primary [text-wrap:balance]">
            Incluído em <span className="accent-serif text-gold">todos</span> os sites
          </h2>
          <p className="hero-sub mt-5 max-w-md text-[clamp(15px,1.4vw,18px)]">
            Sem extras escondidos na fatura. Isto vem de origem, seja qual for o plano.
          </p>
        </div>

        <ul className="divide-y divide-line border-t border-line">
          {v.features.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <li key={f.title} className="grid grid-cols-[44px_1fr] gap-5 py-6 first:pt-0 lg:first:pt-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                  <Icon size={19} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="font-display text-[19px] font-semibold text-text-primary">{f.title}</h3>
                  <p className="mt-1.5 max-w-xl font-sans text-[14.5px] leading-relaxed text-text-secondary">{f.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
