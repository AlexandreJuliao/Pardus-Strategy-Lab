import SectionHeader from "@/components/ui/SectionHeader";
import type { Vertical } from "@/lib/verticals";

/**
 * Três passos numa linha do tempo: os números ligados por uma régua, o
 * prazo de cada passo à vista. É uma sequência a sério, por isso os
 * números têm razão de existir aqui.
 */
export default function LpProcess({ v }: { v: Vertical }) {
  return (
    <section className="relative section-pad">
      <div className="shell">
        <SectionHeader
          title={<>Como <span className="accent-serif text-gold">funciona</span></>}
          intro="Três passos, com o preço fechado logo no primeiro."
        />

        <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* a régua que liga os passos */}
          <span className="pointer-events-none absolute left-[22px] top-0 hidden h-full w-px bg-gradient-to-b from-gold/50 via-line to-transparent md:left-0 md:top-[22px] md:h-px md:w-full md:bg-gradient-to-r" aria-hidden />
          {v.process.map((p, i) => (
            <li key={p.title} className="relative pl-16 md:pl-0 md:pt-16">
              <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-bg font-display text-[15px] font-semibold text-gold">
                {i + 1}
              </span>
              <span className="mono-tiny text-text-muted">{p.when}</span>
              <h3 className="mt-2 font-display text-[21px] font-semibold text-text-primary">{p.title}</h3>
              <p className="mt-2 max-w-sm font-sans text-[14.5px] leading-relaxed text-text-secondary">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
