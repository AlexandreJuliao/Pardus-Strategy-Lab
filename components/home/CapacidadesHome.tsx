"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./Icon";
import { useScene } from "./useScene";
import { clamp01, eio, eo, eob, ei, lerp, q, qa, seg, setText } from "./anim";

const TABS: { t: string; ic: IconName; d: string; f: string[] }[] = [
  {
    t: "Presença",
    ic: "globe",
    d: "Tudo o que faz um cliente encontrar-te e confiar em ti antes de falar contigo.",
    f: [
      "Site à medida, rápido no telemóvel",
      "Ficha Google arrumada e ligada ao site",
      "Painel teu para editar e ver análises",
      "Preparado para aparecer no Google",
      "Acompanhamento depois da entrega",
    ],
  },
  {
    t: "Captação",
    ic: "target",
    d: "Levamos quem procura o que fazes até ti, com cada euro de anúncio medido.",
    f: [
      "Negócio todo arrumado no Google",
      "Anúncios no Google e no Instagram",
      "Cada contacto chega-te na hora",
      "Ajustes todas as semanas",
      "Relatório claro do investimento",
    ],
  },
  {
    t: "Sistema",
    ic: "bolt",
    d: "O trabalho de dentro feito por software teu, sem papel nem esquecimentos.",
    f: [
      "Software feito à medida do negócio",
      "Marcações, equipa e stock num só sítio",
      "Assistente que responde e marca sozinho",
      "Faturas e lembretes automáticos",
      "Tudo organizado, e tudo teu",
    ],
  },
];

const AUTO_MS = 7600; // tempo em cada separador quando ninguém mexe
const HOLD_MS = 16000; // depois de um clique, o separador fica quieto este tempo

function DemoSite() {
  return (
    <div className="hm-demo hm-demo-1" aria-hidden>
      <div className="hm-ui hm-cw-site">
        <div className="hm-minibar">
          <i />
          <i />
          <i />
          <b />
        </div>
        <div className="hm-cw-hero">
          <Image src="/img/cases/case-arquitetura.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 70vw" />
          <span className="hm-cw-wm">
            ATELIER<em>.</em>
          </span>
          <span className="hm-cw-nav">Projetos · Estúdio · Contacto</span>
        </div>
        <div className="hm-cw-body">
          <span className="hm-cw-k">Arquitetura · Lisboa</span>
          <b className="hm-cw-t">Espaços que contam uma história.</b>
          <span className="hm-cw-btn">Marcar visita →</span>
        </div>
      </div>
      <div className="hm-ui hm-cw-perf">
        <div className="hm-ui-h">
          <span>O teu painel</span>
          <b className="hm-ui-live" />
        </div>
        <div className="hm-cw-ring">
          <svg viewBox="0 0 120 120">
            <circle className="hm-g-bg" cx="60" cy="60" r="50" />
            <circle className="hm-cw-fg" cx="60" cy="60" r="50" />
          </svg>
          <b className="hm-cw-score">4,9</b>
          <span>★ no Google</span>
        </div>
        {[
          ["Ficha Google", "Completa"],
          ["Site", "Online"],
          ["Análises", "Ao vivo"],
        ].map(([a, b]) => (
          <div key={a} className="hm-cw-row">
            <Icon name="check" className="hm-ic-gold" />
            <span>{a}</span>
            <em>{b}</em>
          </div>
        ))}
      </div>
      <div className="hm-ui hm-cp-mail hm-cw-mail">
        <Icon name="target" className="hm-ic-gold" />
        <div>
          <b>Apareces no mapa</b>
          <span>«arquitetos perto de mim» · 1.º lugar</span>
        </div>
      </div>
      <div className="hm-ui hm-cp-badge">
        <span>Visitas hoje</span>
        <b className="hm-cw-vis">128</b>
      </div>
    </div>
  );
}

function DemoLoja() {
  return (
    <div className="hm-demo hm-demo-2" aria-hidden>
      <div className="hm-ui hm-cp-prod">
        <div className="hm-cp-prod-img">
          <Image src="/img/home/produto.jpg" alt="" fill sizes="(min-width:1024px) 20vw, 45vw" />
        </div>
        <b>Pele nova em 4 semanas</b>
        <span className="hm-cp-price hm-cp-spons">Patrocinado · Instagram</span>
        <span className="hm-cp-add">Pedir informação</span>
      </div>
      <div className="hm-ui hm-cp-pay">
        <div className="hm-ui-h">
          <span>Campanha</span>
        </div>
        <div className="hm-cp-opt">
          <Icon name="target" />
          <span>Google · Pesquisa</span>
        </div>
        <div className="hm-cp-opt hm-cp-mbw">
          <Icon name="spark" />
          <span>Instagram</span>
          <i className="hm-cp-radio" />
        </div>
        <span className="hm-cp-paybtn">240 € / mês · medido</span>
      </div>
      <div className="hm-ui hm-cp-mail">
        <Icon name="mail" className="hm-ic-gold" />
        <div>
          <b>Novo contacto pelo anúncio</b>
          <span>Ana R. pediu informação · agora</span>
        </div>
      </div>
      <div className="hm-ui hm-cp-badge">
        <span>Contactos este mês</span>
        <b className="hm-cp-stock">12</b>
      </div>
    </div>
  );
}

function DemoChat() {
  return (
    <div className="hm-demo hm-demo-3" aria-hidden>
      <div className="hm-ui hm-cb-chat">
        <div className="hm-cb-head">
          <i className="hm-cb-av">
            P<em>.</em>
          </i>
          <div>
            <b>Assistente da clínica</b>
            <span>online · marca sozinho</span>
          </div>
          <b className="hm-ui-live" />
        </div>
        <div className="hm-cb-msgs">
          <div className="hm-cb-m hm-cb-c">Têm vaga amanhã de manhã?</div>
          <div className="hm-cb-ty">
            <i />
            <i />
            <i />
          </div>
          <div className="hm-cb-m hm-cb-a">Temos às 10h ou às 11h30. Qual prefere?</div>
          <div className="hm-cb-m hm-cb-c">10h, obrigada!</div>
          <div className="hm-cb-ty">
            <i />
            <i />
            <i />
          </div>
          <div className="hm-cb-m hm-cb-a">
            Marcado: <u>amanhã às 10h</u> ✓
          </div>
        </div>
      </div>
      <div className="hm-ui hm-cb-crm">
        <div className="hm-ui-h">
          <span>Nova marcação</span>
          <i className="hm-cp-tagq">Agenda</i>
        </div>
        <div className="hm-cb-who">
          <i className="hm-cb-ini">MS</i>
          <div>
            <b>Marta Silva</b>
            <span>Consulta · amanhã, 10h</span>
          </div>
        </div>
        <div className="hm-cb-f">
          <span>Origem</span>
          <em>WhatsApp</em>
        </div>
        <div className="hm-cb-f">
          <span>Estado</span>
          <em className="hm-cb-st">Na agenda ✓</em>
        </div>
      </div>
      <div className="hm-ui hm-cp-mail hm-cb-mail">
        <Icon name="mail" className="hm-ic-gold" />
        <div>
          <b>Lembrete e fatura enviados</b>
          <span>
            <b className="hm-cb-n">12</b> tarefas feitas sozinho hoje
          </span>
        </div>
      </div>
      <div className="hm-ui hm-cp-badge">
        <span>Poupado hoje</span>
        <b>2 h</b>
      </div>
    </div>
  );
}

export default function CapacidadesHome() {
  const [tab, setTab] = useState(0);
  const tabRef = useRef(0);
  const since = useRef(-1);
  const prev = useRef(-1);
  const heldUntil = useRef(0);
  const tabsBox = useRef<HTMLDivElement>(null);

  const choose = useCallback((i: number, byUser: boolean) => {
    if (i === tabRef.current) return;
    prev.current = tabRef.current;
    tabRef.current = i;
    since.current = performance.now();
    if (byUser) heldUntil.current = performance.now() + HOLD_MS;
    setTab(i);
  }, []);

  // Indicador dourado que desliza para o separador ativo.
  useEffect(() => {
    const box = tabsBox.current;
    if (!box) return;
    const place = () => {
      const b = box.querySelectorAll<HTMLElement>(".hm-cp-tab")[tab];
      const ind = box.querySelector<HTMLElement>(".hm-cp-ind");
      if (!b || !ind) return;
      ind.style.width = `${b.offsetWidth}px`;
      ind.style.transform = `translateX(${b.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [tab]);

  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-cp-head > *");
    const tabs = q(root, ".hm-cp-tabs");
    const lists = qa(root, ".hm-cp-list").map((l) => ({
      el: l,
      it: qa(l, ".hm-cp-it"),
      ck: qa(l, ".hm-cp-ck"),
    }));
    const demos = qa(root, ".hm-demo").map((d) => ({
      el: d,
      kids: Array.from(d.children) as HTMLElement[],
    }));
    const d1 = demos[0].el;
    const d2 = demos[1].el;
    const d3 = demos[2].el;
    const gfg = q<SVGCircleElement>(d1, ".hm-cw-fg");
    const score = q(d1, ".hm-cw-score");
    const vis = q(d1, ".hm-cw-vis");
    const rows = qa(d1, ".hm-cw-row");
    const add = q(d2, ".hm-cp-add");
    const mbw = q(d2, ".hm-cp-mbw");
    const stock = q(d2, ".hm-cp-stock");
    const msgs = qa(d3, ".hm-cb-m");
    const tys = qa(d3, ".hm-cb-ty");
    const tyd = qa(d3, ".hm-cb-ty i");
    const cbSt = q(d3, ".hm-cb-st");
    const cbN = q(d3, ".hm-cb-n");
    const stage = q(root, ".hm-cp-stage");
    // os desvios das maquetas foram desenhados em px do desenho; escalam com o palco
    const kk = (stage?.clientWidth || (desk ? 880 : 520)) / (desk ? 880 : 520);

    return ({ t, T, p, rm }) => {
      const now = performance.now();
      if (t >= 0 && since.current < 0) since.current = now;
      const c = since.current < 0 ? -1 : rm ? 99 : (now - since.current) / 1000;
      // avança sozinho enquanto ninguém escolhe
      if (!rm && t > 0 && c * 1000 > AUTO_MS && now > heldUntil.current) {
        choose((tabRef.current + 1) % TABS.length, false);
      }
      const act = tabRef.current;
      const old = prev.current;

      head.forEach((h, i) => {
        const v = rm ? 1 : eo(seg(t, 0.1 + i * 0.15, 0.7 + i * 0.15));
        h.style.opacity = v.toFixed(3);
        h.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 30).toFixed(1)}px)`;
      });
      if (tabs) {
        const v = rm ? 1 : eo(seg(t, 0.35, 0.95));
        tabs.style.opacity = v.toFixed(3);
        tabs.style.transform = v >= 1 ? "" : `translateY(${((1 - v) * 20).toFixed(1)}px)`;
      }

      lists.forEach((l, i) => {
        const on = i === act;
        l.el.style.display = on ? "" : "none";
        if (!on) return;
        l.it.forEach((x, j) => {
          const v = rm ? 1 : eo(seg(c, 0.25 + j * 0.1, 0.7 + j * 0.1));
          x.style.opacity = v.toFixed(3);
          const dx = desk ? (j < 3 ? -30 : 30) : 0;
          x.style.transform = v >= 1 ? "" : `translate(${lerp(dx, 0, v).toFixed(1)}px, ${desk ? 0 : lerp(14, 0, v).toFixed(1)}px)`;
        });
        l.ck.forEach((x, j) => {
          x.style.transform = `scale(${clamp01(rm ? 1 : eob(seg(c, 0.45 + j * 0.1, 0.8 + j * 0.1))).toFixed(3)})`;
        });
      });

      const sc = desk ? (p - 0.5) * 2 : 0;
      demos.forEach((d, i) => {
        let pin = 0;
        let pout = 0;
        if (i === act) pin = rm ? 1 : eo(seg(c, 0.05, 0.8));
        else if (i === old) pout = rm ? 1 : ei(seg(c, 0, 0.35));
        else pout = 1;
        const vis = pin * (1 - pout) + (i === old ? 1 - pout : 0);
        d.el.style.opacity = vis.toFixed(3);
        d.el.style.visibility = vis < 0.01 ? "hidden" : "";
        const yIn = lerp(120, 0, pin) * (i === act ? 1 : 0) * kk;
        const yOut = i === old ? -120 * pout * kk : 0;
        d.el.style.transform = `rotateX(${((i === act ? lerp(-16, 0, pin) : 16 * pout) + 4 * sc).toFixed(2)}deg) rotateY(${(Math.sin(T * 0.5) * 2.5).toFixed(2)}deg) translateY(${(yIn + yOut).toFixed(1)}px) translateZ(${((i === act ? lerp(-300, 0, pin) : -300 * pout) * kk).toFixed(1)}px)`;
        if (i !== act) return;
        d.kids.forEach((k, j) => {
          const v = rm ? 1 : eo(seg(c, 0.25 + j * 0.2, 0.8 + j * 0.2));
          k.style.opacity = v.toFixed(3);
          k.style.transform = `translateZ(${((j * 40 + Math.sin(T * 1.1 + j) * 6) * kk).toFixed(1)}px) translateY(${((lerp(40, 0, v) + Math.sin(T * 0.9 + j * 1.7) * 5) * kk).toFixed(1)}px)`;
        });
      });
      if (stage) stage.style.setProperty("--tilt", sc.toFixed(3));

      // Presença: a nota no Google, o painel a confirmar, visitas a subir
      if (act === 0) {
        const gp = rm ? 1 : eio(seg(c, 0.4, 2.0));
        if (gfg) gfg.style.strokeDashoffset = (314 * (1 - 0.98 * gp)).toFixed(1);
        setText(score, (4.9 * gp).toFixed(1).replace(".", ","));
        setText(vis, String(Math.round(128 * (rm ? 1 : eo(seg(c, 0.2, 2.6))))));
        rows.forEach((r, i) => {
          const v = rm ? 1 : clamp01(eob(seg(c, 1.0 + i * 0.3, 1.35 + i * 0.3)));
          r.style.opacity = v.toFixed(3);
          r.style.transform = `translateX(${lerp(-16, 0, v).toFixed(1)}px)`;
        });
      }
      // Captação: o anúncio é clicado, a campanha escolhe o canal, entra um contacto
      if (act === 1) {
        add?.classList.toggle("is-on", c > 1.1);
        mbw?.classList.toggle("is-on", c > 1.9);
        setText(stock, c > 2.6 ? "13" : "12");
      }
      // Sistema: o assistente marca, a agenda atualiza-se, o resto segue sozinho
      if (act === 2) {
        const MT = [0.4, 1.6, 2.7, 3.9];
        const TY = [
          [0.85, 1.6],
          [3.1, 3.9],
        ];
        msgs.forEach((m, i) => {
          const v = rm ? 1 : eo(seg(c, MT[i], MT[i] + 0.35));
          m.style.display = rm || c >= MT[i] ? "" : "none";
          m.style.opacity = v.toFixed(3);
          m.style.transform = `translateY(${lerp(12, 0, v).toFixed(1)}px) scale(${lerp(0.96, 1, v).toFixed(3)})`;
        });
        tys.forEach((x, i) => {
          x.style.display = !rm && c >= TY[i][0] && c < TY[i][1] ? "flex" : "none";
        });
        tyd.forEach((d, j) => {
          d.style.opacity = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(T * 9 - (j % 3) * 0.9))).toFixed(3);
        });
        setText(cbSt, rm || c > 4.2 ? "Na agenda ✓" : "A marcar…");
        setText(cbN, String(Math.round(12 * (rm ? 1 : eo(seg(c, 1.0, 4.4))))));
      }
    };
  });

  return (
    <section ref={ref} id="capacidades" className="hm-sec hm-cp" aria-labelledby="hm-cp-h">
      <div className="hm-cv hm-cp-cv">
        <div className="hm-glow hm-cp-glow" aria-hidden />
        <div className="hm-cp-head">
          <h2 id="hm-cp-h" className="hm-h2">
            Tudo o que <span className="hm-acc">entregamos</span>
          </h2>
          <p className="hm-cp-sub">Em três pilares. Escolhe um.</p>
        </div>
        <div ref={tabsBox} className="hm-cp-tabs hm-ui" role="tablist" aria-label="Pilares">
          <i className="hm-cp-ind" aria-hidden />
          {TABS.map((x, i) => (
            <button
              key={x.t}
              type="button"
              role="tab"
              id={`hm-cp-tab-${i}`}
              aria-selected={tab === i}
              aria-controls="hm-cp-panel"
              className={`hm-cp-tab ${tab === i ? "is-on" : ""}`}
              onClick={() => choose(i, true)}
            >
              <Icon name={x.ic} />
              <span>{x.t}</span>
            </button>
          ))}
        </div>
        <div id="hm-cp-panel" role="tabpanel" aria-labelledby={`hm-cp-tab-${tab}`} className="hm-cp-panel">
          <p key={tab} className="hm-cp-desc">
            {TABS[tab].d}
          </p>
          {TABS.map((x, i) => (
            <ul key={x.t} className="hm-cp-list" style={i === tab ? undefined : { display: "none" }}>
              {x.f.map((f, j) => (
                <li key={f} className={`hm-cp-it hm-cp-s${j}`}>
                  <i className="hm-cp-ck" aria-hidden>
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </i>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          ))}
          <div className="hm-cp-stage">
            <div className="hm-mk hm-cp-mk">
              <DemoSite />
              <DemoLoja />
              <DemoChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
