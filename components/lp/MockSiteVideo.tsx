"use client";

import { useEffect, useRef } from "react";

/**
 * Gravação do site do cliente a ser percorrido de verdade, com as animações
 * dele a correr. Uma maquete redesenhada por nós nunca mostra o movimento;
 * isto mostra.
 *
 * O vídeo é servido no HTML, por isso aparece mesmo sem JavaScript. Depois de
 * montar, pára-se sozinho para quem pede menos movimento no sistema, ficando
 * o primeiro fotograma como imagem parada.
 */
export default function MockSiteVideo({
  webm,
  mp4,
  poster,
  alt,
  className = "",
}: {
  webm: string;
  mp4: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
      return;
    }
    // alguns browsers recusam o arranque automático até haver interação;
    // pedir outra vez depois de montar resolve os casos em que isso acontece
    v.play().catch(() => {});

    // Descodificar vídeo fora do ecrã não serve a ninguém e rouba tempo ao
    // fotograma. Enquanto não estiver à vista, fica parado.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={`block h-full w-full object-cover ${className}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
