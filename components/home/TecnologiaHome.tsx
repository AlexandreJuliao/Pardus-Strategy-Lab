"use client";

import Icon, { type IconName } from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eob, eo, lerp, q, qa, seg } from "./anim";

const CAT = [
  ["Sites & experiências", "Rápidos, bonitos e pensados para vender."],
  ["Dados & bastidores", "Tudo guardado, seguro e ligado."],
  ["Inteligência artificial", "Assistentes que percebem e agem."],
  ["Pagamentos & mensagens", "Cartão, MB Way, WhatsApp e email."],
];
const NODES: [string, IconName][] = [
  ["Site", "globe"],
  ["Loja online", "cart"],
  ["WhatsApp", "chat"],
  ["Clientes", "user"],
  ["Email", "mail"],
  ["Pagamentos", "card"],
  ["Agenda", "cal"],
  ["IA", "spark"],
];
const R = 330;

export default function TecnologiaHome() {
  const ref = useScene<HTMLElement>((root) => {
    const head = qa(root, ".hm-sk-head > *");
    const cats = qa(root, ".hm-sk-cat");
    const plane = q(root, ".hm-sk-plane");
    const hub = q(root, ".hm-sk-hub");
    const mk = q(root, ".hm-sk-mk");
    const nodes = qa(root, ".hm-sk-node").map((el, i) => ({
      el,
      ang: (i / NODES.length) * Math.PI * 2,
    }));
    const lines = qa<SVGLineElement>(root, ".hm-sk-svg line");
    const pulses = qa<SVGCircleElement>(root, ".hm-sk-pulse");
    return ({ t, T, p, rm }) => {
      const k = mk ? mk.clientWidth / 900 : 1;
      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      cats.forEach((c, i) => {
        const v = rm ? 1 : eo(seg(t, 0.8 + i * 0.15, 1.3 + i * 0.15));
        c.style.opacity = v.toFixed(3);
        c.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 20).toFixed(1)}px)`;
      });
      const pin = rm ? 1 : eo(seg(t, 0.3, 1.6));
      const tilt = lerp(70, 52, pin);
      const spin = rm ? 0 : T * 6;
      if (plane) {
        plane.style.opacity = pin.toFixed(3);
        plane.style.transform = `rotateX(${tilt.toFixed(2)}deg) rotateZ(${spin.toFixed(2)}deg) translateY(${(-60 * (p - 0.5) * 2 * k).toFixed(1)}px)`;
      }
      // os rótulos rodam ao contrário para ficarem sempre de frente
      const face = `rotateZ(${(-spin).toFixed(2)}deg) rotateX(${(-tilt).toFixed(2)}deg)`;
      if (hub) hub.style.transform = `translate(-50%, -50%) ${face} scale(${(1 + 0.03 * Math.sin(T * 2)).toFixed(3)})`;
      nodes.forEach((n, i) => {
        const v = rm ? 1 : eob(seg(t, 0.9 + i * 0.12, 1.3 + i * 0.12));
        const r = R * clamp01(v);
        const x = Math.cos(n.ang) * r;
        const y = Math.sin(n.ang) * r;
        n.el.style.transform = `translate(${(x * k).toFixed(1)}px, ${(y * k).toFixed(1)}px) translate(-50%, -50%) ${face}`;
        n.el.style.opacity = clamp01(v).toFixed(3);
        const l = lines[i];
        if (l) {
          l.setAttribute("x2", x.toFixed(1));
          l.setAttribute("y2", y.toFixed(1));
          l.style.opacity = (clamp01(v) * 0.8).toFixed(3);
        }
        const pu = pulses[i];
        if (pu) {
          const ph = (T * 0.55 + i * 0.37) % 1;
          const f = i % 2 ? ph : 1 - ph;
          pu.setAttribute("cx", (x * f).toFixed(1));
          pu.setAttribute("cy", (y * f).toFixed(1));
          pu.style.opacity = rm ? "0" : (clamp01(v) * Math.min(1, Math.sin(ph * Math.PI) * 2.5)).toFixed(3);
        }
      });
    };
  });

  return (
    <section ref={ref} className="hm-sec hm-sk section-petrol" aria-labelledby="hm-sk-h">
      <div className="hm-cv hm-sk-cv">
        <div className="hm-sk-head">
          <h2 id="hm-sk-h" className="hm-h2">
            Ferramentas de quem <span className="hm-acc">constrói</span>
          </h2>
          <p className="hm-body">
            Trabalhamos com as melhores ferramentas do mundo, para que tu não tenhas de te
            preocupar com nenhuma delas.
          </p>
        </div>

        <div className="hm-sk-map" aria-hidden>
          <div className="hm-mk hm-sk-mk">
            <div className="hm-sk-plane">
              <svg className="hm-sk-svg" viewBox="-450 -450 900 900">
                <circle className="hm-sk-ring" r={R} />
                {NODES.map(([n]) => (
                  <line key={n} x1="0" y1="0" x2="0" y2="0" />
                ))}
                {NODES.map(([n]) => (
                  <circle key={`p-${n}`} className="hm-sk-pulse" r="6" />
                ))}
              </svg>
              <div className="hm-sk-hub">
                <span className="hm-sk-wm">
                  P<em>.</em>
                </span>
                <b>O teu negócio</b>
              </div>
              {NODES.map(([n, ic]) => (
                <div key={n} className="hm-ui hm-sk-node">
                  <Icon name={ic} className="hm-ic-gold" />
                  <b>{n}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="hm-sk-cats">
          {CAT.map(([t, d], i) => (
            <li key={t} className={`hm-sk-cat hm-sk-c${i}`}>
              <span className="hm-sk-n">0{i + 1}</span>
              <div>
                <b>{t}</b>
                <span>{d}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
