import type { Metadata } from "next";
import LegalDoc from "@/components/legal/LegalDoc";
import { SECCOES_PRIVACIDADE } from "@/components/legal/privacidade";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Pardus recolhe, usa e protege dados pessoais: website, plataforma de gestão e integrações com Meta (Facebook/Instagram), LinkedIn e TikTok. RGPD.",
  alternates: { canonical: `${LEGAL.site}/privacidade` },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalDoc
      label="// Legal"
      title="Política de Privacidade"
      subtitle="Como recolhemos, usamos e protegemos dados pessoais, com transparência e em conformidade com o RGPD."
      sections={SECCOES_PRIVACIDADE}
    />
  );
}
