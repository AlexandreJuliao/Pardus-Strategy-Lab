interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "blue";
  className?: string;
}

const variants = {
  default: "border-line text-text-secondary",
  gold: "border-gold/40 text-gold",
  blue: "border-blue/40 text-blue-bright",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border bg-white/[0.02] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
