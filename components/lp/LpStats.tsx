"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

/** Barra de confiança sem logótipos de terceiros: os números que importam. */
export default function LpStats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="relative border-y border-line bg-bg-2/50 py-10 md:py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="shell grid grid-cols-2 gap-8 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center md:text-left">
            <p className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold leading-none text-text-primary">
              {s.value}
            </p>
            <p className="mt-2 font-sans text-[13px] leading-snug text-text-secondary">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
