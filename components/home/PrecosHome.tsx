"use client";

import Icon, { type IconName } from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eio, eo, lerp, q, qa, seg, setText } from "./anim";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

// Tabela de 15/10: o ponto de partida de cada área. O valor final fecha-se
// com o cliente, antes de começar.
const AR: { n: string; t: string; ic: IconName; v: number; per: string; li: string[] }[] = [
  { n: "01", t: "Branding & Web", ic: "brush", v: 390, per: "", li: ["Landing page", "Site profissional", "Loja online"] },
  { n: "02", t: "Captação", ic: "target", v: 95, per: "/mês", li: ["Ficha Google e SEO local", "Gestão de Google Ads", "Auditoria SEO e velocidade"] },
  { n: "03", t: "Automação", ic: "flow", v: 250, per: "", li: ["Automações e integrações", "Chatbot de WhatsApp", "CRM à medida"] },
];

export default function PrecosHome() {
  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-pc-head > *");
    const cards = qa(root, ".hm-pc").map((el, i) => ({
      el,
      v: q(el, ".hm-pc-v"),
      li: qa(el, ".hm-pc-l li"),
      sh: q(el, ".hm-pc-shine"),
      to: AR[i].v,
    }));
    return ({ t, T, p, rm, vh }) => {
      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      const sc = (p - 0.5) * 2;
      cards.forEach((c, i) => {
        // no telemóvel os cartões estão uns por baixo dos outros: cada um conta quando aparece
        let tt = t - i * 0.2;
        if (!desk) {
          const r = c.el.getBoundingClientRect();
          if (!c.el.dataset.t0 && r.top < vh * 0.85) c.el.dataset.t0 = String(performance.now());
          tt = c.el.dataset.t0 ? (performance.now() - Number(c.el.dataset.t0)) / 1000 : -1;
        }
        const v = rm ? 1 : eo(seg(tt, 0.5, 1.3));
        c.el.style.opacity = v.toFixed(3);
        c.el.style.transform = desk
          ? `perspective(1600px) translateY(${(lerp(80, 0, v) - 30 * sc + Math.sin(T * 0.9 + i) * 4).toFixed(1)}px) rotateX(${lerp(35, 0, v).toFixed(1)}deg) rotateY(${((i - 1) * -3 * (1 - v)).toFixed(1)}deg)`
          : `translateY(${lerp(40, 0, v).toFixed(1)}px)`;
        setText(c.v, String(Math.round(c.to * (rm ? 1 : eio(seg(tt, 0.9, 2.0))))));
        c.li.forEach((x, j) => {
          const w = rm ? 1 : eo(seg(tt, 1.3 + j * 0.12, 1.7 + j * 0.12));
          x.style.opacity = w.toFixed(3);
          x.style.transform = w >= 1 ? "" : `translateY(${((1 - w) * 12).toFixed(1)}px)`;
        });
        if (c.sh) {
          const sp = (((T - 2) * 0.35 - i * 0.18) % 1.4 + 1.4) % 1.4;
          c.sh.style.transform = `translateX(${(sp * 750 - 250).toFixed(1)}%) rotate(18deg)`;
        }
        const hot = rm ? 0 : clamp01(1 - Math.abs(((T * 0.5) % 3) - i - 0.5) * 1.2);
        c.el.style.setProperty("--hot", hot.toFixed(3));
      });
    };
  });

  return (
    <section ref={ref} id="precos" className="hm-sec hm-pc-sec" aria-labelledby="hm-pc-h">
      <div className="hm-cv hm-pc-cv">
        <div className="hm-pc-head">
          <h2 id="hm-pc-h" className="hm-h2">
            Preços claros, <span className="hm-acc">sem letra pequena.</span>
          </h2>
          <p className="hm-body">
            Mostramos o ponto de partida. O valor final fecha-se contigo, antes de começar.
          </p>
        </div>
        <ul className="hm-pc-row">
          {AR.map((c) => (
            <li key={c.n} className="hm-ui hm-pc">
              <div className="hm-pc-top">
                <span className="hm-pc-n">{c.n}</span>
                <Icon name={c.ic} className="hm-ic-gold hm-pc-ic" />
              </div>
              <h3 className="hm-pc-t">{c.t}</h3>
              <span className="hm-pc-from">desde</span>
              <span className="hm-pc-p">
                <b>
                  <span className="hm-pc-v">{c.v}</span> €
                </b>
                {c.per && <small>{c.per}</small>}
              </span>
              <i className="hm-pc-r" aria-hidden />
              <ul className="hm-pc-l">
                {c.li.map((x) => (
                  <li key={x}>
                    <i aria-hidden>
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </i>
                    {x}
                  </li>
                ))}
              </ul>
              <button type="button" className="hm-pc-go" onClick={() => scrollToId(CTA_TARGET_ID)}>
                Pedir proposta <span aria-hidden>→</span>
              </button>
              <i className="hm-pc-shine" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
