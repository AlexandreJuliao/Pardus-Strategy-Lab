import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Serviços", href: "/servicos" },
      { label: "Projetos", href: "/projetos" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Sistemas de IA", href: "/servicos" },
      { label: "Websites", href: "/servicos" },
      { label: "E-commerce", href: "/servicos" },
      { label: "Apps Empresariais", href: "/servicos" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Link href="/" className="inline-block">
              <Logo size="lg" subtitle />
            </Link>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-text-secondary">
              Da ideia ao sistema inteligente. Criamos, construímos e
              acompanhamos — com gosto e proximidade.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              <span className="mono-tiny text-text-secondary">
                Disponível para novos projetos
              </span>
            </div>
          </div>

          {/* nav columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="mono-tiny mb-5 text-text-muted">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-sans text-sm text-text-secondary transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* contact */}
          <div>
            <p className="mono-tiny mb-5 text-text-muted">Contacto</p>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:geral@pardus-lab.com"
                  className="flex items-center gap-2.5 font-sans text-sm text-text-secondary transition-colors hover:text-gold"
                >
                  <Mail size={15} className="text-gold" />
                  geral@pardus-lab.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-sans text-sm text-text-secondary">
                <MapPin size={15} className="text-gold" />
                Lisboa, Portugal
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {["LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="group inline-flex items-center gap-1 rounded-[4px] border border-line px-3 py-1.5 mono-tiny text-text-secondary transition-colors hover:border-gold/40 hover:text-gold"
                >
                  {s}
                  <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="mono-tiny text-text-muted">
            © 2026 Pardus Strategy Lab · Feito com inteligência, em Lisboa.
          </p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Privacidade", href: "/privacidade" },
              { label: "Termos", href: "/termos" },
              { label: "Eliminação de dados", href: "/eliminacao-de-dados" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mono-tiny text-text-muted transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
