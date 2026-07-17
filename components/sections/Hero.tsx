"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import CtaButton from "@/components/ui/CtaButton";
import LeopardMorph from "@/components/canvas/LeopardMorph";
import { useTextScramble } from "@/lib/useTextScramble";

const EASE = [0.16, 1, 0.3, 1] as const;

function ScrambleWord({ word, delay }: { word: string; delay: number }) {
  const out = useTextScramble(word, { delay, wordStagger: 0 });
  return <span>{out || " "}</span>;
}

function ScrambleLine({
  text,
  base,
  className = "",
}: {
  text: string;
  base: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <ScrambleWord word={w} delay={base + i * 80} />
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.55], [0.9, 0.5, 0]);

  return (
    <section ref={ref} className="relative h-[180vh] w-full bg-bg">
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg">
        {/* leopard: atoms → real, driven by scroll */}
        <LeopardMorph progress={scrollYProgress} reduced={!!reduce} />

        {/* legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, rgba(5,7,14,0.82) 26%, rgba(5,7,14,0.32) 58%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, var(--bg) 1%, transparent 34%, transparent 72%, rgba(5,7,14,0.5) 100%)",
          }}
        />
        <motion.div
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
            transition={{ delay: reduce ? 0 : 0.9, duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="mono-label">Pardus Strategy Lab</span>
            <span className="mono-tiny text-text-muted">Lisboa, PT</span>
          </motion.div>

          <h1 className="text-display text-text-primary [text-shadow:0_6px_36px_rgba(0,0,0,0.6)]">
            <span className="block md:whitespace-nowrap">
              <ScrambleLine text="Sistemas que pensam." base={reduce ? 0 : 1500} />
            </span>
            <span className="block md:whitespace-nowrap">
              <ScrambleLine
                text="Negócios que crescem."
                base={reduce ? 0 : 1500}
                className="text-gold"
              />
            </span>
          </h1>

          <motion.p
            className="hero-sub mt-7 max-w-xl [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 2.4, duration: 0.7, ease: EASE }}
          >
            Da ideia ao sistema que trabalha por ti. Criamos sites, inteligência
            artificial e automação — e acompanhamos-te em cada passo.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 2.8, duration: 0.7, ease: EASE }}
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
            transition={{ delay: reduce ? 0 : 3.2, duration: 0.8 }}
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
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute right-[7%] top-[14%] hidden max-w-[180px] text-right mono-tiny leading-relaxed text-text-muted md:block"
        >
          {"// dos dados nasce algo vivo — faz scroll"}
        </motion.span>

        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="mono-tiny text-text-muted">scroll</span>
          <ChevronDown size={16} className="animate-bounce-chevron text-gold/70" />
        </motion.div>
      </div>
    </section>
  );
}
