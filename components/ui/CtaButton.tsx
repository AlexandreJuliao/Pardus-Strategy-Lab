"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

/**
 * The site's single call to action: book the free consultation.
 * If the lead form (#consultoria) is on the current page — homepage and the
 * vertical landing pages — it scrolls to it; otherwise it routes to the
 * contact page, where the same form lives.
 */
export default function CtaButton({
  children,
  variant = "primary",
  size = "lg",
  className = "",
  targetId = CTA_TARGET_ID,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "inverse";
  size?: "md" | "lg";
  className?: string;
  targetId?: string;
}) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        if (document.getElementById(targetId)) scrollToId(targetId);
        else router.push("/contacto");
      }}
    >
      {children}
    </Button>
  );
}
