"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  index,
  label,
  title,
  intro,
  align = "left",
  className = "",
}: {
  index?: string;
  label: string;
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
      <div
        className={`mb-5 flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold/60" />
        <span className="mono-label">{label.replace(/^\/\/\s*/, "")}</span>
        {index && <span className="mono-tiny text-text-muted">{index}</span>}
      </div>
      <h2 className="text-h2 text-text-primary">{title}</h2>
      {intro && (
        <p className="hero-sub mt-5 text-[clamp(15px,1.4vw,18px)]">{intro}</p>
      )}
    </motion.div>
  );
}
