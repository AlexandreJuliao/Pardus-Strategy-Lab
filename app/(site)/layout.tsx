import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";

// Chrome do site público (nav + rodapé). As landing pages por vertical vivem
// no grupo (lp) e têm o seu próprio cabeçalho mínimo — ver app/(lp)/layout.tsx.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
