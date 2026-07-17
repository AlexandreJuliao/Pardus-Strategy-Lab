"use client";

const ROW_1 = [
  "React", "Next.js", "Python", "Node.js", "OpenAI", "Claude AI", "n8n",
  "Supabase", "TypeScript",
];
const ROW_2 = [
  "PostgreSQL", "Docker", "FastAPI", "LangChain", "Tailwind", "AWS", "Prisma",
  "Redis", "Stripe",
];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden py-4">
      <div
        className={`flex shrink-0 items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="cursor-default px-6 font-mono text-xs uppercase tracking-[0.12em] text-text-muted transition-all duration-200 hover:scale-110 hover:text-gold">
              {item}
            </span>
            <span className="text-gold/30" aria-hidden>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative border-y border-line bg-bg-2/60 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
      <Row items={ROW_1} />
      <div className="mx-auto h-px max-w-[1320px] bg-line" />
      <Row items={ROW_2} reverse />
    </section>
  );
}
