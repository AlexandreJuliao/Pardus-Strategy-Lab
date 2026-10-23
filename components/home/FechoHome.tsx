"use client";

import { useScene } from "./useScene";
import { eo, lerp, q, qa, seg } from "./anim";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

// Assinatura final: o logótipo sobe letra a letra, o ponto acende, e fica o
// convite para conversar.
export default function FechoHome() {
  const ref = useScene<HTMLElement>(
    (root) => {
      const letters = qa(root, ".hm-fe-wm b");
      const dot = q(root, ".hm-fe-dot");
      const lab = q(root, ".hm-fe-lab");
      const btn = q(root, ".hm-fe-btn");
      const wm = q(root, ".hm-fe-wm");
      return ({ t, rm }) => {
        letters.forEach((l, i) => {
          const v = rm ? 1 : eo(seg(t, 0.2 + i * 0.08, 0.8 + i * 0.08));
          l.style.transform = v >= 1 ? "" : `translateY(${lerp(108, 0, v).toFixed(2)}%)`;
        });
        if (dot) dot.style.transform = `scale(${(rm ? 1 : eo(seg(t, 0.9, 1.3))).toFixed(3)})`;
        if (lab) {
          const v = rm ? 1 : eo(seg(t, 1.2, 1.8));
          lab.style.opacity = v.toFixed(3);
          lab.style.letterSpacing = `${lerp(0.2, 0.42, rm ? 1 : eo(seg(t, 1.2, 2.2))).toFixed(3)}em`;
        }
        if (btn) {
          const v = rm ? 1 : eo(seg(t, 1.6, 2.1));
          btn.style.opacity = v.toFixed(3);
          btn.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 20).toFixed(1)}px)`;
        }
        if (wm) wm.style.transform = `scale(${(1 + 0.02 * (rm ? 0 : eo(seg(t, 1.6, 5.6)))).toFixed(4)})`;
      };
    },
    { at: 0.85 },
  );

  return (
    <section ref={ref} className="hm-sec hm-fe" aria-label="Pardus Strategy Lab">
      <div className="hm-glow hm-glow-gold hm-fe-glow" aria-hidden />
      <div className="hm-fe-c">
        <p className="hm-fe-wm" aria-label="Pardus.">
          {"PARDUS".split("").map((c, i) => (
            <span key={i} className="hm-fe-l" aria-hidden>
              <b>{c}</b>
            </span>
          ))}
          <span className="hm-fe-dot" aria-hidden>
            .
          </span>
        </p>
        <span className="hm-fe-lab">Strategy Lab</span>
        <button type="button" className="hm-btn hm-btn-lg hm-fe-btn" onClick={() => scrollToId(CTA_TARGET_ID)}>
          Vamos conversar <b className="hm-arr">→</b>
        </button>
      </div>
    </section>
  );
}
