import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pardus Strategy Lab",
    short_name: "Pardus",
    description:
      "Agência de IA e desenvolvimento web em Portugal. Da ideia ao sistema inteligente.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070e",
    theme_color: "#05070e",
    lang: "pt-PT",
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
