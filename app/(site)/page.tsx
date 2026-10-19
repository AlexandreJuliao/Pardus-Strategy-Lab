import "@/components/home/home.css";
import IntroHome from "@/components/home/IntroHome";
import HeroHome from "@/components/home/HeroHome";
import MarqueeHome from "@/components/home/MarqueeHome";
import ServicosHome from "@/components/home/ServicosHome";
import CapacidadesHome from "@/components/home/CapacidadesHome";
import FaixaHome from "@/components/home/FaixaHome";
import ProjetosHome from "@/components/home/ProjetosHome";
import CompromissosHome from "@/components/home/CompromissosHome";
import MarcacaoHome from "@/components/home/MarcacaoHome";
import PrecosHome from "@/components/home/PrecosHome";
import FechoHome from "@/components/home/FechoHome";
import ContactoHome from "@/components/home/ContactoHome";
import MobileContactFab from "@/components/layout/MobileContactFab";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema, serviceCatalogSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, serviceCatalogSchema]} />
      <IntroHome />
      <HeroHome />
      <MarqueeHome />
      <ServicosHome />
      <CapacidadesHome />
      <FaixaHome />
      <ProjetosHome />
      <CompromissosHome />
      <MarcacaoHome />
      <PrecosHome />
      <ContactoHome />
      <FechoHome />
      <MobileContactFab />
    </>
  );
}
