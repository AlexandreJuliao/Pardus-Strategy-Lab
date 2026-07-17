/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run separately; don't fail production builds on lint warnings.
    ignoreDuringBuilds: true,
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
};

export default nextConfig;
