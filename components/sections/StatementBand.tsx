"use client";

import { motion } from "framer-motion";
import FlowField from "@/components/canvas/FlowField";
import CtaButton from "@/components/ui/CtaButton";

/**
 * The site's colour-contrast beats, ported from the social system:
 *   gold — the surface IS the colour: solid gold, navy ink, grain. The
 *          scroll-stopping inverted panel (posts D2/4, C3/4).
 *   blue — deep petrol gradient with the living FlowField underneath
 *          (posts D1/4, C4/4). Light ink, gold accent survives.
 * Both keep the slanted clip so they read as cut into the page.
 */
export default function StatementBand({
  title,
  sub,
  cta,
  tone = "gold",
}: {
  title: React.ReactNode;
  sub?: string;
  cta?: string;
  tone?: "gold" | "blue";
}) {
  const gold = tone === "gold";

  return (
    <section
      className={`relative overflow-hidden ${gold ? "section-gold" : "section-petrol"}`}
      style={{
        // slanted silhouette — the section reads as cut into the page
        clipPath: "polygon(0 26px, 100% 0, 100% calc(100% - 26px), 0 100%)",
      }}
    >
      {!gold && (
        <>
          <FlowField tone="blue" />
          {/* calm the centre so the words read */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 62% 74% at 50% 50%, rgba(10,18,36,0.72) 0%, rgba(10,18,36,0.28) 44%, transparent 74%)",
            }}
          />
        </>
      )}
      <div className="grain-section" />

      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center"
        style={{
          minHeight: "clamp(340px, 44vw, 560px)",
          paddingBlock: "clamp(72px,10vw,120px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl font-display font-semibold leading-[1.03] [font-size:clamp(30px,5vw,68px)] [letter-spacing:-0.028em] [text-wrap:balance] ${
            gold
              ? "text-cream-ink"
              : "text-text-primary [text-shadow:0_6px_40px_rgba(0,0,0,0.55)]"
          }`}
        >
          {title}
        </motion.h2>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-6 max-w-xl font-sans text-[clamp(15px,1.5vw,19px)] leading-relaxed ${
              gold
                ? "text-[#3b2d16]"
                : "text-[#c8d4e6] [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]"
            }`}
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
            <CtaButton size="lg" variant={gold ? "inverse" : "primary"}>
              {cta}
            </CtaButton>
          </motion.div>
        )}
      </div>
    </section>
  );
}
