"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  COOKIES_DE_MEDICAO,
  COOKIES_DO_CLARITY,
  EVENTO_ESCOLHA,
  apagarCookies,
  lerEscolha,
  type Escolha,
} from "@/lib/consent";

// Analytics do site público da Pardus.
// - PostHog (comportamento: vistas, páginas, rage clicks, dead clicks) — é o que
//   o office lê em Clientes → Pardus → Website. Corre sempre, porque não guarda
//   nada no browser (ver em baixo).
// - Google Analytics 4 (gtag.js) e Meta Pixel (Facebook/Instagram Ads — PageView,
//   Lead e retargeting): SÓ depois de «Aceitar» no aviso de cookies
//   (components/CookieConsent.tsx). Antes disso não há um único pedido a
//   googletagmanager.com nem a facebook.net. Quem recusa continua a contar nas
//   campanhas pela API de Conversões, a partir do servidor (lib/metaCapi.ts),
//   mas sem os cookies _fbp/_fbc.
// - O Microsoft Clarity saiu a 03/10/2026: o PostHog já faz o mesmo sem cookies.
// Todos os IDs são públicos por natureza (vão no HTML do browser), por isso ficam
// hardcoded aqui. Tudo via next/script strategy="afterInteractive" → não bloqueia
// o first paint.

const GA4_ID = "G-EZ1S3CPSZX";
const META_PIXEL_ID = "1818427879129367";

// Chave PÚBLICA do projeto PostHog da Pardus (organização própria, criada pelo
// botão de Ligações do office). É feita para estar no HTML, como o id do Pixel.
const POSTHOG_KEY = "phc_upb6ARaaeGoWbuLjaW8GAtYG8cJtBjDuDA4qBwHZrWx7";

/**
 * Configuração do PostHog neste site. Duas escolhas que não são as de omissão:
 *
 * - `cookieless_mode: "always"` — nada fica guardado no browser (nem cookie,
 *   nem localStorage). É isso que o deixa correr antes de a pessoa escolher no
 *   aviso de cookies, e mesmo depois de recusar. O visitante é contado por um
 *   hash feito no servidor do PostHog; o projeto tem o modo sem cookies ligado
 *   para isso funcionar. Preço: a mesma pessoa em dias diferentes conta como
 *   visitante novo.
 *
 * - `capture_pageview: "history_change"` — o site é uma SPA (App Router). Com o
 *   valor de omissão só a primeira página de cada visita era contada, pela
 *   mesma razão que obrigou ao PageViewOnRouteChange em baixo para o Pixel.
 *
 * - `capture_dead_clicks: true` — cliques em coisas que não fazem nada. O office
 *   mostra-os ("cliques mortos"), mas o projeto nasce com isto desligado; a
 *   opção do cliente ganha à do projeto.
 */
// O carregador oficial do PostHog, sem alterações.
const POSTHOG_LOADER = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags resetGroups onFeatureFlags addFeatureFlagsHandler onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);`;

const POSTHOG_CONFIG = {
  api_host: "https://eu.i.posthog.com",
  cookieless_mode: "always",
  person_profiles: "identified_only",
  capture_pageview: "history_change",
  capture_pageleave: true,
  capture_dead_clicks: true,
};

/** Os quatro sinais do Consent Mode v2 da Google, todos com o mesmo valor. */
const consentGoogle = (v: "granted" | "denied") => ({
  ad_storage: v,
  ad_user_data: v,
  ad_personalization: v,
  analytics_storage: v,
});

/**
 * Aplica a escolha ao que JÁ estiver carregado nesta página. Conta sobretudo
 * quando a pessoa muda de ideias pelo «Definições de cookies» do rodapé: um
 * script carregado não se descarrega, por isso há que lhe dizer para parar
 * (`fbq('consent','revoke')`, Consent Mode da Google em "denied" e o
 * interruptor `ga-disable-<id>`, que cala o GA4 de vez nesta página). Ao
 * recusar, apagam-se também os cookies que o Pixel e o GA4 já tinham criado,
 * incluindo os de visitas anteriores a este aviso existir.
 */
function aplicarEscolha(escolha: Escolha) {
  const aceite = escolha === "aceite";
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`] = !aceite;
  window.fbq?.("consent", aceite ? "grant" : "revoke");
  window.gtag?.("consent", "update", consentGoogle(aceite ? "granted" : "denied"));
  if (!aceite) apagarCookies(COOKIES_DE_MEDICAO);
}

/**
 * O snippet do Pixel só corre uma vez, no primeiro carregamento. Como o site é
 * uma SPA (App Router), navegar para /obrigado ou /servicos não disparava
 * PageView nenhum — daí o aviso "nenhum píxel foi acionado nesta página" no
 * Assistente do Píxel. Isto repõe o PageView a cada mudança de rota, o que
 * também é o que alimenta públicos de retargeting por página visitada. Só com
 * consentimento: depois de recusar, o `fbq` e o `gtag` podem ainda existir na
 * página (se a pessoa tinha aceitado antes).
 */
function PageViewOnRouteChange() {
  const pathname = usePathname();
  const primeiraRota = useRef(true);

  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false; // o snippet inicial já tratou desta
      return;
    }
    if (lerEscolha() !== "aceite") return;
    window.fbq?.("track", "PageView");
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}

export default function Analytics() {
  const [escolha, setEscolha] = useState<Escolha | null>(null);

  useEffect(() => {
    setEscolha(lerEscolha());
    const muda = (e: Event) => setEscolha((e as CustomEvent<Escolha>).detail);
    window.addEventListener(EVENTO_ESCOLHA, muda);
    // O Clarity saiu do site; os cookies que deixou em visitas antigas vão com ele.
    apagarCookies(COOKIES_DO_CLARITY);
    return () => window.removeEventListener(EVENTO_ESCOLHA, muda);
  }, []);

  useEffect(() => {
    if (escolha) aplicarEscolha(escolha);
  }, [escolha]);

  return (
    <>
      <PageViewOnRouteChange />
      {/* PostHog — o carregador oficial (cria o `posthog` provisório, que guarda
          as chamadas, e busca a biblioteca), seguido do arranque. Carregar só
          o array.js e chamar posthog.init a seguir NÃO funciona: dá
          "posthog.init is not a function" e não regista nada — foi o primeiro
          teste, a 14/09/2026. Tirado de docs/onboarding/.../js-snippet-builder.ts
          no repositório do PostHog. */}
      <Script id="posthog" strategy="afterInteractive">
        {`${POSTHOG_LOADER}
          posthog.init('${POSTHOG_KEY}', ${JSON.stringify(POSTHOG_CONFIG)});`}
      </Script>

      {/* Daqui para baixo, só com «Aceitar». Antes disso nem os scripts entram
          na página. Se a pessoa aceitar a meio da visita, entram nesse momento
          e contam a página onde está. Não há <noscript> do Pixel: sem
          JavaScript não há aviso, e sem aviso não há consentimento. */}
      {escolha === "aceite" ? (
        <>
          {/* Google Analytics 4, com o Consent Mode v2 (modo básico): o
              estado de omissão é "negado" e passa a "concedido" na linha a
              seguir, porque este bloco só existe depois de «Aceitar». */}
          <Script id="ga4-init" strategy="afterInteractive">
            {`window['ga-disable-${GA4_ID}'] = false;
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', ${JSON.stringify(consentGoogle("denied"))});
              gtag('consent', 'update', ${JSON.stringify(consentGoogle("granted"))});
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />

          {/* Meta Pixel */}
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'grant');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
