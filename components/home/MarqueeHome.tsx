import { Fragment } from "react";

const R1 = [
  "Sites",
  "Lojas online",
  "Inteligência artificial",
  "Automações",
  "Chatbots",
  "Gestão de clientes",
  "Apps à medida",
  "Captação",
];
const R2 = [
  "Mais rápido",
  "Sempre ligado",
  "Resultados medidos",
  "Tudo em teu nome",
  "Resposta em 24h",
  "Feito em Lisboa",
  "Sem letra pequena",
  "Do início ao fim",
];

function Band({ items, cls }: { items: string[]; cls: string }) {
  const row = (hidden: boolean) => (
    <span className="hm-mq-row" aria-hidden={hidden || undefined}>
      {items.map((x) => (
        <Fragment key={x}>
          <span>{x}</span>
          <i aria-hidden>◆</i>
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className={`hm-mq-band ${cls}`}>
      <div className="hm-mq-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

// Duas faixas inclinadas a correr em sentidos opostos: o que fazemos e como.
export default function MarqueeHome() {
  return (
    <section className="hm-mq" aria-label="O que fazemos e como trabalhamos">
      <Band items={R1} cls="hm-mq-1" />
      <Band items={R2} cls="hm-mq-2" />
    </section>
  );
}
