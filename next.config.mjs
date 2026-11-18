/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run separately; don't fail production builds on lint warnings.
    ignoreDuringBuilds: true,
  },
  // A cache de build que a Vercel restaura trouxe para produção o CSS antigo do
  // next/font (18/11/2026): o HTML pedia a classe de fonte nova e o CSS só tinha
  // a antiga, e o site caiu para Times. Sem cache do webpack no build de produção,
  // cada build gera o CSS de raiz (custa uns segundos). O `next dev` não muda.
  webpack: (config, { dev }) => {
    if (!dev) config.cache = false;
    return config;
  },
  // Backoffice/agenda migrou para office.pardus-lab.com. Links de cliente antigos
  // (portais) que ainda batam no domínio público são reencaminhados para lá,
  // para não partirem bookmarks partilhados antes da migração.
  async redirects() {
    return [
      { source: "/portal/:path*", destination: "https://office.pardus-lab.com/portal/:path*", permanent: false },
      { source: "/team-portal/:path*", destination: "https://office.pardus-lab.com/team-portal/:path*", permanent: false },
    ];
  },
  // O site nunca definiu cabeçalhos de segurança e o alojamento não os põe por
  // omissão, por isso saíam em falta em todas as respostas. Ficam aqui, e não no
  // middleware, porque o matcher do middleware deixa de fora as estáticas
  // (_next, img, tudo o que tenha ponto) — estes têm de valer para tudo.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Impede o browser de adivinhar o tipo do conteúdo (sniffing).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Contra clickjacking: X-Frame-Options para os browsers antigos e
          // frame-ancestors para os atuais. O site não é embebido em lado
          // nenhum (não há iframes no código), por isso 'self' não parte nada.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
