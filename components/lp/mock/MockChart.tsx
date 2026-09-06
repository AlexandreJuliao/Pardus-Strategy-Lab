import { MessageSquare, User } from "lucide-react";

/**
 * A plataforma do cliente: as visitas e os pedidos em cima, os contactos que
 * entraram a seguir, e o sítio onde se pede uma alteração à equipa. É o que
 * distingue "entregámos um site" de "ficas com uma coisa a funcionar".
 */
const PTS = [8, 12, 10, 16, 15, 22, 20, 27, 26, 34, 31, 42];
const LEADS = [
  { n: "Miguel Antunes", w: "Sintra · T2 Family", s: "novo" },
  { n: "Rita Correia", w: "Óbidos · T1 Studio", s: "respondido" },
];

export default function MockChart() {
  const W = 320;
  const H = 96;
  const pad = 6;
  const max = Math.max(...PTS);
  const x = (i: number) => pad + (i * (W - pad * 2)) / (PTS.length - 1);
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);
  const line = PTS.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const area = `${line} L${x(PTS.length - 1)},${H} L${x(0)},${H} Z`;

  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      {/* separadores da plataforma */}
      <div className="flex items-center gap-4 border-b border-white/[0.06] pb-2.5">
        {["Painel", "Pedidos", "Alterações"].map((t, i) => (
          <span
            key={t}
            className={`font-sans text-[11px] ${
              i === 0 ? "border-b border-gold pb-2.5 text-gold" : "text-text-muted"
            }`}
            style={i === 0 ? { marginBottom: -11 } : undefined}
          >
            {t}
          </span>
        ))}
        <span className="ml-auto font-sans text-[10px] text-text-muted">aldurr.pt</span>
      </div>

      <div className="mt-3 flex items-start justify-between">
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

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-[86px] w-full">
        <defs>
          <linearGradient id="lpArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d4af60" stopOpacity="0.45" />
            <stop offset="1" stopColor="#d4af60" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lpArea)" />
        <path d={line} fill="none" stroke="#d4af60" strokeWidth="2" strokeLinejoin="round" />
        <circle cx={x(PTS.length - 1)} cy={y(PTS[PTS.length - 1])} r="4" fill="#d4af60" />
      </svg>

      {/* os contactos que entraram */}
      <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
        {LEADS.map((l) => (
          <div key={l.n} className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] text-text-secondary">
              <User size={11} />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-sans text-[11.5px] text-text-primary">{l.n}</span>
              <span className="block truncate font-sans text-[10px] text-text-muted">{l.w}</span>
            </span>
            <span
              className={`shrink-0 rounded-[3px] px-1.5 py-[3px] font-sans text-[9px] font-medium ${
                l.s === "novo" ? "bg-gold/15 text-gold" : "bg-white/[0.06] text-text-secondary"
              }`}
            >
              {l.s}
            </span>
          </div>
        ))}
      </div>

      {/* pedir uma alteração à equipa */}
      <div className="mt-3 flex items-center gap-2 rounded-[6px] border border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <MessageSquare size={12} className="shrink-0 text-gold" />
        <span className="font-sans text-[11px] text-text-secondary">
          Trocar a foto da página inicial
        </span>
        <span className="ml-auto shrink-0 font-sans text-[10px] text-text-muted">enviar</span>
      </div>
    </div>
  );
}
