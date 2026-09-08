/**
 * Monitor de secretária, desenhado em CSS, com o cuidado de uma fotografia de
 * produto: alumínio com chanfro nas arestas, bisel com brilho especular, vidro
 * com dois reflexos (um largo e difuso, outro mais definido), pé metálico com
 * a luz a correr ao longo dele e sombra de contacto no chão.
 *
 * A maquete do site vive lá dentro e percorre-se sozinha. Pôr o site dentro de
 * um objeto físico faz duas coisas que uma janela de browser a flutuar não faz:
 * dá escala (percebe-se que é um ecrã, não um cartão) e tira-lhe a cara de
 * mockup de apresentação.
 */
export default function MockMonitor({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* a luz que o ecrã atira para o ar à volta */}
      <div
        className="pointer-events-none absolute -inset-x-12 -top-10 bottom-16 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 46% at 50% 40%, rgba(212,175,96,0.18), rgba(60,110,175,0.2) 52%, transparent 76%)",
        }}
        aria-hidden
      />

      {/* corpo do monitor */}
      <div
        className="relative rounded-[13px] p-[9px] md:rounded-[17px] md:p-[12px]"
        style={{
          background:
            "linear-gradient(177deg, #4a5164 0%, #333a4a 4%, #1d2230 26%, #141822 62%, #0d1017 88%, #191d28 100%)",
          boxShadow: [
            // chanfro: luz na aresta de cima, sombra na de baixo
            "0 1px 0 rgba(255,255,255,0.16) inset",
            "0 -1px 0 rgba(0,0,0,0.75) inset",
            "1px 0 0 rgba(255,255,255,0.05) inset",
            "-1px 0 0 rgba(255,255,255,0.05) inset",
            // o objeto a assentar no espaço
            "0 40px 80px -30px rgba(0,0,0,0.92)",
            "0 12px 30px -14px rgba(0,0,0,0.85)",
            "0 2px 5px -2px rgba(0,0,0,0.7)",
          ].join(", "),
        }}
      >
        {/* brilho especular que corre no alumínio do bisel */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[13px] md:rounded-[17px]"
          style={{
            background:
              "linear-gradient(102deg, rgba(255,255,255,0.1) 0%, transparent 18%, transparent 74%, rgba(255,255,255,0.07) 100%)",
          }}
          aria-hidden
        />

        {/* ecrã */}
        <div
          className="relative overflow-hidden rounded-[5px] md:rounded-[7px]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.045), 0 10px 28px -12px rgba(0,0,0,0.95) inset",
          }}
        >
          {children}

          {/* reflexo largo e difuso do ambiente no vidro */}
          <span
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(114deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.035) 14%, transparent 32%, transparent 70%, rgba(255,255,255,0.03) 100%)",
            }}
            aria-hidden
          />
          {/* segundo reflexo, mais definido: a "janela" que qualquer ecrã apanha */}
          <span
            className="pointer-events-none absolute -left-[12%] -top-[30%] z-20 h-[85%] w-[52%] rotate-[26deg] blur-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.055) 42%, rgba(255,255,255,0.075) 58%, transparent)",
            }}
            aria-hidden
          />
          {/* vinheta nos cantos, como um painel a sério */}
          <span
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: "radial-gradient(118% 92% at 50% 44%, transparent 56%, rgba(0,0,0,0.34) 100%)" }}
            aria-hidden
          />
        </div>

        {/* queixo: luz de estado */}
        <div className="mt-[6px] flex items-center justify-center md:mt-[8px]">
          <span
            className="h-[3px] w-[3px] rounded-full"
            style={{ background: "rgba(212,175,96,0.8)", boxShadow: "0 0 7px rgba(212,175,96,0.75)" }}
            aria-hidden
          />
        </div>
      </div>

      {/* pé */}
      <div className="relative mx-auto -mt-px flex w-full flex-col items-center" aria-hidden>
        <div
          className="h-11 w-[76px] md:h-16 md:w-[96px]"
          style={{
            // alumínio: a luz corre na vertical, por isso o gradiente é lateral
            background:
              "linear-gradient(90deg, #0a0d13 0%, #171c28 22%, #2b3242 46%, #363e51 54%, #1a1f2c 74%, #0a0d13 100%)",
            clipPath: "polygon(39% 0, 61% 0, 71% 100%, 29% 100%)",
          }}
        />
        <div
          className="h-[9px] w-[212px] rounded-[5px] md:h-[11px] md:w-[268px]"
          style={{
            background: "linear-gradient(180deg, #333b4e 0%, #1b2130 34%, #0e1119 72%, #070910 100%)",
            boxShadow: "0 14px 26px -12px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.09) inset",
          }}
        />

        {/* sombra de contacto no chão */}
        <div
          className="mt-2 h-6 w-[270px] rounded-[50%] blur-xl md:w-[350px]"
          style={{ background: "rgba(0,0,0,0.62)" }}
        />
      </div>
    </div>
  );
}
