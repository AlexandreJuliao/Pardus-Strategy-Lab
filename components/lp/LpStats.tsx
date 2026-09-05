import Reveal from "@/components/lp/Reveal";

/**
 * Barra de confiança. Os números são o herói: algarismos de largura fixa em
 * dourado com um degradê ao longo do número, separados por réguas verticais.
 * Em branco chapado liam-se como uma tabela; assim leem-se como marca.
 */
export default function LpStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="relative -mt-px border-y border-line bg-bg-2/60">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 140% at 50% 0%, rgba(212,175,96,0.07), transparent 62%)" }}
      />
      <div className="shell relative grid grid-cols-2 gap-y-9 py-11 md:grid-cols-4 md:py-14">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className={`px-1 text-center md:px-7 md:text-left ${
              i % 2 === 1 ? "border-l border-line md:border-l" : ""
            } ${i === 0 ? "md:border-l-0" : "md:border-l"}`}
          >
            <p className="stat-figure text-[clamp(30px,3.4vw,46px)] leading-none">{s.value}</p>
            <p className="mx-auto mt-2.5 max-w-[22ch] font-sans text-[13px] leading-snug text-text-secondary md:mx-0">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
