"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { SERVICES, ICONS } from "@/lib/services";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Bento, not a 3-up feature row: two photographic anchors (the real
 * editorial photography from /servicos) bookend a denser row of four, so
 * the section reads as one composed panel instead of six identical tiles.
 */
export default function Services() {
  const [big1, small1, small2, small3, small4, big2] = SERVICES;

  return (
    <section id="servicos" className="relative section-pad">
      <AuroraGlow variant="services" />
      <div className="shell relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            label="// Serviços"
            title={<>O que <span className="accent-serif text-gold">construímos</span></>}
            intro="Seis formas de te ajudar, uma só equipa. Do site à inteligência artificial, tudo ligado."
          />
          <Link
            href="/servicos"
            className="group hidden items-center gap-1.5 mono-label text-text-secondary transition-colors hover:text-gold md:inline-flex"
          >
            Ver todos
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[1.3fr_1fr_1fr]"
        >
          <BigCard service={big1} />
          <SmallCard service={small1} />
          <SmallCard service={small2} />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1.3fr]"
        >
          <SmallCard service={small3} />
          <SmallCard service={small4} />
          <BigCard service={big2} reverse />
        </motion.div>
      </div>
    </section>
  );
}

function BigCard({
  service: s,
  reverse = false,
}: {
  service: (typeof SERVICES)[number];
  reverse?: boolean;
}) {
  const Icon = ICONS[s.iconKey];
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/servicos/${s.slug}`}
        className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[8px] border border-line md:min-h-[360px]"
      >
        <Image
          src={`/img/services/${s.slug}.jpg`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover brightness-125 contrast-[1.05] transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              reverse
                ? "linear-gradient(0deg, rgba(5,7,14,0.88) 0%, rgba(5,7,14,0.35) 55%, transparent 90%)"
                : "linear-gradient(0deg, rgba(5,7,14,0.88) 0%, rgba(5,7,14,0.4) 50%, transparent 85%)",
          }}
        />
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-[4px] border border-gold/40 bg-bg/60 text-gold backdrop-blur-sm">
          <Icon size={20} strokeWidth={1.6} />
        </span>
        <span className="absolute left-5 top-5 font-mono text-[11px] text-white/60">{s.n}</span>
        <div className="relative z-10 p-6 md:p-7">
          <h3 className="font-display text-[22px] font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
            {s.title}
          </h3>
          <p className="mt-2.5 max-w-sm font-sans text-[14.5px] leading-relaxed text-text-secondary [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
            {s.short}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 mono-tiny text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
            Saber mais
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SmallCard({ service: s }: { service: (typeof SERVICES)[number] }) {
  const Icon = ICONS[s.iconKey];
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/servicos/${s.slug}`}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-line bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
      >
        <span className="spotlight-glow" aria-hidden />
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-text-secondary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:text-gold">
          <Icon size={19} strokeWidth={1.6} />
        </div>
        <h3 className="relative z-10 mt-5 font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
          {s.title}
        </h3>
        <p className="relative z-10 mt-2 font-sans text-[13.5px] leading-relaxed text-text-secondary">
          {s.short}
        </p>
      </Link>
    </motion.div>
  );
}
