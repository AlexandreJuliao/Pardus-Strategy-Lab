"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/**
 * A small, human "show don't tell" — an assistant answering a real customer
 * and booking a meeting, playing out message by message. Replaces the old
 * fake terminal (a dev-site cliché) with something warm and tangible.
 *
 * Driven by setTimeout (not rAF), so it keeps progressing on hidden tabs and
 * renders whatever is already shown without gating visibility on animation.
 */

type Msg = { who: "them" | "us"; text: string; at: string };

const SCRIPT: Msg[] = [
  { who: "them", text: "Boa tarde! Ainda têm vaga para esta semana?", at: "14:02" },
  { who: "us", text: "Olá! 👋 Temos, sim. Qual é o melhor dia para si?", at: "14:02" },
  { who: "them", text: "Quinta à tarde, se der.", at: "14:03" },
  {
    who: "us",
    text: "Perfeito. Marquei quinta às 15h e já lhe enviei a confirmação. Até lá! ✨",
    at: "14:03",
  },
];

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LiveChat() {
  const [count, setCount] = useState(reducedMotion() ? SCRIPT.length : 1);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(reducedMotion());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion()) return;

    const schedule = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };

    const advance = (n: number) => {
      if (n >= SCRIPT.length) {
        setDone(true);
        schedule(() => {
          setDone(false);
          setCount(1);
          advance(1);
        }, 3400);
        return;
      }
      const next = SCRIPT[n];
      if (next.who === "us") {
        setTyping(true);
        schedule(() => {
          setTyping(false);
          setCount(n + 1);
          schedule(() => advance(n + 1), 900);
        }, 1100);
      } else {
        setCount(n + 1);
        schedule(() => advance(n + 1), 1300);
      }
    };

    schedule(() => advance(1), 1300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const shown = SCRIPT.slice(0, count);

  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-[#080b14] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-display text-sm font-bold text-gold">
          P
        </span>
        <div className="leading-tight">
          <p className="font-sans text-[13.5px] font-medium text-text-primary">
            Assistente Pardus
          </p>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fd0a8] animate-pulse-soft" />
            <span className="font-sans text-[11.5px] text-text-secondary">
              online agora
            </span>
          </span>
        </div>
      </div>

      {/* thread */}
      <div className="flex min-h-[280px] flex-col gap-2.5 p-4 md:p-5">
        {shown.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.who === "us" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[82%] rounded-[14px] px-3.5 py-2.5 font-sans text-[13.5px] leading-snug ${
                m.who === "us"
                  ? "rounded-br-[4px] bg-gold text-[#0a0a0a]"
                  : "rounded-bl-[4px] border border-line bg-white/[0.03] text-text-primary"
              }`}
            >
              {m.text}
              <span
                className={`mt-1 block text-right text-[10px] ${
                  m.who === "us" ? "text-[#0a0a0a]/55" : "text-text-muted"
                }`}
              >
                {m.at}
              </span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-end">
            <div className="flex items-center gap-1 rounded-[14px] rounded-br-[4px] bg-gold/90 px-3 py-2.5">
              <Dot delay="0ms" />
              <Dot delay="160ms" />
              <Dot delay="320ms" />
            </div>
          </div>
        )}

        {done && (
          <div className="mt-1 flex items-center gap-2 self-center rounded-full border border-line bg-white/[0.02] px-3 py-1.5">
            <Check size={13} strokeWidth={2.6} className="text-[#5fd0a8]" />
            <span className="font-sans text-[12px] text-text-secondary">
              Reunião marcada · respondido em segundos, sem ninguém do outro lado
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]/70 animate-bounce-chevron"
      style={{ animationDelay: delay, animationDuration: "1s" }}
    />
  );
}
