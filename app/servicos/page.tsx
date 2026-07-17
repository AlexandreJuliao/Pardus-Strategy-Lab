import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServicesList from "@/components/sections/ServicesList";
import CTAFinal from "@/components/sections/CTAFinal";

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
      <PageHero
        label="// SERVIÇOS"
        title="O que construímos"
        subtitle="Tudo o que fazemos para pôr o teu negócio a crescer com tecnologia e inteligência artificial."
      />
      <ServicesList />
      <CTAFinal />
    </>
  );
}
