import { Check } from "lucide-react";

/** Do orçamento à fatura paga, num só fio. */
const PASSOS = ["Orçamento", "Aprovado", "Fatura", "Pago"];

export default function MockInvoice() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] font-medium text-text-primary">Fatura #2041</span>
        <span className="rounded-full border border-[#5fd0a8]/40 bg-[#5fd0a8]/10 px-2 py-0.5 font-sans text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#5fd0a8]">
          Paga
        </span>
      </div>
      <div className="mt-3 rounded-[7px] border border-white/[0.06] bg-[#121a2b] p-3">
        <div className="flex items-baseline justify-between">
          <p className="font-sans text-[11px] text-text-secondary">Inês Quaresma · Loja, Lisboa</p>
          <p className="stat-figure text-[20px] leading-none">9.150 €</p>
        </div>
        <div className="mt-3 space-y-1.5 font-sans text-[10.5px] text-text-muted">
          <div className="flex justify-between">
            <span>Projeto e licenciamento</span>
            <span className="text-text-secondary">1.850 €</span>
          </div>
          <div className="flex justify-between">
            <span>Obra · fase 1</span>
            <span className="text-text-secondary">5.400 €</span>
          </div>
          <div className="flex justify-between">
            <span>Mobiliário</span>
            <span className="text-text-secondary">1.900 €</span>
          </div>
        </div>
      </div>
      <ol className="mt-3 flex items-center gap-1.5">
        {PASSOS.map((p, i) => (
          <li key={p} className="flex flex-1 items-center gap-1.5">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold text-[#0a0a0a]">
              <Check size={9} strokeWidth={3} />
            </span>
            <span className="truncate font-sans text-[9.5px] text-text-secondary">{p}</span>
            {i < PASSOS.length - 1 && <span className="ml-auto h-px w-2 bg-gold/50" aria-hidden />}
          </li>
        ))}
      </ol>
    </div>
  );
}
