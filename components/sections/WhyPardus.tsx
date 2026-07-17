"use client";

import { motion } from "framer-motion";
import {
  Zap, Layers, GitBranch, MapPin, LineChart, Eye, type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { fadeUp, staggerContainer } from "@/lib/animations";

const ITEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Zap, title: "Levamos até ao fim", desc: "Cada projeto termina a funcionar de verdade — no ar, entregue e a dar resultado." },
  { icon: Layers, title: "IA e web, juntas", desc: "Não tens de escolher entre uma agência de inteligência artificial e uma de sites. Somos as duas, a trabalhar como uma só." },
  { icon: GitBranch, title: "Tecnologia que fica tua", desc: "Usamos as melhores ferramentas do mundo e entregamos tudo em teu nome. Nunca ficas preso a nós." },
  { icon: MapPin, title: "Proximidade portuguesa", desc: "Equipa em Lisboa, comunicação em português, suporte real. Resposta em menos de 24h." },
  { icon: LineChart, title: "Resultados mensuráveis", desc: "Cada entrega vem com métricas concretas — sabes exatamente o que mudou no teu negócio." },
  { icon: Eye, title: "Transparência total", desc: "Mostramos o processo, os prazos e os números. Sem caixas fechadas, sem surpresas." },
];

export default function WhyPardus() {
  return (
    <section className="relative section-pad">
      <AuroraGlow variant="why" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Porquê Pardus"
          title={<>Como gostamos de trabalhar</>}
          intro="Com gosto, proximidade e transparência. É isto que podes esperar de nós."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                variants={fadeUp}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="spotlight-card group relative overflow-hidden rounded-[6px] border border-line bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface"
              >
                <span className="spotlight-glow" aria-hidden />
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:shadow-[0_10px_26px_-12px_rgba(212,175,96,0.6)]">
                  <Icon size={20} strokeWidth={1.7} />
                </div>
                <h3 className="relative z-10 mt-5 font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
                  {it.title}
                </h3>
                <p className="relative z-10 mt-2.5 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                  {it.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
