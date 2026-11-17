import type { MetadataRoute } from "next";
import { SERVICE_SLUGS } from "@/lib/services";
import { PROJECT_SLUGS } from "@/lib/projects";

const SITE_URL = "https://www.pardus-lab.com";

// Data da última mudança de conteúdo de cada página, à mão. Antes ia a hora do
// build em todas, e o Google deixa de confiar no lastmod de um sitemap que diz
// que tudo mudou a cada deploy. Ao mexer no texto de uma página, atualiza aqui.
const ATUALIZADO = {
  home: "2026-10-15",
  servicos: "2026-09-05",
  projetos: "2026-09-05",
  projeto: "2026-11-17",
  contacto: "2026-09-30",
  privacidade: "2026-11-17",
  legal: "2026-10-14",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: ATUALIZADO.home, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicos`, lastModified: ATUALIZADO.servicos, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projetos`, lastModified: ATUALIZADO.projetos, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contacto`, lastModified: ATUALIZADO.contacto, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacidade`, lastModified: ATUALIZADO.privacidade, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/termos`, lastModified: ATUALIZADO.legal, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/eliminacao-de-dados`, lastModified: ATUALIZADO.legal, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/servicos/${slug}`,
    lastModified: ATUALIZADO.servicos,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/projetos/${slug}`,
    lastModified: ATUALIZADO.projeto,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
