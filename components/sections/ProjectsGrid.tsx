"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  name: string;
  category: "IA & Automação" | "Websites" | "E-commerce" | "Apps";
  description: string;
  tags: string[];
  image: string;
  metric: string;
}

const PROJECTS: Project[] = [
  {
    name: "Website imersivo para arquitetura de autor",
    category: "Websites",
    description: "Site multilíngue e imersivo, com experiência 3D, para uma marca de arquitetura e construção de casas contemporâneas à medida. Pensado para encantar e transformar visitas em contactos.",
    tags: ["Website 3D", "Multilíngue", "Captação de contactos"],
    image: "/img/cases/case-arquitetura.jpg",
    metric: "Multilíngue · 3D",
  },
  {
    name: "Central de contactos com assistente inteligente",
    category: "IA & Automação",
    description: "Para a mesma marca de arquitetura: um sistema que junta o registo de clientes e as conversas de todas as plataformas — email, Instagram, Facebook e WhatsApp — num só lugar, com um assistente que responde e encaminha cada contacto para o sítio certo.",
    tags: ["Tudo num só lugar", "Assistente IA", "Multicanal"],
    image: "/img/cases/case-leads-inbox.jpg",
    metric: "Conversas num só lugar",
  },
  {
    name: "Loja online de bem-estar e emagrecimento",
    category: "E-commerce",
    description: "Loja completa para uma marca de suplementos e emagrecimento, com o sistema interno de gestão de produtos, encomendas e operação do negócio — tudo ligado.",
    tags: ["Loja online", "Gestão de produto", "Sistema interno"],
    image: "/img/cases/case-ecommerce.jpg",
    metric: "Loja + gestão",
  },
  {
    name: "Plataforma de gestão para uma agência",
    category: "Apps",
    description: "Plataforma completa de gestão para uma agência criativa: tarefas, equipa, finanças, contabilidade, projetos e uma agenda com gestão de horas por pessoa — tudo reunido numa só app.",
    tags: ["App de gestão", "Equipa & finanças", "Agenda própria"],
    image: "/img/cases/case-pardus-os.jpg",
    metric: "Toda a operação numa app",
  },
  {
    name: "Assistente que marca consultas sozinho",
    category: "IA & Automação",
    description: "Para uma profissional de nutrição: um assistente que conversa com quem chega, tira dúvidas e marca as consultas automaticamente, sem ninguém ter de estar sempre a responder.",
    tags: ["Chatbot", "Agendamento automático", "Saúde"],
    image: "/img/cases/case-nutri.jpg",
    metric: "Marcações automáticas",
  },
];

const FILTERS = ["Todos", "IA & Automação", "Websites", "E-commerce", "Apps"] as const;

export default function ProjectsGrid({ showFilters = true }: { showFilters?: boolean }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("Todos");
  const visible = PROJECTS.filter((p) => active === "Todos" || p.category === active);

  return (
    <div className="shell">
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 font-sans text-sm transition-all duration-200 ease-premium ${
                  isActive
                    ? "bg-gold text-[#0a0a0a]"
                    : "border border-line text-text-secondary hover:border-gold/40 hover:text-text-primary"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.article
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="spotlight-card group overflow-hidden rounded-[6px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]"
            >
              <span className="spotlight-glow" aria-hidden />
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                  {p.category}
                </span>
                <span className="absolute bottom-4 right-4 rounded-[4px] border border-gold/30 bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-gold backdrop-blur-sm">
                  {p.metric}
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-gold/50 bg-bg/70 px-4 py-2 font-mono text-sm text-gold">
                    Ver projeto <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {p.name}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-text-muted">
          Em breve. Novos projetos a caminho.
        </p>
      )}

      {!showFilters && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-1.5 mono-label text-text-secondary transition-colors hover:text-gold"
          >
            Ver todos os projetos
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
