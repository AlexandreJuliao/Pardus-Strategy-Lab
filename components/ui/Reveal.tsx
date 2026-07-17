"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRESETS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
  },
  left: {
    hidden: { opacity: 0, x: -36 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  right: {
    hidden: { opacity: 0, x: 36 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  },
};

export default function Reveal({
  children,
  preset = "up",
  delay = 0,
  className = "",
  as = "div",
  once = true,
}: {
  children: React.ReactNode;
  preset?: keyof typeof PRESETS;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
}) {
  const variants = PRESETS[preset];
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
