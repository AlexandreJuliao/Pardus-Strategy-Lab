import Image from "next/image";
import type { LucideIcon } from "lucide-react";

/**
 * Real editorial photography for a service panel — cinematic, petrol-navy +
 * gold, one image per service (generated once, stored in public/img/services).
 * Keeps the corner-index / icon-badge framing that reads "engineered".
 */
export default function ServiceVisual({
  slug,
  icon: Icon,
  seed = 0,
}: {
  slug: string;
  icon: LucideIcon;
  seed?: number;
}) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[8px] border border-line bg-surface">
      <Image
        src={`/img/services/${slug}.jpg`}
        alt=""
        fill
        priority={seed < 2}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover brightness-125 contrast-[1.05] transition-transform duration-700 ease-premium group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 65%, rgba(5,7,14,0.5) 100%), linear-gradient(90deg, rgba(5,7,14,0.14), transparent 32%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 select-none font-mono text-[10px] text-white/55">
        <span className="absolute left-4 top-4">{String(seed + 1).padStart(2, "0")}</span>
        <span className="absolute right-4 top-4">{"//"}</span>
      </div>
      <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-[4px] border border-gold/40 bg-bg/60 text-gold backdrop-blur-sm">
        <Icon size={20} strokeWidth={1.6} />
      </div>
    </div>
  );
}
