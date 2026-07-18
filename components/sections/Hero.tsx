"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import Magnetic from "@/components/ui/Magnetic";
import LeopardMorph from "@/components/canvas/LeopardMorph";
import { useTextScramble } from "@/lib/useTextScramble";
import { useCursorParallax } from "@/lib/useCursorParallax";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEAD_A = "Colocamos a tecnologia a trabalhar";
const HEAD_B = "pelo teu negócio.";

const TRUST = [
  { v: "0€", l: "Primeira consultoria" },
  { v: "24h", l: "Tempo de resposta" },
  { v: "100%", l: "Código e acessos teus" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const cueFill = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const { px, py } = useCursorParallax(50, 20);
  const canvasX = useTransform(px, [-1, 1], [-16, 16]);
  const canvasY = useTransform(py, [-1, 1], [-11, 11]);

  const scrambledA = useTextScramble(HEAD_A, {
    delay: 260,
    frameInterval: 26,
    wordStagger: 85,
  });
  const scrambledB = useTextScramble(HEAD_B, {
    delay: 720,
    frameInterval: 26,
    wordStagger: 85,
  });

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-bg">
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg">
        <motion.div
          aria-hidden
          className="absolute inset-0 scale-[1.06]"
          style={reduce ? undefined : { x: canvasX, y: canvasY }}
        >
          <LeopardMorph progress={scrollYProgress} reduced={!!reduce} />
        </motion.div>

        {/* legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, rgba(5,7,14,0.8) 32%, rgba(5,7,14,0.32) 62%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[38%]"
          style={{
            background: "linear-gradient(180deg, rgba(5,7,14,0.65), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
          style={{
            background: "linear-gradient(0deg, var(--bg) 6%, transparent 100%)",
          }}
        />
        <div className="noise-overlay" />

        {/* content: one unified, vertically-centred block */}
        <motion.div
          style={reduce ? undefined : { y: contentY }}
          className="shell relative z-10 flex h-full flex-col justify-center pb-[6vh]"
        >
          <div className="max-w-[50rem]">
            <h1 className="font-display font-bold text-text-primary [font-size:clamp(38px,5.8vw,80px)] [line-height:1.02] [letter-spacing:-0.03em] [text-shadow:0_6px_36px_rgba(0,0,0,0.55)] [text-wrap:balance] min-h-[2.1em] md:min-h-[2.05em]">
              {scrambledA || " "}{" "}
              <span className="accent-serif text-gold">
                {scrambledB || " "}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 1.25, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-xl font-sans text-[clamp(16px,1.6vw,20px)] leading-relaxed text-text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]"
            >
              Sites, inteligência artificial e automações à tua medida — para
              teres menos trabalho manual e mais tempo para o que importa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduce ? 0 : 1.45,
                duration: 0.6,
                ease: EASE,
              }}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Magnetic>
                <CtaButton variant="primary" size="lg">
                  Vamos conversar <ArrowRight size={18} />
                </CtaButton>
              </Magnetic>
              <Link
                href="/projetos"
                className="group inline-flex items-center gap-1.5 font-sans text-[15px] text-text-secondary transition-colors hover:text-text-primary"
              >
                ou vê o que já fizemos
                <ArrowUpRight
                  size={15}
                  className="text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduce ? 0 : 1.6,
                duration: 0.6,
                ease: EASE,
              }}
              className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-line/70 pt-6"
            >
              {TRUST.map((t) => (
                <div key={t.l} className="flex items-baseline gap-2">
                  <span className="font-display text-[17px] font-semibold text-gold">
                    {t.v}
                  </span>
                  <span className="font-sans text-[13px] text-text-secondary">
                    {t.l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* scroll cue — a filling line instead of a bouncing chevron */}
        <motion.div
          style={{ opacity: reduce ? 1 : cueOpacity }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
        >
          <span className="mono-tiny text-text-secondary/60">Scroll</span>
          <div className="relative h-9 w-px overflow-hidden bg-line-strong">
            <motion.div
              style={{ scaleY: cueFill }}
              className="absolute inset-0 origin-top bg-gold"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
