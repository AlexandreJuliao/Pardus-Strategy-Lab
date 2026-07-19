"use client";

import { motion } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import Magnetic from "@/components/ui/Magnetic";
import Logo from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * The closing beat: a full gold inverted panel — the posts' signature
 * contrast (D2/4) as the site's final word. Navy ink, grain, real wordmark.
 */
export default function CTAFinal() {
  return (
    <section className="section-gold relative overflow-hidden section-pad">
      <div className="grain-section" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="shell relative z-10 flex flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(34px,5.5vw,72px)] font-semibold leading-[1.02] tracking-[-0.025em] text-cream-ink [text-wrap:balance]"
        >
          Vamos falar do
          <br />
          teu <span className="accent-serif">negócio?</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-lg font-sans text-[clamp(15px,1.5vw,19px)] leading-relaxed text-[#3b2d16]"
        >
          Meia hora, sem custo e sem compromisso. Olhamos para o que fazes e
          dizemos-te onde a tecnologia pode ajudar — e onde não vale a pena.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10">
          <Magnetic>
            <CtaButton variant="inverse" size="lg">
              Quero a consultoria gratuita <ArrowRight size={18} />
            </CtaButton>
          </Magnetic>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 mono-tiny text-[#6b4f22]">
          geral@pardus-lab.com · Lisboa, Portugal
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <Logo size="md" tone="dark" />
        </motion.div>
      </motion.div>
    </section>
  );
}
