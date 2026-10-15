"use client";

import { useId } from "react";

// As peças dos ecrãs da Calculadora, tal como estão no desenho aprovado
// (Main.dc.html): botões de escolha, escala de 0 a 10, cartões, campos,
// caixa de consentimento e o bilhete dourado.

const ON = "border-[#d4af60] bg-[rgba(212,175,96,0.2)] text-[#fff3d6]";
const OFF = "border-[rgba(238,242,249,0.25)] bg-[rgba(8,16,38,0.4)] text-[#e6ebf4] hover:border-[rgba(238,242,249,0.45)]";

export function Visto({ tamanho = 11, className = "" }: { tamanho?: number; className?: string }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** A bolinha dourada com o visto, das listas. */
export function Bola({ px = 20, icone = 11, className = "" }: { px?: number; icone?: number; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#d4af60] text-[#05070e] ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <Visto tamanho={icone} />
    </span>
  );
}

export function Logotipo({ className = "" }: { className?: string }) {
  return (
    <p className={`m-0 font-wordmark font-semibold ${className}`}>
      PARDUS<span className="text-[#d4af60]">.</span>
    </p>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`m-0 text-[12px] font-semibold uppercase tracking-[3px] text-[#e2c47e] ${className}`}>{children}</p>
  );
}

/** Um bloco com o rótulo da pergunta (opcional) e a dica por baixo (opcional). */
export function Bloco({
  rotulo,
  dica,
  children,
  rotuloId,
}: {
  rotulo?: string;
  dica?: string;
  children: React.ReactNode;
  rotuloId?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {rotulo ? (
        <p id={rotuloId} className="m-0 text-[15px] font-semibold leading-[1.4] text-[#eef2f9]">
          {rotulo}
        </p>
      ) : null}
      {children}
      {dica ? <p className="m-0 text-[13px] leading-[1.45] text-[#c3cde0]">{dica}</p> : null}
    </div>
  );
}

/**
 * Quantas colunas de grelha ocupa cada opção, para as linhas ficarem sempre
 * cheias: no telemóvel, 2 colunas e a última sozinha ocupa a linha toda; nos
 * ecrãs largos (sm, 640px), 3 por linha quando as opções são curtas, com as
 * que sobram a dividir a última linha entre si (a grelha larga tem 6 colunas:
 * 2 cada uma por linha de 3, 3 cada uma se sobrarem 2, 6 se sobrar 1).
 * As classes estão escritas por extenso para o Tailwind as encontrar.
 */
function vaosDaGrelha(total: number, i: number, tresLargas: boolean): string {
  const sozinhaNoFim = total % 2 === 1 && i === total - 1;
  const telemovel = sozinhaNoFim ? "col-span-2" : "";
  if (!tresLargas) return sozinhaNoFim ? "col-span-2 sm:col-span-6" : "sm:col-span-3";
  const resto = total % 3;
  const naUltimaLinha = resto > 0 && i >= total - resto;
  const largo = !naUltimaLinha ? "sm:col-span-2" : resto === 2 ? "sm:col-span-3" : "sm:col-span-6";
  return `${telemovel} ${largo}`;
}

/**
 * O texto da opção com as palavras hifenizadas inteiras («bem-estar» não parte
 * em «bem-» / «estar» quando a coluna é estreita). Só muda a apresentação.
 */
function semPartirNoHifen(texto: string): React.ReactNode {
  if (!texto.includes("-")) return texto;
  return texto.split(" ").map((p, i) => (
    <span key={i}>
      {i > 0 ? " " : null}
      {p.includes("-") ? <span className="whitespace-nowrap">{p}</span> : p}
    </span>
  ));
}

/** Opções curtas (até 18 letras) cabem 3 por linha nos ecrãs largos sem quebrar. */
const CURTA = 18;

/**
 * Botões de escolha, em grelha: 2 colunas no telemóvel, 3 nos ecrãs largos
 * quando as opções são curtas; cada linha com a altura da opção mais alta.
 * Com `multi`, tocar de novo tira; com `ordem`, cada botão escolhido mostra a
 * posição em que foi tocado.
 */
export function Chips({
  opcoes,
  valor,
  aoEscolher,
  multi = false,
  ordem = false,
  rotulo,
  rotuloPadrao,
  dica,
}: {
  opcoes: readonly string[];
  valor: string | string[] | undefined;
  aoEscolher: (v: string) => void;
  multi?: boolean;
  ordem?: boolean;
  rotulo?: string;
  /** o título do ecrã, quando a pergunta não tem rótulo próprio */
  rotuloPadrao?: string;
  dica?: string;
}) {
  const id = useId();
  const lista = Array.isArray(valor) ? valor : [];
  const tresLargas = opcoes.every((o) => o.length <= CURTA);
  return (
    <Bloco rotulo={rotulo} dica={dica} rotuloId={rotulo ? id : undefined}>
      <div
        role="group"
        aria-labelledby={rotulo ? id : undefined}
        aria-label={rotulo ? undefined : rotuloPadrao}
        className="grid grid-cols-2 gap-2 sm:grid-cols-6"
      >
        {opcoes.map((o, i) => {
          const sel = multi ? lista.includes(o) : valor === o;
          const pos = ordem ? lista.indexOf(o) + 1 : 0;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={sel}
              onClick={() => aoEscolher(o)}
              className={`flex min-h-[52px] min-w-0 cursor-pointer items-center gap-2 break-words rounded-[4px] border px-3.5 py-2.5 text-left text-[15px] font-medium leading-[1.3] transition-colors ${vaosDaGrelha(opcoes.length, i, tresLargas)} ${sel ? ON : OFF}`}
            >
              {pos > 0 ? (
                <>
                  <span
                    className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#d4af60] text-[13px] font-bold text-[#05070e]"
                    aria-hidden="true"
                  >
                    {pos}
                  </span>
                  <span className="sr-only">{`${pos}.º: `}</span>
                </>
              ) : null}
              <span className="min-w-0">{semPartirNoHifen(o)}</span>
            </button>
          );
        })}
      </div>
    </Bloco>
  );
}

export function Escala({
  valor,
  aoEscolher,
  min,
  max,
  rotulo,
}: {
  valor: number | undefined;
  aoEscolher: (n: number) => void;
  min: string;
  max: string;
  rotulo: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div role="group" aria-label={`${rotulo} (${min}; ${max})`} className="grid grid-cols-6 gap-2">
        {Array.from({ length: 11 }, (_, n) => {
          const sel = valor === n;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={sel}
              onClick={() => aoEscolher(n)}
              className={`calc-display h-[52px] cursor-pointer rounded-[4px] border text-[20px] font-semibold transition-colors ${sel ? ON : OFF}`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between gap-3 text-[12px] text-[#c3cde0]" aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function AreaTexto({
  rotulo,
  valor,
  aoMudar,
  ph,
}: {
  rotulo: string;
  valor: string | undefined;
  aoMudar: (v: string) => void;
  ph: string;
}) {
  const id = useId();
  const dicaId = `${id}-dica`;
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="m-0 text-[15px] font-semibold leading-[1.4] text-[#eef2f9]">
        {rotulo}
      </label>
      <textarea
        id={id}
        value={valor ?? ""}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={ph}
        rows={3}
        maxLength={500}
        aria-describedby={dicaId}
        className="resize-none rounded-[4px] border border-[rgba(238,242,249,0.25)] bg-[rgba(8,16,38,0.4)] px-3.5 py-3 text-[16px] leading-[1.45] text-[#eef2f9] placeholder:text-[#93a3c2]"
      />
      <p id={dicaId} className="m-0 text-[13px] leading-[1.45] text-[#c3cde0]">
        Opcional, mas é o que mais nos ajuda a preparar o seu cálculo.
      </p>
    </div>
  );
}

/**
 * Cartões de escolha única. Um por linha no telemóvel (são as perguntas
 * principais do ecrã, com frases inteiras); com `lado`, ficam lado a lado nos
 * ecrãs largos, todos com a mesma altura.
 */
export function Cartoes({
  opcoes,
  valor,
  aoEscolher,
  rotuloPadrao,
  lado = false,
}: {
  opcoes: readonly (readonly [string, string])[];
  valor: string | undefined;
  aoEscolher: (v: string) => void;
  rotuloPadrao: string;
  lado?: boolean;
}) {
  return (
    <div role="group" aria-label={rotuloPadrao} className={`grid grid-cols-1 gap-2.5 ${lado ? "sm:grid-cols-3" : ""}`}>
      {opcoes.map(([rot, sub]) => {
        const sel = valor === rot;
        return (
          <button
            key={rot}
            type="button"
            aria-pressed={sel}
            onClick={() => aoEscolher(rot)}
            className={`flex min-h-[56px] min-w-0 cursor-pointer flex-col items-start justify-center gap-1 break-words rounded-[4px] border px-4 py-3.5 text-left text-[#eef2f9] transition-colors ${
              sel ? "border-[#d4af60] bg-[rgba(212,175,96,0.2)]" : "border-[rgba(238,242,249,0.25)] bg-[rgba(8,16,38,0.4)] hover:border-[rgba(238,242,249,0.45)]"
            }`}
          >
            <span className="text-[16px] font-semibold leading-[1.3]">{rot}</span>
            {sub ? <span className={`text-[13px] ${sel ? "text-[#f3dc9f]" : "text-[#c3cde0]"}`}>{sub}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export function Campo({
  rotulo,
  valor,
  aoMudar,
  ph,
  tipo = "text",
  autoComplete,
  inputMode,
  altura = 52,
  erro,
  maxLength = 200,
  inputRef,
}: {
  rotulo: string;
  valor: string;
  aoMudar: (v: string) => void;
  ph: string;
  tipo?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  altura?: number;
  erro?: string;
  maxLength?: number;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#d3dbea]">
        {rotulo}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={tipo}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={ph}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
        style={{ height: altura }}
        className={`w-full rounded-[4px] border bg-[rgba(8,16,38,0.4)] px-3.5 text-[17px] text-[#eef2f9] placeholder:text-[#93a3c2] ${
          erro ? "border-[#f0a08a]" : "border-[rgba(238,242,249,0.25)]"
        }`}
      />
      {erro ? (
        <p id={`${id}-erro`} className="m-0 text-[13px] text-[#ffc9b8]">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

export function Caixa({
  marcada,
  aoMudar,
  children,
}: {
  marcada: boolean;
  aoMudar: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={marcada}
        onChange={(e) => aoMudar(e.target.checked)}
        className="mt-0.5 h-[22px] w-[22px] shrink-0 cursor-pointer accent-[#d4af60]"
      />
      <span className="text-[14px] leading-[1.5] text-[#d3dbea]">{children}</span>
    </label>
  );
}

export function Cadeado() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** O bilhete dourado do ecrã do contacto, com o número ainda escondido. */
export function Bilhete({ rotulo }: { rotulo: string }) {
  return (
    <div
      className="relative h-[112px] overflow-hidden rounded-[6px]"
      style={{ background: "linear-gradient(130deg, #a17834 0%, #e8c77e 30%, #f7e2a8 46%, #c79c4b 66%, #efd394 100%)" }}
      role="img"
      aria-label={`${rotulo}: o valor revela-se no seu email`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 5px, rgba(90,60,10,0.06) 5px, rgba(90,60,10,0.06) 10px)",
        }}
      />
      <div
        className="calc-brilho absolute -bottom-5 -top-5 left-0 w-[60px]"
        style={{ background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.65), rgba(255,255,255,0))" }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-[22px] text-[#2e1f08]">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="m-0 truncate text-[10px] font-bold uppercase tracking-[2.5px]">{rotulo}</p>
          <p className="calc-display m-0 text-[30px] font-bold">?.??? €</p>
        </div>
        <div className="box-border flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-dashed border-[#d4af60] bg-[#0c1a36] text-[#f0d089]">
          <Cadeado />
        </div>
      </div>
    </div>
  );
}
