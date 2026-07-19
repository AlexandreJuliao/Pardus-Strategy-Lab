"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const FACTS: [string, string][] = [
  ["Onde estamos", "Lisboa, Portugal"],
  ["O que fazemos", "IA · Web · Automação"],
  ["Como começamos", "Consultoria gratuita"],
];

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden section-pad">
      <AuroraGlow variant="manifesto" />
      <div className="shell relative z-10">
        {/* statement + lead */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="mb-5 block h-px w-10 bg-gold/50" />
            <h2 className="text-h2 text-text-primary [text-wrap:balance]">
              Tecnologia com pés e <span className="accent-serif text-gold">cabeça</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="hero-sub max-w-xl text-[clamp(16px,1.5vw,20px)]"
          >
            A Pardus nasceu em Lisboa com uma ideia simples: a tecnologia só
            vale quando resolve alguma coisa.
          </motion.p>
        </div>

        {/* wide cinematic band */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 aspect-[16/7] overflow-hidden rounded-[10px] border border-line"
        >
          <Image
            src="/img/about-tech.jpg"
            alt="Núcleo de dados a ganhar vida: partículas douradas e circuitos que convergem"
            fill
            sizes="(max-width: 1024px) 100vw, 1320px"
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/40" />
          <div className="absolute bottom-5 left-6 flex items-center gap-3">
            <span className="h-px w-6 bg-gold" />
            <span className="mono-tiny text-text-primary">Pardus · Lisboa</span>
          </div>
        </motion.div>

        {/* the story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14"
        >
          <p className="font-sans text-[16px] leading-relaxed text-text-secondary [text-wrap:pretty]">
            Por isso começamos sempre pelo teu negócio: o que te tira tempo, o
            que te faz perder clientes, o que te tira o sono. Só depois falamos
            de sites, de inteligência artificial ou de automação. Às vezes a
            resposta é simples. Às vezes nem precisas de nós para já, e
            dizemos-te à mesma.
          </p>
          <p className="font-sans text-[16px] leading-relaxed text-text-secondary [text-wrap:pretty]">
            Construímos também as nossas próprias ferramentas e usamo-las todos
            os dias para gerir a agência. É isso que nos ensina o que funciona
            de verdade, e é isso que levamos connosco para cada projeto que
            fazemos.
          </p>
        </motion.div>

        {/* facts + cta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-line pt-8 md:flex-row md:items-center"
        >
          <div className="flex flex-wrap gap-x-12 gap-y-5">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <p className="mono-tiny text-text-muted">{k}</p>
                <p className="mt-1.5 font-sans text-[15px] text-text-primary">{v}</p>
              </div>
            ))}
          </div>
          <CtaButton size="md" variant="outline">
            Falar do meu negócio
          </CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
