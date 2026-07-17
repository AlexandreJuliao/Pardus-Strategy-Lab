"use client";

import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHero({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-20 pt-40 md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 12% 10%, rgba(63,107,255,0.1), transparent 60%), radial-gradient(600px 400px at 90% 120%, rgba(212,175,96,0.06), transparent 60%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />
      <AuroraGlow variant="cta" />
      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="mono-label">{label.replace(/^\/\/\s*/, "")}</span>
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
