import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LpHero from "@/components/lp/LpHero";
import LpStats from "@/components/lp/LpStats";
import LpBento from "@/components/lp/LpBento";
import LpOrganic from "@/components/lp/LpOrganic";
import LpMarkets from "@/components/lp/LpMarkets";
import LpAutomations from "@/components/lp/LpAutomations";
import LpExtras from "@/components/lp/LpExtras";
import LpFeatures from "@/components/lp/LpFeatures";
import LpProcess from "@/components/lp/LpProcess";
import LpPricing from "@/components/lp/LpPricing";
import StatementBand from "@/components/sections/StatementBand";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import MobileContactFab from "@/components/layout/MobileContactFab";
import { getVertical, verticalUrl, type Vertical } from "@/lib/verticals";

type Props = { params: { vertical: string } };

export function generateMetadata({ params }: Props): Metadata {
  const v = getVertical(params.vertical);
  if (!v) return {};
  const url = verticalUrl(v.slug);
  return {
    title: { absolute: v.seo.title },
    description: v.seo.description,
    alternates: { canonical: url },
    // LP de anúncios: não compete com o site principal no Google.
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "pt_PT",
      url,
      siteName: `PARDUS. ${v.name}`,
      title: v.seo.title,
      description: v.seo.description,
      images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: `PARDUS. ${v.name}` }],
    },
  };
}

/** A frase de fecho ganha a última palavra a dourado. */
function Titulo({ texto }: { texto: string }) {
  const partes = texto.split(" ");
  return (
    <>
      {partes.slice(0, -1).join(" ")} <span className="text-gold">{partes.slice(-1)}</span>
    </>
  );
}

function Banda({ v }: { v: Vertical }) {
  return (
    <StatementBand
      tone="gold"
      title={
        <>
          {v.statement.pre} <span className="accent-serif text-gold">{v.statement.accent}</span>
          {v.statement.post && <> {v.statement.post}</>}
        </>
      }
      sub={v.statement.sub}
    />
  );
}

export default function VerticalPage({ params }: Props) {
  const v = getVertical(params.vertical);
  if (!v) notFound();

  // Cada vertical monta o seu esqueleto. O herói, os números, o bento, a
  // banda, o processo, o investimento, o aparte, as perguntas e o formulário
  // são comuns; o meio da página é o que muda — nos Websites é o Google e o
  // pedido a chegar ao telemóvel; nos Softwares são os mercados e o que o
  // sistema faz sozinho.
  const meio =
    v.template === "softwares" ? (
      <>
        <LpMarkets v={v} />
        <LpAutomations v={v} />
      </>
    ) : (
      <>
        <LpOrganic v={v} />
        <LpFeatures v={v} />
      </>
    );

  const bento =
    v.template === "softwares"
      ? {
          title: (
            <>
              O que vai dentro da tua <span className="accent-serif text-gold">plataforma</span>
            </>
          ),
          intro:
            "Módulos que já construímos e que se adaptam à tua operação. São eles que tiram o trabalho das folhas de cálculo e das mensagens soltas.",
        }
      : {
          title: (
            <>
              O que vem no teu <span className="accent-serif text-gold">site</span>
            </>
          ),
          intro: "Quatro coisas que vão dentro de todos os sites que fazemos. São elas que trazem os pedidos.",
        };

  return (
    <>
      <LpHero v={v} />
      <LpStats stats={v.stats} />
      <LpBento v={v} title={bento.title} intro={bento.intro} />
      <Banda v={v} />
      {meio}
      <LpProcess
        v={v}
        intro={
          v.template === "softwares"
            ? "Três passos, com o preço de cada módulo fechado no primeiro."
            : "Três passos, com o preço fechado logo no primeiro."
        }
      />
      <LpPricing v={v} />
      <LpExtras v={v} />
      <FAQ items={v.faq} intro="O que nos perguntam antes de começar." />
      <LeadForm
        origem={v.origem}
        label="Consultoria gratuita"
        title={<Titulo texto={v.form.title} />}
        intro={v.form.intro}
        formTitle={v.template === "softwares" ? "Marcar o mapeamento" : "Marcar a minha consultoria"}
        cta={v.form.cta}
        negocioPlaceholder={v.form.negocioPlaceholder}
      />
      <MobileContactFab />
    </>
  );
}
