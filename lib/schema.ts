// schema.org builders — fonte única da structured data (JSON-LD) do site.
// Usa dados reais de lib/legal.ts para bater com as páginas legais e a verificação Meta.
import { LEGAL } from "@/lib/legal";
import { SERVICES } from "@/lib/services";

const SITE = "https://pardus-lab.com";
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

// ProfessionalService = subtipo de LocalBusiness, adequado a uma agência.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: LEGAL.tradeName,
  alternateName: "Pardus",
  legalName: LEGAL.legalName,
  url: SITE,
  logo: `${SITE}/icon-512.png`,
  image: `${SITE}/img/og.jpg`,
  description:
    "Agência de IA e desenvolvimento web em Portugal. Sistemas de IA, websites, e-commerce, chatbots e apps empresariais.",
  email: LEGAL.contactEmail,
  telephone: LEGAL.phone,
  vatID: LEGAL.nif,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisboa",
    addressRegion: "Lisboa",
    addressCountry: "PT",
  },
  areaServed: [
    { "@type": "Country", name: "Portugal" },
    { "@type": "AdministrativeArea", name: "União Europeia" },
  ],
  founder: {
    "@type": "Person",
    name: "Alexandre Julião",
    jobTitle: "Fundador & CEO",
  },
  knowsAbout: [
    "Inteligência Artificial",
    "Desenvolvimento Web",
    "E-commerce",
    "Chatbots",
    "Automação de processos",
    "Next.js",
  ],
  availableLanguage: ["pt-PT", "en"],
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: LEGAL.tradeName,
  inLanguage: "pt-PT",
  publisher: { "@id": ORG_ID },
} as const;

/** Catálogo de serviços (OfferCatalog) — reforça o leque de serviços da agência. */
export const serviceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Serviços Pardus Strategy Lab",
  itemListElement: SERVICES.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      url: `${SITE}/servicos/${s.slug}`,
    },
  })),
} as const;

export function serviceSchema(s: {
  slug: string;
  title: string;
  short: string;
  intro: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.short,
    url: `${SITE}/servicos/${s.slug}`,
    serviceType: s.title,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Portugal" },
  };
}

export function projectSchema(p: {
  slug: string;
  name: string;
  description: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.description,
    url: `${SITE}/projetos/${p.slug}`,
    ...(p.category ? { genre: p.category } : {}),
    creator: { "@id": ORG_ID },
    inLanguage: "pt-PT",
  };
}

/** Migalhas — array de {name, path} da raiz até à página atual. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

/** FAQPage — para a secção de perguntas frequentes da homepage. */
export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
