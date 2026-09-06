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
