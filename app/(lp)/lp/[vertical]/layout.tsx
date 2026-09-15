import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";
import { getVertical, VERTICAL_SLUGS } from "@/lib/verticals";

export function generateStaticParams() {
  return VERTICAL_SLUGS.map((vertical) => ({ vertical }));
}

// Chrome próprio das landing pages: sem a navegação da agência, uma só ação.
// As LPs falam em Geist (títulos e texto), com o Bodoni itálico como acento.
export default function LpLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { vertical: string };
}) {
  const v = getVertical(params.vertical);
  if (!v) notFound();
  return (
    <div className={`${GeistSans.variable} lp-tipo`}>
      <LpHeader name={v.name} nameShort={v.nameShort} logo={v.logo} />
      <main>{children}</main>
      <LpFooter name={v.name} logo={v.logo} />
    </div>
  );
}
