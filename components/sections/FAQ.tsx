"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const QA: { q: string; a: string }[] = [
  {
    q: "Quanto tempo demora um projeto?",
    a: "Depende do tamanho. Uma página simples ou uma automação pode levar 1–2 semanas; um site ou chatbot, 3–6 semanas; um programa de gestão, 2–4 meses. Trabalhamos por etapas, com entregas frequentes, por isso vês progresso real desde cedo.",
  },
  {
    q: "Trabalham com empresas fora de Portugal?",
    a: "Sim. Somos de Lisboa, mas trabalhamos remotamente com clientes em qualquer geografia. Comunicamos em português ou inglês e adaptamo-nos ao teu fuso e ferramentas.",
  },
  {
    q: "Ficamos presos à vossa tecnologia?",
    a: "Não. Usamos ferramentas conhecidas e abertas, e entregamos tudo em teu nome — o site, os sistemas e os acessos são teus. Se um dia quiseres continuar com outra equipa, podes, sem ficar dependente de nós.",
  },
  {
    q: "O que diferencia a IA da Pardus?",
    a: "Para nós, a inteligência artificial não é uma moda — é uma ferramenta. Criamos assistentes e automações que resolvem problemas concretos — responder a clientes, tratar de pedidos, organizar informação — e medimos o impacto real no teu negócio.",
  },
  {
    q: "Dão suporte depois do lançamento?",
    a: "Sim. O lançamento é uma etapa, não o fim. Oferecemos formação à equipa, suporte pós-lançamento e planos de evolução contínua para o sistema crescer com o negócio.",
  },
  {
    q: "Como começamos?",
    a: "Conta-nos o projeto pelo formulário de contacto ou por email. Respondemos em menos de 24h e marcamos uma conversa de descoberta — sem compromisso — para mapear objetivos e propor um caminho.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative section-pad">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            label="// FAQ"
            title={<>Perguntas frequentes</>}
            intro="O que precisas de saber antes de começarmos."
          />

          <div className="flex flex-col">
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-[17px] font-medium transition-colors ${
                        isOpen ? "text-gold" : "text-text-primary"
                      }`}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-gold transition-transform duration-300 ease-premium ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 font-sans text-[15px] leading-relaxed text-text-secondary">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
