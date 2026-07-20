import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Obrigado",
  description: "Recebemos o teu pedido. Entramos em contacto em menos de 24 horas.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://pardus-lab.com/obrigado" },
};

export default function ObrigadoPage() {
  return (
    <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden section-pad">
      <div className="shell relative z-10 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold gold-glow">
          <Check size={40} strokeWidth={2.4} className="text-gold" />
        </div>

        <p className="mono-label mt-8 text-gold">{"// Pedido recebido"}</p>

        <h1 className="mt-4 font-display text-[clamp(38px,7vw,68px)] font-semibold leading-[1.04] text-text-primary">
          Obrigado. Já está{" "}
          <span className="accent-serif text-gold">connosco.</span>
        </h1>

        <p className="hero-sub mt-6 max-w-xl text-base">
          Recebemos o teu pedido e entramos em contacto em{" "}
          <span className="text-text-primary">menos de 24 horas</span> (dias
          úteis) para marcar a tua consultoria gratuita. Sem custo, sem
          compromisso, sem guiões de vendas.
        </p>

        <p className="mt-4 max-w-md font-sans text-sm text-text-secondary">
          Entretanto, se for urgente, escreve-nos direto para{" "}
          <a
            href="mailto:geral@pardus-lab.com"
            className="text-gold underline-offset-4 hover:underline"
          >
            geral@pardus-lab.com
          </a>
          .
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn-shine group inline-flex items-center justify-center gap-2 rounded-[4px] bg-gold px-7 py-3.5 font-sans font-medium text-[#0a0a0a] shadow-[0_10px_30px_-16px_rgba(212,175,96,0.6)] transition-all duration-200 ease-premium hover:bg-gold-bright hover:-translate-y-0.5"
          >
            Voltar ao início
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-1.5 mono-label text-text-secondary transition-colors hover:text-gold"
          >
            Ver projetos
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
