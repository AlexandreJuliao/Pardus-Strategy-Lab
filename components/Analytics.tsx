"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Analytics do site público da Pardus.
// - Microsoft Clarity (heatmaps + gravações + comportamento).
// - Google Analytics 4 (gtag.js).
// - Meta Pixel (Facebook/Instagram Ads — PageView + retargeting).
// Todos os IDs são públicos por natureza (vão no HTML do browser), por isso ficam
// hardcoded aqui. Tudo via next/script strategy="afterInteractive" → não bloqueia
// o first paint.

const CLARITY_ID = "xpvphllowj";
const GA4_ID = "G-EZ1S3CPSZX";
const META_PIXEL_ID = "1818427879129367";

/**
 * O snippet do Pixel só corre uma vez, no primeiro carregamento. Como o site é
 * uma SPA (App Router), navegar para /obrigado ou /servicos não disparava
 * PageView nenhum — daí o aviso "nenhum píxel foi acionado nesta página" no
 * Assistente do Píxel. Isto repõe o PageView a cada mudança de rota, o que
 * também é o que alimenta públicos de retargeting por página visitada.
 */
function PageViewOnRouteChange() {
  const pathname = usePathname();
  const primeiraRota = useRef(true);

  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false; // o snippet inicial já tratou desta
      return;
    }
    window.fbq?.("track", "PageView");
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}

export default function Analytics() {
  return (
    <>
      <PageViewOnRouteChange />
      {/* Microsoft Clarity */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>

      {/* Google Analytics 4 — só quando a env estiver definida */}
      {GA4_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');`}
          </Script>
        </>
      ) : null}

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
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
