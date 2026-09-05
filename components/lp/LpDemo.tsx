"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LiveChat from "@/components/ui/LiveChat";
import CtaButton from "@/components/ui/CtaButton";
import type { Vertical } from "@/lib/verticals";

/** "Experimenta agora": a conversa guionada a correr ao vivo, por vertical. */
export default function LpDemo({ v }: { v: Vertical }) {
  const d = v.demo;
  return (
    <section className="relative overflow-hidden section-pad">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label text-gold">Ao vivo</span>
          <h2 className="text-h2 mt-5 text-text-primary [text-wrap:balance]">{d.title}</h2>
          <p className="hero-sub mt-5 max-w-lg text-[clamp(15px,1.4vw,18px)]">{d.intro}</p>
          <div className="mt-8">
            <CtaButton size="lg">
              Quero isto no meu site <ArrowRight size={17} />
            </CtaButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiveChat script={d.script} name={d.business} initial={d.business[0]} done={d.done} />
        </motion.div>
      </div>
    </section>
  );
}
