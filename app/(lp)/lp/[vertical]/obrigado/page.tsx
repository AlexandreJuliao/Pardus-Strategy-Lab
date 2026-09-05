import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import { getVertical, verticalUrl, ROOT_DOMAIN } from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Obrigado",
  robots: { index: false, follow: false },
};

export default function LpObrigado({ params }: { params: { vertical: string } }) {
  const v = getVertical(params.vertical);
  if (!v) notFound();
  return (
    <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden section-pad">
      <div className="shell relative z-10 flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold gold-glow">
          <Check size={40} strokeWidth={2.4} className="text-gold" />
        </div>
        <p className="mono-label mt-8 text-gold">Pedido recebido</p>
        <h1 className="mt-4 font-display text-[clamp(38px,7vw,68px)] font-semibold leading-[1.04] text-text-primary">
          Obrigado. Já está <span className="accent-serif text-gold">connosco.</span>
        </h1>
        <p className="hero-sub mt-6 max-w-xl text-base">
          Entramos em contacto em <span className="text-text-primary">menos de 24 horas</span> (dias
          úteis) para marcar a tua consultoria gratuita. Sem custo, sem compromisso.
        </p>
        <p className="mt-4 max-w-md font-sans text-sm text-text-secondary">
          Se for urgente, escreve para{" "}
          <a href="mailto:geral@pardus-lab.com" className="text-gold underline-offset-4 hover:underline">
            geral@pardus-lab.com
          </a>
          .
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={verticalUrl(v.slug)}
            className="btn-shine group inline-flex items-center justify-center gap-2 rounded-[4px] bg-gold px-7 py-3.5 font-sans font-medium text-[#0a0a0a] transition-all duration-200 ease-premium hover:bg-gold-bright hover:-translate-y-0.5"
          >
            Voltar
          </a>
          <a
            href={`https://${ROOT_DOMAIN}/projetos`}
            className="group inline-flex items-center gap-1.5 mono-label text-text-secondary transition-colors hover:text-gold"
          >
            Ver o que já fizemos
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
