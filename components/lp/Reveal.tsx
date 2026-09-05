"use client";

import { useEffect, useRef } from "react";

/**
 * Revelação no scroll que nunca deixa a secção em branco.
 *
 * O conteúdo é servido visível. Só depois de o JavaScript correr é que o
 * elemento é marcado como pendente (`data-reveal="wait"`) e entregue ao
 * observador. Se o JavaScript nunca correr, se o separador estiver oculto ou
 * se for um renderizador sem rAF, fica simplesmente lá, legível.
 *
 * `as="mask"` corta pela caixa: as linhas sobem de dentro de uma máscara, que
 * é o gesto de revelação dos sites que o Julian mandou como referência.
 */
export default function Reveal({
  children,
  delay = 0,
  as = "rise",
  tag: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** segundos de atraso, para escalonar irmãos */
  delay?: number;
  as?: "rise" | "mask";
  /** elemento a produzir — <li> quando o pai é uma lista */
  tag?: "div" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "wait";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`lp-reveal lp-reveal-${as} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
