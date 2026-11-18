"use client";

import Image from "next/image";
import Link from "next/link";
import { useScene } from "./useScene";
import { PILAR_EVENT } from "./CapacidadesHome";
import { clamp01, eio, eo, lerp, q, qa, seg } from "./anim";
import { scrollToEl, scrollToId } from "@/lib/scrollTo";

// Dois serviços por pilar (a oferta de 19/10/2026). Fotografias geradas no kie.ai (nano-banana-2).
// shortcut: a Captação reutiliza ia.jpg e consultoria.jpg; trocar por fotos próprias quando houver.
// Os da Captação não têm página própria: abrem o separador Captação de «Tudo o que entregamos».
const SV: { n: string; p: string; t: string; d: string; img: string; slug?: string; tab?: number }[] = [
  { n: "01", p: "Presença", t: "Site profissional", d: "Pensado para o que vendes, rápido no telemóvel e ligado à ficha Google.", slug: "websites", img: "/img/home/servicos/web.jpg" },
  { n: "02", p: "Presença", t: "Loja online", d: "Vende a qualquer hora, com pagamentos e stock, sem comissões.", slug: "e-commerce", img: "/img/home/servicos/loja.jpg" },
  { n: "03", p: "Captação", t: "Ficha Google e chamadas medidas", d: "O teu negócio arrumado no Google, com chamadas, formulários e WhatsApp medidos.", tab: 1, img: "/img/home/servicos/ia.jpg" },
  { n: "04", p: "Captação", t: "Anúncios no Google", d: "Apareces a quem procura o que fazes, com cada euro medido e relatório.", tab: 1, img: "/img/home/servicos/consultoria.jpg" },
  { n: "05", p: "Sistema", t: "Software de gestão", d: "Clientes, equipa, marcações, stock e cobranças num só sítio, feito à medida.", slug: "apps-empresariais", img: "/img/home/servicos/apps.jpg" },
  { n: "06", p: "Sistema", t: "Atendimento com chatbot", d: "Responde aos teus clientes na hora, no WhatsApp e no site.", slug: "chatbots-automacoes", img: "/img/home/servicos/chat.jpg" },
];

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
      const vgs = cards.map((c) => q(c, ".hm-sv-ph"));
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
              Dois serviços em cada pilar: presença, captação e sistema. Uma só equipa,
              tudo ligado.
            </p>
            <ol className="hm-sv-idx">
              {SV.map((s, i) => (
                <li key={s.n}>
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
              {SV.map((s, i) => {
                const inner = (
                  <>
                    <div className="hm-sv-ph" aria-hidden>
                      <Image src={s.img} alt="" fill sizes="(min-width:1024px) 30vw, 80vw" />
                    </div>
                    <span className="hm-sv-n" aria-hidden>
                      {s.n}
                    </span>
                    <span className="hm-sv-p">{s.p}</span>
                    <span className="hm-sv-t">{s.t}</span>
                    <span className="hm-sv-d">{s.d}</span>
                    <span className="hm-sv-go">
                      {s.slug ? "Ver serviço" : "Ver o que inclui"} <span aria-hidden>→</span>
                    </span>
                  </>
                );
                const style = { "--i": i } as React.CSSProperties;
                return s.slug ? (
                  <Link key={s.n} href={`/servicos/${s.slug}`} className="hm-sv-card" style={style}>
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={s.n}
                    href="#capacidades"
                    className="hm-sv-card"
                    style={style}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent(PILAR_EVENT, { detail: s.tab }));
                      scrollToId("capacidades");
                    }}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
