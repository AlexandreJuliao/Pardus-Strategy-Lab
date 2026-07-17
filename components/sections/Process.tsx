"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  { n: "01", title: "Descoberta", desc: "Mapeamos o negócio, objetivos e sistemas existentes. Sem suposições." },
  { n: "02", title: "Plano", desc: "Desenhamos a solução, as ligações e o calendário. Fica tudo escrito, sem surpresas." },
  { n: "03", title: "Construção", desc: "Construímos por etapas, com entregas frequentes para veres o progresso e dares a tua opinião." },
  { n: "04", title: "Lançamento", desc: "Colocamos no ar, formamos a tua equipa e continuamos a acompanhar e a melhorar." },
];

export default function Process() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const ease = "power2.out";
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduced } = ctx.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduced: boolean;
          };
          gsap.set(".p-content", { opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 });
          if (reduced) {
            gsap.set(isDesktop ? ".p-line-h" : ".p-line-v", { scaleX: 1, scaleY: 1 });
            gsap.set(".p-node", { backgroundColor: "#d4af60", color: "#0a0a0a", borderColor: "#d4af60" });
            return;
          }
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 68%" },
          });
          tl.to(isDesktop ? ".p-line-h" : ".p-line-v", {
            [isDesktop ? "scaleX" : "scaleY"]: 1, duration: 1.2, ease,
          }, 0)
            .to(".p-node", {
              backgroundColor: "#d4af60", color: "#0a0a0a", borderColor: "#d4af60",
              duration: 0.3, stagger: 0.26, ease,
            }, 0.2)
            .to(".p-content", { opacity: 1, y: 0, duration: 0.45, stagger: 0.26, ease }, 0.25);
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="processo" className="relative section-pad">
      <div className="shell">
        <SectionHeader
          label="// Processo"
          title={<>Como trabalhamos</>}
          intro="Quatro etapas. Zero ambiguidade. Resultado garantido."
        />

        <div ref={root} className="relative mt-16">
          <div className="p-line-h absolute left-0 top-7 hidden h-px w-full origin-left scale-x-0 bg-gradient-to-r from-blue via-blue to-gold md:block" />
          <div className="p-line-v absolute left-7 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-blue to-gold md:hidden" />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="relative flex gap-5 md:flex-col md:gap-0">
                <div className="p-node z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-sm text-gold">
                  {s.n}
                </div>
                <div className="p-content md:mt-8">
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
