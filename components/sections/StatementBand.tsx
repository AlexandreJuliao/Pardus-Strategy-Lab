"use client";

import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";

/**
 * A full-width cinematic statement — big centred line over drifting aurora.
 * Keeps the mid-page "beats" the leopard bands used to provide, without the
 * leopard (which now lives only in the hero). Optional CTA.
 */
export default function StatementBand({
  title,
  sub,
  cta,
  variant = "cta",
}: {
  title: React.ReactNode;
  sub?: string;
  cta?: string;
  variant?: "cta" | "manifesto" | "stack";
}) {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2/40">
      <AuroraGlow variant={variant} />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: "clamp(300px, 38vw, 460px)", paddingBlock: "clamp(56px,8vw,96px)" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display font-bold leading-[1.04] text-text-primary [font-size:clamp(28px,4.6vw,64px)] [letter-spacing:-0.03em] [text-wrap:balance]"
        >
          {title}
        </motion.h2>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl font-sans text-[clamp(15px,1.5vw,19px)] leading-relaxed text-text-secondary"
          >
            {sub}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9"
          >
            <CtaButton size="lg">{cta}</CtaButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
