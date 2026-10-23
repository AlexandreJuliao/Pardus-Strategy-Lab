"use client";

import Icon, { type IconName } from "./Icon";
import { useScene } from "./useScene";
import { eio, eo, lerp, q, qa, seg, setText } from "./anim";
import { scrollToId, CTA_TARGET_ID } from "@/lib/scrollTo";

// A oferta em 3 pilares (fechada a 19/10/2026). Mudar um preço aqui é mudar também
// components/sections/Pricing.tsx e o catálogo do Pardus OS, no mesmo dia.
const AR: {
  n: string;
  t: string;
  hint: string;
  ic: IconName;
  from: string;
  v: number;
  per: string;
  li: string[];
}[] = [
  {
    n: "01",
    t: "Presença",
    hint: "Não te encontram, ou não passas confiança online.",
    ic: "globe",
    from: "site desde",
    v: 890,
    per: "",
    li: [
      "Painel próprio para gerires o site e veres todas as análises",
      "Ficha Google ligada ao site, para te encontrarem no mapa",
      "Acompanhamento depois da entrega",
    ],
  },
  {
    n: "02",
    t: "Captação",
    hint: "Não te chegam clientes novos pelo Google.",
    ic: "target",
    from: "desde",
    v: 150,
    per: "/mês",
    li: [
      "Arrumamos todo o teu negócio no Google",
      "Gerimos o teu investimento em anúncios, com relatório",
      "Contrato mínimo de 3 meses",
    ],
  },
  {
    n: "03",
    t: "Sistema",
    hint: "Chegam pedidos e está tudo desorganizado.",
    ic: "flow",
    from: "desde",
    v: 490,
    per: "",
    li: [
      "Feito de raiz à medida do teu negócio",
      "Equipa, marcações, stock e cobranças",
      "Software teu, processos automáticos e tudo organizado",
    ],
  },
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
        const hot = !rm && T > 0 && Math.floor((T * 0.5) % 3) === i;
        if (c.el.classList.contains("is-hot") !== hot) c.el.classList.toggle("is-hot", hot);
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
            Fazemos a presença, a captação e o sistema do teu negócio. Escolhe pelo que te está
            a faltar; o valor final fecha-se contigo antes de começar.
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
              <p className="hm-pc-hint">{c.hint}</p>
              <span className="hm-pc-from">{c.from}</span>
              <span className="hm-pc-p">
                <b>
                  <span className="hm-pc-v">{c.v}</span>{"\u00a0"}€
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
