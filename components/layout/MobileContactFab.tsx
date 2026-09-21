"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

/**
 * Botão flutuante, só no telemóvel, encostado à direita. Leva direto ao
 * formulário.
 *
 * Aparece e desaparece por duas razões, ambas de não tapar o que interessa:
 * no herói o botão do cabeçalho está à vista e o convite a descer vive no
 * mesmo canto, por isso só entra depois da primeira dobra; e desaparece
 * outra vez quando o formulário já está no ecrã.
 */
export default function MobileContactFab({ label = "Consultoria grátis" }: { label?: string }) {
  const [noForm, setNoForm] = useState(false);
  const [passouHeroi, setPassouHeroi] = useState(false);

  useEffect(() => {
    const el = document.getElementById(CTA_TARGET_ID);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNoForm(entry.isIntersecting), {
      rootMargin: "-20% 0px -20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setPassouHeroi(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const escondido = noForm || !passouHeroi;

  return (
    <button
      type="button"
      onClick={() => scrollToId(CTA_TARGET_ID)}
      aria-label={`Ir para o formulário: ${label}`}
      aria-hidden={escondido}
      className={`group !fixed bottom-4 right-3 z-[60] flex items-center gap-2 rounded-full bg-gold py-2.5 pl-3.5 pr-4 font-sans text-[13.5px] font-semibold text-[#0a0a0a] shadow-[0_12px_34px_-10px_rgba(212,175,96,0.7)] ring-1 ring-black/10 transition-all duration-300 ease-premium active:scale-95 md:hidden ${
        escondido ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <CalendarClock size={16} strokeWidth={2.2} />
      {label}
    </button>
  );
}
