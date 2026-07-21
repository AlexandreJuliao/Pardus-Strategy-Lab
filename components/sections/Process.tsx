"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const STEPS = [
  { n: "01", title: "Descoberta", desc: "Mapeamos o negócio, objetivos e sistemas existentes. Sem suposições." },
  { n: "02", title: "Plano", desc: "Desenhamos a solução, as ligações e o calendário. Fica tudo escrito, sem surpresas." },
  { n: "03", title: "Construção", desc: "Construímos por etapas, com entregas frequentes para veres o progresso e dares a tua opinião." },
  { n: "04", title: "Lançamento", desc: "Colocamos no ar, formamos a tua equipa e continuamos a acompanhar e a melhorar." },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// The connecting line grows, the numbered nodes fill gold in sequence, and each
// step's copy fades up — driven by framer-motion (already in the bundle) so the
// page no longer ships GSAP just for this one section.
export default function Process() {
  const reduce = useReducedMotion();
  const d = (base: number) => (reduce ? 0 : base);

  const lineH: Variants = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: d(1.2), ease: EASE } } };
  const lineV: Variants = { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: d(1.2), ease: EASE } } };
  const node: Variants = {
    hidden: {},
    visible: (i: number) => ({
      backgroundColor: "#d4af60",
      color: "#0a0a0a",
      borderColor: "#d4af60",
      transition: { duration: d(0.3), delay: d(0.2 + i * 0.26), ease: EASE },
    }),
  };
  const content: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: d(0.45), delay: d(0.25 + i * 0.26), ease: EASE },
    }),
  };

  return (
    <section id="processo" className="relative section-pad">
      <div className="shell">
        <SectionHeader
          label="// Processo"
          title={<>Como trabalhamos</>}
          intro="Quatro etapas. Zero ambiguidade. Resultado garantido."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -28% 0px" }}
          className="relative mt-16"
        >
          <motion.div
            variants={lineH}
            className="absolute left-0 top-7 hidden h-px w-full origin-left bg-gradient-to-r from-blue via-blue to-gold md:block"
          />
          <motion.div
            variants={lineV}
            className="absolute left-7 top-0 h-full w-px origin-top bg-gradient-to-b from-blue to-gold md:hidden"
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative flex gap-5 md:flex-col md:gap-0">
                <motion.div
                  custom={i}
                  variants={node}
                  className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-sm text-gold"
                >
                  {s.n}
                </motion.div>
                <motion.div custom={i} variants={content} className="md:mt-8">
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                    {s.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
