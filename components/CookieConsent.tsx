"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import {
  EVENTO_DEFINICOES,
  guardarEscolha,
  lerEscolha,
  type Escolha,
} from "@/lib/consent";

/**
 * Aviso de cookies. Aparece na primeira visita e sempre que alguém carrega em
 * «Definições de cookies» (rodapé do site, rodapé das landing pages e secção
 * Cookies da política). Até haver escolha, o Meta Pixel e o GA4 não carregam
 * (components/Analytics.tsx).
 *
 * Regras que vêm da lei e das orientações das autoridades, não do gosto:
 * - «Recusar» e «Aceitar» têm exatamente o mesmo aspeto, o mesmo tamanho e
 *   ficam lado a lado. Recusar não pode dar mais trabalho do que aceitar.
 * - Fechar sem escolher não existe: sem escolha, nada carrega e o aviso volta
 *   na página seguinte.
 * - Não tapa o site nem prende o foco: dá para ler e navegar com ele aberto.
 */
export default function CookieConsent() {
  const [aberto, setAberto] = useState(false);
  const [atual, setAtual] = useState<Escolha | null>(null);
  const caixa = useRef<HTMLElement>(null);
  // Quem abriu pelas definições volta ao botão de onde veio depois de escolher.
  const pelasDefinicoes = useRef(false);
  const voltarA = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const escolha = lerEscolha();
    setAtual(escolha);
    if (!escolha) setAberto(true);

    const abrir = () => {
      pelasDefinicoes.current = true;
      voltarA.current = document.activeElement as HTMLElement | null;
      setAtual(lerEscolha());
      setAberto(true);
      // Só aqui se puxa o foco: foi a pessoa que pediu o aviso. Na primeira
      // visita não, para não lhe roubar o sítio onde está.
      requestAnimationFrame(() => caixa.current?.focus());
    };
    window.addEventListener(EVENTO_DEFINICOES, abrir);
    return () => window.removeEventListener(EVENTO_DEFINICOES, abrir);
  }, []);

  function escolher(escolha: Escolha) {
    const via = pelasDefinicoes.current ? "definicoes" : "aviso";
    guardarEscolha(escolha);
    setAtual(escolha);
    setAberto(false);
    // Para saber quantos aceitam: o PostHog corre sem cookies, por isso conta
    // as duas respostas sem precisar de consentimento.
    window.posthog?.capture?.("cookies_escolha", { escolha, via });
    voltarA.current?.focus?.();
    voltarA.current = null;
    pelasDefinicoes.current = false;
  }

  if (!aberto) return null;

  return (
    <section
      ref={caixa}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      aria-describedby="cookies-texto"
      tabIndex={-1}
      className="fixed inset-x-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-[70] rounded-[4px] border border-line-strong bg-surface/95 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] outline-none backdrop-blur-md motion-safe:animate-aviso-sobe sm:left-6 sm:right-auto sm:bottom-6 sm:w-[420px]"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-6 bg-gold" aria-hidden />
        <h2 id="cookies-titulo" className="mono-tiny text-gold">
          Cookies
        </h2>
      </div>

      <p id="cookies-texto" className="font-sans text-[13.5px] leading-relaxed text-text-secondary">
        Usamos o essencial para o site funcionar. Se aceitares, usamos também o
        Meta Pixel e o Google Analytics para medir visitas e anúncios e para
        mostrar os nossos anúncios a quem já nos visitou. Podes mudar de ideias
        quando quiseres em «Definições de cookies», no rodapé.{" "}
        <a
          href="/privacidade#cookies"
          className="text-gold underline underline-offset-2 hover:text-gold-bright"
        >
          Saber mais
        </a>
      </p>

      {atual ? (
        <p className="mt-3 font-sans text-[12.5px] text-text-muted">
          Escolha atual: {atual === "aceite" ? "aceitaste" : "recusaste"}.
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Button variant="outline" onClick={() => escolher("recusado")}>
          Recusar
        </Button>
        <Button variant="outline" onClick={() => escolher("aceite")}>
          Aceitar
        </Button>
      </div>
    </section>
  );
}
