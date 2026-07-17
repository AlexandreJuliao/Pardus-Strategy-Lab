"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { t: string; tone: "cmd" | "ok" | "info" | "gold" }[] = [
  { t: "→ Novo contacto recebido no WhatsApp", tone: "info" },
  { t: "A perceber o pedido…", tone: "cmd" },
  { t: "✓ Cliente identificado e registado", tone: "ok" },
  { t: "✓ Resposta enviada em 1,8 segundos", tone: "ok" },
  { t: "✓ Reunião marcada na agenda", tone: "ok" },
  { t: "● A trabalhar por ti · 24 horas por dia", tone: "gold" },
];

const TONE: Record<string, string> = {
  cmd: "text-text-primary",
  ok: "text-[#5fd0a8]",
  info: "text-blue-bright",
  gold: "text-gold",
};

export default function CodeTerminal() {
  const [done, setDone] = useState<number>(0); // fully typed lines
  const [typed, setTyped] = useState<string>(""); // current line progress
  const [cur, setCur] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (cur >= LINES.length) {
      timer.current = setTimeout(() => {
        setDone(0);
        setTyped("");
        setCur(0);
      }, 2600);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }
    const full = LINES[cur].t;
    if (typed.length < full.length) {
      timer.current = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 26);
    } else {
      timer.current = setTimeout(() => {
        setDone((d) => d + 1);
        setTyped("");
        setCur((c) => c + 1);
      }, 420);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [typed, cur]);

  return (
    <div className="overflow-hidden rounded-[8px] border border-line bg-[#06080f] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
        <span className="ml-3 font-mono text-[11px] text-text-muted">
          Pardus · sistema ao vivo
        </span>
      </div>
      <div className="min-h-[200px] space-y-2 p-5 font-mono text-[13px] leading-relaxed md:text-[13.5px]">
        {LINES.slice(0, done).map((l, i) => (
          <div key={i} className={TONE[l.tone]}>
            {l.t}
          </div>
        ))}
        {cur < LINES.length && (
          <div className={TONE[LINES[cur].tone]}>
            {typed}
            <span className="ml-0.5 inline-block h-[1em] w-[8px] -translate-y-[1px] bg-gold align-middle animate-pulse-soft" />
          </div>
        )}
      </div>
    </div>
  );
}
