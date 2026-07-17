"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Member = {
  initials?: string;
  icon?: boolean;
  name: string;
  role: string;
  blurb: string;
};

const MEMBERS: Member[] = [
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
      "Transforma as ideias em coisas que funcionam — do site ao sistema — com atenção ao detalhe em cada ecrã.",
  },
  {
    icon: true,
    name: "Rede de especialistas",
    role: "Design · Motion · IA · Conteúdo",
    blurb:
      "Um núcleo sénior, reforçado por especialistas de confiança que entram em cada projeto conforme é preciso. A equipa cresce com o tamanho do desafio.",
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
    <section className="relative overflow-hidden border-t border-line section-pad">
      <AuroraGlow variant="why" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Equipa"
          title={<>Quem está por trás</>}
          intro="Um núcleo pequeno e sénior, apoiado por uma rede de especialistas de confiança. Falas sempre com quem faz."
        />

        {/* disciplines — shows breadth */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {DISCIPLINES.map((d) => (
            <span
              key={d}
              className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11.5px] text-text-secondary"
            >
              {d}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {MEMBERS.map((m) => (
            <motion.div
              key={m.name}
              variants={fadeUp}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="spotlight-card group relative overflow-hidden rounded-[8px] border border-line bg-surface/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface"
            >
              <span className="spotlight-glow" aria-hidden />
              <div className="relative z-10 flex items-center gap-5">
                {m.icon ? (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.03] text-gold transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Users size={26} strokeWidth={1.6} />
                  </span>
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/[0.03] font-wordmark text-[26px] font-semibold text-gold gold-glow transition-transform duration-300 group-hover:-translate-y-0.5">
                    {m.initials}
                  </span>
                )}
                <div>
                  <p className="font-display text-lg font-semibold text-text-primary">
                    {m.name}
                  </p>
                  <p className="mt-0.5 mono-tiny text-gold">{m.role}</p>
                </div>
              </div>
              <p className="relative z-10 mt-6 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                {m.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
