import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Calendar, ArrowUpRight, Clock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Vamos construir algo juntos. Conta-nos o teu projeto. Respondemos em menos de 24 horas. Pardus Strategy Lab, Lisboa, Portugal.",
  alternates: { canonical: "https://pardus-lab.com/contacto" },
  openGraph: {
    title: "Contacto · Pardus Strategy Lab",
    description: "Vamos construir algo juntos.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title={<>Vamos falar do <span className="accent-serif text-gold">teu negócio.</span></>}
        meta={
          <p className="font-sans text-sm text-text-secondary">
            Resposta em <span className="text-text-primary">24h</span> · Lisboa
          </p>
        }
      />

      <section className="relative section-pad">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* info */}
            <div>
              <p className="hero-sub max-w-md text-base">
                A primeira conversa é uma consultoria gratuita: olhamos para o
                que fazes e dizemos-te onde a tecnologia pode ajudar, e onde
                não vale a pena. Sem custo, sem compromisso e sem guiões de
                vendas.
              </p>

              <div className="mt-10 space-y-5">
                <a
                  href="mailto:geral@pardus-lab.com"
                  className="group flex items-center gap-4 text-text-secondary transition-colors hover:text-text-primary"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold transition-colors group-hover:border-gold/40">
                    <Mail size={18} />
                  </span>
                  <span className="font-sans text-[15px]">geral@pardus-lab.com</span>
                </a>

                <div className="flex items-center gap-4 text-text-secondary">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                    <MapPin size={18} />
                  </span>
                  <span className="font-sans text-[15px]">Lisboa, Portugal</span>
                </div>

                <div className="flex items-center gap-4 text-text-secondary">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                    <Clock size={18} />
                  </span>
                  <span className="font-sans text-[15px]">Resposta &lt; 24h · Seg–Sex</span>
                </div>
              </div>

              <div className="rule-gold my-9 max-w-md" />

              <a
                href="mailto:geral@pardus-lab.com?subject=Quero%20marcar%20uma%20chamada"
                className="group flex items-center gap-4 text-text-secondary transition-colors hover:text-text-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold transition-colors group-hover:border-gold/40">
                  <Calendar size={18} />
                </span>
                <span className="font-sans text-[15px]">
                  Preferes uma chamada?{" "}
                  <span className="text-gold underline-offset-4 group-hover:underline">
                    Diz-nos e ligamos-te.
                  </span>
                </span>
              </a>

              <div className="mt-10 flex items-center gap-3">
                {["LinkedIn", "GitHub"].map((s) => (
                  <Link
                    key={s}
                    href="#"
                    className="group inline-flex items-center gap-1.5 rounded-[4px] border border-line px-4 py-2 mono-tiny text-text-secondary transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {s}
                    <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
