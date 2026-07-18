import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import CTAFinal from "@/components/sections/CTAFinal";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Sistemas reais, resultados mensuráveis. Projetos de IA, automação, websites, e-commerce e apps empresariais da Pardus Strategy Lab.",
  alternates: { canonical: "https://pardus-lab.com/projetos" },
  openGraph: {
    title: "Projetos · Pardus Strategy Lab",
    description: "Sistemas reais. Resultados mensuráveis.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
  },
};

export default function ProjetosPage() {
  return (
    <>
      <PageHero
        title={<>Coisas reais, <span className="accent-serif text-gold">a funcionar.</span></>}
        subtitle="Uma amostra do que já construímos para negócios como o teu. Sem nomes, só o que ficou a trabalhar todos os dias."
        meta={
          <p className="font-sans text-sm text-text-secondary">
            Amostra de <span className="text-text-primary">5 projetos</span>
          </p>
        }
      />
      <ProjectsGrid />
      <CTAFinal />
    </>
  );
}
