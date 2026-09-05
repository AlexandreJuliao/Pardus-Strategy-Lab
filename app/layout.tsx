import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Cormorant, Bodoni_Moda } from "next/font/google";
import "../styles/globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Analytics from "@/components/Analytics";

// Uma só grotesca para títulos e texto, com o contraste a vir do peso e da
// escala. Schibsted Grotesk é um tipo editorial nórdico: tem carácter nas
// terminações e aguenta tracking apertado em display, sem a assinatura de
// "ferramenta de IA" que Space Grotesk e Bricolage carregam.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Wordmark serif — o logótipo oficial "PARDUS.", intocado.
const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-wordmark",
  display: "swap",
});

// Acento de assinatura — o Didone da marca. Bodoni Moda é um Didot a sério
// (contraste alto, serifas finas), mais fiel ao guia do que o Playfair e
// muito menos gasto na web. Uma palavra por headline, dourada.
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://pardus-lab.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pardus Strategy Lab · Instinto digital para o teu negócio",
    template: "%s · Pardus Strategy Lab",
  },
  description:
    "Agência de IA e desenvolvimento web em Portugal. Sistemas de IA, websites, e-commerce, chatbots e apps empresariais. Da ideia ao sistema inteligente.",
  keywords: [
    "IA",
    "inteligência artificial",
    "desenvolvimento web",
    "Next.js",
    "chatbots",
    "automação",
    "e-commerce",
    "agência",
    "Portugal",
    "Lisboa",
  ],
  authors: [{ name: "Pardus Strategy Lab" }],
  creator: "Pardus Strategy Lab",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: "Pardus Strategy Lab",
    title: "Pardus Strategy Lab · Instinto digital para o teu negócio",
    description:
      "Da ideia ao sistema inteligente: criamos sites, inteligência artificial e automação, e ficamos contigo até funcionar.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Pardus Strategy Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pardus Strategy Lab",
    description: "Instinto digital para o teu negócio: IA, sites e automação, feitos para caçar resultados.",
    images: ["/img/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    other: {
      "facebook-domain-verification": "dbwpr2ak7grpb1xt3m0ey86ya2jxOv",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#05070e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-PT"
      className={`${schibsted.variable} ${cormorant.variable} ${bodoni.variable}`}
    >
      <body>
        <Analytics />
        <SmoothScroll />
        <div className="grain-fixed" aria-hidden />
        {children}
      </body>
    </html>
  );
}
