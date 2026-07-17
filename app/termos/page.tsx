import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/legal/LegalDoc";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Termos de utilização do website e dos serviços da Pardus Strategy Lab.",
  alternates: { canonical: `${LEGAL.site}/termos` },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "identificacao",
    title: "Quem somos",
    content: (
      <>
        <p className="lead">
          Estes termos regulam a utilização do website{" "}
          {LEGAL.site.replace("https://", "")} e dos serviços prestados pela{" "}
          {LEGAL.tradeName}.
        </p>
        <ul>
          <li>
            <strong>{LEGAL.legalName}</strong> ({LEGAL.tradeName})
          </li>
          <li>{LEGAL.status}</li>
          <li>NIF: {LEGAL.nif}</li>
          <li>
            Contacto:{" "}
            <a href={`mailto:${LEGAL.contactEmail}`}>{LEGAL.contactEmail}</a>
          </li>
        </ul>
        <p>
          Ao utilizar este website, aceitas estes termos. Se não concordares, não
          o utilizes.
        </p>
      </>
    ),
  },
  {
    id: "objeto",
    title: "Objeto",
    content: (
      <p>
        O website tem natureza informativa e de apresentação dos serviços de
        desenvolvimento web, sistemas de IA, automação e gestão de presença
        digital. A prestação de serviços é sempre formalizada por proposta e
        acordo próprios entre as partes.
      </p>
    ),
  },
  {
    id: "uso",
    title: "Utilização aceitável",
    content: (
      <>
        <p>Ao usar o website, comprometes-te a não:</p>
        <ul>
          <li>Utilizá-lo para fins ilícitos ou não autorizados;</li>
          <li>
            Tentar aceder a áreas restritas, comprometer a segurança ou
            interferir com o normal funcionamento;
          </li>
          <li>Copiar, reproduzir ou explorar conteúdos sem autorização.</li>
        </ul>
      </>
    ),
  },
  {
    id: "propriedade",
    title: "Propriedade intelectual",
    content: (
      <p>
        Salvo indicação em contrário, todos os conteúdos do website (textos,
        marca, identidade visual, código e design) pertencem à {LEGAL.tradeName}{" "}
        ou aos seus licenciadores e estão protegidos por lei. Não é concedida
        qualquer licença de uso sem autorização escrita.
      </p>
    ),
  },
  {
    id: "propostas",
    title: "Propostas e orçamentos",
    content: (
      <p>
        Preços, prazos e âmbitos apresentados no website ou em comunicações são
        indicativos e não vinculativos até estarem formalizados numa proposta
        aceite por ambas as partes. Cada projeto rege-se pelos termos específicos
        aí acordados.
      </p>
    ),
  },
  {
    id: "responsabilidade",
    title: "Limitação de responsabilidade",
    content: (
      <p>
        O website é disponibilizado &quot;tal como está&quot;. Dentro dos limites
        permitidos por lei, não nos responsabilizamos por danos indiretos
        decorrentes do uso do website ou da impossibilidade de o utilizar. Nada
        nestes termos exclui responsabilidades que não possam ser legalmente
        afastadas.
      </p>
    ),
  },
  {
    id: "terceiros",
    title: "Ligações a terceiros",
    content: (
      <p>
        O website pode conter ligações a sites de terceiros. Não controlamos nem
        somos responsáveis pelos conteúdos ou práticas de privacidade desses
        sites.
      </p>
    ),
  },
  {
    id: "privacidade",
    title: "Privacidade",
    content: (
      <p>
        O tratamento de dados pessoais rege-se pela nossa{" "}
        <a href="/privacidade">Política de Privacidade</a>, que faz parte
        integrante destes termos.
      </p>
    ),
  },
  {
    id: "lei",
    title: "Lei aplicável e foro",
    content: (
      <p>
        Estes termos regem-se pela lei portuguesa. Para a resolução de qualquer
        litígio é competente o foro da comarca do domicílio do responsável, sem
        prejuízo dos direitos que a lei reconhece aos consumidores.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações",
    content: (
      <p>
        Podemos atualizar estes termos a qualquer momento. A versão em vigor é a
        publicada nesta página, com a data indicada no índice.
      </p>
    ),
  },
];

export default function TermosPage() {
  return (
    <LegalDoc
      label="// Legal"
      title="Termos e Condições"
      subtitle="As regras de utilização do website e dos serviços da Pardus."
      sections={sections}
    />
  );
}
