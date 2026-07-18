"use client";

import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHero({
  title,
  subtitle,
}: {
  /** kept for backwards-compat with existing call sites; no longer rendered */
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-20 pt-40 md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 12% 10%, rgba(46,84,132,0.16), transparent 60%), radial-gradient(600px 400px at 90% 120%, rgba(212,175,96,0.07), transparent 60%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />
      <AuroraGlow variant="cta" />
      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6"
        >
          <span className="block h-px w-10 bg-gold/50" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
          className="text-display text-text-primary"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7, ease: EASE }}
            className="hero-sub mt-6 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
