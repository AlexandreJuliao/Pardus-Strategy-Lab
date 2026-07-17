"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import CtaButton from "@/components/ui/CtaButton";
import EmberField from "@/components/canvas/EmberField";
import { useTextScramble } from "@/lib/useTextScramble";
import { useCursorParallax } from "@/lib/useCursorParallax";

const EASE = [0.16, 1, 0.3, 1] as const;

function ScrambleWord({ word, delay }: { word: string; delay: number }) {
  const out = useTextScramble(word, { delay, wordStagger: 0 });
  return <span>{out || " "}</span>;
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
  const [scrolled, setScrolled] = useState(false);
  const { px, py } = useCursorParallax();

  // layered parallax amounts
  const imgX = useTransform(px, [-1, 1], [18, -18]);
  const imgY = useTransform(py, [-1, 1], [12, -12]);
  const glowX = useTransform(px, [-1, 1], [-30, 30]);
  const glowY = useTransform(py, [-1, 1], [-20, 20]);
  const emberX = useTransform(px, [-1, 1], [10, -10]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-bg">
      {/* leopard image — right anchored, parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { x: imgX, y: imgY }}
        initial={{ opacity: 0.4, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1.06 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/img/hero-leopard.jpg"
          alt="Leopardo — símbolo de precisão e inteligência da Pardus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </motion.div>

      {/* legibility gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, rgba(5,7,14,0.86) 30%, rgba(5,7,14,0.35) 62%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, var(--bg) 2%, transparent 38%, transparent 70%, rgba(5,7,14,0.55) 100%)",
        }}
      />

      {/* gold glow behind text */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[42%] h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,96,0.16), transparent 65%)",
          ...(reduce ? {} : { x: glowX, y: glowY }),
        }}
      />

      {/* embers */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { x: emberX }}
      >
        <EmberField />
      </motion.div>

      <div className="noise-overlay" />

      {/* content */}
      <div className="shell relative z-10 flex h-full flex-col justify-end pb-[clamp(40px,9vh,96px)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 1.1, duration: 0.6, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/60" />
          <span className="mono-label">Pardus Strategy Lab</span>
          <span className="mono-tiny text-text-muted">Lisboa, PT</span>
        </motion.div>

        <h1 className="text-display text-text-primary">
          <span className="block md:whitespace-nowrap">
            <ScrambleLine text="Sistemas que pensam." base={reduce ? 0 : 1700} />
          </span>
          <span className="block md:whitespace-nowrap">
            <ScrambleLine
              text="Negócios que crescem."
              base={reduce ? 0 : 1700}
              className="text-gold"
            />
          </span>
        </h1>

        <motion.p
          className="hero-sub mt-7 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 2.7, duration: 0.7, ease: EASE }}
        >
          Da ideia ao sistema que trabalha por ti. Criamos sites, inteligência
          artificial e automação — e acompanhamos-te em cada passo.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 3.1, duration: 0.7, ease: EASE }}
        >
          <CtaButton variant="primary" size="lg">
            Consultoria gratuita <ArrowRight size={18} />
          </CtaButton>
          <Button href="/projetos" variant="outline" size="lg">
            Ver trabalho
          </Button>
        </motion.div>

        {/* trust strip */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 3.5, duration: 0.8 }}
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

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="mono-tiny text-text-muted">scroll</span>
        <ChevronDown size={16} className="animate-bounce-chevron text-gold/70" />
      </motion.div>
    </section>
  );
}
