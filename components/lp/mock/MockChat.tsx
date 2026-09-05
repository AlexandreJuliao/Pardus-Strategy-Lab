import { MessageCircle } from "lucide-react";

const MSGS = [
  { who: "them", text: "Bom dia, fazem cargas para Aveiro?" },
  { who: "us", text: "Bom dia. Fazemos. Quantas toneladas e onde carregamos?" },
  { who: "them", text: "22 t de eucalipto, parque de Vinhais." },
] as const;

export default function MockChat() {
  return (
    <div className="rounded-[10px] border border-white/[0.07] bg-[#0b0f1a] p-4">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
          <MessageCircle size={14} />
        </span>
        <div className="leading-tight">
          <p className="font-sans text-[12px] font-medium text-text-primary">WhatsApp · Imporwood</p>
          <p className="font-sans text-[10px] text-[#5fd0a8]">online</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {MSGS.map((m, i) => (
          <div key={i} className={`flex ${m.who === "us" ? "justify-end" : "justify-start"}`}>
            <span
              className={`max-w-[85%] rounded-[12px] px-3 py-2 font-sans text-[11.5px] leading-snug ${
                m.who === "us"
                  ? "rounded-br-[3px] bg-gold text-[#0a0a0a]"
                  : "rounded-bl-[3px] border border-white/[0.08] bg-white/[0.03] text-text-primary"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
