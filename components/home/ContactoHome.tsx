"use client";

import Image from "next/image";
import LeadFormCard from "@/components/sections/LeadFormCard";
import { useScene } from "./useScene";
import { eo, q, qa, rise, seg } from "./anim";

// O formulário da homepage: o mesmo cartão de sempre (os mesmos campos), numa
// secção que fecha a página com o chão de ouro da herói.
const PASSOS = [
  ["Deixas o contacto", "Nome, telemóvel e o que fazes. Um minuto."],
  ["Ligamos-te em 24 horas", "Marcamos a meia hora à tua medida."],
  ["Sais com um caminho", "Dizemos-te o que faz sentido, avances connosco ou não."],
];

export default function ContactoHome() {
  const ref = useScene<HTMLElement>((root, desk) => {
    const head = qa(root, ".hm-ct-l > *");
    const steps = qa(root, ".hm-ct-st li");
    const rail = q(root, ".hm-ct-st i");
    const card = q(root, ".hm-ct-card");
    return ({ t, rm }) => {
      head.forEach((h, i) => rise(h, rm ? 1 : eo(seg(t, 0.05 + i * 0.12, 0.7 + i * 0.12)), 28));
      steps.forEach((s, i) => rise(s, rm ? 1 : eo(seg(t, 0.6 + i * 0.18, 1.2 + i * 0.18)), 18));
      if (rail) rail.style.transform = `scaleY(${(rm ? 1 : eo(seg(t, 0.55, 1.6))).toFixed(4)})`;
      rise(card, rm ? 1 : eo(seg(t, desk ? 0.25 : 0.4, desk ? 1.1 : 1.2)), 50);
    };
  });

  return (
    <section ref={ref} id="consultoria" className="hm-sec hm-ct scroll-mt-24" aria-labelledby="hm-ct-h">
      <div className="hm-ct-bg" aria-hidden>
        <div className="hm-ct-floor">
          <i />
        </div>
        <div className="hm-ct-hz" />
      </div>
      <div className="hm-ct-in">
        <div className="hm-ct-l">
          <span className="hm-chip">Consultoria gratuita</span>
          <h2 id="hm-ct-h" className="hm-h2">
            Meia hora que pode mudar <span className="hm-acc">o teu próximo ano.</span>
          </h2>
          <p className="hm-body">
            Sem custo e sem compromisso. Olhamos para o teu negócio e dizemos-te com honestidade o
            que faz sentido, e o que não faz.
          </p>
          <ol className="hm-ct-st">
            <i aria-hidden />
            {PASSOS.map(([t, d], i) => (
              <li key={t}>
                <b>{i + 1}</b>
                <div>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="hm-ct-who">
            <span className="hm-ct-avs" aria-hidden>
              {["/img/team/alexandre.jpg", "/img/team/tomas.jpg"].map((src) => (
                <span key={src}>
                  <Image src={src} alt="" fill sizes="44px" />
                </span>
              ))}
            </span>
            <span>
              Quem te liga é o <b>Alexandre</b> ou o <b>Tomás</b>.
            </span>
          </div>
        </div>

        <div id="consultoria-form" className="hm-ct-card">
          <LeadFormCard
            origem="Homepage"
            formTitle="Marcar a minha consultoria"
            promessa="consultoria gratuita"
            cta="Quero a consultoria gratuita"
            negocioPlaceholder="Ex.: Clínica Sorriso, Imobiliária Horizonte…"
          />
        </div>
      </div>
    </section>
  );
}
