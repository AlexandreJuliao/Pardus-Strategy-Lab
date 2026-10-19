"use client";

import { useScene } from "./useScene";
import { eio, eo, eob, lerp, q, qa, seg } from "./anim";

const W3 = ["Precisão.", "Inteligência.", "Velocidade."];
// Pontos da rede que aparece na fase «Inteligência» (coordenadas do desenho 720×800).
const PTS = [
  [360, 120],
  [610, 400],
  [360, 680],
  [110, 400],
  [490, 220],
  [490, 580],
  [230, 580],
  [230, 220],
];
const LINES: [number, number][] = [];
for (let i = 0; i < PTS.length; i++) for (let j = i + 1; j < PTS.length; j += 2) LINES.push([i, j]);
const RADII = [300, 230, 160];
// fases ao longo do pin: alinhar → ligar → acelerar (cada uma com tempo para se ler)
const PH = [0.1, 0.38, 0.66];
// o que cada fase quer dizer, por baixo das palavras
const CAP = [
  "Cada detalhe no sítio, do primeiro pixel ao último euro.",
  "Tudo ligado: os teus dados a trabalhar por ti.",
  "Entregamos depressa, e o teu negócio responde na hora.",
];

export default function FaixaHome() {
  const ref = useScene<HTMLElement>(
    (root) => {
      const rows = qa(root, ".hm-fx-row");
      const words = qa(root, ".hm-fx-w");
      const nums = qa(root, ".hm-fx-n");
      const sub = q(root, ".hm-fx-sub");
      const rings = qa(root, ".hm-fx-r");
      const core = q(root, ".hm-fx-core");
      const nodes = qa(root, ".hm-fx-node");
      const lines = qa<SVGLineElement>(root, ".hm-fx-net line");
      const gy = q(root, ".hm-fx-gy");
      const caps = qa(root, ".hm-fx-cap span");
      const bar = q(root, ".hm-fx-bar b");
      // o scroll chega aos solavancos (roda do rato); a cena segue-o com inércia
      let sp = -1;
      let lastAct = -2;
      return ({ p: raw, T, t, rm }) => {
        sp = rm || sp < 0 ? raw : sp + (raw - sp) * 0.12;
        if (Math.abs(raw - sp) < 0.0004) sp = raw;
        const p = sp;
        const act = p < PH[1] ? 0 : p < PH[2] ? 1 : 2;
        words.forEach((w, i) => {
          const v = rm ? 1 : eo(seg(t, 0.05 + i * 0.12, 0.6 + i * 0.12));
          w.style.transform = v >= 1 ? "" : `translateY(${lerp(108, 0, v).toFixed(2)}%)`;
          const on = rm || p >= PH[i] - 0.04;
          w.classList.toggle("is-on", on);
          const r = rows[i];
          if (r) {
            const pop = i === act && !rm ? eo(seg(p, PH[i], PH[i] + 0.08)) : 0;
            r.style.transform = pop ? `scale(${(1 + 0.04 * pop).toFixed(4)})` : "";
          }
          const n = nums[i];
          if (n) n.style.opacity = i === act || rm ? "1" : "0.35";
        });
        // legenda da fase ativa; no fim, a frase que junta as três
        const cap = rm ? 3 : p < PH[0] - 0.04 ? -1 : p > PH[2] + 0.24 ? 3 : act;
        if (cap !== lastAct) {
          lastAct = cap;
          caps.forEach((c, i) => c.classList.toggle("is-on", i === cap));
          sub?.classList.toggle("is-on", cap === 3);
        }
        if (bar) bar.style.transform = `scaleX(${(rm ? 1 : seg(p, PH[0] - 0.04, PH[2] + 0.24)).toFixed(4)})`;
        const al = rm ? 1 : eob(seg(p, PH[0] - 0.08, PH[0] + 0.14));
        const spin = Math.max(0, p - PH[2]) * 3;
        const speed = spin * spin * 60 + spin * 140;
        const base = rm ? 0 : T;
        const R = [
          [68, -30, speed + base * 8],
          [-40, 55, -speed * 1.3 - base * 12],
          [20, -70, speed * 1.7 + base * 16],
        ];
        rings.forEach((r, i) => {
          r.style.transform = `rotateX(${lerp(R[i][0], 0, al).toFixed(2)}deg) rotateY(${lerp(R[i][1], 0, al).toFixed(2)}deg) rotateZ(${R[i][2].toFixed(1)}deg)`;
        });
        if (core) {
          const tilt = rm ? 0 : eio(seg(p, PH[2], PH[2] + 0.16));
          core.style.transform = `rotateX(${lerp(0, 58, tilt).toFixed(2)}deg) scale(${(1 + 0.02 * Math.sin(base * 1.4)).toFixed(3)})`;
        }
        const ni = rm ? 1 : eo(seg(p, PH[1] - 0.04, PH[1] + 0.08));
        nodes.forEach((n) => (n.style.opacity = ni.toFixed(3)));
        lines.forEach((l, i) => {
          const v = rm
            ? 0
            : eo(seg(p, PH[1] + i * 0.006, PH[1] + 0.08 + i * 0.006)) * (1 - eo(seg(p, PH[2] + 0.02, PH[2] + 0.1)));
          l.style.opacity = (v * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(base * 4 + i)))).toFixed(3);
        });
        if (gy) gy.style.transform = `translate(-50%, -50%) translateY(${(-(p - 0.5) * 60).toFixed(1)}px)`;
      };
    },
    { pin: true },
  );

  return (
    <section ref={ref} className="hm-sec hm-fx section-gold" aria-label="Precisão, inteligência e velocidade">
      <div className="hm-fx-pin">
        <div className="hm-fx-gy" aria-hidden>
          <div className="hm-mk hm-fx-mk">
            <div className="hm-fx-core">
              {RADII.map((r, i) => (
                <div key={r} className={`hm-fx-r hm-fx-r${i + 1}`}>
                  {[0, 1, 2, 3].map((j) => (
                    <i
                      key={j}
                      className="hm-fx-node"
                      style={{ transform: `rotate(${j * 90 + i * 30}deg) translateX(calc(${r} * var(--k)))` }}
                    />
                  ))}
                </div>
              ))}
              <i className="hm-fx-dot" />
            </div>
            <svg className="hm-fx-net" viewBox="0 0 720 800">
              {LINES.map(([a, b]) => (
                <line key={`${a}-${b}`} x1={PTS[a][0]} y1={PTS[a][1]} x2={PTS[b][0]} y2={PTS[b][1]} />
              ))}
            </svg>
          </div>
        </div>
        <div className="hm-fx-col">
          {W3.map((w, i) => (
            <div key={w} className="hm-fx-row">
              <span className="hm-fx-n" aria-hidden>
                0{i + 1}
              </span>
              <span className="hm-fx-mask">
                <span className={`hm-fx-w ${i === 2 ? "hm-fx-acc" : ""}`}>{w}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="hm-fx-foot">
          <span className="hm-fx-bar" aria-hidden>
            <b />
          </span>
          <p className="hm-fx-cap">
            {CAP.map((c) => (
              <span key={c}>{c}</span>
            ))}
            <span className="hm-fx-sub">Três coisas que levamos para dentro de cada projeto.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
