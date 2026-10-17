"use client";

import Image from "next/image";
import Icon from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eio, eo, eob, lerp, q, qa, seg, setText } from "./anim";

const WHY: [string, string, "fim" | "junta" | "tua" | "pt" | "res" | "tr"][] = [
  ["Levamos até ao fim", "Cada projeto termina no ar, entregue e a dar resultado.", "fim"],
  ["IA e web, juntas", "Somos as duas, a trabalhar como uma só.", "junta"],
  ["Tecnologia que fica tua", "Tudo em teu nome. Nunca ficas preso a nós.", "tua"],
  ["Proximidade portuguesa", "Equipa em Lisboa. Resposta em menos de 24h.", "pt"],
  ["Resultados mensuráveis", "Cada entrega com métricas concretas.", "res"],
  ["Transparência total", "Processo, prazos e números à vista.", "tr"],
];

function Visual({ v }: { v: (typeof WHY)[number][2] }) {
  switch (v) {
    case "fim":
      return (
        <div className="hm-pq-v hm-pq-fim" aria-hidden>
          <div className="hm-pq-barbg">
            <i className="hm-pq-fill" />
          </div>
          <span className="hm-pq-pct">100%</span>
          <span className="hm-pq-air">
            <Icon name="check" className="hm-ic-gold" /> No ar
          </span>
        </div>
      );
    case "junta":
      return (
        <div className="hm-pq-v hm-pq-junta" aria-hidden>
          <span className="hm-pq-c1">Web</span>
          <span className="hm-pq-c2">IA</span>
        </div>
      );
    case "tua":
      return (
        <div className="hm-pq-v hm-pq-tua" aria-hidden>
          <Icon name="key" />
          <span>Em teu nome</span>
          <i className="hm-pq-tog">
            <b />
          </i>
        </div>
      );
    case "pt":
      return (
        <div className="hm-pq-v hm-pq-pt" aria-hidden>
          <div className="hm-pq-photo">
            <Image src="/img/home/lisboa.jpg" alt="" fill sizes="(min-width:1024px) 14vw, 40vw" />
          </div>
          <span className="hm-pq-pin">
            <Icon name="pin" className="hm-ic-gold" /> Lisboa
          </span>
        </div>
      );
    case "res":
      return (
        <div className="hm-pq-v hm-pq-res" aria-hidden>
          <svg viewBox="0 0 200 80" preserveAspectRatio="none">
            <path className="hm-pq-line" d="M0 74 C30 70 45 60 70 56 S110 40 130 30 S175 12 200 6" />
          </svg>
        </div>
      );
    case "tr":
      return (
        <div className="hm-pq-v hm-pq-tr" aria-hidden>
          {["Proposta", "Calendário", "Relatório"].map((x) => (
            <span key={x}>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </i>
              {x}
            </span>
          ))}
        </div>
      );
  }
}

export default function PorqueHome() {
  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-pq-head > *");
    const tiles = qa(root, ".hm-pq-tile");
    const t0 = tiles[0];
    const fill = t0 && q(t0, ".hm-pq-fill");
    const pct = t0 && q(t0, ".hm-pq-pct");
    const air = t0 && q(t0, ".hm-pq-air");
    const c1 = q(root, ".hm-pq-c1");
    const c2 = q(root, ".hm-pq-c2");
    const tog = q(root, ".hm-pq-tog");
    const togB = q(root, ".hm-pq-tog b");
    const photo = q(root, ".hm-pq-photo img");
    const pin = q(root, ".hm-pq-pin");
    const line = q<SVGPathElement>(root, ".hm-pq-line");
    const trs = qa(root, ".hm-pq-tr span");
    const tri = qa(root, ".hm-pq-tr i");
    return ({ t, T, p, rm, vh }) => {
      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      const sc = (p - 0.5) * 2;
      // No telemóvel cada mosaico anima quando lá chega; no computador em cascata.
      const local = tiles.map((el, i) => {
        if (desk) return t - i * 0.12;
        const now = performance.now();
        if (!el.dataset.t0 && el.getBoundingClientRect().top < vh * 0.85) el.dataset.t0 = String(now);
        return el.dataset.t0 ? (now - Number(el.dataset.t0)) / 1000 - 0.1 : -1;
      });
      tiles.forEach((x, i) => {
        const v = rm ? 1 : eo(seg(local[i], 0.5, 1.2));
        x.style.opacity = v.toFixed(3);
        x.style.transform = desk
          ? `perspective(1400px) translateY(${(lerp(60, 0, v) - 20 * sc * (1 + (i % 3) * 0.3)).toFixed(1)}px) rotateX(${lerp(25, 0, v).toFixed(1)}deg)`
          : `translateY(${lerp(40, 0, v).toFixed(1)}px)`;
      });
      const a = (i: number) => (rm ? 99 : local[i] - 0.5);
      const f = eio(seg(a(0), 0.2, 1.8));
      if (fill) fill.style.transform = `scaleX(${f.toFixed(3)})`;
      setText(pct, `${Math.round(f * 100)}%`);
      if (air) {
        const v = eob(seg(a(0), 1.8, 2.1));
        air.style.opacity = clamp01(v).toFixed(3);
        air.style.transform = `scale(${lerp(0.6, 1, v).toFixed(3)})`;
      }
      const j = eio(seg(a(1), 0.4, 1.6));
      if (c1) c1.style.transform = `translateX(${lerp(-60, 18, j).toFixed(1)}%)`;
      if (c2) c2.style.transform = `translateX(${lerp(60, -18, j).toFixed(1)}%)`;
      tog?.classList.toggle("is-on", a(2) > 1.1);
      if (togB) togB.style.transform = `translateX(${(eio(seg(a(2), 1.1, 1.35)) * 100).toFixed(1)}%)`;
      if (photo) photo.style.transform = `scale(${(1.08 + 0.04 * Math.sin(T * 0.35)).toFixed(4)})`;
      if (pin) pin.style.transform = `translateY(${(-Math.abs(Math.sin(T * 2.2)) * 6).toFixed(1)}px)`;
      if (line) line.style.strokeDashoffset = (260 * (1 - eio(seg(a(4), 0.5, 2.0)))).toFixed(1);
      trs.forEach((x, i) => {
        x.style.opacity = (0.4 + 0.6 * eo(seg(a(5), 0.6 + i * 0.4, 0.9 + i * 0.4))).toFixed(3);
      });
      tri.forEach((x, i) => {
        x.style.transform = `scale(${clamp01(eob(seg(a(5), 0.6 + i * 0.4, 0.95 + i * 0.4))).toFixed(3)})`;
      });
    };
  });

  return (
    <section ref={ref} className="hm-sec hm-pq" aria-labelledby="hm-pq-h">
      <div className="hm-cv hm-pq-cv">
        <div className="hm-pq-head">
          <h2 id="hm-pq-h" className="hm-h2">
            Como gostamos de <span className="hm-acc">trabalhar</span>
          </h2>
        </div>
        <ul className="hm-pq-grid">
          {WHY.map(([t, d, v], i) => (
            <li key={t} className="hm-pq-tile" style={{ "--i": i } as React.CSSProperties}>
              <span className="hm-pq-n">0{i + 1}</span>
              <b className="hm-pq-t">{t}</b>
              <span className="hm-pq-d">{d}</span>
              <Visual v={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
