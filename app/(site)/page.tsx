import "@/components/home/home.css";
import IntroHome from "@/components/home/IntroHome";
import HeroHome from "@/components/home/HeroHome";
import ManifestoHome from "@/components/home/ManifestoHome";
import MarqueeHome from "@/components/home/MarqueeHome";
import ServicosHome from "@/components/home/ServicosHome";
import CapacidadesHome from "@/components/home/CapacidadesHome";
import FaixaHome from "@/components/home/FaixaHome";
import ProcessoHome from "@/components/home/ProcessoHome";
import TecnologiaHome from "@/components/home/TecnologiaHome";
import AoVivoHome from "@/components/home/AoVivoHome";
import ProjetosHome from "@/components/home/ProjetosHome";
import PorqueHome from "@/components/home/PorqueHome";
import MarcacaoHome from "@/components/home/MarcacaoHome";
import PrecosHome from "@/components/home/PrecosHome";
import EquipaHome from "@/components/home/EquipaHome";
import FechoHome from "@/components/home/FechoHome";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import MobileContactFab from "@/components/layout/MobileContactFab";
import JsonLd from "@/components/seo/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  serviceCatalogSchema,
  faqSchema,
} from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/faq";

// «Ficamos presos à vossa tecnologia?» já tem resposta em grande na secção da
// equipa; aqui não se repete (nem no schema, que tem de bater com o ecrã).
const HOME_FAQ = FAQ_ITEMS.filter((i) => !i.q.startsWith("Ficamos presos"));

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema,
          websiteSchema,
          serviceCatalogSchema,
          faqSchema(HOME_FAQ),
        ]}
      />
      <IntroHome />
      <HeroHome />
      <ManifestoHome />
      <MarqueeHome />
      <ServicosHome />
      <CapacidadesHome />
      <FaixaHome />
      <ProcessoHome />
      <TecnologiaHome />
      <AoVivoHome />
      <ProjetosHome />
      <PorqueHome />
      <MarcacaoHome />
      <PrecosHome />
      <EquipaHome />
      <FAQ
        items={HOME_FAQ}
        layout="center"
        title={
          <>
            Perguntas <span className="accent-serif text-gold">frequentes</span>
          </>
        }
      />
      <LeadForm layout="center" />
      <FechoHome />
      <MobileContactFab />
    </>
  );
}
