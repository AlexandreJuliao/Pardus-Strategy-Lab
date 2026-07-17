"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

/**
 * The site's single call to action: book the free consultation.
 * On the homepage it scrolls to the lead form; anywhere else it routes to
 * the contact page, where the same form lives.
 */
export default function CtaButton({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  targetId = CTA_TARGET_ID,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  targetId?: string;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => scrollToId(targetId)}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button href="/contacto" variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
