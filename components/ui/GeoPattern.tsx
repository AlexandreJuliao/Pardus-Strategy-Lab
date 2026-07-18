import type { LucideIcon } from "lucide-react";

/**
 * Abstract technical visual for service panels — pure SVG/CSS.
 * Deep-blue grid + gold/blue geometric accents with a large glowing icon.
 */
export default function GeoPattern({
  icon: Icon,
  seed = 0,
}: {
  icon: LucideIcon;
  seed?: number;
}) {
  const bx = 18 + ((seed * 31) % 50);
  const by = 22 + ((seed * 19) % 36);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px] border border-line bg-surface">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 20%, rgba(46,84,132,0.16), transparent 60%), radial-gradient(80% 80% at 20% 90%, rgba(212,175,96,0.09), transparent 60%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id={`grid-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="150" fill={`url(#grid-${seed})`} />
        <line x1="0" y1={42 + seed * 5} x2="200" y2={20 + seed * 4} stroke="#d4af60" strokeWidth="0.6" opacity="0.45" />
        <circle cx={bx} cy={by} r="2.5" fill="#6f92c8" opacity="0.8" />
        <circle cx={170 - seed * 7} cy={112} r="2" fill="#d4af60" opacity="0.6" />
        <rect x={118} y={48} width="42" height="42" fill="none" stroke="#3a5f9c" strokeWidth="0.6" opacity="0.45" transform={`rotate(${12 + seed * 8} 139 69)`} />
        <path d={`M8 132 L${48 + seed * 5} 92 L88 112 L142 58`} fill="none" stroke="#d4af60" strokeWidth="0.6" opacity="0.35" />
      </svg>

      <div className="pointer-events-none absolute inset-0 select-none font-mono text-[10px] text-text-muted/50">
        <span className="absolute left-4 top-4">{String(seed + 1).padStart(2, "0")}</span>
        <span className="absolute bottom-4 right-5">{`{ }`}</span>
        <span className="absolute right-8 top-6">{"//"}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <Icon size={76} strokeWidth={1.1} className="text-gold drop-shadow-[0_0_28px_rgba(212,175,96,0.35)]" />
      </div>
    </div>
  );
}
