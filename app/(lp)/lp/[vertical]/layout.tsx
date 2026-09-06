import { notFound } from "next/navigation";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";
import { getVertical, VERTICAL_SLUGS } from "@/lib/verticals";

export function generateStaticParams() {
  return VERTICAL_SLUGS.map((vertical) => ({ vertical }));
}

// Chrome próprio das landing pages: sem a navegação da agência, uma só ação.
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
    <>
      <LpHeader name={v.name} logo={v.logo} />
      <main>{children}</main>
      <LpFooter name={v.name} logo={v.logo} />
    </>
  );
}
