"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  title,
  intro,
  align = "left",
  className = "",
}: {
  /** kept for backwards-compat with existing call sites; no longer rendered */
  index?: string;
  label?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <span
        className={`mb-6 block h-px w-10 bg-gold/50 ${align === "center" ? "mx-auto" : ""}`}
      />
      <h2 className="text-h2 text-text-primary [text-wrap:balance]">{title}</h2>
      {intro && (
        <p className="hero-sub mt-5 text-[clamp(15px,1.4vw,18px)]">{intro}</p>
      )}
    </motion.div>
  );
}
