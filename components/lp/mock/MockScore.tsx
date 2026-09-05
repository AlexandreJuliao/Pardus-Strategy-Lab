const BARS = [
  { label: "Velocidade", v: 98 },
  { label: "Acessibilidade", v: 100 },
  { label: "SEO", v: 100 },
];

export default function MockScore() {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5 rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="#5fd0a8"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - 0.98)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[26px] font-bold text-text-primary">
          98
        </span>
      </div>
      <div className="flex-1 space-y-2.5">
        {BARS.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between font-sans text-[10.5px] text-text-secondary">
              <span>{b.label}</span>
              <span className="text-text-primary">{b.v}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-[#5fd0a8]" style={{ width: `${b.v}%` }} />
            </div>
          </div>
        ))}
        <p className="pt-1 font-sans text-[10px] text-text-muted">Google PageSpeed · telemóvel</p>
      </div>
    </div>
  );
}
