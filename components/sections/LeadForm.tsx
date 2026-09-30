"use client";

import { motion } from "framer-motion";
import { Check, Search, Map, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import LeadFormCard from "@/components/sections/LeadFormCard";

const ICONES = { lupa: Search, mapa: Map, mao: HeartHandshake } as const;

export type PassoConversa = { icon: keyof typeof ICONES; title: string; desc: string };

const STEPS: PassoConversa[] = [
  {
    icon: "lupa",
    title: "Olhamos para o teu negócio",
    desc: "Percebemos como trabalhas hoje e onde se está a perder tempo, dinheiro ou clientes.",
  },
  {
    icon: "mapa",
    title: "Dizemos-te o que faz sentido",
    desc: "Onde a inteligência artificial pode automatizar trabalho, e o que muda com um site, uma loja ou um assistente.",
  },
  {
    icon: "mao",
    title: "Sem compromisso",
    desc: "Sais com um caminho claro na mão, avancemos juntos ou não. A conversa é tua para levar.",
  },
];

export default function LeadForm({
  origem = "Homepage",
  label = "Consultoria gratuita",
  title = (
    <>
      Meia hora que pode mudar
      <br />o teu <span className="text-gold">próximo ano</span>
    </>
  ),
  intro = "Marca uma conversa connosco, sem custo nenhum. Olhamos para o teu negócio e dizemos-te com honestidade o que faz sentido, e o que não faz.",
  formTitle = "Marcar a minha consultoria",
  promessa = "consultoria gratuita",
  cta = "Quero a consultoria gratuita",
  negocioPlaceholder = "Ex.: Clínica Sorriso, Imobiliária Horizonte…",
  thanksPath,
  steps = STEPS,
}: {
  /** Vai no evento Lead (content_name) e na coluna "origem" da folha */
  origem?: string;
  label?: string;
  title?: React.ReactNode;
  intro?: string;
  formTitle?: string;
  /** o que se promete marcar depois de enviar: "para marcar a tua ___" */
  promessa?: string;
  cta?: string;
  negocioPlaceholder?: string;
  /**
   * Para onde ir depois de enviar. Por omissão descobre-se do caminho: numa
   * landing page servida em /<vertical> o obrigado é o dela, no resto do site
   * é o /obrigado normal.
   */
  thanksPath?: string;
  steps?: PassoConversa[];
} = {}) {
  return (
    <section
      id="consultoria"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-bg-2/50 section-pad"
    >
      <AuroraGlow variant="cta" />
      <div className="shell relative z-10 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* the offer */}
        <div>
          <SectionHeader
            label={label}
            title={title}
            intro={intro}
          />

          <div className="mt-10 space-y-6">
            {steps.map((s, i) => {
              const Icon = ICONES[s.icon];
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-medium text-text-primary">
                      {s.title}
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
            {["Sem custo", "Sem compromisso", "Resposta em 24h"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check size={14} strokeWidth={2.6} className="text-gold" />
                <span className="font-sans text-[13.5px] text-text-secondary">{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* the form */}
        <LeadFormCard
          origem={origem}
          formTitle={formTitle}
          promessa={promessa}
          cta={cta}
          negocioPlaceholder={negocioPlaceholder}
          thanksPath={thanksPath}
        />
      </div>
    </section>
  );
}
