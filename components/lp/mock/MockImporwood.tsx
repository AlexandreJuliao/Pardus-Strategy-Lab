import Image from "next/image";
import { ArrowRight, Check, Lock, Phone, Truck } from "lucide-react";

/**
 * Imporwood — transportadora de madeira fictícia. É a maquete que percorre
 * sozinha no herói das landing pages: prova visual do que entregamos, com
 * densidade de UI a sério (tabela de frota, rastreio, formulário de carga).
 *
 * A paleta é dela, não nossa (tinta quase preta, laranja de sinalização,
 * papel cru). Se usasse o navy e o dourado da Pardus lia-se como um mockup
 * do nosso próprio site em vez do site de um cliente.
 *
 * Sem JavaScript: o percurso é uma animação CSS (.lp-site-read) que desce por
 * secções com paragens de leitura e volta ao topo no fim.
 */

const INK = "#14120f";
const PAPER = "#f6f3ed";
const ORANGE = "#d95c22";
const LINE = "rgba(20,18,15,0.11)";

const NAV = ["Transportes", "Frota", "Cobertura", "Contactos"];

const SERVICES = [
  {
    n: "01",
    t: "Rolaria e madeira em toro",
    d: "Carga no parque de mata, descarga na serração. Gruas próprias em toda a frota.",
    m: "até 26 t",
  },
  {
    n: "02",
    t: "Biomassa e estilha",
    d: "Piso móvel para central. Pesagem certificada à saída e à chegada.",
    m: "90 m³",
  },
  {
    n: "03",
    t: "Cargas especiais",
    d: "Vigas lameladas e madeira serrada com escolta, quando o comprimento obriga.",
    m: "até 24 m",
  },
];

const FLEET = [
  { p: "AB-42-QT", v: "Scania R500 + grua", c: "26 t", s: "Em rota", tone: "go" },
  { p: "72-LM-09", v: "Volvo FH16 piso móvel", c: "90 m³", s: "Em rota", tone: "go" },
  { p: "PR-08-14", v: "MAN TGX porta-toros", c: "24 t", s: "Disponível", tone: "idle" },
  { p: "34-VB-77", v: "Scania G450 estilha", c: "72 m³", s: "Oficina", tone: "stop" },
];

const CERTS = ["FSC C-118420", "PEFC 13-31-0092", "Licença comunitária 4471", "ISO 39001"];

function Bar({ w, o = 0.1 }: { w: number; o?: number }) {
  return (
    <span
      className="block h-[5px] rounded-full"
      style={{ width: `${w}%`, background: `rgba(20,18,15,${o})` }}
    />
  );
}

export default function MockImporwood() {
  return (
    <div style={{ background: PAPER, color: INK }} className="font-sans">
      {/* ---------- barra de contacto ---------- */}
      <div
        className="flex items-center justify-between px-5 py-[7px] text-[9.5px] tracking-wide"
        style={{ background: INK, color: "rgba(246,243,237,0.72)" }}
      >
        <span className="flex items-center gap-1.5">
          <Phone size={9} strokeWidth={2.4} style={{ color: ORANGE }} />
          Central de cargas 253 400 118
        </span>
        <span className="hidden sm:inline">Bragança · Viseu · Aveiro · Setúbal</span>
      </div>

      {/* ---------- navegação ---------- */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: LINE }}
      >
        <span className="text-[15px] font-extrabold leading-none tracking-[-0.03em]">
          IMPORWOOD
          <span style={{ color: ORANGE }}>.</span>
        </span>
        <span className="hidden items-center gap-5 text-[10px] font-medium sm:flex">
          {NAV.map((n) => (
            <span key={n} style={{ color: "rgba(20,18,15,0.62)" }}>
              {n}
            </span>
          ))}
        </span>
        <span
          className="rounded-[3px] px-3 py-[7px] text-[10px] font-semibold"
          style={{ background: ORANGE, color: PAPER }}
        >
          Pedir carga
        </span>
      </div>

      {/* ---------- 01 · herói ---------- */}
      <div className="relative h-[266px] overflow-hidden">
        <Image
          src="/img/lp/imporwood-hero.jpg"
          alt="Toros empilhados no parque de mata, ao lado de um semirreboque carregado"
          fill
          sizes="600px"
          className="object-cover"
          priority
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(70deg, rgba(20,18,15,0.93) 6%, rgba(20,18,15,0.62) 48%, rgba(20,18,15,0.12) 92%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ color: PAPER }}>
          <span
            className="mb-3 w-fit border-l-0 pl-0 text-[9.5px] font-semibold tracking-[0.14em]"
            style={{ color: ORANGE }}
          >
            TRANSPORTE FLORESTAL DESDE 2004
          </span>
          <p className="max-w-[300px] text-[26px] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Da mata à serração
            <br />
            em 48 horas.
          </p>
          <p
            className="mt-2.5 max-w-[280px] text-[11px] leading-relaxed"
            style={{ color: "rgba(246,243,237,0.76)" }}
          >
            Carregamos onde a máquina parou. Preço por tonelada fechado antes
            de a viatura sair.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span
              className="flex items-center gap-1.5 rounded-[3px] px-3.5 py-2 text-[10.5px] font-semibold"
              style={{ background: ORANGE, color: PAPER }}
            >
              Pedir orçamento <ArrowRight size={11} strokeWidth={2.6} />
            </span>
            <span
              className="rounded-[3px] px-3 py-2 text-[10.5px] font-medium"
              style={{ border: "1px solid rgba(246,243,237,0.3)", color: PAPER }}
            >
              Ver a frota
            </span>
          </div>
        </div>
      </div>

      {/* ---------- números ---------- */}
      <div
        className="grid grid-cols-4 border-b"
        style={{ borderColor: LINE, background: "rgba(20,18,15,0.035)" }}
      >
        {[
          ["34", "viaturas"],
          ["11.400 t", "por mês"],
          ["21", "anos"],
          ["0", "cargas perdidas"],
        ].map(([v, l], i) => (
          <div
            key={l}
            className="px-3 py-3.5"
            style={{ borderLeft: i ? `1px solid ${LINE}` : undefined }}
          >
            <p className="text-[15px] font-extrabold leading-none tracking-[-0.03em]">{v}</p>
            <p className="mt-1 text-[9px]" style={{ color: "rgba(20,18,15,0.55)" }}>
              {l}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- 02 · o que transportamos ---------- */}
      <div className="px-5 pb-5 pt-7">
        <p className="text-[19px] font-extrabold leading-tight tracking-[-0.03em]">
          O que levamos
        </p>
        <div className="mt-4">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="flex items-start gap-3.5 border-t py-3.5"
              style={{ borderColor: LINE }}
            >
              <span
                className="mt-0.5 text-[10px] font-bold tabular-nums"
                style={{ color: ORANGE }}
              >
                {s.n}
              </span>
              <div className="flex-1">
                <p className="text-[12.5px] font-bold leading-tight">{s.t}</p>
                <p
                  className="mt-1 text-[10.5px] leading-relaxed"
                  style={{ color: "rgba(20,18,15,0.58)" }}
                >
                  {s.d}
                </p>
              </div>
              <span
                className="mt-0.5 shrink-0 rounded-[2px] px-1.5 py-1 text-[9px] font-semibold tabular-nums"
                style={{ background: "rgba(20,18,15,0.06)" }}
              >
                {s.m}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 03 · frota (tabela) ---------- */}
      <div style={{ background: INK, color: PAPER }} className="px-5 py-7">
        <div className="flex items-end justify-between">
          <p className="text-[19px] font-extrabold leading-tight tracking-[-0.03em]">
            Frota, agora
          </p>
          <span
            className="flex items-center gap-1.5 text-[9.5px]"
            style={{ color: "rgba(246,243,237,0.55)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse-soft"
              style={{ background: "#6fbf8e" }}
            />
            atualizado há 4 min
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-[4px]" style={{ background: "rgba(246,243,237,0.04)" }}>
          <div
            className="grid grid-cols-[80px_1fr_54px_74px] px-3 py-2 text-[8.5px] font-semibold tracking-[0.1em]"
            style={{ color: "rgba(246,243,237,0.42)", borderBottom: "1px solid rgba(246,243,237,0.08)" }}
          >
            <span>MATRÍCULA</span>
            <span>VIATURA</span>
            <span>CARGA</span>
            <span className="text-right">ESTADO</span>
          </div>
          {FLEET.map((f) => (
            <div
              key={f.p}
              className="grid grid-cols-[80px_1fr_54px_74px] items-center px-3 py-2.5 text-[10px]"
              style={{ borderBottom: "1px solid rgba(246,243,237,0.05)" }}
            >
              <span className="font-semibold tabular-nums">{f.p}</span>
              <span style={{ color: "rgba(246,243,237,0.66)" }}>{f.v}</span>
              <span className="tabular-nums" style={{ color: "rgba(246,243,237,0.66)" }}>
                {f.c}
              </span>
              <span className="flex justify-end">
                <span
                  className="rounded-[2px] px-1.5 py-[3px] text-[8.5px] font-semibold"
                  style={
                    f.tone === "go"
                      ? { background: "rgba(111,191,142,0.14)", color: "#7fcf9e" }
                      : f.tone === "idle"
                        ? { background: "rgba(246,243,237,0.09)", color: "rgba(246,243,237,0.72)" }
                        : { background: "rgba(217,92,34,0.16)", color: "#e8804f" }
                  }
                >
                  {f.s}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* rastreio */}
        <div className="mt-4 rounded-[4px] p-3.5" style={{ background: "rgba(246,243,237,0.04)" }}>
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck size={11} strokeWidth={2.2} style={{ color: ORANGE }} />
              AB-42-QT
            </span>
            <span style={{ color: "rgba(246,243,237,0.5)" }}>chega às 16:20</span>
          </div>
          <div className="relative mt-2.5 h-[3px] rounded-full" style={{ background: "rgba(246,243,237,0.1)" }}>
            <span
              className="lp-progress absolute inset-y-0 left-0 rounded-full"
              style={{ background: ORANGE, width: "12%" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[9px]" style={{ color: "rgba(246,243,237,0.5)" }}>
            <span>Vinhais</span>
            <span>A4</span>
            <span>Serração de Viseu</span>
          </div>
        </div>
      </div>

      {/* ---------- 04 · prova ---------- */}
      <div className="grid grid-cols-[1fr_0.85fr]">
        <div className="px-5 py-7">
          <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.02em]">
            &ldquo;Quatro camiões por semana, há nove anos. Nunca falharam uma
            descarga de segunda-feira.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: "rgba(20,18,15,0.08)" }}
            >
              JM
            </span>
            <span className="text-[10px] leading-tight">
              Joaquim Matos
              <span className="block" style={{ color: "rgba(20,18,15,0.52)" }}>
                Serrações do Dão
              </span>
            </span>
          </div>
          <div className="mt-5 space-y-1.5">
            <Bar w={78} />
            <Bar w={62} o={0.07} />
          </div>
        </div>
        <div className="relative">
          <Image
            src="/img/lp/imporwood-fleet.jpg"
            alt="Semirreboque de plataforma carregado com toros, num caminho florestal"
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ---------- 05 · certificações ---------- */}
      <div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y px-5 py-4"
        style={{ borderColor: LINE }}
      >
        {CERTS.map((c) => (
          <span
            key={c}
            className="flex items-center gap-1.5 text-[9.5px] font-medium"
            style={{ color: "rgba(20,18,15,0.6)" }}
          >
            <Check size={10} strokeWidth={3} style={{ color: ORANGE }} />
            {c}
          </span>
        ))}
      </div>

      {/* ---------- 06 · pedido de carga ---------- */}
      <div className="px-5 py-7">
        <p className="text-[19px] font-extrabold leading-tight tracking-[-0.03em]">
          Diga-nos o que tem para sair
        </p>
        <p className="mt-1.5 text-[10.5px]" style={{ color: "rgba(20,18,15,0.58)" }}>
          Respondemos com preço por tonelada no mesmo dia útil.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[
            ["Carregamento em", "Vinhais, Bragança"],
            ["Descarga em", "Viseu"],
            ["Tipo de carga", "Rolaria de pinho"],
            ["Toneladas", "24"],
          ].map(([l, v]) => (
            <label key={l} className="block">
              <span className="text-[8.5px] font-semibold tracking-[0.08em]" style={{ color: "rgba(20,18,15,0.5)" }}>
                {l.toUpperCase()}
              </span>
              <span
                className="mt-1 block rounded-[3px] px-2.5 py-2 text-[10.5px]"
                style={{ border: `1px solid ${LINE}`, background: "#fff" }}
              >
                {v}
              </span>
            </label>
          ))}
        </div>
        <span
          className="mt-3.5 flex items-center justify-center gap-1.5 rounded-[3px] py-2.5 text-[11px] font-semibold"
          style={{ background: ORANGE, color: PAPER }}
        >
          Pedir preço <ArrowRight size={12} strokeWidth={2.6} />
        </span>
      </div>

      {/* ---------- rodapé ---------- */}
      <div
        className="flex items-center justify-between px-5 py-5 text-[9.5px]"
        style={{ background: INK, color: "rgba(246,243,237,0.5)" }}
      >
        <span className="text-[13px] font-extrabold tracking-[-0.03em]" style={{ color: PAPER }}>
          IMPORWOOD<span style={{ color: ORANGE }}>.</span>
        </span>
        <span>Alvará 4471 · Bragança</span>
      </div>
    </div>
  );
}

/** Cromo de browser mínimo à volta da maquete. */
export function MockBrowserBar({ url }: { url: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2"
      style={{ background: "#0d1119", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <Lock size={9} className="text-text-muted" />
      <span className="font-sans text-[10.5px] tracking-wide text-text-secondary">{url}</span>
    </div>
  );
}
