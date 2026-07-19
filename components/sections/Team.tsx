"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { fadeUp, staggerContainer } from "@/lib/animations";

const FOUNDERS = [
  {
    initials: "AJ",
    name: "Alexandre Julião",
    role: "Fundador & CEO",
    blurb:
      "A visão, a estratégia e o produto de cada projeto. É quem garante que aquilo que entregamos faz mesmo diferença para o teu negócio.",
  },
  {
    initials: "TA",
    name: "Tomás Araújo",
    role: "Desenvolvimento & Produto",
    blurb:
      "Transforma as ideias em coisas que funcionam, do site ao sistema, com atenção ao detalhe em cada ecrã.",
  },
];

const DISCIPLINES = [
  "Estratégia",
  "Design",
  "Desenvolvimento",
  "Inteligência Artificial",
  "Automação",
  "Conteúdo",
];

export default function Team() {
  return (
    <section id="equipa" className="relative overflow-hidden border-t border-line section-pad">
      <AuroraGlow variant="why" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Equipa"
          title={<>Quem está por trás</>}
          intro="Um núcleo pequeno e sénior, apoiado por uma rede de especialistas de confiança. Falas sempre com quem faz."
        />

        {/* founders — the two names carrying the work */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {FOUNDERS.map((m, i) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              className={`card-cream group relative overflow-hidden rounded-[18px] p-9 transition-transform duration-300 hover:-translate-y-1 ${
                i % 2 === 0 ? "md:-rotate-[0.6deg]" : "md:rotate-[0.6deg]"
              }`}
            >
              <div className="relative z-10 flex items-center gap-5">
                <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-cream-ink font-serif text-[26px] font-semibold italic text-gold transition-transform duration-300 group-hover:-translate-y-0.5">
                  {m.initials}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-cream-ink">
                    {m.name}
                  </p>
                  <p className="mt-1 mono-tiny text-bronze">{m.role}</p>
                </div>
              </div>
              <p className="relative z-10 mt-7 max-w-md font-sans text-[15px] leading-relaxed text-[#4a3c22]">
                {m.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* the network — secondary, deliberately smaller: makes clear the
            team scales without pretending to be a large in-house roster */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex flex-col gap-5 rounded-[8px] border border-line bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between md:p-7"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.03] text-gold">
              <Users size={18} strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-sans text-[15px] font-medium text-text-primary">
                + rede de especialistas de confiança
              </p>
              <p className="mt-0.5 font-sans text-[13.5px] text-text-secondary">
                Entram em cada projeto conforme é preciso. A equipa cresce com
                o tamanho do desafio.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {DISCIPLINES.map((d) => (
              <span
                key={d}
                className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] text-text-secondary"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
