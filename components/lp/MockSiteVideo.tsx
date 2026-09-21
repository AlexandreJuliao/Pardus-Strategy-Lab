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
 *
 * Corre uma vez e fica quieto no último fotograma. Um site a ser percorrido
 * em ciclo chama a atenção para sempre e rouba-a ao resto da página; visto
 * uma vez, a prova está feita.
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
  const terminou = useRef(false);

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

    // chegou ao fim: fica no último fotograma e não volta a arrancar
    const onEnded = () => {
      terminou.current = true;
    };
    v.addEventListener("ended", onEnded);

    // Descodificar vídeo fora do ecrã não serve a ninguém e rouba tempo ao
    // fotograma. Enquanto não estiver à vista, fica parado.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !terminou.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (!terminou.current) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    // o primeiro fotograma fica por baixo, como imagem: assim que o vídeo tem
    // os metadados o browser deita o `poster` fora, e num browser que não
    // saiba descodificar o ficheiro ficava o verde-chroma da fotografia à
    // vista. Com a imagem por trás, o pior caso é um ecrã parado.
    <div className={`relative h-full w-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 block h-full w-full object-cover"
        draggable={false}
        aria-hidden
      />
      <video
        ref={ref}
        className="relative block h-full w-full object-cover"
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-label={alt}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
