"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

/**
 * Mobile-only floating button pinned to the right edge. Visible across the
 * whole homepage scroll; tapping it scrolls straight to the lead form.
 * Hides itself while the form is already on screen so it never covers it.
 */
export default function MobileContactFab() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById(CTA_TARGET_ID);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToId(CTA_TARGET_ID)}
      aria-label="Ir para a consultoria gratuita"
      className={`group !fixed right-3 bottom-5 z-[60] flex items-center gap-2 rounded-full bg-gold py-3 pl-4 pr-5 font-sans text-[14px] font-semibold text-[#0a0a0a] shadow-[0_12px_34px_-10px_rgba(212,175,96,0.7)] ring-1 ring-black/10 transition-all duration-300 ease-premium active:scale-95 md:hidden ${
        hidden
          ? "pointer-events-none translate-y-4 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <CalendarClock size={17} strokeWidth={2.2} />
      Consultoria grátis
    </button>
  );
}
