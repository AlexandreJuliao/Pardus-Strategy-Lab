"use client";

import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide rounded-[4px] transition-all duration-200 ease-premium select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-gold text-[#0a0a0a] hover:bg-gold-bright hover:shadow-[0_0_36px_-6px_rgba(212,175,96,0.6)] hover:-translate-y-0.5",
  outline:
    "border border-line-strong bg-white/[0.02] text-text-primary hover:border-gold hover:text-gold",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-7 py-3.5",
};

interface ButtonAsButton
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}
interface ButtonAsLink extends BaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref,
) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...(linkRest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={cls} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
});

export default Button;
