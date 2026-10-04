"use client";

import { abrirDefinicoes } from "@/lib/consent";

/** Reabre o aviso de cookies para a pessoa mudar a escolha (components/CookieConsent.tsx). */
export default function CookieSettingsButton({
  className = "",
  children = "Definições de cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={abrirDefinicoes} className={className}>
      {children}
    </button>
  );
}
