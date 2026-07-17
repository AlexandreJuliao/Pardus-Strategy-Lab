"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import LeopardMorph from "@/components/canvas/LeopardMorph";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const actionsY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] w-full bg-bg">
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg">
        <LeopardMorph progress={scrollYProgress} reduced={!!reduce} />

        {/* legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, rgba(5,7,14,0.78) 30%, rgba(5,7,14,0.28) 60%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
          style={{
            background: "linear-gradient(180deg, rgba(5,7,14,0.72), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
          style={{
            background: "linear-gradient(0deg, var(--bg) 4%, transparent 100%)",
          }}
        />
        <div className="noise-overlay" />

        {/* content: headline up top, actions along the bottom */}
        <div className="shell relative z-10 flex h-full flex-col">
          <motion.div
            style={reduce ? undefined : { y: headlineY }}
            className="max-w-[52rem] pt-[clamp(104px,22vh,240px)]"
          >
            <motion.h1
              initial={{ y: reduce ? 0 : 22 }}
              animate={{ y: 0 }}
              transition={{ delay: reduce ? 0 : 0.25, duration: 0.8, ease: EASE }}
              className="font-display font-bold text-text-primary [font-size:clamp(38px,5.6vw,78px)] [line-height:1.02] [letter-spacing:-0.03em] [text-shadow:0_6px_36px_rgba(0,0,0,0.55)] [text-wrap:balance]"
            >
              Pomos a tecnologia a trabalhar{" "}
              <span className="text-gold">pelo teu negócio.</span>
            </motion.h1>

            <motion.p
              initial={{ y: reduce ? 0 : 18 }}
              animate={{ y: 0 }}
              transition={{ delay: reduce ? 0 : 0.45, duration: 0.7, ease: EASE }}
              className="mt-6 max-w-xl font-sans text-[clamp(16px,1.6vw,20px)] leading-relaxed text-text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]"
            >
              Sites, inteligência artificial e automações à tua medida — para
              teres menos trabalho manual e mais tempo para o que importa.
            </motion.p>
          </motion.div>

          <div className="grow" />

          <motion.div
            style={reduce ? undefined : { y: actionsY }}
            className="flex flex-col gap-6 pb-[clamp(44px,9vh,96px)] md:flex-row md:items-end md:justify-between"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaButton variant="primary" size="lg">
                Vamos conversar <ArrowRight size={18} />
              </CtaButton>
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
            </div>

            <p className="font-sans text-[14.5px] text-text-secondary md:text-right">
              A primeira conversa é <span className="text-text-primary">gratuita</span>.
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: reduce ? 1 : cueOpacity }}
          className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <ChevronDown size={16} className="animate-bounce-chevron text-gold/60" />
        </motion.div>
      </div>
    </section>
  );
}
