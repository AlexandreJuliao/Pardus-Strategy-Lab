"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";
import type { Vertical } from "@/lib/verticals";

/**
 * O que acontece quando alguém preenche o formulário do site: os campos
 * enchem-se sozinhos, o pedido segue, e a notificação cai no telemóvel do
 * dono. É a parte do site que vem incluída (formulário → aviso), sem chatbot.
 *
 * Guionado por setTimeout, como o LiveChat: continua a andar em separadores
 * ocultos e mostra o estado final de imediato quando o sistema pede menos
 * movimento.
 */

const INK = "#14120f";
const PAPER = "#f6f3ed";
const ORANGE = "#d95c22";
const LINE = "rgba(20,18,15,0.12)";

type Phase = "typing" | "sending" | "sent" | "notified";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LpLeadFlow({ v }: { v: Vertical }) {
  const f = v.flow;
  const fields = f.fields;
  const [typed, setTyped] = useState<number[]>(() =>
    reducedMotion() ? fields.map((x) => x.value.length) : fields.map(() => 0),
  );
  const [phase, setPhase] = useState<Phase>(reducedMotion() ? "notified" : "typing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const schedule = (fn: () => void, ms: number) => {
      timer.current = setTimeout(fn, ms);
    };

    const typeField = (i: number, pos: number) => {
      if (i >= fields.length) {
        setPhase("sending");
        schedule(() => {
          setPhase("sent");
          schedule(() => {
            setPhase("notified");
            schedule(reset, 5200);
          }, 900);
        }, 1100);
        return;
      }
      const value = fields[i].value;
      if (pos > value.length) {
        schedule(() => typeField(i + 1, 0), 380);
        return;
      }
      setTyped((t) => t.map((n, k) => (k === i ? pos : n)));
      schedule(() => typeField(i, pos + 1), 34 + Math.random() * 40);
    };

    const reset = () => {
      setPhase("typing");
      setTyped(fields.map(() => 0));
      schedule(() => typeField(0, 0), 900);
    };

    schedule(() => typeField(0, 0), 900);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeField = typed.findIndex((n, i) => n < fields[i].value.length);
  const sent = phase === "sent" || phase === "notified";

  return (
    <section className="relative overflow-hidden section-pad">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <span className="block h-px w-10 bg-gold/50" />
          <h2 className="text-h2 mt-6 text-text-primary [text-wrap:balance]">{f.title}</h2>
          <p className="hero-sub mt-5 max-w-lg text-[clamp(15px,1.4vw,18px)]">{f.intro}</p>
          <div className="mt-8">
            <CtaButton size="lg">
              {f.cta} <ArrowRight size={17} />
            </CtaButton>
          </div>
        </div>

        <div className="relative pb-40 md:pb-32">
          {/* o formulário no site do cliente */}
          <div
            className="relative rounded-[10px] p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)] md:p-7"
            style={{ background: PAPER, color: INK }}
          >
            <p className="text-[17px] font-extrabold tracking-[-0.02em]">{f.formTitle}</p>
            <p className="mt-1 text-[11.5px]" style={{ color: "rgba(20,18,15,0.58)" }}>
              {f.formIntro}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {fields.map((fl, i) => {
                const text = fl.value.slice(0, typed[i]);
                const active = i === activeField && phase === "typing";
                return (
                  <label key={fl.label} className={`block ${fl.wide ? "sm:col-span-2" : ""}`}>
                    <span className="text-[9px] font-semibold tracking-[0.1em]" style={{ color: "rgba(20,18,15,0.5)" }}>
                      {fl.label.toUpperCase()}
                    </span>
                    <span
                      className="mt-1 flex min-h-[38px] items-center rounded-[3px] px-3 text-[12.5px]"
                      style={{
                        border: `1px solid ${active ? ORANGE : LINE}`,
                        background: "#fff",
                        boxShadow: active ? `0 0 0 3px rgba(217,92,34,0.14)` : undefined,
                        color: text ? INK : "rgba(20,18,15,0.35)",
                      }}
                    >
                      {text || (active ? "" : fl.placeholder)}
                      {active && <span className="ml-px inline-block h-[14px] w-px animate-pulse-soft" style={{ background: INK }} />}
                    </span>
                  </label>
                );
              })}
            </div>
            <span
              className="mt-4 flex items-center justify-center gap-2 rounded-[3px] py-3 text-[12.5px] font-semibold transition-colors duration-300"
              style={{ background: sent ? "#2f8f5b" : ORANGE, color: PAPER }}
            >
              {phase === "sending" ? "A enviar…" : sent ? <><Check size={13} strokeWidth={3} /> Pedido enviado</> : <>{f.submit} <ArrowRight size={13} strokeWidth={2.6} /></>}
            </span>
          </div>

          {/* a notificação no telemóvel do dono */}
          <div
            aria-live="polite"
            className={`absolute -bottom-4 right-0 w-[min(340px,92%)] rounded-[14px] border border-white/[0.1] bg-[#0b0f1a]/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-500 ease-premium md:-right-6 ${
              phase === "notified" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle size={15} />
              </span>
              <div className="flex-1 leading-tight">
                <p className="font-sans text-[12.5px] font-medium text-text-primary">{f.notify.title}</p>
                <p className="font-sans text-[11px] text-text-secondary">agora</p>
              </div>
            </div>
            <p className="mt-3 font-sans text-[12.5px] leading-snug text-text-primary">
              <strong className="font-semibold">{fields[0].value}</strong> · {fields[1].value}
            </p>
            <p className="mt-1 font-sans text-[12px] leading-snug text-text-secondary">
              {fields[fields.length - 1].value}
            </p>
            <p className="mt-3 flex items-center gap-1.5 border-t border-white/[0.07] pt-2.5 font-sans text-[11px] text-text-muted">
              <Mail size={11} /> {f.notify.also}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
