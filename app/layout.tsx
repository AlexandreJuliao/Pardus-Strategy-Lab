import type { Metadata } from "next";
import {
  Space_Grotesk,
  Bricolage_Grotesque,
  Cormorant,
  Playfair_Display,
} from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Kickers, labels e números usam Space Grotesk (regra das 2 fontes) — a
// variável mantém o nome por compat com as classes .mono-* existentes.

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Wordmark serif — matches the official "PARDUS." logotype
const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-wordmark",
  display: "swap",
});

// Signature accent — Didone italic (Didot da marca; Playfair é o corte web
// equivalente, o mesmo usado nos posts). Uma palavra por headline, dourada.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://pardus-lab.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pardus Strategy Lab — Instinto digital para o teu negócio",
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
    title: "Pardus Strategy Lab — Instinto digital para o teu negócio",
    description:
      "Da ideia ao sistema inteligente — criamos sites, inteligência artificial e automação, e ficamos contigo até funcionar.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Pardus Strategy Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pardus Strategy Lab",
    description: "Instinto digital para o teu negócio — IA, sites e automação, feitos para caçar resultados.",
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
  verification: {
    other: {
      "facebook-domain-verification": "dbwpr2ak7grpb1xt3m0ey86ya2jxOv",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-PT"
      className={`${spaceGrotesk.variable} ${bricolage.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <div className="grain-fixed" aria-hidden />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
