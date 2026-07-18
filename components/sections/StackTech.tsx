"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { fadeUp, staggerContainer } from "@/lib/animations";

const GROUPS: { cat: string; items: string[] }[] = [
  { cat: "Sites & Experiências", items: ["Next.js", "React", "Tailwind", "Animações"] },
  { cat: "Bastidores & Dados", items: ["Node.js", "Python", "Supabase"] },
  { cat: "Inteligência Artificial", items: ["OpenAI", "Claude", "n8n", "Automações"] },
  { cat: "Alojamento & Pagamentos", items: ["Vercel", "Stripe", "MB Way", "WhatsApp"] },
];

export default function StackTech() {
  return (
    <section className="relative section-pad">
      <AuroraGlow variant="stack" />
      <div className="shell relative z-10">
        <SectionHeader
          label="Tecnologia"
          title={<>Ferramentas de quem constrói</>}
          intro="Trabalhamos com as melhores ferramentas do mundo, para que tu não tenhas de te preocupar com nenhuma delas."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4"
        >
          {GROUPS.map((g) => (
            <motion.div
              key={g.cat}
              variants={fadeUp}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="spotlight-card group relative bg-surface p-7"
              style={{ ["--glow-color" as string]: "rgba(46,84,132,0.2)" }}
            >
              <span className="spotlight-glow" aria-hidden />
              <div className="relative z-10 mb-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
                <p className="mono-tiny text-text-secondary">{g.cat}</p>
              </div>
              <ul className="relative z-10 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-[4px] border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[12px] text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:text-gold hover:shadow-[0_6px_18px_-10px_rgba(212,175,96,0.6)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
