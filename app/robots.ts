import type { MetadataRoute } from "next";

const SITE_URL = "https://pardus-lab.com";

// Backoffice e portais de cliente vivem noutro subdomínio (office.pardus-lab.com);
// aqui bloqueamos só o que não deve ser indexado no site público.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/obrigado"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
