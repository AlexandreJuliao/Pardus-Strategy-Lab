"use client";

const ITEMS = Array.from({ length: 8 });

export default function WordmarkStrip() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="font-wordmark text-2xl font-semibold tracking-[0.1em] text-text-secondary/70">
              PARDUS<span className="text-gold">.</span>
            </span>
            <span className="mx-8 mono-tiny text-text-muted">Strategy Lab</span>
            <span className="mr-8 text-gold/30">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
