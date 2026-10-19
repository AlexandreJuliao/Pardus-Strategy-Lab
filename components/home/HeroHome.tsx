"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";
import { clamp01, eio, eo, eob, lerp, q, qa, rise, seg } from "./anim";
import { useScene } from "./useScene";

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

// Os três pilares: a herói transforma-se neles ao descer (é a mesma cena).
const PILARES = [
  { t: "Presença", d: "Que te encontrem e confiem em ti à primeira.", tags: ["Site", "Loja online", "Ficha Google"] },
  { t: "Captação", d: "Que quem procura o que fazes te contacte a ti.", tags: ["Google", "Anúncios", "Relatórios"] },
  { t: "Sistema", d: "Que o trabalho de dentro ande sozinho e arrumado.", tags: ["Software", "Automação", "Organização"] },
];

// A frase dos pilares, palavra a palavra; `p` diz que pilar cada destaque acende.
const FRASE: { w: string; p?: number }[] = [
  { w: "Estamos" },
  { w: "na" },
  { w: "presença,", p: 0 },
  { w: "na" },
  { w: "captação", p: 1 },
  { w: "e" },
  { w: "no" },
  { w: "sistema", p: 2 },
  { w: "do" },
  { w: "teu" },
  { w: "negócio." },
];

// Ao longo do pin (0→1): a herói sai, o chão avança, os pilares sobem do chão,
// acendem um de cada vez a partir de ON[0] e a partir de ON[3] ficam os três.
const ON = [0.56, 0.66, 0.76, 0.86];

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
  const slot = useRef<HTMLSpanElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const horizon = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(-1);

  // A cena do scroll: a herói recua e apaga-se, o chão continua a andar para a
  // frente e os três pilares erguem-se dele, ligados por uma linha de ouro.
  const root = useScene<HTMLElement>(
    (el, desk) => {
      const content = q(el, ".hm-hero-c");
      const ground = q(el, ".hm-ground");
      const travel = q(el, ".hm-floor-tr");
      const glowB = q(el, ".hm-glow-b");
      const kick = q(el, ".hm-pl-kick");
      const words = qa(el, ".hm-pl-w");
      const marks = qa(el, ".hm-pl-mk");
      const rail = q(el, ".hm-pl-rail");
      const cols = qa(el, ".hm-pl-col");
      const beams = cols.map((c) => q(c, ".hm-pl-beam"));
      const nodes = cols.map((c) => q(c, ".hm-pl-node"));
      const parts = cols.map((c) => qa(c, ".hm-pl-r"));
      const masks = cols.map((c) => q(c, ".hm-pl-word"));
      const foot = q(el, ".hm-pl-foot");
      const beamH = beams.map((b) => b?.offsetHeight ?? 0);
      let lastOn = -2;

      return ({ p, u, rm }) => {
        const U = desk ? u : 1;
        const cell = desk ? 80 * u : 48;
        const P = rm ? 1 : p;

        // 1. A herói recua para o fundo e apaga-se.
        if (content) {
          const e = rm ? 0 : eio(seg(p, 0.02, 0.2));
          const o = rm ? 1 : 1 - eo(seg(p, 0.03, 0.17));
          content.style.transform = e
            ? `translate3d(0, ${(-150 * U * e).toFixed(1)}px, 0) scale(${(1 - 0.12 * e).toFixed(4)})`
            : "";
          content.style.opacity = o.toFixed(3);
          content.style.visibility = o <= 0.01 ? "hidden" : "";
        }

        // 2. O chão desce e continua a andar: a câmara segue em frente.
        const g = rm ? 0 : eio(seg(p, 0.04, 0.34));
        if (ground) ground.style.transform = g ? `translate3d(0, ${((desk ? 230 : 120) * U * g).toFixed(1)}px, 0)` : "";
        if (travel && !rm) travel.style.transform = `translate3d(0, ${((p * 2400 * U) % cell).toFixed(1)}px, 0)`;
        if (glowB) glowB.style.opacity = (1 - 0.5 * g).toFixed(3);

        // 3. A frase entra palavra a palavra.
        rise(kick, eo(seg(P, 0.15, 0.24)), 24 * U);
        words.forEach((w, i) => {
          const v = eo(seg(P, 0.17 + i * 0.011, 0.27 + i * 0.011));
          w.style.transform = v >= 1 ? "none" : `translate3d(0, ${lerp(135, 0, v).toFixed(1)}%, 0)`;
        });

        // 4. Os pilares erguem-se do chão; a linha de ouro liga-os por cima.
        cols.forEach((_, i) => {
          const b = eio(seg(P, 0.24 + i * 0.05, 0.42 + i * 0.05));
          const beam = beams[i];
          if (beam) beam.style.transform = b >= 1 ? "none" : `scaleY(${b.toFixed(4)})`;
          const n = nodes[i];
          if (n) {
            n.style.opacity = b > 0 ? "1" : "0";
            n.style.transform = `translate3d(0, ${((1 - b) * beamH[i]).toFixed(1)}px, 0) rotate(45deg)`;
          }
          parts[i].forEach((r, j) => rise(r, eo(seg(P, 0.32 + i * 0.05 + j * 0.025, 0.46 + i * 0.05 + j * 0.025)), 30 * U));
          const m = masks[i];
          if (m) {
            const v = eo(seg(P, 0.33 + i * 0.05, 0.47 + i * 0.05));
            m.style.transform = v >= 1 ? "none" : `translate3d(0, ${lerp(135, 0, v).toFixed(1)}%, 0)`;
          }
        });
        if (rail) {
          const r = eio(seg(P, 0.38, 0.56));
          rail.style.transform = r >= 1 ? "none" : `scaleX(${r.toFixed(4)})`;
        }

        // 5. Um pilar acende de cada vez (com o destaque da frase); depois os três.
        const on = rm ? 3 : P < ON[0] ? -1 : P < ON[1] ? 0 : P < ON[2] ? 1 : P < ON[3] ? 2 : 3;
        if (on !== lastOn) {
          lastOn = on;
          cols.forEach((c, i) => {
            c.classList.toggle("is-on", on === i || on === 3);
            c.classList.toggle("is-dim", on >= 0 && on < 3 && on !== i);
          });
          marks.forEach((m) => m.classList.toggle("is-on", on === 3 || Number(m.dataset.p) === on));
        }

        rise(foot, eo(seg(P, 0.86, 0.95)), 20 * U);
      };
    },
    { pin: true, at: 1 },
  );

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

  // Troca de frase: só com a herói à vista (no topo) e sem movimento reduzido.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hd = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hd")) || 0.15;
    let timer = 0;
    const next = (first: boolean) => {
      timer = window.setTimeout(
        () => {
          if (window.scrollY < window.innerHeight * 0.5 && document.visibilityState === "visible") {
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
    return () => window.clearTimeout(timer);
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
  }, [root]);

  return (
    <section ref={root} className="hm-hero" aria-labelledby="hm-hero-h">
      <div className="hm-hero-stage">
        <div className="hm-hero-bg" aria-hidden>
          <div className="hm-ground">
            <div ref={floor} className="hm-floor">
              <b className="hm-floor-tr">
                <i />
              </b>
            </div>
            <div ref={horizon} className="hm-horizon" />
          </div>
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

        <div className="hm-hero-c">
          <span className="hm-chip hm-hero-kick hm-in" style={{ "--d": "0s" } as React.CSSProperties}>
            <i className="hm-live" /> Presença · Captação · Sistema
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
            Fazemos o site, trazemos os clientes e arrumamos o trabalho de dentro, para pequenas e
            médias empresas. Menos trabalho manual, mais clientes atendidos.
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

        <div className="hm-pl" aria-labelledby="hm-pl-h">
          <div className="hm-pl-in">
            <div className="hm-pl-head">
              <span className="hm-chip hm-pl-kick">Onde entramos</span>
              <h2 id="hm-pl-h" className="hm-pl-h">
                {FRASE.map((f, i) => (
                  <Fragment key={i}>
                    <span className="hm-pl-m">
                      <span className="hm-pl-w">
                        {f.p === undefined ? (
                          f.w
                        ) : (
                          <span className="hm-pl-mk hm-acc" data-p={f.p}>
                            {f.w}
                          </span>
                        )}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))}
              </h2>
            </div>

            <div className="hm-pl-cols">
              <i className="hm-pl-rail" aria-hidden />
              {PILARES.map((pl, i) => (
                <article key={pl.t} className="hm-pl-col">
                  <i className="hm-pl-beam" aria-hidden />
                  <i className="hm-pl-node" aria-hidden />
                  <div className="hm-pl-body">
                    <span className="hm-pl-n hm-pl-r">0{i + 1}</span>
                    <h3 className="hm-pl-mask">
                      <span className="hm-pl-word">{pl.t}</span>
                    </h3>
                    <p className="hm-pl-d hm-pl-r">{pl.d}</p>
                    <ul className="hm-pl-tags hm-pl-r">
                      {pl.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <p className="hm-pl-foot">
              <i aria-hidden /> Os três feitos pela mesma equipa, a falar contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
