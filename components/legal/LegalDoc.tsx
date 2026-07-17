import PageHero from "@/components/sections/PageHero";
import { LEGAL } from "@/lib/legal";

export type LegalSection = { id: string; title: string; content: React.ReactNode };

export default function LegalDoc({
  label,
  title,
  subtitle,
  sections,
  updated = LEGAL.lastUpdated,
}: {
  label: string;
  title: string;
  subtitle?: string;
  sections: LegalSection[];
  updated?: string;
}) {
  const n = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <PageHero label={label} title={title} subtitle={subtitle} />

      <section className="section-pad">
        <div className="shell">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[220px_1fr] lg:gap-20">
            {/* Índice */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono-label mb-5">Índice</p>
              <nav className="flex flex-col gap-3 border-l border-line pl-4">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex gap-2.5 font-sans text-sm leading-snug text-text-secondary transition-colors hover:text-gold"
                  >
                    <span className="mono-tiny pt-0.5 text-text-muted transition-colors group-hover:text-gold">
                      {n(i)}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
              <p className="mono-tiny mt-8 text-text-muted">
                Atualizado · {updated}
              </p>
            </aside>

            {/* Corpo */}
            <div className="min-w-0 max-w-[68ch]">
              <div className="legal-prose space-y-14">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <div className="mb-5 flex items-baseline gap-3">
                      <span className="mono-tiny text-gold">{n(i)}</span>
                      <h2 className="text-h3 text-text-primary">{s.title}</h2>
                    </div>
                    <div className="space-y-4 text-[15px] leading-[1.75] text-text-secondary">
                      {s.content}
                    </div>
                  </section>
                ))}
              </div>

              <div className="rule-gold mb-8 mt-16" />
              <p className="text-sm leading-relaxed text-text-muted">
                Dúvidas sobre este documento ou sobre os teus dados? Escreve para{" "}
                <a
                  href={`mailto:${LEGAL.privacyEmail}`}
                  className="text-gold underline underline-offset-2 hover:text-gold-bright"
                >
                  {LEGAL.privacyEmail}
                </a>
                . Respondemos no prazo legal (até 30 dias).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
