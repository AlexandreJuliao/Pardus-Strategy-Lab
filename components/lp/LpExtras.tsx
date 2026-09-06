import { ArrowUpRight, Bot, Inbox, Workflow, ShoppingBag, Wrench, type LucideIcon } from "lucide-react";
import Reveal from "@/components/lp/Reveal";
import { ROOT_DOMAIN } from "@/lib/verticals";
import type { Vertical } from "@/lib/verticals";

const ICONS: Record<Vertical["extras"]["items"][number]["icon"], LucideIcon> = {
  bot: Bot,
  inbox: Inbox,
  workflow: Workflow,
  shop: ShoppingBag,
  care: Wrench,
};

/**
 * Banda petrol, calma: o que se pode juntar ao site mais tarde. É um aparte,
 * não uma venda; por isso fica em lista curta, sem preços, com um só link
 * para o site principal.
 */
export default function LpExtras({ v }: { v: Vertical }) {
  const x = v.extras;
  return (
    <section className="relative overflow-hidden text-text-primary">
      {/* É o próprio fundo que se desvanece nas pontas. Antes havia duas faixas
          escuras por cima do petrol, e isso lia-se como uma banda suja em vez
          de uma passagem. */}
      <div
        className="section-petrol pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)",
        }}
        aria-hidden
      />
      <div className="grain-section" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(58% 70% at 100% 12%, rgba(212,175,96,0.12), transparent 62%)" }}
        aria-hidden
      />
      <div className="shell relative z-10 grid grid-cols-1 gap-10 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <span className="block h-px w-10 bg-gold/70" />
          <h2 className="text-h2 mt-6 [text-wrap:balance]">
            {x.pre} <span className="accent-serif text-gold">{x.accent}</span>
          </h2>
          <p className="mt-5 max-w-md font-sans text-[clamp(15px,1.4vw,18px)] leading-relaxed text-[#c8d4e6]">{x.intro}</p>
          <a
            href={`https://${ROOT_DOMAIN}/servicos`}
            className="group mt-7 inline-flex items-center gap-1.5 font-sans text-[14px] text-gold underline-offset-[6px] hover:underline"
          >
            Ver tudo o que fazemos
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {x.items.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <Reveal tag="li" key={it.title} delay={i * 0.09} className="flex items-start gap-4 border-t border-white/[0.12] py-5">
                <span className="mt-0.5 text-gold">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div>
                  <p className="font-display text-[17px] font-semibold text-text-primary">{it.title}</p>
                  <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-[#b9c6da]">{it.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
