"use client";

import { motion } from "framer-motion";
import AuroraGlow from "@/components/ui/AuroraGlow";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PageHero({
  title,
  subtitle,
  meta,
}: {
  /** kept for backwards-compat with existing call sites; no longer rendered */
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  /** optional right-aligned element for asymmetry (a count, a short line) */
  meta?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-14 pt-40 md:pb-16 md:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 420px at 12% 8%, rgba(46,84,132,0.16), transparent 60%), radial-gradient(620px 420px at 92% 120%, rgba(212,175,96,0.07), transparent 60%)",
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
      <AuroraGlow variant="cta" />

      <div className="shell relative z-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-7 block h-px w-12 origin-left bg-gold/60"
            />
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
              className="text-display text-text-primary [text-wrap:balance]"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.7, ease: EASE }}
                className="hero-sub mt-6 max-w-2xl [text-wrap:pretty]"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {meta && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.7, ease: EASE }}
              className="shrink-0 md:pb-2 md:text-right"
            >
              {meta}
            </motion.div>
          )}
        </div>
      </div>

      <div className="shell relative z-10 mt-11 md:mt-14">
        <div className="hairline-anim" />
      </div>
    </section>
  );
}
