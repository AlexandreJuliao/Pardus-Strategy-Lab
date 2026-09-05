"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";
import Button from "@/components/ui/Button";
import MockSite from "@/components/lp/mock/MockSite";
import { scrollToId } from "@/lib/scrollTo";
import type { Vertical } from "@/lib/verticals";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: EASE },
});

/**
 * Hero centrado, à maneira das LPs de produto: pill, headline com uma palavra
 * em acento, duas ações e o "produto" (mockup) logo por baixo, com brilho atrás.
 */
export default function LpHero({ v }: { v: Vertical }) {
  const h = v.hero;
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />
      <AuroraGlow variant="cta" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(46,84,132,0.28), transparent 70%)",
        }}
      />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <motion.span
          {...up(0)}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 font-sans text-[12px] font-medium tracking-wide text-gold"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
          {h.pill}
        </motion.span>

        <motion.h1
          {...up(0.08)}
          className="text-display mt-7 max-w-4xl text-text-primary [text-wrap:balance]"
        >
          {h.pre}{" "}
          <span className="accent-serif text-gold">{h.accent}</span>
          {h.post && <> {h.post}</>}
        </motion.h1>

        <motion.p {...up(0.16)} className="hero-sub mt-6 max-w-2xl [text-wrap:pretty]">
          {h.sub}
        </motion.p>

        <motion.div {...up(0.24)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <CtaButton size="lg">
            {h.cta} <ArrowRight size={17} />
          </CtaButton>
          {h.ctaSecondary && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToId(h.ctaSecondary!.targetId)}
            >
              {h.ctaSecondary.label}
            </Button>
          )}
        </motion.div>

        <motion.ul {...up(0.32)} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {h.trust.map((t) => (
            <li key={t} className="flex items-center gap-2 font-sans text-[13px] text-text-secondary">
              <Check size={13} strokeWidth={2.6} className="text-gold" />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* o produto */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
        className="shell relative z-10 mt-14 md:mt-20"
      >
        <div
          className="pointer-events-none absolute inset-x-[10%] -top-10 h-[60%] blur-3xl"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 40%, rgba(212,175,96,0.22), rgba(46,84,132,0.18) 55%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <MockSite />
        </div>
      </motion.div>
    </section>
  );
}
