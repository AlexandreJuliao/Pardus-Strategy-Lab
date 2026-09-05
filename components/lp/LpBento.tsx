"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import Reveal from "@/components/lp/Reveal";
import MockSearch from "@/components/lp/mock/MockSearch";
import MockChat from "@/components/lp/mock/MockChat";
import MockScore from "@/components/lp/mock/MockScore";
import MockChart from "@/components/lp/mock/MockChart";
import type { MockKind, Vertical } from "@/lib/verticals";

const MOCKS: Record<MockKind, React.ComponentType> = {
  search: MockSearch,
  chat: MockChat,
  score: MockScore,
  chart: MockChart,
};

/** Bento de funcionalidades, cada card com uma mini-UI a mostrar (não a dizer). */
export default function LpBento({
  v,
  title,
  intro,
}: {
  v: Vertical;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <section className="seam-top relative overflow-hidden section-pad">
      <AuroraGlow variant="services" />
      <div className="shell relative z-10">
        <SectionHeader title={title} intro={intro} align="center" />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {v.bento.map((b, i) => {
            const Mock = MOCKS[b.mock];
            return (
              <Reveal
                key={b.title}
                delay={i * 0.1}
                className={b.wide ? "md:col-span-2" : ""}
              >
                <div
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-surface/60 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface"
                >
                  <span className="spotlight-glow" aria-hidden />
                  <div className="relative z-10">
                    <Mock />
                  </div>
                  <div className="relative z-10 px-3 pb-3 pt-5">
                    <h3 className="font-display text-[19px] font-semibold text-text-primary transition-colors group-hover:text-gold">
                      {b.title}
                    </h3>
                    <p className="mt-2 max-w-md font-sans text-[14px] leading-relaxed text-text-secondary">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
