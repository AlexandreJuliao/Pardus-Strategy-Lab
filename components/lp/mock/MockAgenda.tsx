/** Uma semana de agenda, com os blocos a sair dos próprios pedidos. */
const DIAS = ["seg", "ter", "qua", "qui", "sex"];
const BLOCOS: { d: number; top: number; h: number; t: string; tone?: "gold" }[] = [
  { d: 0, top: 10, h: 26, t: "Visita · Sofia C." },
  { d: 1, top: 40, h: 22, t: "Obra · Oeiras" },
  { d: 2, top: 18, h: 30, t: "Reunião · Tiago F.", tone: "gold" },
  { d: 3, top: 6, h: 20, t: "Medição · Cascais" },
  { d: 3, top: 52, h: 24, t: "Entrega · Loja" },
  { d: 4, top: 30, h: 26, t: "Obra · Sintra" },
];

export default function MockAgenda() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] font-medium text-text-primary">Agenda · 8 a 12 set</span>
        <span className="font-sans text-[10.5px] text-text-muted">lembretes automáticos</span>
      </div>
      <div className="mt-3 grid h-[150px] grid-cols-5 gap-1.5">
        {DIAS.map((dia, i) => (
          <div key={dia} className={`relative rounded-[6px] ${i === 2 ? "bg-gold/[0.05]" : "bg-white/[0.025]"}`}>
            <p
              className={`px-1.5 pt-1.5 font-sans text-[9px] uppercase tracking-[0.1em] ${i === 2 ? "text-gold" : "text-text-muted"}`}
            >
              {dia}
            </p>
            {BLOCOS.filter((b) => b.d === i).map((b) => (
              <div
                key={b.t}
                className={`absolute inset-x-1 rounded-[4px] border px-1.5 py-1 font-sans text-[9px] leading-tight ${
                  b.tone === "gold"
                    ? "border-gold/40 bg-gold/[0.12] text-gold"
                    : "border-white/[0.06] bg-[#121a2b] text-text-secondary"
                }`}
                style={{ top: `${20 + b.top}%`, height: `${b.h}%` }}
              >
                {b.t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
