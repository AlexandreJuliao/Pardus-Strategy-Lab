"use client";

import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";

const LINE = "Construímos coisas que funcionam de verdade.";
const GOLD_WORDS = new Set(["Construímos", "verdade."]);

export default function Manifesto() {
  const words = LINE.split(" ");
  return (
    <section className="relative overflow-hidden section-pad">
      <AuroraGlow variant="manifesto" />
      <div className="shell relative z-10">
        <span className="mb-8 block h-px w-10 bg-gold/50" />

        <h2 className="font-display text-[clamp(30px,5vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em] text-text-muted">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${GOLD_WORDS.has(w) ? "accent-serif text-gold" : "text-text-primary"} mr-[0.28em]`}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 gap-10 border-t border-line pt-10 md:grid-cols-[1.2fr_1fr]"
        >
          <p className="max-w-xl font-sans text-[clamp(16px,1.6vw,20px)] leading-relaxed text-text-secondary">
            Gostamos de estar por perto. Desenhamos, construímos e mantemos
            coisas que funcionam de verdade: sites, inteligência artificial e
            automação que trabalham pelo teu negócio todos os dias. Da
            primeira conversa ao lançamento, e muito para lá disso: ficamos
            contigo enquanto precisares.
          </p>
          <div className="flex flex-col gap-4">
            {[
              ["Do início ao fim", "Levamos cada projeto até estar a funcionar."],
              ["IA e web, na mesma equipa", "Uma equipa, tudo a falar entre si."],
              ["Resultados mensuráveis", "Cada projeto com métricas reais."],
            ].map(([t, d]) => (
              <div key={t} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <div>
                  <p className="font-sans text-[15px] font-medium text-text-primary">
                    {t}
                  </p>
                  <p className="font-sans text-sm text-text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
