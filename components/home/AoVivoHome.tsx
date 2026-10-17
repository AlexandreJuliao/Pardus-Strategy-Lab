"use client";

import { Fragment } from "react";
import Icon, { type IconName } from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eio, eo, eob, lerp, q, qa, seg } from "./anim";

const M: ["c" | "a", string, string][] = [
  ["c", "Boa tarde! Ainda têm vaga para esta semana?", "Cliente · 14:02"],
  ["a", "Olá! Temos, sim. Qual é o melhor dia para si?", "Assistente · 14:02"],
  ["c", "Quinta à tarde, se der.", "Cliente · 14:03"],
  ["a", "Perfeito. Marquei quinta às 15h e já lhe enviei a confirmação. Até lá!", "Assistente · 14:03"],
];
// ícone, título, detalhe, mensagem que o dispara, x, y, lado (0 esquerda, 1 direita)
const EV: [IconName, string, string, number, number, number, number][] = [
  ["spark", "Pedido percebido", "Quer marcar uma consulta", 0, 250, 520, 0],
  ["cal", "Agenda verificada", "Quinta, 15:00 livre", 2, 1270, 580, 1],
  ["user", "Registado nos clientes", "Contacto e histórico", 3, 250, 780, 0],
  ["mail", "Confirmação enviada", "Email e WhatsApp", 3, 1270, 840, 1],
];
const PATHS = EV.map((e, i) => {
  const py = 600 + i * 80;
  const ex = e[6] ? e[4] : e[4] + 400;
  const px = e[6] ? 1170 : 750;
  const mx = (px + ex) / 2;
  return `M ${px} ${py} C ${mx} ${py}, ${mx} ${e[5] + 40}, ${ex} ${e[5] + 40}`;
});
const NUM = [
  ["0€", "Primeira consultoria"],
  ["24h", "Tempo de resposta"],
  ["24/7", "Sistemas a trabalhar por ti"],
  ["100%", "Código e acessos teus"],
];

function Odometer({ value }: { value: string }) {
  return (
    <div className="hm-nu-n" aria-hidden>
      {value.split("").map((ch, j) =>
        /[0-9]/.test(ch) ? (
          <span key={j} className="hm-nu-col" data-j={j}>
            <span className="hm-nu-strip">
              {Array.from({ length: 8 }, (_, kk) => (
                <span key={kk}>{(+ch + 10 - (7 - kk)) % 10}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={j} className="hm-nu-sym" data-j={j}>
            {ch}
          </span>
        ),
      )}
    </div>
  );
}

export default function AoVivoHome() {
  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-av-head > *:not(.hm-av-pts)");
    const pts = qa(root, ".hm-av-pts li");
    const ph = q(root, ".hm-av-ph");
    const bub = qa(root, ".hm-av-b");
    const ty = qa(root, ".hm-av-ty").map((e) => ({ el: e, d: qa(e, "i") }));
    const evs = qa(root, ".hm-av-ev").map((el, i) => ({
      el,
      ok: q(el, ".hm-av-ok"),
      msg: EV[i][3],
      side: EV[i][6],
    }));
    const paths = qa<SVGPathElement>(root, ".hm-av-path").map((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len.toFixed(1);
      return { p, len };
    });
    const dots = qa<SVGCircleElement>(root, ".hm-av-dot");
    const nums = q(root, ".hm-av-nums");
    const items = qa(root, ".hm-nu-item").map((it) => ({
      rule: q(it, ".hm-nu-rule"),
      lab: q(it, ".hm-nu-l"),
      cols: qa(it, ".hm-nu-col, .hm-nu-sym"),
    }));
    let n0 = -1;
    return ({ t, T, p, rm, vh }) => {
      const now = performance.now();
      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.15 + i * 0.18, 0.75 + i * 0.18));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      pts.forEach((x, i) => {
        const v = rm ? 1 : eo(seg(t, 1.2 + i * 0.2, 1.7 + i * 0.2));
        x.style.opacity = v.toFixed(3);
        x.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 16).toFixed(1)}px)`;
      });
      const M0 = 0.9;
      const MT = [M0 + 0.6, M0 + 1.9, M0 + 3.1, M0 + 4.4];
      const TY = [
        [M0 + 1.05, M0 + 1.9],
        [M0 + 3.55, M0 + 4.4],
      ];
      if (ph) {
        const pin = rm ? 1 : eo(seg(t, 0.2, 1.6));
        const sc = (p - 0.5) * 2;
        ph.style.opacity = (rm ? 1 : eo(seg(t, 0.2, 0.8))).toFixed(3);
        ph.style.transform = desk
          ? `translate3d(0, ${(Math.sin(T * 1.2) * 6 - 20 * sc).toFixed(1)}px, ${lerp(-700, 0, pin).toFixed(1)}px) rotateX(${lerp(14, 2, pin).toFixed(2)}deg) rotateY(${(lerp(40, 0, pin) + Math.sin(T * 0.5) * 3).toFixed(2)}deg)`
          : `translateY(${lerp(40, 0, pin).toFixed(1)}px)`;
      }
      bub.forEach((b, i) => {
        const v = rm ? 1 : eo(seg(t, MT[i], MT[i] + 0.4));
        b.style.display = rm || t >= MT[i] ? "" : "none";
        b.style.opacity = v.toFixed(3);
        b.style.transform = `translateY(${lerp(18, 0, v).toFixed(1)}px) scale(${lerp(0.92, 1, v).toFixed(3)})`;
      });
      ty.forEach((o, i) => {
        o.el.style.display = !rm && t >= TY[i][0] && t < TY[i][1] ? "flex" : "none";
        o.d.forEach((d, j) => {
          d.style.opacity = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(T * 9 - j * 0.9))).toFixed(3);
        });
      });
      evs.forEach((e, i) => {
        const t0 = MT[e.msg] + 0.35 + (i === 3 ? 0.55 : 0);
        const lp = rm ? 1 : eio(seg(t, t0, t0 + 0.55));
        const cp = rm ? 1 : eob(seg(t, t0 + 0.4, t0 + 0.85));
        const ok = rm ? 1 : eob(seg(t, t0 + 0.95, t0 + 1.25));
        const pa = paths[i];
        if (pa) {
          pa.p.style.strokeDashoffset = (pa.len * (1 - lp)).toFixed(1);
          const d = dots[i];
          if (d) {
            const pt = pa.p.getPointAtLength(pa.len * lp);
            d.setAttribute("cx", pt.x.toFixed(1));
            d.setAttribute("cy", pt.y.toFixed(1));
            d.style.opacity = lp > 0 && lp < 1 ? "1" : "0";
          }
        }
        e.el.style.opacity = clamp01(cp).toFixed(3);
        e.el.style.transform = desk
          ? `translateY(${(Math.sin(T * 1.1 + i) * 5).toFixed(1)}px) rotateY(${e.side ? -8 : 8}deg) scale(${lerp(0.8, 1, cp).toFixed(3)})`
          : `translateX(${lerp(-18, 0, clamp01(cp)).toFixed(1)}px)`;
        if (e.ok) e.ok.style.transform = `scale(${clamp01(ok).toFixed(3)})`;
      });

      // números: contam quando a faixa de números chega ao ecrã
      if (nums) {
        const r = nums.getBoundingClientRect();
        if (n0 < 0 && r.top < vh * 0.85) n0 = now;
        const c = n0 < 0 ? -1 : rm ? 99 : (now - n0) / 1000;
        items.forEach((it, i) => {
          const s0 = i * 0.2;
          if (it.rule) it.rule.style.transform = `scaleX(${eo(seg(c, s0, s0 + 0.7)).toFixed(3)})`;
          it.cols.forEach((col) => {
            const j = Number(col.dataset.j);
            const strip = col.firstElementChild as HTMLElement | null;
            if (col.classList.contains("hm-nu-col") && strip) {
              const v = eo(seg(c, s0 + 0.1 + j * 0.08, s0 + 1.3 + j * 0.08));
              strip.style.transform = `translateY(${(-7 * v).toFixed(4)}em)`;
              col.style.opacity = eo(seg(c, s0 + j * 0.08, s0 + 0.35 + j * 0.08)).toFixed(3);
            } else {
              col.style.opacity = eo(seg(c, s0 + 0.9, s0 + 1.3)).toFixed(3);
            }
          });
          if (it.lab) {
            const v = eo(seg(c, s0 + 0.5, s0 + 1.0));
            it.lab.style.opacity = v.toFixed(3);
            it.lab.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 14).toFixed(1)}px)`;
          }
        });
      }
    };
  });

  return (
    <section ref={ref} className="hm-sec hm-av" aria-labelledby="hm-av-h">
      <div className="hm-cv hm-av-cv">
        <div className="hm-glow hm-av-g1" aria-hidden />
        <div className="hm-glow hm-glow-gold hm-av-g2" aria-hidden />
        <div className="hm-av-head">
          <h2 id="hm-av-h" className="hm-h2">
            Não falamos de tecnologia. <span className="hm-acc">Mostramos.</span>
          </h2>
          <p className="hm-body">
            Este é o género de assistente que criamos: percebe o pedido, responde e marca a
            reunião, a qualquer hora.
          </p>
          <ul className="hm-av-pts">
            {["Inteligência que age", "Automação a sério", "Seguro desde o início"].map((x) => (
              <li key={x}>
                <i aria-hidden />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="hm-av-world">
          <svg className="hm-av-links" viewBox="0 0 1920 1200" aria-hidden>
            {PATHS.map((d, i) => (
              <Fragment key={i}>
                <path className="hm-av-path" d={d} />
                <circle className="hm-av-dot" r="6" />
              </Fragment>
            ))}
          </svg>
          <div className="hm-av-phw">
            <div className="hm-mk hm-av-mk">
              <div className="hm-av-ph">
                <div className="hm-av-sc">
                  <div className="hm-av-top">
                    <span className="hm-av-av" aria-hidden>
                      C
                    </span>
                    <div>
                      <div className="hm-av-nm">Assistente da Clínica</div>
                      <div className="hm-av-on">online</div>
                    </div>
                    <span className="hm-av-demo">Demonstração</span>
                  </div>
                  <div className="hm-av-list">
                    {M.map(([who, txt, meta], i) => (
                      <Fragment key={i}>
                        <div className={`hm-av-b hm-av-${who}`}>
                          {txt}
                          <small>{meta}</small>
                        </div>
                        {(i === 0 || i === 2) && (
                          <div className="hm-av-ty" aria-hidden>
                            <i />
                            <i />
                            <i />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="hm-av-evs">
            {EV.map(([ic, t, d], i) => (
              <li key={t} className={`hm-ui hm-av-ev hm-av-e${i}`}>
                <Icon name={ic} className="hm-ic-gold" />
                <div>
                  <b>{t}</b>
                  <span>{d}</span>
                </div>
                <i className="hm-av-ok" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </i>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hm-av-nums">
          {NUM.map(([v, l]) => (
            <li key={v} className="hm-nu-item">
              <i className="hm-nu-rule" aria-hidden />
              <span className="sr-only">{v}</span>
              <Odometer value={v} />
              <span className="hm-nu-l">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
