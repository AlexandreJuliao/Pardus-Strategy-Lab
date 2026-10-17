"use client";

import Image from "next/image";
import { useScene } from "./useScene";
import { eo, lerp, q, qa, seg } from "./anim";

const TEAM = [
  { img: "/img/team/alexandre.jpg", n: "Alexandre Julião", r: "Fundador & CEO", rz: -7 },
  { img: "/img/team/tomas.jpg", n: "Tomás Araújo", r: "Desenvolvimento & Produto", rz: 6 },
];

// A pergunta que mais nos fazem, respondida em grande, entre as duas pessoas
// que respondem por ela.
export default function EquipaHome() {
  const ref = useScene<HTMLElement>((root, desk) => {
    const q1 = q(root, ".hm-eq-q");
    const no = q(root, ".hm-eq-no span");
    const ans = q(root, ".hm-eq-a");
    const ab = qa(root, ".hm-eq-ab > *");
    const cards = qa(root, ".hm-eq-card");
    return ({ t, T, p, rm }) => {
      const sc = (p - 0.5) * 2;
      const up = (el: HTMLElement | null, a: number, b: number, dy: number) => {
        if (!el) return;
        const v = rm ? 1 : eo(seg(t, a, b));
        el.style.opacity = v.toFixed(3);
        el.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * dy).toFixed(1)}px)`;
      };
      up(q1, 0.1, 0.7, 26);
      if (no) {
        const v = rm ? 1 : eo(seg(t, 0.5, 1.5));
        no.style.opacity = v.toFixed(3);
        no.style.transform = `translateY(${(lerp(80, 0, v) + (desk ? 40 * sc : 0)).toFixed(1)}px) scale(${lerp(0.9, 1, v).toFixed(3)})`;
        no.style.letterSpacing = `${lerp(0.08, -0.02, v).toFixed(3)}em`;
      }
      up(ans, 1.2, 1.8, 20);
      ab.forEach((x, i) => up(x, 1.7 + i * 0.15, 2.3 + i * 0.15, 20));
      cards.forEach((c, i) => {
        const v = rm ? 1 : eo(seg(t, 1.0 + i * 0.3, 2.0 + i * 0.3));
        const rz = TEAM[i].rz + (rm ? 0 : Math.sin(T * 0.6 + i) * 0.8);
        c.style.opacity = v.toFixed(3);
        c.style.transform = desk
          ? `perspective(1400px) translateY(${(lerp(220, 0, v) + Math.sin(T * 0.9 + i) * 6 - 30 * sc).toFixed(1)}px) rotateY(${lerp(i ? -40 : 40, 0, v).toFixed(1)}deg) rotateZ(${rz.toFixed(2)}deg)`
          : `translateY(${lerp(60, 0, v).toFixed(1)}px) rotateZ(${(rz * 0.6).toFixed(2)}deg)`;
      });
    };
  });

  return (
    <section ref={ref} id="equipa" className="hm-sec hm-eq" aria-labelledby="hm-eq-h">
      <div className="hm-cv hm-eq-cv">
        <div className="hm-glow hm-glow-gold hm-eq-glow" aria-hidden />
        <h2 id="hm-eq-h" className="hm-eq-q">
          Ficamos presos à vossa tecnologia?
        </h2>
        <p className="hm-eq-no">
          <span className="hm-acc">Não.</span>
        </p>
        <p className="hm-eq-a">
          Usamos ferramentas conhecidas e abertas, e entregamos tudo em teu nome: o site, os
          sistemas e os acessos são teus.
        </p>
        <ul className="hm-eq-team">
          {TEAM.map((m, i) => (
            <li key={m.n} className={`hm-eq-card hm-eq-c${i}`}>
              <div className="hm-eq-img">
                <Image src={m.img} alt={m.n} fill sizes="(min-width:1024px) 16vw, 40vw" />
              </div>
              <span className="hm-eq-n">{m.n}</span>
              <span className="hm-eq-r">{m.r}</span>
            </li>
          ))}
        </ul>
        <div className="hm-eq-ab">
          <p>
            A Pardus nasceu em Lisboa com uma ideia simples: a tecnologia só vale quando
            resolve alguma coisa.
          </p>
        </div>
      </div>
    </section>
  );
}
