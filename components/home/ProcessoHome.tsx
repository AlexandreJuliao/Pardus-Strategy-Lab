"use client";

import Icon from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eio, eo, eob, lerp, q, qa, seg, setText, streamed } from "./anim";

const STEPS = [
  ["01", "Descoberta", "Mapeamos o negócio, objetivos e sistemas existentes."],
  ["02", "Plano", "Desenhamos a solução, as ligações e o calendário."],
  ["03", "Construção", "Por etapas, com entregas frequentes."],
  ["04", "Lançamento", "Colocamos no ar, formamos a equipa e continuamos a melhorar."],
];
const ANS = "Responder a pedidos e marcar reuniões à mão.";
const CODE = [
  '<Hero titulo="Espaços que contam" />',
  "const marcacao = await agenda.criar(cliente)",
  "whatsapp.enviar(confirmacao)",
  "crm.registar(contacto)",
  "site.publicar()",
];

function Screen({ k }: { k: number }) {
  if (k === 0)
    return (
      <div className="hm-pr-s hm-pr-s1" data-k="0">
        <span className="hm-pr-kick">Briefing</span>
        <b className="hm-pr-q">O que te tira mais tempo?</b>
        <span className="hm-pr-ans">{ANS}</span>
        <div className="hm-pr-tags">
          {["Objetivos", "Clientes", "Sistemas", "Prazos"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    );
  if (k === 1)
    return (
      <div className="hm-pr-s hm-pr-s2" data-k="1">
        <div className="hm-pr-wf">
          <i className="w1" />
          <i className="w2" />
          <i className="w3" />
          <i className="w4" />
        </div>
        <div className="hm-pr-gantt">
          <span>Semana 1</span>
          <i className="g1" />
          <span>Semana 2</span>
          <i className="g2" />
          <span>Semana 3</span>
          <i className="g3" />
        </div>
      </div>
    );
  if (k === 2)
    return (
      <div className="hm-pr-s hm-pr-s3" data-k="2">
        <div className="hm-pr-code">
          {CODE.map((c) => (
            <span key={c} data-c={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="hm-pr-prev">
          <i className="b1" />
          <i className="b2" />
          <i className="b3" />
          <i className="b4" />
        </div>
      </div>
    );
  return (
    <div className="hm-pr-s hm-pr-s4" data-k="3">
      <div className="hm-pr-live">
        <span className="hm-mini-wm">
          ATELIER<em>.</em>
        </span>
        <i className="hm-bar w90" />
        <i className="hm-bar w70" />
        <span className="hm-pr-sitebtn">Marcar visita</span>
      </div>
      <div className="hm-ui hm-pr-graph">
        <div className="hm-ui-h">
          <span>Visitas</span>
          <b className="hm-ui-live" />
        </div>
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <path className="hm-pr-path" d="M0 110 C40 104 60 96 90 90 S140 70 170 62 S230 30 300 12" />
        </svg>
      </div>
      <span className="hm-pr-air">
        <Icon name="check" className="hm-ic-gold" /> No ar
      </span>
    </div>
  );
}

function Device({ only }: { only?: number }) {
  const ks = only == null ? [0, 1, 2, 3] : [only];
  return (
    <div className="hm-ui hm-pr-dev" aria-hidden>
      <div className="hm-minibar">
        <i />
        <i />
        <i />
        <b />
      </div>
      <div className="hm-pr-scr">
        <div className="hm-pr-track">
          {ks.map((k) => (
            <Screen key={k} k={k} />
          ))}
        </div>
      </div>
      <div className="hm-pr-prog">
        <b />
      </div>
    </div>
  );
}

/** Põe um ecrã no ponto `c` (segundos desde que ficou ativo) da sua animação. */
function playScreen(s: HTMLElement, c: number) {
  const k = Number(s.dataset.k);
  if (k === 0) {
    setText(q(s, ".hm-pr-ans"), streamed(ANS, c, 0.3, 32));
    qa(s, ".hm-pr-tags span").forEach((g, i) => {
      const v = eob(seg(c, 1.2 + i * 0.14, 1.55 + i * 0.14));
      g.style.opacity = clamp01(v).toFixed(3);
      g.style.transform = `scale(${lerp(0.6, 1, v).toFixed(3)}) rotate(${(i % 2 ? 1 : -1) * 2}deg)`;
    });
  } else if (k === 1) {
    qa(s, ".hm-pr-wf i").forEach((w, i) => {
      const v = eo(seg(c, 0.1 + i * 0.18, 0.65 + i * 0.18));
      w.style.clipPath = `inset(0 ${(100 - 100 * v).toFixed(1)}% 0 0)`;
    });
    qa(s, ".hm-pr-gantt i").forEach((g, i) => {
      g.style.transform = `scaleX(${eo(seg(c, 0.7 + i * 0.3, 1.25 + i * 0.3)).toFixed(3)})`;
    });
  } else if (k === 2) {
    qa(s, ".hm-pr-code span").forEach((e, i) => {
      setText(e, streamed(e.dataset.c ?? "", c, 0.1 + i * 0.38, 60));
    });
    qa(s, ".hm-pr-prev i").forEach((b, i) => {
      const v = eob(seg(c, 0.35 + i * 0.35, 0.7 + i * 0.35));
      b.style.opacity = clamp01(v).toFixed(3);
      b.style.transform = `scale(${lerp(0.7, 1, v).toFixed(3)})`;
    });
  } else {
    const path = q<SVGPathElement>(s, ".hm-pr-path");
    if (path) path.style.strokeDashoffset = (400 * (1 - eio(seg(c, 0.2, 1.6)))).toFixed(1);
    const air = q(s, ".hm-pr-air");
    if (air) {
      const v = eob(seg(c, 0.6, 1.0));
      air.style.opacity = clamp01(v).toFixed(3);
      air.style.transform = `scale(${lerp(0.6, 1, v).toFixed(3)})`;
    }
  }
}

export default function ProcessoHome() {
  const ref = useScene<HTMLElement>(
    (root, desk) => {
      const head = qa(root, ".hm-pr-head > *");
      if (!desk) {
        // Telemóvel: cada etapa tem o seu ecrã e anima quando chega ao ecrã.
        const blocks = qa(root, ".hm-pr-mstep").map((b) => ({
          el: b,
          scr: q(b, ".hm-pr-s") as HTMLElement,
          t0: -1,
          bits: qa(b, ".hm-pr-mtxt > *"),
        }));
        return ({ t, rm, vh }) => {
          const now = performance.now();
          head.forEach((h, i) => {
            const v = rm ? 1 : eo(seg(t, 0.05 + i * 0.12, 0.6 + i * 0.12));
            h.style.opacity = v.toFixed(3);
            h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 24).toFixed(1)}px)`;
          });
          blocks.forEach((b) => {
            const r = b.el.getBoundingClientRect();
            if (b.t0 < 0 && r.top < vh * 0.7) b.t0 = now;
            const c = b.t0 < 0 ? -1 : rm ? 99 : (now - b.t0) / 1000;
            b.bits.forEach((x, i) => {
              const v = rm ? 1 : eo(seg(c, i * 0.1, 0.5 + i * 0.1));
              x.style.opacity = v.toFixed(3);
              x.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 16).toFixed(1)}px)`;
            });
            if (b.scr) playScreen(b.scr, c);
          });
        };
      }

      const rows = qa(root, ".hm-pr-row");
      const rail = q(root, ".hm-pr-rail b");
      const dev = q(root, ".hm-pr-desk .hm-pr-dev");
      const track = q(root, ".hm-pr-desk .hm-pr-track");
      const prog = q(root, ".hm-pr-desk .hm-pr-prog b");
      const screens = qa(root, ".hm-pr-desk .hm-pr-s");
      const starts = [-1, -1, -1, -1];
      let last = -1;
      return ({ t, T, p, u, rm }) => {
        const now = performance.now();
        head.forEach((h, i) => {
          const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
          h.style.opacity = v.toFixed(3);
          h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30 * u).toFixed(1)}px)`;
        });
        // posição 0→3 com pausa em cada etapa
        const x = clamp01(p) * 3;
        const k = Math.min(2, Math.floor(x));
        const pos = k + eio(seg(x - k, 0.25, 0.8));
        const act = Math.round(pos);
        if (t >= 0 && act !== last) {
          starts[act] = now;
          last = act;
        }
        rows.forEach((r, i) => {
          const v = rm ? 1 : eo(seg(t, 0.4 + i * 0.12, 0.9 + i * 0.12));
          const on = clamp01(1 - Math.abs(pos - i));
          r.style.opacity = (v * (0.38 + 0.62 * on)).toFixed(3);
          r.style.transform = `translateY(${(-on * 8 * u).toFixed(1)}px)`;
          r.classList.toggle("is-on", on > 0.5);
        });
        if (rail) rail.style.transform = `scaleX(${clamp01((pos + 1) / 4).toFixed(3)})`;
        if (dev) {
          const pin = rm ? 1 : eo(seg(t, 0.2, 1.4));
          const sc = (p - 0.5) * 2;
          dev.style.opacity = pin.toFixed(3);
          dev.style.transform = `translate3d(0, ${((lerp(140, 0, pin) - 30 * sc + Math.sin(T * 0.8) * 5) * u).toFixed(1)}px, ${(lerp(-400, 0, pin) * u).toFixed(1)}px) rotateX(${(lerp(22, 5, pin) + 2 * sc).toFixed(2)}deg) rotateY(${(Math.sin(T * 0.45) * 2.5).toFixed(2)}deg)`;
        }
        if (track) track.style.transform = `translateX(${(-pos * 1060 * u).toFixed(1)}px)`;
        if (prog) prog.style.transform = `scaleX(${clamp01(p).toFixed(3)})`;
        screens.forEach((s, i) => {
          const c = starts[i] < 0 ? (i === 0 && t >= 0 ? t : -1) : rm ? 99 : (now - starts[i]) / 1000;
          if (i === act || Math.abs(pos - i) < 1) playScreen(s, c);
        });
      };
    },
    { pin: true },
  );

  return (
    <section ref={ref} id="processo" className="hm-sec hm-pr" aria-labelledby="hm-pr-h">
      <div className="hm-pr-pin">
        <div className="hm-cv hm-pr-cv">
          <div className="hm-pr-head">
            <h2 id="hm-pr-h" className="hm-h2">
              Como <span className="hm-acc">trabalhamos</span>
            </h2>
            <p className="hm-body">Quatro etapas. Zero ambiguidade. Resultado garantido.</p>
          </div>

          <ol className="hm-pr-list hm-desk">
            <i className="hm-pr-rail" aria-hidden>
              <b />
            </i>
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="hm-pr-row">
                <span className="hm-pr-n">{n}</span>
                <div>
                  <b className="hm-pr-t">{t}</b>
                  <span className="hm-pr-d">{d}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="hm-pr-desk hm-desk">
            <div className="hm-mk hm-pr-mk">
              <Device />
            </div>
          </div>

          <ol className="hm-pr-mob hm-mob">
            {STEPS.map(([n, t, d], i) => (
              <li key={n} className="hm-pr-mstep">
                <div className="hm-pr-mtxt">
                  <span className="hm-pr-n">{n}</span>
                  <b className="hm-pr-t">{t}</b>
                  <span className="hm-pr-d">{d}</span>
                </div>
                <div className="hm-mk hm-pr-mk">
                  <Device only={i} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
