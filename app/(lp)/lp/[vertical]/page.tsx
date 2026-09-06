import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LpHero from "@/components/lp/LpHero";
import LpStats from "@/components/lp/LpStats";
import LpBento from "@/components/lp/LpBento";
import LpOrganic from "@/components/lp/LpOrganic";
import LpExtras from "@/components/lp/LpExtras";
import LpFeatures from "@/components/lp/LpFeatures";
import LpProcess from "@/components/lp/LpProcess";
import LpPricing from "@/components/lp/LpPricing";
import StatementBand from "@/components/sections/StatementBand";
import FAQ from "@/components/sections/FAQ";
import LeadForm from "@/components/sections/LeadForm";
import MobileContactFab from "@/components/layout/MobileContactFab";
import { getVertical, verticalUrl } from "@/lib/verticals";

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

export default function VerticalPage({ params }: Props) {
  const v = getVertical(params.vertical);
  if (!v) notFound();

  return (
    <>
      <LpHero v={v} />
      <LpStats stats={v.stats} />
      <LpBento
        v={v}
        title={<>O que vem no teu <span className="accent-serif text-gold">site</span></>}
        intro="Quatro coisas que vão dentro de todos os sites que fazemos. São elas que trazem os pedidos."
      />
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
      <LpOrganic v={v} />
      <LpFeatures v={v} />
      <LpProcess v={v} />
      <LpPricing v={v} />
      <LpExtras v={v} />
      <FAQ items={v.faq} intro="O que nos perguntam antes de começar." />
      <LeadForm
        origem={v.origem}
        label="Consultoria gratuita"
        title={<>{v.form.title.split(" ").slice(0, -1).join(" ")} <span className="text-gold">{v.form.title.split(" ").slice(-1)}</span></>}
        intro={v.form.intro}
        formTitle="Marcar a minha consultoria"
        cta={v.form.cta}
        negocioPlaceholder={v.form.negocioPlaceholder}
      />
      <MobileContactFab />
    </>
  );
}
