"use client";

import { Fragment } from "react";
import { useScene } from "./useScene";
import { clamp01, eo, qa, q, seg } from "./anim";

// O manifesto escreve-se à medida que se desce: cada palavra acende quando o
// scroll lá chega, com um cursor dourado a seguir a última palavra escrita.
const HEAD = ["Construímos", "coisas", "que", "funcionam"];
const HEAD_ACC = ["de", "verdade."];
const PARA =
  "Gostamos de estar por perto. Desenhamos, construímos e mantemos sites, inteligência artificial e automação que trabalham pelo teu negócio todos os dias. Da primeira conversa ao lançamento, e muito para lá disso.";
// palavras do parágrafo que acendem a dourado
const GOLD = new Set([3, 4, 19, 20, 21, 28, 29, 30, 31]);

const PILLARS = [
  ["Do início ao fim", "Levamos cada projeto até estar a funcionar."],
  ["IA e web, na mesma equipa", "Uma equipa, tudo a falar entre si."],
  ["Resultados mensuráveis", "Cada projeto com métricas reais."],
];

function Pillars({ className }: { className: string }) {
  return (
    <div className={className}>
      {PILLARS.map(([t, d], i) => (
        <Fragment key={t}>
          {i > 0 && <i className="hm-mani-dia" aria-hidden />}
          <div className="hm-mani-pl">
            <i className="hm-mani-rule" aria-hidden>
              <b />
            </i>
            <span className="hm-mani-n hm-acc">0{i + 1}</span>
            <b className="hm-mani-t">{t}</b>
            <span className="hm-mani-d">{d}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default function ManifestoHome() {
  const words = PARA.split(" ");

  const ref = useScene<HTMLElement>(
    (root) => {
      const ws = qa(root, ".hm-mani-in .hm-w");
      const caret = q(root, ".hm-caret");
      const box = q(root, ".hm-mani-in");
      const pills = qa(root, ".hm-mani-pin .hm-mani-pl");
      const rules = qa(root, ".hm-mani-pin .hm-mani-rule");
      const dias = qa(root, ".hm-mani-pin .hm-mani-dia");
      const glow = q(root, ".hm-mani-glow");
      const N = ws.length;
      return ({ p, T, rm }) => {
        const x = rm ? N + 2 : seg(p, 0.03, 0.74) * (N + 1.5);
        ws.forEach((w, i) => {
          const lp = clamp01((x - i) / 1.5);
          w.style.opacity = (0.13 + 0.87 * lp).toFixed(3);
          w.classList.toggle("is-lit", lp > 0.6);
        });
        if (caret && box) {
          const i = Math.min(N - 1, Math.max(0, Math.floor(x)));
          const w = ws[i];
          const show = !rm && x > 0.2 && x < N + 1;
          caret.style.opacity = show ? "1" : "0";
          if (show && w) {
            caret.style.transform = `translate(${(w.offsetLeft + w.offsetWidth + 6).toFixed(1)}px, ${w.offsetTop.toFixed(1)}px)`;
            caret.style.height = `${w.offsetHeight}px`;
          }
        }
        rules.forEach((r, i) => {
          r.style.transform = `scaleX(${eo(seg(p, 0.76 + i * 0.04, 0.88 + i * 0.04)).toFixed(3)})`;
        });
        pills.forEach((el, i) => {
          const v = rm ? 1 : eo(seg(p, 0.8 + i * 0.04, 0.92 + i * 0.04));
          el.style.opacity = v.toFixed(3);
          el.style.transform =
            v >= 1 ? "" : `translateY(${((1 - v) * 24).toFixed(1)}px)`;
        });
        dias.forEach((d, i) => {
          const v = rm ? 1 : eo(seg(p, 0.84 + i * 0.04, 0.92 + i * 0.04));
          d.style.transform = `rotate(45deg) scale(${v.toFixed(3)})`;
        });
        if (glow) {
          glow.style.transform = `translate(${(Math.sin(T * 0.3) * 6).toFixed(2)}%, ${(Math.cos(T * 0.25) * 4 - p * 10).toFixed(2)}%)`;
        }
      };
    },
    { pin: true },
  );

  let n = 0;
  return (
    <>
      <section ref={ref} className="hm-sec hm-mani" aria-labelledby="hm-mani-h">
        <div className="hm-mani-pin">
          <div className="hm-mani-glow" aria-hidden />
          <div className="hm-mani-in">
            <h2 id="hm-mani-h" className="hm-mani-h">
              {HEAD.map((w, i) => (
                <Fragment key={`h${i}`}>
                  <span className="hm-w" data-n={n++}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
              <span className="hm-mani-acc hm-acc">
                {HEAD_ACC.map((w, i) => (
                  <Fragment key={`a${i}`}>
                    <span className="hm-w is-g" data-n={n++}>
                      {w}
                    </span>
                    {i < HEAD_ACC.length - 1 ? " " : ""}
                  </Fragment>
                ))}
              </span>
            </h2>
            <p className="hm-mani-p">
              {words.map((w, i) => (
                <Fragment key={`p${i}`}>
                  <span
                    className={`hm-w ${GOLD.has(i) ? "is-g" : ""}`}
                    data-n={n++}
                  >
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </p>
            <i className="hm-caret" aria-hidden />
            <Pillars className="hm-mani-pills hm-desk" />
          </div>
        </div>
      </section>
      {/* no telemóvel os pilares vêm depois do texto preso, já fora dele */}
      <Pillars className="hm-mani-pills hm-mob" />
    </>
  );
}
