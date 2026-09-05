"use client";

import { motion } from "framer-motion";
import { FileText, Globe, ShieldCheck, Zap, LineChart, Phone, type LucideIcon } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Vertical } from "@/lib/verticals";

const ICONS: Record<Vertical["features"][number]["icon"], LucideIcon> = {
  text: FileText,
  globe: Globe,
  shield: ShieldCheck,
  zap: Zap,
  chart: LineChart,
  phone: Phone,
};

export default function LpFeatures({ v }: { v: Vertical }) {
  return (
    <section className="relative pb-[clamp(60px,8vw,120px)]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="shell grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {v.features.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="rounded-[10px] border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-gold/30 hover:bg-surface"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">{f.title}</h3>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-text-secondary">{f.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
