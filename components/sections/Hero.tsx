"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import CtaButton from "@/components/ui/CtaButton";
import LeopardMorph from "@/components/canvas/LeopardMorph";

const EASE = [0.16, 1, 0.3, 1] as const;

// The headline plays out in three beats, scrubbed by the same scroll that
// turns the atoms into the roaring leopard: data → instinct → the roar.
const BEATS: { lead: string; gold: string }[] = [
  { lead: "Nasce", gold: "dos dados." },
  { lead: "Ganha", gold: "instinto." },
  { lead: "Ruge", gold: "no mercado." },
];

function Beat({
  lead,
  gold,
  opacity,
  y,
}: {
  lead: string;
  gold: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.h1
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 text-display text-text-primary [text-shadow:0_6px_36px_rgba(0,0,0,0.6)]"
    >
      {lead} <span className="text-gold">{gold}</span>
    </motion.h1>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // beat opacities (cross-fade) + slight vertical drift
  const o0 = useTransform(scrollYProgress, [0, 0.18, 0.27], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.23, 0.34, 0.5, 0.58], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.55, 0.68, 1], [0, 1, 1]);
  const y0 = useTransform(scrollYProgress, [0, 0.27], [0, -34]);
  const y1 = useTransform(scrollYProgress, [0.23, 0.58], [34, -34]);
  const y2 = useTransform(scrollYProgress, [0.55, 1], [34, 0]);
  const beatOps = [o0, o1, o2];
  const beatYs = [y0, y1, y2];

  // supporting copy drifts + settles as the beast forms
  const subOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [1, 1, 1, 0.35]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5], [0.9, 0.5, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-bg">
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg">
        {/* leopard: atoms → real, driven by scroll */}
        <LeopardMorph progress={scrollYProgress} reduced={!!reduce} />

        {/* legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, rgba(5,7,14,0.8) 26%, rgba(5,7,14,0.3) 58%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, var(--bg) 1%, transparent 34%, transparent 72%, rgba(5,7,14,0.5) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-[44%] h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,96,0.14), transparent 65%)",
          }}
        />
        <div className="noise-overlay" />

        {/* content */}
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-[clamp(52px,11vh,120px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.5, duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="mono-label">Pardus Strategy Lab</span>
            <span className="mono-tiny text-text-muted">Lisboa, PT</span>
          </motion.div>

          {/* kinetic headline */}
          {reduce ? (
            <h1 className="text-display text-text-primary">
              Instinto digital <span className="text-gold">para o teu negócio.</span>
            </h1>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
              className="relative w-full [min-height:clamp(112px,17vh,190px)]"
            >
              {BEATS.map((b, i) => (
                <Beat
                  key={b.gold}
                  lead={b.lead}
                  gold={b.gold}
                  opacity={beatOps[i]}
                  y={beatYs[i]}
                />
              ))}
            </motion.div>
          )}

          <motion.p
            className="hero-sub mt-7 max-w-xl [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]"
            style={reduce ? undefined : { opacity: subOpacity, y: subY }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.1, duration: 0.7, ease: EASE }}
          >
            Damos instinto ao teu negócio com inteligência artificial, sites e
            automação — feitos para caçar resultados, não para encher relatórios.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.4, duration: 0.7, ease: EASE }}
          >
            <CtaButton variant="primary" size="lg">
              Consultoria gratuita <ArrowRight size={18} />
            </CtaButton>
            <Button href="/projetos" variant="outline" size="lg">
              Ver trabalho
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 1.7, duration: 0.8 }}
          >
            {[
              ["0€", "Primeira consultoria"],
              ["24h", "Tempo de resposta"],
              ["100%", "Código e acessos teus"],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold text-gold">{n}</span>
                <span className="mono-tiny text-text-secondary">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* morph hint + scroll cue */}
        <motion.span
          style={{ opacity: reduce ? 0 : hintOpacity }}
          className="pointer-events-none absolute right-[7%] top-[14%] hidden max-w-[190px] text-right mono-tiny leading-relaxed text-text-muted md:block"
        >
          {"// dos dados nasce o predador — faz scroll"}
        </motion.span>

        <motion.div
          style={{ opacity: reduce ? 1 : cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="mono-tiny text-text-muted">scroll</span>
          <ChevronDown size={16} className="animate-bounce-chevron text-gold/70" />
        </motion.div>
      </div>
    </section>
  );
}
