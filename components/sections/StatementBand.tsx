"use client";

import { motion } from "framer-motion";
import FlowField from "@/components/canvas/FlowField";
import CtaButton from "@/components/ui/CtaButton";

/**
 * A full-bleed cinematic statement over a living field of light (FlowField).
 * Replaces the leopard bands as the mid-page "beats" — same impact, new
 * material: gold/blue streams flowing and reacting to the cursor.
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
  return (
    <section
      className="relative overflow-hidden border-y border-line"
      style={{ background: "#060912" }}
    >
      {/* living light field */}
      <FlowField tone={tone} />

      {/* calm the centre so the words read; frame the streams at the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 72% at 50% 50%, rgba(5,7,14,0.82) 0%, rgba(5,7,14,0.35) 42%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[16%]"
        style={{ background: "linear-gradient(90deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[16%]"
        style={{ background: "linear-gradient(270deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: "linear-gradient(180deg, #05070e, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: "linear-gradient(0deg, #05070e, transparent)" }}
      />
      <div className="noise-overlay" />

      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 text-center"
        style={{
          minHeight: "clamp(360px, 46vw, 580px)",
          paddingBlock: "clamp(72px,10vw,120px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display font-bold leading-[1.03] text-text-primary [font-size:clamp(30px,5vw,72px)] [letter-spacing:-0.03em] [text-shadow:0_6px_40px_rgba(0,0,0,0.7)] [text-wrap:balance]"
        >
          {title}
        </motion.h2>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl font-sans text-[clamp(15px,1.5vw,19px)] leading-relaxed text-text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]"
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
