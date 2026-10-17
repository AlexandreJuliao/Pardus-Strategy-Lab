"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";
import { clamp01, eio, eob, seg } from "./anim";

const PHRASES = [
  "vender enquanto dormes.",
  "responder antes dos outros.",
  "encher a agenda sozinho.",
  "crescer a sério.",
];

const TRUST = [
  { to: 0, unit: "€", label: ["primeira", "consultoria"] },
  { to: 24, unit: "h", label: ["tempo de", "resposta"] },
  { to: 100, unit: "%", label: ["código e", "acessos teus"] },
];

// Pontos dourados a subir devagar no fundo (posição, tamanho, velocidade).
const DOTS = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    x: (4 + r(1) * 92).toFixed(2),
    s: (0.35 + r(2) * 0.7).toFixed(2),
    d: (26 + r(3) * 34).toFixed(1),
    o: (-r(4) * 60).toFixed(1),
    a: (0.25 + r(5) * 0.35).toFixed(2),
  };
});

export default function HeroHome() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLSpanElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const horizon = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(-1);

  // Largura do espaço da frase: segue a frase ativa, para o «a» deslizar.
  useEffect(() => {
    const el = slot.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const widths = () =>
      Array.from(el.querySelectorAll<HTMLElement>(".hm-ph")).map((p) => p.offsetWidth);
    const apply = () => {
      if (!mq.matches) {
        el.style.width = "";
        return;
      }
      const w = widths();
      el.style.width = `${w[Number(el.dataset.i ?? 0)]}px`;
    };
    el.style.width = `${el.offsetWidth}px`;
    el.classList.add("is-js");
    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    document.fonts?.ready.then(apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  useEffect(() => {
    const el = slot.current;
    if (!el) return;
    el.dataset.i = String(idx);
    if (window.matchMedia("(min-width: 768px)").matches) {
      const p = el.querySelectorAll<HTMLElement>(".hm-ph")[idx];
      if (p) el.style.width = `${p.offsetWidth}px`;
    }
  }, [idx]);

  // Troca de frase: só com o herói à vista e sem movimento reduzido.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hd = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hd")) || 0.15;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    let timer = 0;
    const next = (first: boolean) => {
      timer = window.setTimeout(
        () => {
          if (visible && document.visibilityState === "visible") {
            setIdx((i) => {
              setOut(i);
              return (i + 1) % PHRASES.length;
            });
            floor.current?.animate(
              [{ filter: "brightness(1.9)" }, { filter: "brightness(1)" }],
              { duration: 1400, easing: "cubic-bezier(.16,1,.3,1)" },
            );
            horizon.current?.animate(
              [{ opacity: 1 }, { opacity: 0.72 }],
              { duration: 1400, easing: "ease-out" },
            );
          }
          next(false);
        },
        first ? (hd + 2.4) * 1000 : 2700,
      );
    };
    next(true);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  // Números de confiança: contam até ao valor (o 0 entra com um pulo).
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(".hm-num");
    if (!els) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hd = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hd")) || 0.15;
    const t0 = performance.now() + (hd + 0.85) * 1000;
    let raf = 0;
    const tick = (now: number) => {
      let done = true;
      els.forEach((n, i) => {
        const to = TRUST[i].to;
        const t = (now - t0) / 1000 - i * 0.2;
        const p = reduced ? 1 : eio(seg(t, 0, 1.1));
        const v = n.querySelector(".hm-num-v");
        if (v) v.textContent = String(Math.round(to * p));
        const pop = reduced ? 1 : clamp01(eob(seg(t, to ? 1.0 : 0.05, to ? 1.4 : 0.55)));
        n.style.transform = to
          ? `scale(${(1 + 0.08 * Math.sin(pop * Math.PI)).toFixed(3)})`
          : `scale(${(1.5 - 0.5 * pop).toFixed(3)})`;
        if (t < 1.5) done = false;
      });
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Ao descer, o conteúdo afasta-se mais devagar do que a página e apaga-se.
  useEffect(() => {
    const el = content.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.2) return;
      el.style.transform = y > 0 ? `translateY(${(y * 0.32).toFixed(1)}px)` : "";
      el.style.opacity = (1 - clamp01(y / (vh * 0.75))).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} className="hm-hero" aria-labelledby="hm-hero-h">
      <div className="hm-hero-bg" aria-hidden>
        <div ref={floor} className="hm-floor">
          <i />
        </div>
        <div ref={horizon} className="hm-horizon" />
        <div className="hm-glow hm-glow-a" />
        <div className="hm-glow hm-glow-b" />
        <div className="hm-dots">
          {DOTS.map((d, i) => (
            <i
              key={i}
              style={
                {
                  "--x": `${d.x}%`,
                  "--s": d.s,
                  "--dur": `${d.d}s`,
                  "--del": `${d.o}s`,
                  "--a": d.a,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div ref={content} className="hm-hero-c">
        <span className="hm-chip hm-hero-kick hm-in" style={{ "--d": "0s" } as React.CSSProperties}>
          <i className="hm-live" /> Sites · Inteligência artificial · Automações
        </span>

        <h1 id="hm-hero-h" className="hm-hero-h">
          <span className="sr-only">Pomos o teu negócio a {PHRASES[0]}</span>
          <span aria-hidden className="hm-hero-ln hm-in" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Pomos o teu negócio<span className="hm-a-m"> a</span>
          </span>
          <span aria-hidden className="hm-hero-ln hm-hero-l2 hm-in" style={{ "--d": "0.24s" } as React.CSSProperties}>
            <span className="hm-a">a</span>
            <span ref={slot} className="hm-slot" data-i="0">
              {PHRASES.map((p, i) => (
                <span
                  key={p}
                  className={`hm-ph hm-acc ${i === idx ? "is-on" : ""} ${i === out ? "is-out" : ""}`}
                >
                  {p}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <p className="hm-hero-sub hm-in" style={{ "--d": "0.45s" } as React.CSSProperties}>
          Construímos sites, assistentes com inteligência artificial e automações à medida
          para pequenas e médias empresas. Menos trabalho manual, mais clientes atendidos.
        </p>

        <div className="hm-hero-cta hm-in" style={{ "--d": "0.6s" } as React.CSSProperties}>
          <button type="button" className="hm-btn hm-btn-lg" onClick={() => scrollToId(CTA_TARGET_ID)}>
            Marcar consultoria grátis <b className="hm-arr">→</b>
          </button>
          <button type="button" className="hm-link" onClick={() => scrollToId("projetos")}>
            ver projetos
          </button>
        </div>

        <ul className="hm-trust hm-in" style={{ "--d": "0.75s" } as React.CSSProperties}>
          {TRUST.map((n, i) => (
            <li key={n.unit} className="hm-tk">
              {i > 0 && <i className="hm-sep" aria-hidden />}
              <b className="hm-num" aria-label={`${n.to}${n.unit}`}>
                <span className="hm-num-v" aria-hidden>
                  {n.to}
                </span>
                <small aria-hidden>{n.unit}</small>
              </b>
              <span className="hm-lb">
                {n.label[0]}
                <br />
                {n.label[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
