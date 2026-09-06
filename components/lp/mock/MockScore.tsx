const GAUGES = [
  { label: "Desempenho", v: 98 },
  { label: "Acessibil.", v: 100 },
  { label: "Práticas", v: 100 },
  { label: "SEO", v: 100 },
];

/** Barras de comparação: o que interessa não é a nota, é o tempo até abrir. */
const RACE = [
  { label: "O teu site", t: "1,2 s", pct: 20, ours: true },
  { label: "Média do setor", t: "6,1 s", pct: 100, ours: false },
];

function Gauge({ v, label }: { v: number; label: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[54px] w-[54px]">
        <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
          <circle cx="28" cy="28" r={r} fill="rgba(212,175,96,0.07)" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
          <circle
            cx="28"
            cy="28"
            r={r}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - v / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[16px] font-semibold text-gold">
          {v}
        </span>
      </div>
      <span className="font-sans text-[9.5px] tracking-wide text-text-muted">{label}</span>
    </div>
  );
}

export default function MockScore() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[11px] text-text-secondary">Google PageSpeed · telemóvel</span>
        <span className="rounded-full border border-gold/30 bg-gold/[0.07] px-2 py-[3px] font-sans text-[9.5px] font-medium text-gold">
          aprovado
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1">
        {GAUGES.map((g) => (
          <Gauge key={g.label} {...g} />
        ))}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-4">
        {RACE.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between font-sans">
              <span className={`text-[11px] ${r.ours ? "text-text-primary" : "text-text-muted"}`}>{r.label}</span>
              <span className={`text-[11.5px] font-semibold ${r.ours ? "text-gold" : "text-text-muted"}`}>{r.t}</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  background: r.ours
                    ? "linear-gradient(90deg, var(--gold-bright), var(--gold))"
                    : "rgba(255,255,255,0.14)",
                }}
              />
            </div>
          </div>
        ))}
        <p className="pt-1 font-sans text-[10px] leading-snug text-text-muted">
          Metade das pessoas desiste de uma página que demora mais de 3 segundos.
        </p>
      </div>
    </div>
  );
}
