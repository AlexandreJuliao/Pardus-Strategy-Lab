"use client";

import Link from "next/link";
import { useScene } from "./useScene";
import { clamp01, eio, eo, lerp, q, qa, seg } from "./anim";
import { scrollToEl } from "@/lib/scrollTo";

type Kind = "ia" | "web" | "shop" | "chat" | "app" | "plan";

const SV: { n: string; t: string; d: string; slug: string; v: Kind }[] = [
  { n: "01", t: "Sistemas de IA", d: "Assistentes inteligentes que tratam do trabalho repetitivo por ti.", slug: "sistemas-de-ia", v: "ia" },
  { n: "02", t: "Websites", d: "Sites rápidos, bonitos e pensados para transformar visitantes em clientes.", slug: "websites", v: "web" },
  { n: "03", t: "E-commerce", d: "Lojas online feitas para vender, com pagamentos, stock e relatórios.", slug: "e-commerce", v: "shop" },
  { n: "04", t: "Chatbots & Automações", d: "Respondem aos teus clientes na hora, no WhatsApp e no site.", slug: "chatbots-automacoes", v: "chat" },
  { n: "05", t: "Apps Empresariais", d: "Gestão de clientes, painéis e portais à medida.", slug: "apps-empresariais", v: "app" },
  { n: "06", t: "Consultoria em IA", d: "Análise, plano por prioridades e formação da equipa.", slug: "consultoria-em-ia", v: "plan" },
];

function Visual({ kind }: { kind: Kind }) {
  switch (kind) {
    case "ia":
      return (
        <div className="hm-vg hm-vg-ia" aria-hidden>
          <svg viewBox="0 0 472 230" preserveAspectRatio="none">
            <path d="M236 115 L80 54 M236 115 L86 180 M236 115 L396 115" />
          </svg>
          <i className="hm-vg-n hm-vg-n1">CRM</i>
          <i className="hm-vg-n hm-vg-n2">Email</i>
          <i className="hm-vg-n hm-vg-n3">WhatsApp</i>
          <b className="hm-vg-core">IA</b>
        </div>
      );
    case "web":
      return (
        <div className="hm-vg hm-vg-web" aria-hidden>
          <div className="hm-minibar">
            <i />
            <i />
            <i />
            <b />
          </div>
          <i className="hm-bar w70" />
          <i className="hm-bar w50" />
          <i className="hm-pill" />
        </div>
      );
    case "shop":
      return (
        <div className="hm-vg hm-vg-shop" aria-hidden>
          <div className="hm-vg-prod" />
          <div className="hm-vg-shop-r">
            <i className="hm-bar w70" />
            <span className="hm-vg-price">49,90€</span>
            <span className="hm-vg-mbw">MB Way</span>
          </div>
          <b className="hm-vg-cart">1</b>
        </div>
      );
    case "chat":
      return (
        <div className="hm-vg hm-vg-chat" aria-hidden>
          <span className="hm-bub hm-bub-c">Fazem entregas no Porto?</span>
          <span className="hm-bub hm-bub-a">Fazemos, em 24h.</span>
        </div>
      );
    case "app":
      return (
        <div className="hm-vg hm-vg-app" aria-hidden>
          {[40, 62, 48, 80, 70, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    case "plan":
      return (
        <div className="hm-vg hm-vg-plan" aria-hidden>
          {["Análise", "Prioridades", "Formação"].map((x) => (
            <span key={x}>
              <b>✓</b> {x}
            </span>
          ))}
        </div>
      );
  }
}

const STEPS = SV.length - 1;
/** Progresso do pin → posição na fila, com uma pausa em cada cartão. */
const toPos = (p: number) => {
  const x = clamp01(p) * STEPS;
  const k = Math.min(STEPS - 1, Math.floor(x));
  return k + eio(seg(x - k, 0.22, 0.86));
};

export default function ServicosHome() {
  const ref = useScene<HTMLElement>(
    (root, desk) => {
      const head = qa(root, ".hm-sv-left > *");
      const track = q(root, ".hm-sv-track");
      const cards = qa(root, ".hm-sv-card");
      const idx = qa(root, ".hm-sv-idx button");
      const vgs = cards.map((c) => q(c, ".hm-vg"));
      if (!desk) {
        // No telemóvel a fila é um carrossel nativo; só as entradas animam.
        [track, ...head, ...cards].forEach((e) => {
          if (e) {
            e.style.transform = "";
            e.style.opacity = "";
          }
        });
        return ({ t, rm }) => {
          head.forEach((h, i) => {
            const v = rm ? 1 : eo(seg(t, 0.05 + i * 0.12, 0.6 + i * 0.12));
            h.style.opacity = v.toFixed(3);
            h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 24).toFixed(1)}px)`;
          });
        };
      }
      return ({ t, T, p, u, rm }) => {
        head.forEach((h, i) => {
          const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
          h.style.opacity = v.toFixed(3);
          h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30 * u).toFixed(1)}px)`;
        });
        const pos = toPos(p);
        const tin = rm ? 1 : eo(seg(t, 0.15, 1.5));
        if (track) {
          track.style.transform = `translateX(${((60 + lerp(700, 0, tin) - 580 * pos) * u).toFixed(1)}px)`;
        }
        idx.forEach((e, i) => {
          const on = clamp01(1 - Math.abs(pos - i));
          e.classList.toggle("is-on", on > 0.5);
          e.style.transform = `translateX(${(on * 14 * u).toFixed(1)}px)`;
          e.style.opacity = (0.45 + 0.55 * on).toFixed(3);
        });
        cards.forEach((c, i) => {
          const d = i - pos;
          const on = clamp01(1 - Math.abs(d));
          const enter = rm ? 1 : eo(seg(t, 0.3 + i * 0.08, 1.0 + i * 0.08));
          c.style.transform = `perspective(${(1600 * u).toFixed(0)}px) rotateY(${Math.max(-30, Math.min(30, -d * 14)).toFixed(2)}deg) translateZ(${(-Math.abs(d) * 90 * u).toFixed(1)}px)`;
          c.style.opacity = ((0.4 + 0.6 * on) * enter).toFixed(3);
          c.classList.toggle("is-on", on > 0.5);
          const vg = vgs[i];
          if (vg) vg.style.transform = `translateY(${(Math.sin(T * 1.3 + i) * 4 * u).toFixed(1)}px)`;
        });
      };
    },
    { pin: true },
  );

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    scrollToEl(el, (i / STEPS) * span + 2);
  };

  return (
    <section ref={ref} id="servicos" className="hm-sec hm-sv" aria-labelledby="hm-sv-h">
      <div className="hm-sv-pin">
        <div className="hm-cv hm-sv-cv">
          <div className="hm-sv-left">
            <h2 id="hm-sv-h" className="hm-h2 hm-sv-h">
              O que <span className="hm-acc">construímos</span>
            </h2>
            <p className="hm-body">
              Seis formas de te ajudar, uma só equipa. Do site à inteligência artificial,
              tudo ligado.
            </p>
            <ol className="hm-sv-idx">
              {SV.map((s, i) => (
                <li key={s.slug}>
                  <button type="button" onClick={() => goTo(i)}>
                    <span>{s.n}</span>
                    {s.t}
                  </button>
                </li>
              ))}
            </ol>
            <Link href="/servicos" className="hm-more">
              Ver todos os serviços <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="hm-sv-view">
            <div className="hm-sv-track">
              {SV.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/servicos/${s.slug}`}
                  className="hm-sv-card"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Visual kind={s.v} />
                  <span className="hm-sv-n" aria-hidden>
                    {s.n}
                  </span>
                  <span className="hm-sv-t">{s.t}</span>
                  <span className="hm-sv-d">{s.d}</span>
                  <span className="hm-sv-go">
                    Ver serviço <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
