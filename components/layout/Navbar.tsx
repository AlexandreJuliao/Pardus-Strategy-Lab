"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

const CTA_LABEL = "Consultoria gratuita";
const ctaCls =
  "group inline-flex items-center gap-1.5 rounded-[4px] border border-gold/70 px-4 py-2 font-sans text-sm text-gold transition-all duration-200 ease-premium hover:bg-gold hover:text-[#0a0a0a]";

const NAV_LINKS = [
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // On the homepage the hero is a tall pinned section — keep the header
    // transparent over it and only reveal the background once it's behind us.
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.9 : 80;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="group transition-opacity duration-200 hover:opacity-80"
          onClick={() => setOpen(false)}
          aria-label="Pardus, início"
        >
          <Logo size="md" />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative font-sans text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 ease-premium group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          {isHome ? (
            <button
              type="button"
              onClick={() => scrollToId(CTA_TARGET_ID)}
              className={ctaCls}
            >
              {CTA_LABEL}
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <Link href="/contacto" className={ctaCls}>
              {CTA_LABEL}
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <button
          className="text-text-primary md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-xs flex-col gap-1 border-l border-line bg-surface p-8 pt-24 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 font-display text-xl text-text-primary transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              {isHome ? (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    // let the drawer close (and body scroll unlock) first
                    setTimeout(() => scrollToId(CTA_TARGET_ID), 340);
                  }}
                  className="mt-8 rounded-[4px] bg-gold px-4 py-3.5 text-center font-sans text-sm font-medium text-[#0a0a0a]"
                >
                  {CTA_LABEL} →
                </button>
              ) : (
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="mt-8 rounded-[4px] bg-gold px-4 py-3.5 text-center font-sans text-sm font-medium text-[#0a0a0a]"
                >
                  {CTA_LABEL} →
                </Link>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
