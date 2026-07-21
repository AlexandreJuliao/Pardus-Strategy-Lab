"use client";

import Script from "next/script";

// Analytics do site público da Pardus.
// - Microsoft Clarity (heatmaps + gravações + comportamento) — sempre ativo.
// - Google Analytics 4 — ativa-se sozinho quando existir a env NEXT_PUBLIC_GA4_ID
//   (formato G-XXXXXXXXXX). Sem a env, o GA4 não carrega (nenhum pedido extra).
// Ambos via next/script strategy="afterInteractive" → não bloqueiam o first paint.

const CLARITY_ID = "xpvphllowj";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function Analytics() {
  return (
    <>
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
    </>
  );
}
