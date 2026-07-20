"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";

const ROWS: { n: string; title: string; items: string[] }[] = [
  { n: "01", title: "Sistemas de IA", items: ["Assistentes que agem sozinhos", "Automação de tarefas repetitivas", "Ligação ao ChatGPT e Claude", "Organização da tua informação", "Painel para acompanhares tudo"] },
  { n: "02", title: "Websites", items: ["Design feito à medida", "Site rápido e moderno", "Preparado para o Google", "Editas o conteúdo sozinho", "Abre depressa no telemóvel"] },
  { n: "03", title: "E-commerce", items: ["Gestão de produtos", "Pagamentos por cartão e MB Way", "Painel de administração", "Ligação ao teu stock", "Emails automáticos de encomenda"] },
  { n: "04", title: "Chatbots & Automações", items: ["Assistente no WhatsApp e site", "Percebe quem quer comprar", "Regista tudo nos teus clientes", "Trata dos pedidos comuns", "Relatórios das conversas"] },
  { n: "05", title: "Apps Empresariais", items: ["Gestão de clientes à medida", "Painéis com os teus números", "Portais para equipa e clientes", "Ligação ao que já usas", "Acessos e permissões"] },
  { n: "06", title: "Consultoria em IA", items: ["Análise de como trabalhas", "Plano por prioridades", "Escolha das ferramentas", "Acompanhamento", "Formação da equipa"] },
];

function Items({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it}
          className="rounded-[4px] border border-line bg-white/[0.02] px-2.5 py-1.5 font-mono text-[11.5px] text-text-secondary"
        >
          {it}
        </span>
      ))}
    </div>
  );
}

export default function Capabilities() {
  // Mobile-only accordion: first row open so the pattern reads at a glance.
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-bg-2/50 pb-[clamp(72px,11vw,160px)] pt-[clamp(44px,6vw,88px)]">
      <AuroraGlow variant="capabilities" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Capacidades"
          title={<>Tudo o que entregamos</>}
          intro="O que está incluído em cada frente de trabalho, sem letra pequena."
        />

        <div className="mt-12 overflow-hidden rounded-[6px] border border-line">
          {ROWS.map((row, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={row.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="spotlight-card group border-b border-line bg-surface/40 transition-colors duration-300 last:border-b-0 hover:bg-surface md:grid md:grid-cols-[auto_1fr_2fr] md:items-center md:gap-8 md:p-7"
              >
                <span className="spotlight-glow" aria-hidden />

                {/* Header — a tap target on mobile, static columns on desktop */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="relative z-10 flex w-full items-center gap-4 p-6 text-left md:contents md:cursor-default md:p-0"
                >
                  <span className="font-mono text-sm text-gold/50 transition-all duration-300 group-hover:text-gold">
                    {row.n}
                  </span>
                  <h3 className="flex-1 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-gold">
                    {row.title}
                  </h3>
                  <span className="flex items-center gap-2 md:hidden">
                    <span className="font-mono text-[11px] text-text-muted">
                      {isOpen ? "" : `${row.items.length} inclusões`}
                    </span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-gold transition-transform duration-300 ease-premium ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                {/* Items — collapse on mobile, always shown on desktop */}
                <div
                  className={`relative z-10 grid transition-[grid-template-rows] duration-300 ease-premium md:block ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]"
                  }`}
                >
                  <div className="overflow-hidden md:overflow-visible">
                    <div className="px-6 pb-6 pt-0 md:p-0">
                      <Items items={row.items} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
