"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TIERS: {
  range: string;
  name: string;
  desc: string;
  items: string[];
  featured?: boolean;
}[] = [
  {
    range: "desde 399,90€",
    name: "Arranque",
    desc: "Páginas simples, automações pontuais e primeiros testes.",
    items: ["Página de alta conversão", "Uma automação à medida", "Chatbot simples pronto a usar"],
  },
  {
    range: "400 – 2.000€",
    name: "Crescimento",
    desc: "Sites completos, lojas online e primeiros sistemas de inteligência artificial.",
    items: ["Site ou loja completa", "Assistente de IA / chatbot avançado", "Ligações e edição de conteúdo", "Preparado para o Google"],
    featured: true,
  },
  {
    range: "2.000 – 5.000€",
    name: "Escala",
    desc: "Programas de gestão à medida, com várias ligações e sistemas.",
    items: ["Programa de gestão à medida", "Painéis de gestão", "Organização de dados", "Suporte contínuo"],
  },
  {
    range: "5.000€ +",
    name: "Plataforma",
    desc: "Sistemas completos, inteligência artificial no centro do negócio e parceria de longo prazo.",
    items: ["Vários sistemas ligados", "Equipa dedicada", "Consultoria estratégica", "Evolução contínua"],
  },
];

export default function Pricing() {
  return (
    <section id="investimento" className="relative section-pad">
      <AuroraGlow variant="pricing" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Investimento"
          title={<>Transparência desde o início</>}
          intro="Cada projeto é único, mas o orçamento não tem de ser um mistério. Faixas reais, definidas em conjunto."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TIERS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className={`spotlight-card group relative flex flex-col rounded-[6px] border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                t.featured
                  ? "border-gold/50 bg-surface gold-glow glow-pulse"
                  : "border-line bg-surface/60 hover:border-gold/30"
              }`}
            >
              <span className="spotlight-glow" aria-hidden />
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]">
                  Mais comum
                </span>
              )}
              <p className="mono-tiny text-text-muted">{t.name}</p>
              <p className="mt-3 font-display text-2xl font-bold text-gold">{t.range}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
                {t.desc}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {t.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-gold" />
                    <span className="font-sans text-[13.5px] text-text-secondary">{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 rounded-[8px] border border-line bg-surface/50 p-7 text-center"
        >
          <p className="font-sans text-[15px] leading-relaxed text-text-secondary">
            Estes valores são apenas uma referência. Antes de falarmos de
            números, fazemos sempre uma primeira reunião de consultoria —{" "}
            <span className="text-gold">gratuita</span> — para perceber o que o
            teu negócio precisa mesmo.
          </p>
          <CtaButton size="md">Marcar consultoria gratuita</CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
