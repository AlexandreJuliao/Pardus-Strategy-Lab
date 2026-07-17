"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import { SERVICES, ICONS } from "@/lib/services";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Services() {
  return (
    <section id="servicos" className="relative section-pad">
      <AuroraGlow variant="services" />
      <div className="shell relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            label="// Serviços"
            title={<>O que construímos</>}
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
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => {
            const Icon = ICONS[s.iconKey];
            return (
              <motion.div key={s.slug} variants={fadeUp}>
                <Link
                  href={`/servicos/${s.slug}`}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="spotlight-card group relative block h-full overflow-hidden bg-surface p-8 transition-colors duration-300 hover:bg-surface-2"
                >
                  <span className="spotlight-glow" aria-hidden />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-5 font-display text-[92px] font-bold leading-none text-white/[0.03] transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:text-gold/10"
                  >
                    {s.n}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-0.5 w-0 bg-gold transition-all duration-500 ease-premium group-hover:w-full"
                  />
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-text-secondary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold/40 group-hover:text-gold group-hover:shadow-[0_10px_26px_-12px_rgba(212,175,96,0.6)]">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="relative z-10 mt-7 font-display text-[21px] font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
                    {s.title}
                  </h3>
                  <p className="relative z-10 mt-3 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                    {s.short}
                  </p>
                  <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 mono-tiny text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Saber mais
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
