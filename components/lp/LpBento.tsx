"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import Reveal from "@/components/lp/Reveal";
import MockSearch from "@/components/lp/mock/MockSearch";
import MockChat from "@/components/lp/mock/MockChat";
import MockScore from "@/components/lp/mock/MockScore";
import MockChart from "@/components/lp/mock/MockChart";
import MockPipeline from "@/components/lp/mock/MockPipeline";
import MockAgenda from "@/components/lp/mock/MockAgenda";
import MockInvoice from "@/components/lp/mock/MockInvoice";
import MockAccess from "@/components/lp/mock/MockAccess";
import type { MockKind, Vertical } from "@/lib/verticals";

const MOCKS: Record<MockKind, React.ComponentType> = {
  search: MockSearch,
  chat: MockChat,
  score: MockScore,
  chart: MockChart,
  pipeline: MockPipeline,
  agenda: MockAgenda,
  invoice: MockInvoice,
  access: MockAccess,
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

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
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
                  className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-surface/60 p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface md:rounded-[14px] md:p-3"
                >
                  <span className="spotlight-glow" aria-hidden />
                  <div className="relative z-10">
                    <Mock />
                  </div>
                  <div className="relative z-10 px-3 pb-4 pt-5 md:pb-3">
                    <h3 className="font-display text-[18.5px] font-semibold leading-snug text-text-primary transition-colors group-hover:text-gold md:text-[19px]">
                      {b.title}
                    </h3>
                    <p className="mt-2 max-w-md font-sans text-[14.5px] leading-[1.62] text-text-secondary md:text-[14px] md:leading-relaxed">
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
