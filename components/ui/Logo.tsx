/**
 * Official Pardus wordmark — text only ("PARDUS." with a gold full-stop).
 * Cormorant serif matches the official logotype. Usable on any background
 * as long as the letters stay legible.
 */
const SIZES: Record<string, string> = {
  sm: "text-[17px]",
  md: "text-[21px]",
  lg: "text-[30px]",
  xl: "text-[clamp(40px,6vw,72px)]",
  hero: "text-[clamp(70px,13vw,190px)]",
};

export default function Logo({
  size = "md",
  subtitle = false,
  tone = "light",
  className = "",
}: {
  size?: keyof typeof SIZES | string;
  subtitle?: boolean;
  tone?: "light" | "muted";
  className?: string;
}) {
  const sizeCls = SIZES[size] ?? size;
  const text = tone === "muted" ? "text-text-secondary" : "text-text-primary";
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-wordmark font-semibold leading-none tracking-[0.1em] ${text} ${sizeCls}`}
      >
        PARDUS<span className="text-gold">.</span>
      </span>
      {subtitle && (
        <span className="mt-1.5 font-sans text-[10px] font-light tracking-[0.36em] text-text-secondary">
          STRATEGY LAB
        </span>
      )}
    </span>
  );
}
