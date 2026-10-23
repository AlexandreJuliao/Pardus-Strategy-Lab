"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { useScene } from "./useScene";
import { eo, lerp, qa, q, seg } from "./anim";
import { scrollToEl, scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";
import { prefillLead } from "@/lib/prefill";

const SLOTS = ["10:00", "11:30", "15:00", "16:30"];
const WD = ["S", "T", "Q", "Q", "S", "S", "D"];
const WD_LONG = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

// Quem está do outro lado da conversa.
const TEAM = [
  { img: "/img/team/alexandre.jpg", n: "Alexandre Julião", r: "Fundador", d: "Estratégia, propostas e acompanhamento." },
  { img: "/img/team/tomas.jpg", n: "Tomás Araújo", r: "Desenvolvimento", d: "Sites, sistemas e automações." },
];

type Cal = { year: number; month: number; lead: number; days: number; open: Set<number>; first: number };

/** O mês a mostrar: o primeiro dia útil a partir de depois de amanhã e o resto desse mês. */
function buildCal(now: Date): Cal {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = d.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // semana começa à segunda
  const open = new Set<number>();
  for (let day = d.getDate(); day <= days; day++) {
    const wd = new Date(year, month, day).getDay();
    if (wd !== 0 && wd !== 6) open.add(day);
  }
  return { year, month, lead, days, open, first: d.getDate() };
}

export default function MarcacaoHome() {
  const [cal, setCal] = useState<Cal | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const touched = useRef(false);

  useEffect(() => setCal(buildCal(new Date())), []);

  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-bk-head > *");
    const card = q(root, ".hm-bk");
    const team = qa(root, ".hm-tm-card");
    let auto = 0;
    return ({ t, T, p, u, rm }) => {
      team.forEach((m, i) => {
        const v = rm ? 1 : eo(seg(t, 0.5 + i * 0.25, 1.7 + i * 0.25));
        m.style.opacity = v.toFixed(3);
        if (!desk) {
          m.style.transform = v >= 1 ? "" : `translateY(${lerp(30, 0, v).toFixed(1)}px)`;
          return;
        }
        const side = i === 0 ? -1 : 1;
        const bob = rm ? 0 : Math.sin(T * 0.6 + i * 2.2) * 7;
        m.style.transform = `translate3d(${(lerp(120 * side, 0, v) * u).toFixed(1)}px, ${((lerp(90, 0, v) + bob - 30 * (p - 0.5)) * u).toFixed(1)}px, 0) rotate(${lerp(14 * side, 3.5 * side, v).toFixed(2)}deg)`;
      });
      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.2 + i * 0.2, 0.8 + i * 0.2));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      if (card) {
        const pin = rm ? 1 : eo(seg(t, 0.3, 1.5));
        const sc = (p - 0.5) * 2;
        card.style.opacity = pin.toFixed(3);
        card.style.transform = desk
          ? `translate3d(0, ${(lerp(140, 0, pin) - 20 * sc + Math.sin(T * 0.7) * 4).toFixed(1)}px, ${lerp(-300, 0, pin).toFixed(1)}px) rotateX(${lerp(20, 3, pin).toFixed(2)}deg) rotateY(${(Math.sin(T * 0.5) * 2).toFixed(2)}deg)`
          : `translateY(${lerp(40, 0, pin).toFixed(1)}px)`;
      }
      // Sem ninguém mexer, o widget sugere a próxima vaga: dia e depois a hora.
      if (!touched.current && t > 1.4 && auto === 0) {
        auto = 1;
        root.dispatchEvent(new CustomEvent("hm-bk-auto", { detail: 1 }));
      }
      if (!touched.current && t > 2.5 && auto === 1) {
        auto = 2;
        root.dispatchEvent(new CustomEvent("hm-bk-auto", { detail: 2 }));
      }
    };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = (e: Event) => {
      if (touched.current || !cal) return;
      const step = (e as CustomEvent<number>).detail;
      if (step === 1) setDay(cal.first);
      if (step === 2) setSlot("15:00");
    };
    el.addEventListener("hm-bk-auto", on);
    return () => el.removeEventListener("hm-bk-auto", on);
  }, [cal, ref]);

  const label = useMemo(() => {
    if (!cal || day == null) return null;
    const wd = new Date(cal.year, cal.month, day).getDay();
    return { short: `${WD_LONG[wd]}, ${day}`, long: `${WD_LONG[wd].toLowerCase()}, ${day} de ${MONTHS[cal.month]}` };
  }, [cal, day]);

  const confirm = () => {
    if (!label || !slot) return;
    setSent(true);
    prefillLead({ mensagem: `Gostava de marcar a consultoria gratuita para ${label.long}, às ${slot}.` });
    // direto ao cartão do formulário (nome e telemóvel à vista), não ao título
    window.setTimeout(() => {
      const card = document.getElementById("consultoria-form");
      if (card) scrollToEl(card, -110);
      else scrollToId(CTA_TARGET_ID);
    }, 900);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section ref={ref} id="marcar" className="hm-sec hm-bk-sec section-petrol" aria-labelledby="hm-bk-h">
      <div className="hm-cv hm-bk-cv">
        <div className="hm-glow hm-glow-gold hm-bk-glow" aria-hidden />
        <div className="hm-bk-head">
          <span className="hm-chip hm-bk-chip">A nossa equipa</span>
          <h2 id="hm-bk-h" className="hm-h2">
            O próximo salto do teu negócio <br className="hm-desk-br" />
            <span className="hm-acc">começa numa conversa.</span>
          </h2>
          <p className="hm-body">
            Somos o Alexandre e o Tomás. Meia hora, sem custo: olhamos para o que fazes e
            dizemos-te o que faz sentido.
          </p>
        </div>

        <ul className="hm-tm" aria-label="A nossa equipa">
          {TEAM.map((m, i) => (
            <li key={m.n} className={`hm-tm-card hm-tm-${i}`}>
              <div className="hm-tm-ph">
                <Image src={m.img} alt={m.n} fill sizes="(min-width:1024px) 16vw, 72px" />
              </div>
              <div className="hm-tm-tx">
                <b>{m.n}</b>
                <span>{m.r}</span>
                <p>{m.d}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="hm-bk-stage">
          <div className="hm-mk hm-bk-mk">
            <div className="hm-ui hm-bk">
              <div className="hm-bk-l">
                <div className="hm-bk-avs">
                  {TEAM.map((m) => (
                    <div key={m.n} className="hm-bk-av">
                      <Image src={m.img} alt="" fill sizes="80px" />
                    </div>
                  ))}
                </div>
                <span className="hm-bk-who">Alexandre ou Tomás</span>
                <b className="hm-bk-t">Consultoria gratuita</b>
                <span className="hm-bk-m">
                  <Icon name="cal" className="hm-ic-gold" /> 30 min
                </span>
                <span className="hm-bk-m">
                  <Icon name="globe" className="hm-ic-gold" /> Videochamada
                </span>
              </div>

              <div className="hm-bk-c">
                <b className="hm-bk-mo">
                  {cal ? `${MONTHS[cal.month][0].toUpperCase()}${MONTHS[cal.month].slice(1)}` : " "}
                </b>
                <div className="hm-bk-wd" aria-hidden>
                  {WD.map((w, i) => (
                    <span key={i}>{w}</span>
                  ))}
                </div>
                <div className="hm-bk-g" role="group" aria-label="Escolher o dia">
                  {cal &&
                    Array.from({ length: cal.lead }, (_, i) => <span key={`e${i}`} aria-hidden />)}
                  {cal &&
                    Array.from({ length: cal.days }, (_, i) => {
                      const d = i + 1;
                      const open = cal.open.has(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          disabled={!open}
                          className={`hm-bk-d ${open ? "is-av" : ""} ${day === d ? "is-on" : ""}`}
                          aria-pressed={day === d}
                          aria-label={`${d} de ${MONTHS[cal.month]}`}
                          onClick={() => {
                            touched.current = true;
                            setDay(d);
                            setSlot(null);
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className={`hm-bk-r ${day != null ? "is-open" : ""}`}>
                <b className="hm-bk-day">{label ? label.short : "Escolhe um dia"}</b>
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={day == null}
                    className={`hm-bk-s ${slot === s ? "is-on" : ""}`}
                    aria-pressed={slot === s}
                    onClick={() => {
                      touched.current = true;
                      setSlot(s);
                    }}
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  className={`hm-bk-go ${slot ? "is-on" : ""}`}
                  disabled={!slot}
                  onClick={confirm}
                >
                  Continuar
                </button>
              </div>

              <div className={`hm-bk-ok ${sent ? "is-on" : ""}`} aria-hidden={!sent}>
                <i className="hm-bk-okc" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </i>
                <b>Boa escolha!</b>
                <span>
                  {label?.short} · {slot} · Falta só deixares o teu contacto.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
