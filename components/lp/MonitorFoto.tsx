import Image from "next/image";

/**
 * Monitor a sério — uma fotografia de estúdio — com o site do cliente a
 * passar por dentro do ecrã.
 *
 * A fotografia foi feita com o ecrã em verde-chroma. Essas coordenadas estão
 * aqui em percentagem da imagem, por isso o vídeo acompanha o monitor em
 * qualquer tamanho, sem contas. A caixa é 0,25% maior que o verde de cada
 * lado, para não ficar uma frincha verde à vista.
 *
 * As bordas da fotografia desvanecem-se: o estúdio dela e o ambiente da
 * página passam a ser o mesmo sítio, em vez de a foto se ler como um cartão
 * colado por cima.
 */
const ECRA = { left: "24.4%", top: "18.9%", width: "50.9%", height: "50.7%" };

export default function MonitorFoto({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/img/lp/aldurr/monitor.webp"
        alt=""
        width={1344}
        height={768}
        priority
        className="w-full select-none"
        // a foto sai de estúdio um pouco lavada; isto devolve-lhe o corpo
        // sem a fazer parecer tratada
        style={{
          filter: "contrast(1.07) saturate(1.06) brightness(1.03)",
          maskImage: "radial-gradient(58% 62% at 50% 46%, #000 44%, rgba(0,0,0,0.32) 74%, transparent 97%)",
          WebkitMaskImage: "radial-gradient(58% 62% at 50% 46%, #000 44%, rgba(0,0,0,0.32) 74%, transparent 97%)",
        }}
        aria-hidden
      />

      {/* o ecrã */}
      <div className="absolute overflow-hidden" style={ECRA}>
        {children}

        {/* o vidro por cima do que está a dar: sem isto o vídeo lê-se colado */}
        <span
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(114deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 15%, transparent 34%, transparent 72%, rgba(255,255,255,0.025) 100%)",
          }}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 z-20"
          style={{ background: "radial-gradient(120% 94% at 50% 44%, transparent 58%, rgba(0,0,0,0.3) 100%)" }}
          aria-hidden
        />
      </div>

      {/* a luz do ecrã a bater no ar à volta */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[6%] h-[72%] -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(30% 34% at 50% 42%, rgba(212,175,96,0.14), rgba(60,110,175,0.18) 54%, transparent 78%)",
        }}
        aria-hidden
      />
    </div>
  );
}
