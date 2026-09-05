export default function MockChart() {
  // visitas (área) + pedidos (pontos) — só forma, nada de dados reais
  const pts = [8, 12, 10, 16, 15, 22, 20, 27, 26, 34, 31, 42];
  const W = 320, H = 120, pad = 6;
  const max = Math.max(...pts);
  const x = (i: number) => pad + (i * (W - pad * 2)) / (pts.length - 1);
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(pts.length - 1)},${H} L${x(0)},${H} Z`;

  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-sans text-[11px] text-text-secondary">Pedidos de contacto · 30 dias</p>
          <p className="mt-0.5 font-display text-[22px] font-semibold text-text-primary">
            47 <span className="font-sans text-[12px] font-medium text-[#5fd0a8]">+38%</span>
          </p>
        </div>
        <span className="rounded-[4px] border border-white/[0.08] px-2 py-1 font-sans text-[10px] text-text-secondary">
          Este mês
        </span>
      </div>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[110px] w-full">
          <defs>
            <linearGradient id="lpArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d4af60" stopOpacity="0.45" />
              <stop offset="1" stopColor="#d4af60" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#lpArea)" />
          <path d={line} fill="none" stroke="#d4af60" strokeWidth="2" strokeLinejoin="round" />
          <circle cx={x(pts.length - 1)} cy={y(pts[pts.length - 1])} r="4" fill="#d4af60" />
        </svg>
        <span className="absolute right-0 top-0 -translate-y-1 rounded-[6px] bg-[#111624] px-2.5 py-1.5 font-sans text-[11px] font-medium text-text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08]">
          +12 esta semana
        </span>
      </div>
      <div className="mt-2 flex justify-between font-sans text-[10px] text-text-muted">
        <span>1 – 10</span><span>11 – 20</span><span>21 – 30</span>
      </div>
    </div>
  );
}
