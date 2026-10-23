"use client";

import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { useScene } from "./useScene";
import { eo, lerp, q, qa, seg } from "./anim";

export default function ProjetosHome() {
  const ref = useScene<HTMLElement>(
    (root, desk) => {
      const head = qa(root, ".hm-pj-head > *");
      const track = q(root, ".hm-pj-track");
      const cards = qa(root, ".hm-pj-card").map((c) => ({
        el: c,
        clip: q(c, ".hm-pj-img"),
        img: q(c, ".hm-pj-img img"),
      }));
      if (!desk) {
        [track, ...cards.map((c) => c.el), ...cards.map((c) => c.img)].forEach((e) => {
          if (e) e.style.transform = "";
        });
        return ({ t, rm }) => {
          head.forEach((h, i) => {
            const v = rm ? 1 : eo(seg(t, 0.05 + i * 0.12, 0.6 + i * 0.12));
            h.style.opacity = v.toFixed(3);
            h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 24).toFixed(1)}px)`;
          });
          cards.forEach((c, i) => {
            if (!c.clip) return;
            const v = rm ? 1 : eo(seg(t, 0.3 + i * 0.12, 1.1 + i * 0.12));
            c.clip.style.clipPath = `inset(${(100 - 100 * v).toFixed(1)}% 0 0 0)`;
          });
        };
      }
      return ({ t, p, u, rm }) => {
        head.forEach((h, i) => {
          const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
          h.style.opacity = v.toFixed(3);
          h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30 * u).toFixed(1)}px)`;
        });
        const tin = rm ? 1 : eo(seg(t, 0.15, 1.5));
        const pp = seg(p, 0.04, 0.96);
        const ease = pp * pp * (3 - 2 * pp) * 0.35 + pp * 0.65;
        const hx = 160 + lerp(900, 0, tin) - 2400 * ease;
        if (track) track.style.transform = `translateX(${(hx * u).toFixed(1)}px)`;
        cards.forEach((c, i) => {
          const cx = hx + i * 820 + 380;
          const d = (cx - 960) / 960;
          c.el.style.transform = `perspective(${(1800 * u).toFixed(0)}px) rotateY(${Math.max(-35, Math.min(35, -d * 28)).toFixed(2)}deg) translateZ(${(-Math.abs(d) * 160 * u).toFixed(1)}px)`;
          const v = rm ? 1 : eo(seg(t, 0.4 + i * 0.12, 1.2 + i * 0.12));
          if (c.clip) c.clip.style.clipPath = `inset(${(100 - 100 * v).toFixed(1)}% 0 0 0)`;
          if (c.img) c.img.style.transform = `translateX(${(-d * 40 * u).toFixed(1)}px) scale(1.12)`;
        });
      };
    },
    { pin: true },
  );

  return (
    <section ref={ref} id="projetos" className="hm-sec hm-pj" aria-labelledby="hm-pj-h">
      <div className="hm-pj-pin">
        <div className="hm-cv hm-pj-cv">
          <div className="hm-pj-head">
            <h2 id="hm-pj-h" className="hm-h2">
              Sistemas reais, resultados <span className="hm-acc">reais</span>
            </h2>
            <Link href="/projetos" className="hm-more">
              Ver todos os projetos <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="hm-pj-view">
            <ul className="hm-pj-track">
              {PROJECTS.map((p, i) => (
                <li key={p.slug} className="hm-pj-card" style={{ "--i": i } as React.CSSProperties}>
                  <Link href={`/projetos/${p.slug}`} className="hm-pj-link">
                    <div className="hm-pj-win">
                      <div className="hm-minibar" aria-hidden>
                        <i />
                        <i />
                        <i />
                        <b />
                      </div>
                      <div className="hm-pj-img">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 40vw, 84vw"
                        />
                      </div>
                    </div>
                    <span className="hm-chip hm-pj-tag">{p.metric}</span>
                    <span className="hm-pj-t">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
