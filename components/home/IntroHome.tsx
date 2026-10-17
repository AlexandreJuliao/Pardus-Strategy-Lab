"use client";

import { useEffect, useRef } from "react";

const SEEN_KEY = "pardus-intro";

// Corre antes de o resto da página ser desenhado: decide se a abertura passa
// (primeira visita da sessão, sem âncora no endereço, sem movimento reduzido)
// e marca o <html> para o CSS esconder a abertura ou atrasar a entrada do herói.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=sessionStorage.getItem('${SEEN_KEY}');var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(s||rm||location.hash||d.classList.contains('intro-gone')){d.classList.add('intro-skip')}else{d.classList.add('intro-run');d.style.setProperty('--hd','1.45s')}}catch(e){d.classList.add('intro-skip')}})();`;

/**
 * Abertura: o logótipo grande ao centro, letra a letra, que depois voa para o
 * sítio dele na barra de navegação. Só na primeira visita de cada sessão.
 * Se o JavaScript não chegar a correr, o CSS tira a abertura sozinho aos 3,4 s.
 */
export default function IntroHome() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    const clearDelay = () => html.style.removeProperty("--hd");
    if (!el || !html.classList.contains("intro-run") || html.classList.contains("intro-done")) {
      return clearDelay;
    }

    const finish = () => {
      html.classList.add("intro-done");
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      // O logótipo da barra aparece por baixo; só depois sai a cópia que voou.
      window.setTimeout(() => html.classList.add("intro-gone"), 240);
    };

    const logo = el.querySelector<HTMLElement>(".hm-intro-logo");
    const wm = el.querySelector<HTMLElement>(".hm-intro-wm");
    const lab = el.querySelector<HTMLElement>(".hm-intro-lab");
    const bg = el.querySelector<HTMLElement>(".hm-intro-bg");
    const glow = el.querySelector<HTMLElement>(".hm-intro-glow");
    const nav = document.querySelector<HTMLElement>(
      'header a[aria-label="Pardus, início"] > span > span',
    );

    // A abertura começa a contar no primeiro desenho da página; se a
    // hidratação chegou tarde, voa logo (ou fecha, se o CSS já a tirou).
    const elapsed = performance.now();
    if (elapsed > 3300 || !logo || !wm || !nav) {
      finish();
      return clearDelay;
    }

    const timer = window.setTimeout(() => {
      const a = wm.getBoundingClientRect();
      const b = nav.getBoundingClientRect();
      const L = logo.getBoundingClientRect();
      const s = b.height / a.height;
      const ox = a.left + a.width / 2 - L.left;
      const oy = a.top + a.height / 2 - L.top;
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      logo.style.transformOrigin = `${ox}px ${oy}px`;
      const base = "translate(-50%, -50%)";
      logo.animate(
        [{ transform: base }, { transform: `${base} translate(${dx}px, ${dy}px) scale(${s})` }],
        { duration: 880, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" },
      );
      lab?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, fill: "forwards" });
      glow?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: "forwards" });
      bg?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 680,
        delay: 140,
        easing: "cubic-bezier(.45,0,.55,1)",
        fill: "forwards",
      });
      window.setTimeout(finish, 900);
    }, Math.max(0, 1250 - elapsed));

    return () => {
      window.clearTimeout(timer);
      clearDelay();
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      <div ref={ref} className="hm-intro" aria-hidden>
        <div className="hm-intro-bg" />
        <div className="hm-intro-glow" />
        <div className="hm-intro-logo">
          <span className="hm-intro-wm">
            {"PARDUS".split("").map((c, i) => (
              <span key={i} className="hm-intro-l">
                <b style={{ animationDelay: `${0.08 + i * 0.07}s` }}>{c}</b>
              </span>
            ))}
            <span className="hm-intro-dot">.</span>
          </span>
          <span className="hm-intro-lab">Strategy Lab</span>
        </div>
      </div>
    </>
  );
}
