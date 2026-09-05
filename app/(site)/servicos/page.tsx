import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesList from "@/components/sections/ServicesList";
import CTAFinal from "@/components/sections/CTAFinal";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceCatalogSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Soluções completas de desenvolvimento e inteligência artificial: sistemas de IA, websites, e-commerce, chatbots, apps empresariais e consultoria.",
  alternates: { canonical: "https://pardus-lab.com/servicos" },
  openGraph: {
    title: "Serviços · Pardus Strategy Lab",
    description:
      "Soluções completas de desenvolvimento e inteligência artificial para empresas ambiciosas.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicosPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceCatalogSchema,
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
          ]),
        ]}
      />
      <PageHero
        title={<>O que <span className="accent-serif text-gold">construímos</span></>}
        subtitle="Seis frentes de trabalho, uma só equipa. Do site à inteligência artificial, tudo pensado para pôr o teu negócio a andar."
        meta={
          <p className="font-sans text-sm text-text-secondary">
            Seis frentes. <span className="text-text-primary">Uma equipa.</span>
          </p>
        }
      />
      <ServicesList />
      <CTAFinal />
    </>
  );
}
