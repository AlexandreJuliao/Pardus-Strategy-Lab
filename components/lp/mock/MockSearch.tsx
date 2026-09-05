import { Search, MapPin } from "lucide-react";

export default function MockSearch() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4 md:p-5">
      <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2">
        <Search size={13} className="text-text-muted" />
        <span className="font-sans text-[12.5px] text-text-primary">transporte de madeira bragança</span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[8px] border border-gold/40 bg-gold/[0.06] p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold font-display text-[10px] font-bold text-[#0a0a0a]">
              1
            </span>
            <span className="font-sans text-[10.5px] text-text-secondary">imporwood.pt</span>
          </div>
          <p className="mt-1.5 font-sans text-[13px] font-medium text-gold">
            Imporwood · Transporte florestal em Bragança
          </p>
          <p className="mt-1 font-sans text-[11px] leading-snug text-text-secondary">
            Rolaria, biomassa e cargas especiais. Da mata à serração em 48 horas, preço por tonelada…
          </p>
          <span className="mt-2 inline-flex items-center gap-1 font-sans text-[10.5px] text-text-muted">
            <MapPin size={10} /> Bragança · 34 viaturas · ★ 4,9
          </span>
        </div>

        {[70, 55].map((w, i) => (
          <div key={i} className="px-3 opacity-50">
            <span className="block h-1.5 w-24 rounded-full bg-white/[0.12]" />
            <span className="mt-2 block h-2 rounded-full bg-white/[0.1]" style={{ width: `${w}%` }} />
            <span className="mt-1.5 block h-1.5 rounded-full bg-white/[0.06]" style={{ width: `${w + 15}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
