"use client";

import { useEffect, useRef } from "react";
import { SECCOES_PRIVACIDADE } from "@/components/legal/privacidade";
import { LEGAL } from "@/lib/legal";

// A Política de Privacidade numa janela por cima da Calculadora: quem a lê não
// sai da página nem perde o que já respondeu. É o mesmo texto da página
// /privacidade (components/legal/privacidade.tsx).
//
// Fica abaixo do aviso de cookies (z-70), porque a secção Cookies tem um botão
// que reabre esse aviso, e ele tem de aparecer por cima.

export default function ModalPrivacidade({ seccao, aoFechar }: { seccao: string | null; aoFechar: () => void }) {
  const caixa = useRef<HTMLDivElement>(null);
  const corpo = useRef<HTMLDivElement>(null);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const antes = document.activeElement as HTMLElement | null;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    fechar.current?.focus();
    if (seccao) {
      const alvo = corpo.current?.querySelector<HTMLElement>(`#priv-${CSS.escape(seccao)}`);
      if (alvo && corpo.current) corpo.current.scrollTop = alvo.offsetTop - 16;
    }

    const teclas = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        aoFechar();
        return;
      }
      if (e.key !== "Tab" || !caixa.current) return;
      // Prende o Tab dentro da janela.
      const focaveis = caixa.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", teclas);
    return () => {
      document.removeEventListener("keydown", teclas);
      document.documentElement.style.overflow = overflow;
      antes?.focus?.();
    };
  }, [seccao, aoFechar]);

  // Os links do texto: os da própria política (#cookies…) andam dentro da
  // janela; os de outras páginas do site abrem num separador novo, para não
  // se perder a Calculadora; os de email seguem normalmente.
  function cliques(e: React.MouseEvent) {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!a || !href) return;
    if (href.startsWith("#")) {
      e.preventDefault();
      const alvo = corpo.current?.querySelector<HTMLElement>(`#priv-${CSS.escape(href.slice(1))}`);
      if (alvo && corpo.current) corpo.current.scrollTop = alvo.offsetTop - 16;
      return;
    }
    if (href.startsWith("/")) {
      e.preventDefault();
      e.stopPropagation();
      window.open(href, "_blank", "noopener");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(4,10,30,0.72)] md:items-center md:p-6" onClick={aoFechar}>
      <div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-labelledby="priv-titulo"
        data-calc-privacidade
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92svh] w-full max-w-[760px] flex-col overflow-hidden rounded-t-[6px] border border-[rgba(212,175,96,0.4)] bg-[#0a1630] shadow-[0_30px_70px_rgba(4,10,30,0.6)] md:max-h-[86svh] md:rounded-[6px]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[rgba(238,242,249,0.12)] py-2 pl-6 pr-2">
          <h2 id="priv-titulo" className="calc-display m-0 text-[20px] font-bold text-[#eef2f9]">
            Política de Privacidade
          </h2>
          <button
            ref={fechar}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar a política de privacidade"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] text-[#c3cde0] hover:text-[#eef2f9]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div ref={corpo} data-lenis-prevent onClick={cliques} className="relative overflow-y-auto overscroll-contain px-6 pb-8 pt-5">
          <p className="m-0 mb-6 text-[13px] text-[#93a3c2]">Atualizado · {LEGAL.lastUpdated}</p>
          <div className="legal-prose space-y-10">
            {SECCOES_PRIVACIDADE.map((s, i) => (
              <section key={s.id} id={`priv-${s.id}`}>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-[12px] font-semibold text-[#d4af60]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="calc-display m-0 text-[18px] font-bold text-[#eef2f9]">{s.title}</h3>
                </div>
                <div className="space-y-4 text-[15px] leading-[1.7] text-[#d3dbea]">{s.content}</div>
              </section>
            ))}
          </div>
          <p className="mt-10 text-[14px] leading-relaxed text-[#c3cde0]">
            Dúvidas sobre este documento ou sobre os seus dados? Escreva para{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`} className="underline underline-offset-2">
              {LEGAL.privacyEmail}
            </a>
            . Respondemos no prazo legal (até 30 dias).
          </p>
        </div>
      </div>
    </div>
  );
}
