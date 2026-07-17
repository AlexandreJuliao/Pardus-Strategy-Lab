import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SERVICES, SERVICE_SLUGS, getService, ICONS } from "@/lib/services";
import Reveal from "@/components/ui/Reveal";
import GeoPattern from "@/components/ui/GeoPattern";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CTAFinal from "@/components/sections/CTAFinal";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `https://pardus-lab.com/servicos/${s.slug}` },
    openGraph: {
      title: `${s.title} · Pardus Strategy Lab`,
      description: s.tagline,
      images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const Icon = ICONS[service.iconKey];
  const idx = SERVICES.findIndex((s) => s.slug === service.slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-line bg-bg-2 pb-16 pt-36 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 80% 0%, rgba(63,107,255,0.12), transparent 60%), radial-gradient(560px 400px at 6% 100%, rgba(212,175,96,0.08), transparent 60%)",
          }}
        />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
        <AuroraGlow variant="services" />
        <div className="shell relative z-10">
          <Reveal preset="fade">
            <Link
              href="/servicos"
              className="group inline-flex items-center gap-2 mono-tiny text-text-secondary transition-colors hover:text-gold"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Todos os serviços
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-end gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <Reveal preset="up" delay={0.05}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold/60" />
                  <span className="mono-label">{`${service.n} — Serviço`}</span>
                </div>
              </Reveal>
              <Reveal preset="up" delay={0.1}>
                <h1 className="text-display text-text-primary">{service.title}</h1>
              </Reveal>
              <Reveal preset="up" delay={0.16}>
                <p className="mt-4 font-display text-[clamp(18px,2vw,26px)] font-medium text-gold">
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal preset="up" delay={0.22}>
                <p className="hero-sub mt-6 max-w-2xl">{service.intro}</p>
              </Reveal>
            </div>

            <Reveal preset="scale" delay={0.2}>
              <div className="flex h-28 w-28 items-center justify-center rounded-[10px] border border-line bg-white/[0.02] text-gold gold-glow">
                <Icon size={52} strokeWidth={1.2} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* outcomes */}
      <section className="border-b border-line bg-bg">
        <div className="shell grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {service.outcomes.map((o, i) => (
            <Reveal key={i} preset="up" delay={i * 0.08} className="px-2 py-10 text-center">
              <span className="font-display text-[clamp(34px,4vw,52px)] font-bold text-gold">
                {o.stat}
              </span>
              <span className="mt-2 block font-sans text-sm text-text-secondary">
                {o.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* problem */}
      <section className="relative section-pad">
        <div className="shell grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal preset="left">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="mono-label">{"O desafio"}</span>
            </div>
            <h2 className="text-h2 text-text-primary">O problema que resolvemos</h2>
            <p className="mt-6 font-sans text-[16px] leading-relaxed text-text-secondary">
              {service.problem}
            </p>
          </Reveal>
          <Reveal preset="right">
            <GeoPattern icon={Icon} seed={idx} />
          </Reveal>
        </div>
      </section>

      {/* deliverables */}
      <section className="relative border-y border-line bg-bg-2/50 section-pad">
        <div className="shell">
          <Reveal preset="up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="mono-label">{"O que entregamos"}</span>
            </div>
            <h2 className="text-h2 text-text-primary">Tudo incluído</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d, i) => (
              <Reveal
                key={d}
                preset="up"
                delay={(i % 3) * 0.06}
                className="flex items-start gap-3 bg-surface p-7"
              >
                <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-gold" />
                <span className="font-sans text-[15px] text-text-primary">{d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* approach */}
      <section className="relative section-pad">
        <div className="shell">
          <Reveal preset="up">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="mono-label">{"Como abordamos"}</span>
            </div>
            <h2 className="text-h2 text-text-primary">O nosso método</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.approach.map((a, i) => (
              <Reveal
                key={a.n}
                preset="up"
                delay={i * 0.1}
                className="relative rounded-[6px] border border-line bg-surface/60 p-8"
              >
                <span className="font-display text-5xl font-bold text-gold/20">{a.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold text-text-primary">
                  {a.title}
                </h3>
                <p className="mt-2.5 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                  {a.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* tech + faq */}
      <section className="relative border-t border-line bg-bg-2/50 section-pad">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal preset="left">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="mono-label">{"Tecnologia"}</span>
            </div>
            <h2 className="text-h2 text-text-primary">Tecnologia que usamos</h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-[4px] border border-line bg-white/[0.02] px-3.5 py-2 font-mono text-[12.5px] text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal preset="right">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="mono-label">{"Dúvidas"}</span>
            </div>
            <div className="flex flex-col">
              {service.faq.map((f) => (
                <div key={f.q} className="border-b border-line py-5">
                  <p className="font-display text-[16px] font-semibold text-text-primary">
                    {f.q}
                  </p>
                  <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* next service */}
      <section className="relative border-t border-line section-pad">
        <div className="shell">
          <Reveal preset="up">
            <Link
              href={`/servicos/${next.slug}`}
              className="group flex flex-col items-start justify-between gap-6 rounded-[8px] border border-line bg-surface/60 p-8 transition-all duration-300 hover:border-gold/40 hover:bg-surface md:flex-row md:items-center md:p-10"
            >
              <div>
                <span className="mono-tiny text-text-muted">Próximo serviço</span>
                <p className="mt-2 font-display text-[clamp(24px,3vw,38px)] font-semibold text-text-primary transition-colors group-hover:text-gold">
                  {next.title}
                </p>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-[#0a0a0a]">
                <ArrowRight size={22} />
              </span>
            </Link>
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Button href="/contacto" variant="primary" size="lg">
              Iniciar este projeto <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <CTAFinal />
    </>
  );
}
