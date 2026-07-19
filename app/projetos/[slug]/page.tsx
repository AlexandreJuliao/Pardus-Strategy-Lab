import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROJECTS, PROJECT_SLUGS, getProject } from "@/lib/projects";
import Reveal from "@/components/ui/Reveal";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CTAFinal from "@/components/sections/CTAFinal";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `https://pardus-lab.com/projetos/${p.slug}` },
    openGraph: {
      title: `${p.name} · Pardus Strategy Lab`,
      description: p.tagline,
      images: [{ url: p.image, width: 1200, height: 630 }],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-bg-2 pb-16 pt-36 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 80% 0%, rgba(46,84,132,0.17), transparent 60%), radial-gradient(560px 400px at 6% 100%, rgba(212,175,96,0.08), transparent 60%)",
          }}
        />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
        <AuroraGlow variant="services" />
        <div className="shell relative z-10">
          <Reveal preset="fade">
            <Link
              href="/projetos"
              className="group inline-flex items-center gap-2 mono-tiny text-text-secondary transition-colors hover:text-gold"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Todos os projetos
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <Reveal preset="up" delay={0.05}>
                <span className="mb-5 flex items-center gap-3">
                  <span className="block h-px w-10 bg-gold/50" />
                  <span className="mono-tiny text-gold">{project.category}</span>
                </span>
              </Reveal>
              <Reveal preset="up" delay={0.1}>
                <h1 className="text-display text-text-primary [text-wrap:balance]">
                  {project.name}
                </h1>
              </Reveal>
              <Reveal preset="up" delay={0.16}>
                <p className="mt-4 accent-serif text-[clamp(20px,2.2vw,30px)] text-gold [text-wrap:balance]">
                  {project.tagline}
                </p>
              </Reveal>
              <Reveal preset="up" delay={0.22}>
                <p className="hero-sub mt-6 max-w-2xl [text-wrap:pretty]">{project.intro}</p>
              </Reveal>
            </div>

            <Reveal preset="scale" delay={0.2}>
              <div className="relative h-52 w-full overflow-hidden rounded-[10px] border border-line md:h-64 md:w-64">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-2/50 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* outcomes */}
      <section className="bg-bg">
        <div className="shell grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {project.outcomes.map((o, i) => (
            <Reveal key={i} preset="up" delay={i * 0.08} className="px-2 py-10 text-center">
              <span className="font-display text-[clamp(28px,3.4vw,44px)] font-semibold text-gold">
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
        <div className="shell">
          <Reveal preset="up" className="mx-auto max-w-3xl text-center">
            <span className="mx-auto mb-5 block h-px w-10 bg-gold/50" />
            <h2 className="text-h2 text-text-primary">O problema que resolvemos</h2>
            <p className="mt-6 font-sans text-[16px] leading-relaxed text-text-secondary [text-wrap:pretty]">
              {project.problem}
            </p>
          </Reveal>
        </div>
      </section>

      {/* built */}
      <section className="relative bg-bg-2/50 section-pad">
        <div className="shell">
          <Reveal preset="up">
            <span className="mb-5 block h-px w-10 bg-gold/50" />
            <h2 className="text-h2 text-text-primary">O que construímos</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {project.builtItems.map((d, i) => (
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
            <span className="mb-5 block h-px w-10 bg-gold/50" />
            <h2 className="text-h2 text-text-primary">Como abordámos</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {project.approach.map((a, i) => (
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

      {/* tech */}
      <section className="relative bg-bg-2/50 section-pad">
        <div className="shell">
          <Reveal preset="left">
            <span className="mb-5 block h-px w-10 bg-gold/50" />
            <h2 className="text-h2 text-text-primary">Tecnologia que usámos</h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-[4px] border border-line bg-white/[0.02] px-3.5 py-2 font-mono text-[12.5px] text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* next project */}
      <section className="relative section-pad">
        <div className="shell">
          <Reveal preset="up">
            <Link
              href={`/projetos/${next.slug}`}
              className="group flex flex-col items-start justify-between gap-6 rounded-[8px] border border-line bg-surface/60 p-8 transition-all duration-300 hover:border-gold/40 hover:bg-surface md:flex-row md:items-center md:p-10"
            >
              <div>
                <span className="mono-tiny text-text-muted">Próximo projeto</span>
                <p className="mt-2 font-display text-[clamp(24px,3vw,38px)] font-semibold text-text-primary transition-colors group-hover:text-gold">
                  {next.name}
                </p>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-[#0a0a0a]">
                <ArrowRight size={22} />
              </span>
            </Link>
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Button href="/contacto" variant="primary" size="lg">
              Quero um projeto assim <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <CTAFinal />
    </>
  );
}
