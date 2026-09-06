"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LpLockup from "@/components/lp/LpLockup";
import CtaButton from "@/components/ui/CtaButton";
import { ROOT_DOMAIN } from "@/lib/verticals";

/** Cabeçalho mínimo das landing pages: lockup da vertical + uma só ação. */
export default function LpHeader({ name, logo }: { name: string; logo?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-[72px]">
        <LpLockup name={name} src={logo} height={34} />
        <div className="flex items-center gap-5">
          <a
            href={`https://${ROOT_DOMAIN}`}
            className="group hidden items-center gap-1 font-sans text-[13px] text-text-secondary transition-colors hover:text-text-primary md:inline-flex"
          >
            Tudo o que fazemos
            <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <CtaButton variant="outline" size="md">
            Consultoria gratuita
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
