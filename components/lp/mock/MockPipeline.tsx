/**
 * Pedidos em colunas: cada contacto tem dono e etapa. Um cartão anda de
 * coluna (em CSS) para se ver que isto mexe.
 */
const COLS = [
  {
    t: "Novos",
    cards: [
      { n: "Sofia Carreira", v: "8.400 €", d: "Rita" },
      { n: "Tiago Fonseca", v: "12.700 €", d: "—" },
    ],
  },
  { t: "Em orçamento", cards: [{ n: "Nuno Baltazar", v: "5.900 €", d: "Pedro" }] },
  {
    t: "Adjudicados",
    cards: [
      { n: "Inês Quaresma", v: "9.150 €", d: "Rita" },
      { n: "Marta Eanes", v: "3.200 €", d: "Pedro" },
    ],
  },
];

export default function MockPipeline() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] font-medium text-text-primary">Pedidos · esta semana</span>
        <span className="font-sans text-[10.5px] text-text-muted">
          <span className="text-gold">14</span> entraram · <span className="text-gold">6</span> fechados
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {COLS.map((c, ci) => (
          <div key={c.t} className="rounded-[7px] bg-white/[0.025] p-2">
            <p className="mb-2 font-sans text-[9.5px] uppercase tracking-[0.12em] text-text-muted">{c.t}</p>
            <div className="space-y-2">
              {c.cards.map((k, ki) => (
                <div
                  key={k.n}
                  className={`rounded-[6px] border px-2.5 py-2 ${ci === 1 && ki === 0 ? "border-gold/40 bg-gold/[0.06]" : "border-white/[0.06] bg-[#121a2b]"}`}
                >
                  <p className="truncate font-sans text-[11px] font-medium text-text-primary">{k.n}</p>
                  <div className="mt-1 flex items-center justify-between font-sans text-[10px] text-text-muted">
                    <span>{k.v}</span>
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/[0.08] text-[8px] text-text-secondary">
                      {k.d[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
