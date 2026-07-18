import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Capabilities from "@/components/sections/Capabilities";
import StatementBand from "@/components/sections/StatementBand";
import Process from "@/components/sections/Process";
import StackTech from "@/components/sections/StackTech";
import TechShowcase from "@/components/sections/TechShowcase";
import Numbers from "@/components/sections/Numbers";
import WordmarkStrip from "@/components/sections/WordmarkStrip";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import WhyPardus from "@/components/sections/WhyPardus";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import LeadForm from "@/components/sections/LeadForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Marquee />
      <Services />
      <Capabilities />

      <StatementBand
        tone="gold"
        title={
          <>
            Precisão. Inteligência.{" "}
            <span className="accent-serif text-gold">Velocidade.</span>
          </>
        }
        sub="Três coisas que levamos para dentro de cada projeto."
      />

      <Process />
      <StackTech />
      <TechShowcase />
      <Numbers />

      <WordmarkStrip />

      <section id="projetos" className="relative section-pad">
        <div className="shell mb-12">
          <SectionHeader
            label="// Projetos"
            title={<>Sistemas reais, resultados reais</>}
            intro="Uma amostra do que construímos. Cada projeto, um problema resolvido."
          />
        </div>
        <ProjectsGrid showFilters={false} />
      </section>

      <WhyPardus />

      <StatementBand
        tone="blue"
        title={
          <>
            O próximo salto do teu negócio{" "}
            <span className="accent-serif text-gold">começa numa conversa.</span>
          </>
        }
        sub="Meia hora, sem custo. Olhamos para o que fazes e dizemos-te o que faz sentido."
        cta="Consultoria gratuita"
      />

      <Pricing />
      <FAQ />
      <About />
      <Team />
      <LeadForm />
    </>
  );
}
