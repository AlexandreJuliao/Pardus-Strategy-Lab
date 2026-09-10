/** Perfis por função: quem vê o quê. Os interruptores dizem tudo. */
const MODULOS = ["Pedidos", "Agenda", "Obras", "Faturação", "Números"];
const PERFIS: { nome: string; quem: string; ve: boolean[] }[] = [
  { nome: "Gestão", quem: "Julian, Tomás", ve: [true, true, true, true, true] },
  { nome: "Equipa de rua", quem: "Rita, Pedro, +3", ve: [true, true, true, false, false] },
  { nome: "Contabilidade", quem: "gabinete externo", ve: [false, false, false, true, true] },
];

export default function MockAccess() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="grid grid-cols-[1.3fr_repeat(5,1fr)] items-end gap-2 border-b border-white/[0.06] pb-2">
        <span className="font-sans text-[12px] font-medium text-text-primary">Acessos</span>
        {MODULOS.map((m) => (
          <span
            key={m}
            className="truncate text-center font-sans text-[9px] uppercase tracking-[0.1em] text-text-muted"
          >
            {m}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        {PERFIS.map((p) => (
          <div
            key={p.nome}
            className="grid grid-cols-[1.3fr_repeat(5,1fr)] items-center gap-2 rounded-[6px] bg-white/[0.025] px-2 py-2"
          >
            <div className="min-w-0">
              <p className="truncate font-sans text-[11px] font-medium text-text-primary">{p.nome}</p>
              <p className="truncate font-sans text-[9.5px] text-text-muted">{p.quem}</p>
            </div>
            {p.ve.map((on, i) => (
              <span key={i} className="flex justify-center">
                <span
                  className={`relative h-3.5 w-6 rounded-full transition-colors ${on ? "bg-gold" : "bg-white/[0.08]"}`}
                >
                  <i
                    className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-[#0a0a0a] transition-transform ${on ? "translate-x-3" : "translate-x-0.5 bg-white/40"}`}
                  />
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
