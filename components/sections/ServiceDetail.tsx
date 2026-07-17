"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import GeoPattern from "@/components/ui/GeoPattern";
import { ICONS, type ServiceData } from "@/lib/services";

export default function ServiceDetail({
  service,
  index,
}: {
  service: ServiceData;
  index: number;
}) {
  const reverse = index % 2 === 1;
  const Icon = ICONS[service.iconKey];

  return (
    <section className="border-b border-line py-20 md:py-24">
      <div className="shell">
        <div
          className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <GeoPattern icon={Icon} seed={index} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[11px] text-gold/60">{service.n}</span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.5vw,40px)] font-semibold text-text-primary">
              {service.title}
            </h2>
            <p className="mt-2 font-display text-lg text-gold">{service.tagline}</p>
            <p className="mt-4 font-sans text-[15.5px] leading-relaxed text-text-secondary">
              {service.short}
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.deliverables.slice(0, 6).map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <Check size={17} strokeWidth={2.2} className="mt-0.5 shrink-0 text-gold" />
                  <span className="font-sans text-[14px] text-text-secondary">{d}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/servicos/${service.slug}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-[4px] border border-line-strong bg-white/[0.02] px-5 py-2.5 font-sans text-sm text-text-primary transition-all duration-200 ease-premium hover:border-gold hover:text-gold"
            >
              Saber mais
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
