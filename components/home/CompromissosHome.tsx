"use client";

import { useScene } from "./useScene";
import { eio, eo, eob, lerp, q, qa, rise, seg } from "./anim";

// «Como gostamos de trabalhar», escrito como um compromisso: as cláusulas
// aparecem uma a uma ao descer, e no fim o papel é assinado e carimbado.
const CL: [string, string][] = [
  ["Falas sempre com quem faz.", "Sem intermediários: quem te atende é quem constrói."],
  ["Respondemos em menos de 24 horas.", "Em dias úteis, sempre. Sem ficares à espera."],
  ["Preço fechado antes de começar.", "O valor fica escrito. A fatura não traz surpresas."],
  ["Tudo fica em teu nome.", "Domínio, código e acessos são teus. Nunca ficas preso a nós."],
  ["Mostramos números, não promessas.", "Cada mês sabes o que foi feito e o que deu."],
];

const SIG = ["Alexandre Julião", "Tomás Araújo"];

// fases ao longo do pin
const C0 = 0.1; // primeira cláusula
const CS = 0.11; // espaço entre cláusulas
const SG = 0.7; // assinaturas
const ST = 0.84; // carimbo

export default function CompromissosHome() {
  const ref = useScene<HTMLElement>(
    (root, desk) => {
      const head = qa(root, ".hm-cm-head > *");
      const paper = q(root, ".hm-cm-paper");
      const top = q(root, ".hm-cm-top");
      const rows = qa(root, ".hm-cm-cl");
      const ticks = qa<SVGPathElement>(root, ".hm-cm-tick path");
      const sigs = qa(root, ".hm-cm-sig b");
      const lines = qa(root, ".hm-cm-sig i");
      const stamp = q(root, ".hm-cm-stamp");
      const ring = q(root, ".hm-cm-stamp svg");
      let sp = -1;
      return ({ p: raw, t, T, u, rm }) => {
        // o scroll chega aos solavancos; a cena segue-o com inércia
        sp = rm || sp < 0 ? raw : sp + (raw - sp) * 0.14;
        if (Math.abs(raw - sp) < 0.0004) sp = raw;
        const p = rm ? 1 : sp;
        const U = desk ? u : 1;

        head.forEach((h, i) => rise(h, rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.8 + i * 0.15)), 30 * U));

        if (paper) {
          const v = rm ? 1 : eo(seg(t, 0.2, 1.4));
          const drift = rm ? 0 : (p - 0.5) * 2;
          paper.style.opacity = v.toFixed(3);
          paper.style.transform = desk
            ? `translate3d(0, ${(lerp(160, 0, v) * U - drift * 18 * U).toFixed(1)}px, 0) rotateX(${lerp(24, 4, v).toFixed(2)}deg) rotateZ(${lerp(-6, -1.6, v).toFixed(2)}deg) rotateY(${(Math.sin(T * 0.45) * 1.4).toFixed(2)}deg)`
            : `translate3d(0, ${lerp(40, 0, v).toFixed(1)}px, 0)`;
        }
        rise(top, rm ? 1 : eo(seg(t, 0.6, 1.4)), 16 * U);

        rows.forEach((r, i) => {
          const a = C0 + i * CS;
          const v = eo(seg(p, a, a + 0.08));
          r.style.opacity = (0.12 + 0.88 * v).toFixed(3);
          r.style.transform = v >= 1 ? "none" : `translate3d(${lerp(-18, 0, v).toFixed(1)}px, 0, 0)`;
          r.classList.toggle("is-on", v > 0.6);
          const tk = ticks[i];
          if (tk) tk.style.strokeDashoffset = (24 * (1 - eio(seg(p, a + 0.04, a + 0.1)))).toFixed(2);
        });

        sigs.forEach((s, i) => {
          const v = eio(seg(p, SG + i * 0.06, SG + 0.1 + i * 0.06));
          s.style.clipPath = v >= 1 ? "none" : `inset(-20% ${(100 - v * 100).toFixed(1)}% -30% -4%)`;
          const l = lines[i];
          if (l) l.style.transform = `scaleX(${eo(seg(p, SG - 0.04 + i * 0.06, SG + 0.04 + i * 0.06)).toFixed(4)})`;
        });

        if (stamp) {
          const v = seg(p, ST, ST + 0.07);
          stamp.style.opacity = eo(v * 1.6).toFixed(3);
          stamp.style.transform = `rotate(${lerp(-40, -12, eo(v)).toFixed(2)}deg) scale(${lerp(2.2, 1, Math.min(1, eob(v, 2.2))).toFixed(3)})`;
          stamp.classList.toggle("is-on", v >= 1);
        }
        if (ring && !rm) ring.style.transform = `rotate(${(T * 8).toFixed(1)}deg)`;
      };
    },
    { pin: true },
  );

  return (
    <section ref={ref} className="hm-sec hm-cm" aria-labelledby="hm-cm-h">
      <div className="hm-cm-pin">
        <div className="hm-glow hm-cm-glow" aria-hidden />
        <div className="hm-cm-head">
          <span className="hm-chip">Como gostamos de trabalhar</span>
          <h2 id="hm-cm-h" className="hm-h2">
            Cinco promessas, <span className="hm-acc">por escrito.</span>
          </h2>
          <p className="hm-body">
            Não é letra pequena. É o que nos podes cobrar a qualquer momento, do primeiro
            telefonema ao último relatório.
          </p>
        </div>

        <div className="hm-cm-stage">
          <article className="hm-cm-paper">
            <header className="hm-cm-top">
              <span>
                PARDUS<em>.</em>
              </span>
              <span>Compromisso</span>
            </header>
            <p className="hm-cm-lead">Entre a Pardus e o teu negócio, fica assente o seguinte:</p>
            <ol className="hm-cm-list">
              {CL.map(([t, d], i) => (
                <li key={t} className="hm-cm-cl">
                  <span className="hm-cm-n">§{i + 1}</span>
                  <div>
                    <b>{t}</b>
                    <span>{d}</span>
                  </div>
                  <svg className="hm-cm-tick" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </li>
              ))}
            </ol>
            <footer className="hm-cm-foot">
              {SIG.map((n) => (
                <div key={n} className="hm-cm-sig">
                  <b aria-hidden>{n}</b>
                  <i aria-hidden />
                  <span>{n}</span>
                </div>
              ))}
              <div className="hm-cm-stamp" aria-hidden>
                <svg viewBox="0 0 120 120">
                  <defs>
                    <path id="hm-cm-arc" d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
                  </defs>
                  <text>
                    <textPath href="#hm-cm-arc">PARDUS · STRATEGY LAB · COMPROMISSO ·</textPath>
                  </text>
                </svg>
                <b>
                  P<em>.</em>
                </b>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
