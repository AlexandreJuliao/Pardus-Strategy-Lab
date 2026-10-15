import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import Calculadora from "@/components/calculadora/Calculadora";

// Calculadora de Crescimento Pardus. Página de anúncios, fora do chrome do
// site: sem cabeçalho nem rodapé (o grupo (lp) não tem layout próprio aqui), e
// as fontes do desenho aprovado (Bricolage Grotesque nos títulos, Space
// Grotesk no texto) carregadas só nesta página.
//
// Fica fora do índice do Google e do sitemap, como as outras landing pages:
// é a página para onde os anúncios mandam, não uma página que deva competir
// com o site nas pesquisas, e uma cópia indexada levaria visitas sem utm que
// o funil não conseguiria atribuir. O robots.txt NÃO a bloqueia, de propósito:
// o robô da Meta tem de a conseguir ler para aprovar os anúncios, e o Google
// só respeita o noindex se puder ler a página.

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-calc-display",
  display: "swap",
});

const texto = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-calc-sans",
  display: "swap",
});

const URL_PAGINA = "https://pardus-lab.com/calculadora";
const TITULO = "Calculadora de Crescimento Pardus · Quanto custa crescer o seu negócio?";
const DESCRICAO =
  "Saiba em 3 minutos quanto deve investir para crescer no digital: imagem, site, Google, anúncios e automações.";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRICAO,
  alternates: { canonical: URL_PAGINA },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: URL_PAGINA,
    siteName: "Pardus Strategy Lab",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3462",
};

export default function CalculadoraPage() {
  return (
    <div className={`${display.variable} ${texto.variable}`}>
      <Calculadora />
    </div>
  );
}
