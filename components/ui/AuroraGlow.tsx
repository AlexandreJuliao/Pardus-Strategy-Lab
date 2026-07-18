"use client";

/**
 * Ambient drifting glows that give dark sections a sense of life.
 * Pure CSS keyframes (GPU transforms) — freezes to a static wash under
 * prefers-reduced-motion. Sits behind content (z-0); wrap content in z-10.
 */

type Blob = {
  color: string;
  size: string; // e.g. "42rem"
  pos: React.CSSProperties; // top/left/right/bottom
  anim: "aurora-a" | "aurora-b" | "aurora-c";
  opacity?: number;
};

const GOLD = (a: number) => `radial-gradient(circle, rgba(212,175,96,${a}), transparent 70%)`;
// petrol-steel atmosphere — cool depth, never a competing accent
const BLUE = (a: number) => `radial-gradient(circle, rgba(46,84,132,${a}), transparent 70%)`;
const STEEL = (a: number) => `radial-gradient(circle, rgba(34,72,112,${a}), transparent 70%)`;

const PRESETS: Record<string, Blob[]> = {
  services: [
    { color: GOLD(0.16), size: "40rem", pos: { top: "-14%", left: "-8%" }, anim: "aurora-a" },
    { color: BLUE(0.16), size: "44rem", pos: { bottom: "-20%", right: "-10%" }, anim: "aurora-b" },
  ],
  why: [
    { color: BLUE(0.16), size: "42rem", pos: { top: "-16%", right: "-6%" }, anim: "aurora-b" },
    { color: GOLD(0.12), size: "38rem", pos: { bottom: "-18%", left: "6%" }, anim: "aurora-c" },
  ],
  stack: [
    { color: GOLD(0.14), size: "40rem", pos: { bottom: "-22%", left: "-6%" }, anim: "aurora-c" },
    { color: BLUE(0.14), size: "38rem", pos: { top: "-18%", left: "40%" }, anim: "aurora-a" },
  ],
  pricing: [
    { color: GOLD(0.14), size: "46rem", pos: { top: "-10%", left: "28%" }, anim: "aurora-a" },
    { color: BLUE(0.14), size: "36rem", pos: { bottom: "-16%", left: "-8%" }, anim: "aurora-b" },
    { color: BLUE(0.12), size: "36rem", pos: { bottom: "-16%", right: "-8%" }, anim: "aurora-c" },
  ],
  manifesto: [
    { color: GOLD(0.13), size: "40rem", pos: { top: "-20%", left: "-10%" }, anim: "aurora-b" },
    { color: STEEL(0.16), size: "40rem", pos: { bottom: "-26%", right: "-6%" }, anim: "aurora-c" },
  ],
  cta: [
    { color: BLUE(0.18), size: "48rem", pos: { top: "-24%", left: "22%" }, anim: "aurora-a" },
    { color: GOLD(0.16), size: "40rem", pos: { bottom: "-28%", left: "30%" }, anim: "aurora-c" },
  ],
  capabilities: [
    { color: BLUE(0.12), size: "40rem", pos: { top: "-18%", left: "-8%" }, anim: "aurora-c" },
    { color: GOLD(0.12), size: "38rem", pos: { bottom: "-20%", right: "-8%" }, anim: "aurora-a" },
  ],
};

export default function AuroraGlow({
  variant = "services",
  className = "",
}: {
  variant?: keyof typeof PRESETS;
  className?: string;
}) {
  const blobs = PRESETS[variant] ?? PRESETS.services;
  return (
    <div className={`aurora-wrap ${className}`} aria-hidden>
      {blobs.map((b, i) => (
        <span
          key={i}
          className={`aurora-blob ${b.anim}`}
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            opacity: b.opacity ?? 0.85,
            ...b.pos,
          }}
        />
      ))}
    </div>
  );
}
