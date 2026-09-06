import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

/**
 * Al Durr — cliente real da Pardus (aldurr.pt), casas modulares em A-frame.
 * É esta a maquete que percorre sozinha dentro do monitor no herói.
 *
 * A paleta e o conteúdo vêm do código do próprio site (verde floresta,
 * mel, creme; modelos T1 Studio / T2 Family / T-Multi; "Inicie o seu
 * Legado."), não de memória. Ser um projeto entregue de verdade é o que
 * torna esta prova diferente de uma maquete inventada.
 */

const GREEN = "#031C16";
const SURFACE = "#0A2922";
const VOID = "#080808";
const HONEY = "#C69C6D";
const CREAM = "#F5E6D0";
const BODY = "#E5E7EB";

const NAV = ["Modelos", "Galeria", "Processo", "Contactos"];

const MODELS = [
  { img: "/img/lp/aldurr/t1.jpg", tag: "T1 STUDIO", name: "O Refúgio Perfeito", specs: ["1 Quarto Mezzanine", "Sala + Kitchenette", "Deck Frontal"] },
  { img: "/img/lp/aldurr/t2.jpg", tag: "T2 FAMILY", name: "Vida em Equilíbrio", specs: ["2 Quartos", "1 WC Premium", "Sala Panorâmica"] },
  { img: "/img/lp/aldurr/tmulti.jpg", tag: "T-MULTI", name: "Sem Limites", specs: ["Modular à medida", "Área técnica", "Sob consulta"] },
];

const ENGINEERING = [
  { t: "Proteção Térmica", d: "Envelope contínuo, sem pontes térmicas." },
  { t: "Física Estrutural", d: "Pórtico em A calculado para neve e vento." },
  { t: "Acabamentos Eternos", d: "Madeira tratada e metal, a envelhecer bem." },
];

const PHASES = ["Fábrica", "Montagem", "Interiores", "Logística"];

function Rule() {
  return <span className="block h-px w-full" style={{ background: "rgba(245,230,208,0.12)" }} />;
}

export default function MockAlDurr() {
  return (
    <div style={{ background: GREEN, color: BODY }} className="font-sans">
      {/* ---------- navegação ---------- */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(245,230,208,0.1)" }}
      >
        <span
          className="text-[13px] font-semibold tracking-[0.22em]"
          style={{ color: CREAM }}
        >
          AL DURR
        </span>
        <span className="hidden items-center gap-5 text-[10px] tracking-wide sm:flex" style={{ color: "rgba(229,231,235,0.6)" }}>
          {NAV.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
        <span
          className="rounded-full px-3.5 py-[7px] text-[10px] font-semibold"
          style={{ background: HONEY, color: "#0F172A" }}
        >
          Marcar visita
        </span>
      </div>

      {/* ---------- 01 · herói ---------- */}
      <div className="relative h-[288px] overflow-hidden">
        <Image
          src="/img/lp/aldurr/t2.jpg"
          alt="Casa modular em A-frame da Al Durr, ao fim da tarde, numa clareira de floresta"
          fill
          sizes="600px"
          className="object-cover"
          priority
        />
        <span
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(3,28,22,0.96) 8%, rgba(3,28,22,0.5) 46%, rgba(3,28,22,0.15) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="mb-2.5 text-[9.5px] font-semibold tracking-[0.2em]" style={{ color: HONEY }}>
            CASAS MODULARES · PORTUGAL
          </span>
          <p className="text-[30px] font-semibold leading-[1.02] tracking-[-0.03em]" style={{ color: "#fff" }}>
            Inicie o seu Legado.
          </p>
          <p className="mt-2.5 max-w-[290px] text-[11px] leading-relaxed" style={{ color: "rgba(229,231,235,0.8)" }}>
            Arquitetura em A-frame, construída em fábrica e montada no seu
            terreno. Chave na mão, com prazo fechado.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[10.5px] font-semibold"
              style={{ background: HONEY, color: "#0F172A" }}
            >
              Ver modelos <ArrowRight size={11} strokeWidth={2.6} />
            </span>
            <span
              className="rounded-full px-3.5 py-2 text-[10.5px]"
              style={{ border: "1px solid rgba(245,230,208,0.3)", color: CREAM }}
            >
              Falar connosco
            </span>
          </div>
        </div>
      </div>

      {/* ---------- selos ---------- */}
      <div
        className="flex flex-wrap items-center justify-between gap-y-2 px-5 py-3.5 text-[9.5px]"
        style={{ background: SURFACE, color: "rgba(229,231,235,0.72)" }}
      >
        {["Bio-Estrutura · Carbono Negativo", "Performance A++", "Montagem em 12 semanas"].map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <Check size={10} strokeWidth={3} style={{ color: HONEY }} />
            {s}
          </span>
        ))}
      </div>

      {/* ---------- 02 · modelos ---------- */}
      <div className="px-5 pb-5 pt-7">
        <p className="text-[9.5px] font-semibold tracking-[0.2em]" style={{ color: HONEY }}>
          OS MODELOS
        </p>
        <p className="mt-2 text-[21px] font-semibold leading-tight tracking-[-0.03em]" style={{ color: "#fff" }}>
          Escolha o ponto de partida
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {MODELS.map((m) => (
            <div key={m.tag} className="overflow-hidden rounded-[6px]" style={{ background: SURFACE }}>
              <div className="relative h-[74px]">
                <Image src={m.img} alt={`Modelo ${m.tag} da Al Durr`} fill sizes="200px" className="object-cover" />
              </div>
              <div className="p-2.5">
                <p className="text-[8.5px] font-semibold tracking-[0.14em]" style={{ color: HONEY }}>
                  {m.tag}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight" style={{ color: "#fff" }}>
                  {m.name}
                </p>
                <ul className="mt-2 space-y-1">
                  {m.specs.map((s) => (
                    <li key={s} className="text-[8.5px]" style={{ color: "rgba(229,231,235,0.55)" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 03 · engenharia ---------- */}
      <div className="px-5 py-7" style={{ background: VOID }}>
        <div className="grid grid-cols-[1fr_0.9fr] gap-5">
          <div>
            <p className="text-[9.5px] font-semibold tracking-[0.2em]" style={{ color: HONEY }}>
              ENGENHARIA
            </p>
            <p className="mt-2 text-[19px] font-semibold leading-tight tracking-[-0.03em]" style={{ color: "#fff" }}>
              O que não se vê
            </p>
            <div className="mt-3.5 space-y-3">
              {ENGINEERING.map((e) => (
                <div key={e.t}>
                  <Rule />
                  <p className="mt-2 text-[11.5px] font-medium" style={{ color: CREAM }}>
                    {e.t}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-snug" style={{ color: "rgba(229,231,235,0.5)" }}>
                    {e.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[170px] overflow-hidden rounded-[6px]">
            <Image
              src="/img/lp/aldurr/hero.jpg"
              alt="Estrutura em pórtico de A-frame durante a montagem"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ---------- 04 · processo ---------- */}
      <div className="px-5 py-7">
        <p className="text-[9.5px] font-semibold tracking-[0.2em]" style={{ color: HONEY }}>
          PROCESSO
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {PHASES.map((p, i) => (
            <div key={p}>
              <div className="flex items-center gap-1.5">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[8.5px] font-bold"
                  style={{ background: i === 0 ? HONEY : "rgba(245,230,208,0.1)", color: i === 0 ? "#0F172A" : CREAM }}
                >
                  {i + 1}
                </span>
                <span className="h-px flex-1" style={{ background: "rgba(245,230,208,0.14)" }} />
              </div>
              <p className="mt-2 text-[10px] font-medium" style={{ color: CREAM }}>
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- 05 · interiores ---------- */}
      <div className="relative h-[190px] overflow-hidden">
        <Image
          src="/img/lp/aldurr/interior.jpg"
          alt="Interior de uma casa Al Durr, sala com pé-direito alto"
          fill
          sizes="600px"
          className="object-cover"
        />
        <span className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(3,28,22,0.9), transparent 62%)" }} />
        <div className="absolute inset-y-0 left-0 flex max-w-[240px] flex-col justify-center p-5">
          <p className="text-[17px] font-semibold leading-tight" style={{ color: "#fff" }}>
            Interiores prontos a habitar
          </p>
          <p className="mt-2 text-[10.5px] leading-relaxed" style={{ color: "rgba(229,231,235,0.75)" }}>
            Cozinha, roupeiros e loiças incluídos. Entra com as malas.
          </p>
        </div>
      </div>

      {/* ---------- 06 · investimento ---------- */}
      <div className="relative overflow-hidden px-5 py-8" style={{ background: SURFACE }}>
        <div className="grid grid-cols-[1fr_0.85fr] items-center gap-5">
          <div>
            <p className="text-[9.5px] font-semibold tracking-[0.2em]" style={{ color: HONEY }}>
              INVESTIMENTO
            </p>
            <p className="mt-2 text-[19px] font-semibold leading-tight tracking-[-0.03em]" style={{ color: "#fff" }}>
              Alojamento local que se paga
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["12 sem.", "até estar de pé"], ["A++", "certificação"]].map(([v, l]) => (
                <div key={l}>
                  <p className="text-[17px] font-semibold leading-none" style={{ color: HONEY }}>
                    {v}
                  </p>
                  <p className="mt-1 text-[9px]" style={{ color: "rgba(229,231,235,0.5)" }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[110px] overflow-hidden rounded-[6px]">
            <Image src="/img/lp/aldurr/night.jpg" alt="Casa A-frame iluminada ao anoitecer" fill sizes="220px" className="object-cover" />
          </div>
        </div>
      </div>

      {/* ---------- 07 · contacto ---------- */}
      <div className="px-5 py-8">
        <p className="text-[21px] font-semibold leading-tight tracking-[-0.03em]" style={{ color: "#fff" }}>
          Tem terreno? Falamos.
        </p>
        <p className="mt-1.5 text-[10.5px]" style={{ color: "rgba(229,231,235,0.6)" }}>
          Respondemos em 24 horas com uma primeira estimativa.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[["Nome", "Miguel Antunes"], ["Telemóvel", "938 210 447"], ["Concelho do terreno", "Sintra"], ["Modelo", "T2 Family"]].map(([l, v]) => (
            <label key={l} className="block">
              <span className="text-[8.5px] font-semibold tracking-[0.1em]" style={{ color: "rgba(229,231,235,0.45)" }}>
                {l.toUpperCase()}
              </span>
              <span
                className="mt-1 block rounded-[4px] px-2.5 py-2 text-[10.5px]"
                style={{ border: "1px solid rgba(245,230,208,0.14)", background: "rgba(0,0,0,0.25)", color: CREAM }}
              >
                {v}
              </span>
            </label>
          ))}
        </div>
        <span
          className="mt-3.5 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-semibold"
          style={{ background: HONEY, color: "#0F172A" }}
        >
          Pedir estimativa <ArrowRight size={12} strokeWidth={2.6} />
        </span>
      </div>

      {/* ---------- rodapé ---------- */}
      <div
        className="flex items-center justify-between px-5 py-5 text-[9.5px]"
        style={{ background: VOID, color: "rgba(229,231,235,0.45)" }}
      >
        <span className="text-[12px] font-semibold tracking-[0.22em]" style={{ color: CREAM }}>
          AL DURR
        </span>
        <span>aldurr.pt</span>
      </div>
    </div>
  );
}
