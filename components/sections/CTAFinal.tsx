"use client";

import { motion } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import { ArrowRight } from "lucide-react";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden border-t border-line section-pad">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(63,107,255,0.1), transparent 70%), radial-gradient(ellipse 50% 50% at 50% 60%, rgba(212,175,96,0.07), transparent 70%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
      <AuroraGlow variant="cta" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="mono-label">Próximo passo</span>
          <span className="h-px w-8 bg-gold/60" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(34px,5.5vw,72px)] font-bold leading-[1.02] tracking-[-0.02em] text-text-primary"
        >
          Vamos falar do
          <br />
          teu <span className="text-gold">negócio?</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="hero-sub mt-6 max-w-lg text-[clamp(15px,1.5vw,19px)]"
        >
          Meia hora, sem custo e sem compromisso. Olhamos para o que fazes e
          dizemos-te onde a tecnologia pode ajudar — e onde não vale a pena.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <CtaButton variant="primary" size="lg">
            Quero a consultoria gratuita <ArrowRight size={18} />
          </CtaButton>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 mono-tiny text-text-muted">
          geral@pardus-lab.com · Lisboa, Portugal
        </motion.p>
      </motion.div>
    </section>
  );
}
