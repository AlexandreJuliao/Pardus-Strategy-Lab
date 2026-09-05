"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { Vertical } from "@/lib/verticals";

export default function LpProcess({ v }: { v: Vertical }) {
  return (
    <section className="relative section-pad">
      <div className="shell">
        <SectionHeader
          title={<>Como <span className="accent-serif text-gold">funciona</span></>}
          intro="Três passos, com o preço fechado logo no primeiro."
        />
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {v.process.map((p, i) => (
            <motion.li
              key={p.title}
              variants={fadeUp}
              className="relative rounded-[10px] border border-line bg-surface/40 p-7"
            >
              <span className="font-display text-[44px] font-bold leading-none text-gold/25">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-[19px] font-semibold text-text-primary">{p.title}</h3>
              <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-text-secondary">{p.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
