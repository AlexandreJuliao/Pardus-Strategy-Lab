/**
 * Monitor de secretária, desenhado em CSS: moldura, ecrã, pé e base.
 *
 * A maquete do site vive lá dentro e percorre-se sozinha. Pôr o site dentro
 * de um objeto físico faz duas coisas que uma janela de browser a flutuar não
 * faz: dá escala (percebe-se que é um ecrã, não um cartão) e tira-lhe a cara
 * de mockup de apresentação.
 *
 * O brilho e o reflexo do vidro são camadas por cima do conteúdo, com
 * pointer-events desligados, por isso nada disto interfere com a página.
 */
export default function MockMonitor({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* luz que o ecrã atira para a superfície atrás */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-8 bottom-16 blur-3xl"
        style={{
          background:
            "radial-gradient(52% 48% at 50% 42%, rgba(212,175,96,0.16), rgba(46,84,132,0.16) 55%, transparent 78%)",
        }}
        aria-hidden
      />

      {/* corpo do monitor */}
      <div
        className="relative rounded-[14px] p-[10px] md:rounded-[18px] md:p-[13px]"
        style={{
          background: "linear-gradient(158deg, #2b3040 0%, #14171f 42%, #0b0d13 100%)",
          boxShadow:
            "0 2px 0 rgba(255,255,255,0.07) inset, 0 -1px 0 rgba(0,0,0,0.6) inset, 0 44px 90px -34px rgba(0,0,0,0.95), 0 10px 26px -12px rgba(0,0,0,0.8)",
        }}
      >
        {/* ecrã */}
        <div
          className="relative overflow-hidden rounded-[6px] md:rounded-[8px]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.85), 0 8px 26px -10px rgba(0,0,0,0.9) inset" }}
        >
          {children}

          {/* reflexo diagonal do vidro */}
          <span
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(112deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 16%, transparent 34%, transparent 66%, rgba(255,255,255,0.025) 100%)",
            }}
            aria-hidden
          />
          {/* vinheta suave nos cantos, como um painel a sério */}
          <span
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: "radial-gradient(115% 90% at 50% 45%, transparent 58%, rgba(0,0,0,0.32) 100%)" }}
            aria-hidden
          />
        </div>

        {/* marca e luz de estado no queixo */}
        <div className="mt-[7px] flex items-center justify-center gap-2 md:mt-[9px]">
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: "rgba(212,175,96,0.75)", boxShadow: "0 0 6px rgba(212,175,96,0.7)" }}
            aria-hidden
          />
        </div>
      </div>

      {/* pé */}
      <div className="relative mx-auto -mt-px flex w-full flex-col items-center" aria-hidden>
        <div
          className="h-10 w-[104px] md:h-14 md:w-[132px]"
          style={{
            background: "linear-gradient(100deg, #23283a 0%, #151922 55%, #0d1017 100%)",
            clipPath: "polygon(22% 0, 78% 0, 92% 100%, 8% 100%)",
          }}
        />
        <div
          className="h-[10px] w-[262px] rounded-[6px] md:h-[13px] md:w-[336px]"
          style={{
            background: "linear-gradient(180deg, #262c3d 0%, #12151d 60%, #090b10 100%)",
            boxShadow: "0 16px 30px -14px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.06) inset",
          }}
        />
        {/* sombra de contacto no chão */}
        <div
          className="mt-1.5 h-7 w-[340px] rounded-[50%] blur-xl md:w-[460px]"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />
      </div>
    </div>
  );
}
