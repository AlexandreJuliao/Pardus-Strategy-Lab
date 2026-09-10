"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  Receipt,
  UsersRound,
  BarChart3,
  Search,
  Bell,
} from "lucide-react";

/**
 * A plataforma de gestão a trabalhar, dentro do ecrã do herói da LP Softwares.
 *
 * É desenhada a 900×562 e escalada para caber na caixa do ecrã, seja ela do
 * tamanho que for. A cada poucos segundos acontece uma coisa — um pedido
 * avança de coluna, entra uma linha no feed, o faturado sobe — para se
 * perceber que é um sistema a correr, não uma imagem.
 *
 * Um só intervalo, estado mínimo, transições por transform/opacity.
 */
const BASE_W = 900;
const BASE_H = 562;

const NAV = [
  { icon: LayoutDashboard, label: "Painel", on: true },
  { icon: Users, label: "Clientes" },
  { icon: Briefcase, label: "Projetos" },
  { icon: CalendarDays, label: "Agenda" },
  { icon: Receipt, label: "Faturação" },
  { icon: UsersRound, label: "Equipa" },
  { icon: BarChart3, label: "Relatórios" },
];

const BARRAS = [38, 44, 41, 52, 49, 58, 63, 57, 66, 71, 69, 78];

const PEDIDOS = [
  { id: 1, nome: "Sofia Carreira", tipo: "Remodelação · Lisboa", valor: "8.400 €" },
  { id: 2, nome: "Nuno Baltazar", tipo: "Cozinha · Cascais", valor: "5.900 €" },
  { id: 3, nome: "Marta Eanes", tipo: "Casa de banho · Oeiras", valor: "3.200 €" },
  { id: 4, nome: "Tiago Fonseca", tipo: "Escritório · Sintra", valor: "12.700 €" },
  { id: 5, nome: "Inês Quaresma", tipo: "Loja · Lisboa", valor: "9.150 €" },
];

const FEED = [
  { t: "09:02", s: "Novo pedido de Sofia Carreira · atribuído a Rita", tone: "gold" },
  { t: "09:04", s: "Orçamento #1187 enviado e aberto pelo cliente", tone: "" },
  { t: "09:31", s: "Orçamento #1187 aceite · obra criada", tone: "green" },
  { t: "10:15", s: "Lembrete de visita enviado a Nuno Baltazar", tone: "" },
  { t: "11:40", s: "Fatura #2041 emitida", tone: "" },
  { t: "12:05", s: "Pagamento recebido · #2041 fechada", tone: "green" },
];

const eur = (n: number) => n.toLocaleString("pt-PT", { maximumFractionDigits: 0 }) + " €";

export default function MockPlatform() {
  const caixa = useRef<HTMLDivElement | null>(null);
  const [escala, setEscala] = useState(0.5);
  const [tick, setTick] = useState(0);

  // escala para a caixa do ecrã, cobrindo-a
  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const ajusta = () => setEscala(Math.max(el.clientWidth / BASE_W, el.clientHeight / BASE_H));
    ajusta();
    const ro = new ResizeObserver(ajusta);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // o relógio da vida: pára fora do ecrã e em separadores ocultos
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = caixa.current;
    if (!el) return;
    let visivel = true;
    let id: number | undefined;
    const arranca = () => {
      if (id) return;
      id = window.setInterval(() => {
        if (visivel && !document.hidden) setTick((t) => t + 1);
      }, 3200);
    };
    const io = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
    });
    io.observe(el);
    arranca();
    return () => {
      io.disconnect();
      if (id) window.clearInterval(id);
    };
  }, []);

  // o que muda a cada batida
  const faturado = 48320 + (tick % 6) * 1250;
  const novos = PEDIDOS.slice(0, 2 + ((tick + 1) % 2));
  const emCurso = PEDIDOS.slice(2 + ((tick + 1) % 2), 4 + (tick % 2));
  const fechados = PEDIDOS.slice(4);
  const feed = [
    ...FEED.slice(FEED.length - (tick % FEED.length)),
    ...FEED.slice(0, FEED.length - (tick % FEED.length)),
  ].slice(0, 5);
  const ultimaBarra = 78 + (tick % 3) * 6;

  return (
    <div ref={caixa} className="absolute inset-0 overflow-hidden bg-[#0a0e18]">
      <div
        className="absolute left-0 top-0 flex bg-[#0a0e18] font-sans text-[#c9d2e3]"
        style={{ width: BASE_W, height: BASE_H, transform: `scale(${escala})`, transformOrigin: "0 0" }}
      >
        {/* ── barra lateral ── */}
        <aside className="flex w-[168px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0c111c] px-3 py-4">
          <div className="flex items-center gap-2 px-2">
            <span className="font-serif text-[15px] tracking-[0.06em] text-[#f1ecdf]">
              PARDUS<span className="text-gold">.</span>
            </span>
            <span className="ml-auto rounded-[3px] border border-white/[0.08] px-1.5 py-0.5 text-[8.5px] uppercase tracking-[0.12em] text-[#7d879c]">
              OS
            </span>
          </div>
          <nav className="mt-6 space-y-0.5">
            {NAV.map(({ icon: I, label, on }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-[5px] px-2.5 py-[7px] text-[11.5px] ${on ? "bg-white/[0.06] text-[#f1ecdf]" : "text-[#8b94a8]"}`}
              >
                <I size={13} strokeWidth={1.7} className={on ? "text-gold" : "text-[#6f788c]"} />
                {label}
              </div>
            ))}
          </nav>
          <div className="mt-auto rounded-[6px] border border-white/[0.06] bg-white/[0.02] p-2.5">
            <p className="text-[9.5px] uppercase tracking-[0.12em] text-[#7d879c]">Esta semana</p>
            <p className="mt-1 text-[12px] text-[#f1ecdf]">
              <span className="font-semibold text-gold">14</span> pedidos ·{" "}
              <span className="font-semibold text-gold">6</span> fechados
            </p>
          </div>
        </aside>

        {/* ── conteúdo ── */}
        <main className="flex min-w-0 flex-1 flex-col px-5 py-4">
          <header className="flex items-center gap-3">
            <div>
              <p className="text-[14px] font-semibold text-[#f1ecdf]">Painel</p>
              <p className="text-[10px] text-[#7d879c]">Quarta, 10 de setembro</p>
            </div>
            <div className="ml-auto flex h-7 w-[210px] items-center gap-2 rounded-[6px] border border-white/[0.07] bg-white/[0.02] px-2.5 text-[10.5px] text-[#7d879c]">
              <Search size={11} /> Procurar cliente, obra, fatura…
            </div>
            <span className="relative flex h-7 w-7 items-center justify-center rounded-[6px] border border-white/[0.07] text-[#8b94a8]">
              <Bell size={12} />
              <i className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/90 text-[10px] font-semibold text-[#0a0a0a]">
              JZ
            </span>
          </header>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {[
              { k: "Faturado este mês", v: eur(faturado), d: "+12% vs. agosto", vivo: true },
              { k: "Pedidos abertos", v: String(27 - (tick % 3)), d: "3 sem dono" },
              { k: "Obras em curso", v: "9", d: "2 a terminar esta semana" },
              { k: "Horas registadas", v: String(612 + (tick % 4) * 3), d: "equipa de 7" },
            ].map((c) => (
              <div key={c.k} className="rounded-[7px] border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                <p className="text-[9.5px] uppercase tracking-[0.1em] text-[#7d879c]">{c.k}</p>
                <p
                  className={`mt-1 text-[17px] font-semibold tabular-nums leading-none transition-colors duration-500 ${c.vivo ? "text-gold" : "text-[#f1ecdf]"}`}
                >
                  {c.v}
                </p>
                <p className="mt-1.5 text-[9.5px] text-[#8b94a8]">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[1.15fr_1fr_0.95fr] gap-2.5">
            {/* gráfico */}
            <section className="flex flex-col rounded-[7px] border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <p className="text-[10.5px] font-medium text-[#f1ecdf]">Faturação · 12 meses</p>
              <div className="mt-auto flex h-[112px] items-end gap-[5px]">
                {BARRAS.map((b, i) => {
                  const h = i === BARRAS.length - 1 ? ultimaBarra : b;
                  return (
                    <span
                      key={i}
                      className={`flex-1 rounded-[2px] transition-[height] duration-700 ease-out ${i === BARRAS.length - 1 ? "bg-gold" : "bg-[#3a4a6e]"}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
              <div className="mt-1.5 flex justify-between text-[8.5px] text-[#6f788c]">
                <span>out</span>
                <span>jan</span>
                <span>abr</span>
                <span>jul</span>
                <span className="text-gold">set</span>
              </div>
            </section>

            {/* pedidos em colunas */}
            <section className="flex flex-col rounded-[7px] border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <p className="text-[10.5px] font-medium text-[#f1ecdf]">Pedidos</p>
              <div className="mt-2 grid flex-1 grid-cols-3 gap-1.5">
                {[
                  { t: "Novos", lista: novos },
                  { t: "Em orçamento", lista: emCurso },
                  { t: "Adjudicados", lista: fechados },
                ].map((col) => (
                  <div key={col.t} className="rounded-[5px] bg-black/20 p-1.5">
                    <p className="mb-1.5 text-[8.5px] uppercase tracking-[0.08em] text-[#7d879c]">{col.t}</p>
                    <div className="space-y-1.5">
                      {col.lista.map((p) => (
                        <div
                          key={p.id}
                          className="rounded-[4px] border border-white/[0.06] bg-[#121a2b] px-1.5 py-1 transition-all duration-500"
                        >
                          <p className="truncate text-[9px] font-medium text-[#f1ecdf]">{p.nome}</p>
                          <p className="truncate text-[8px] text-[#7d879c]">{p.valor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* feed */}
            <section className="flex flex-col rounded-[7px] border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#f1ecdf]">
                <i className="lp-live h-1.5 w-1.5 rounded-full bg-gold" /> Agora
              </p>
              <ul className="mt-2 space-y-1.5">
                {feed.map((f, i) => (
                  <li
                    key={`${f.t}-${tick}-${i}`}
                    className={`flex gap-2 text-[9px] leading-snug ${i === 0 ? "lp-feed-in" : ""}`}
                  >
                    <span className="shrink-0 tabular-nums text-[#6f788c]">{f.t}</span>
                    <span
                      className={
                        f.tone === "gold" ? "text-gold" : f.tone === "green" ? "text-[#5fd0a8]" : "text-[#b7c0d2]"
                      }
                    >
                      {f.s}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
