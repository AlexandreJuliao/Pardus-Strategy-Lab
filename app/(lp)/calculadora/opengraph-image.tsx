import { ImageResponse } from "next/og";

// Imagem de partilha da Calculadora (Open Graph e Twitter): o fundo azul do
// desenho aprovado, o título e o bilhete com o valor por revelar.

export const runtime = "edge";
export const alt = "Calculadora de Crescimento Pardus · Quanto custa crescer o seu negócio?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Imagem() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(165deg, #1a3462 0%, #284b83 52%, #3a5f95 100%)",
          color: "#eef2f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>
            PARDUS<span style={{ color: "#d4af60" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#e2c47e", textTransform: "uppercase" }}>
            Diagnóstico gratuito · 3 minutos
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Quanto custa&nbsp;</span>
            <span style={{ color: "#e2c47e" }}>crescer o seu negócio?</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#d3dbea", maxWidth: 1040 }}>
            Imagem, site, Google, anúncios e automações: quanto investir, por área.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 4,
              background: "rgba(212,175,96,0.18)",
              border: "1px solid rgba(212,175,96,0.6)",
              color: "#f0d089",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            ?.??? €
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#c3cde0" }}>Calculadora de Crescimento Pardus</div>
        </div>
      </div>
    ),
    size,
  );
}
