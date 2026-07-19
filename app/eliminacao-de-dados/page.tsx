import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/legal/LegalDoc";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Eliminação de Dados",
  description:
    "Como pedir a remoção dos teus dados e revogar o acesso da Pardus às tuas contas de Facebook, Instagram, LinkedIn ou TikTok.",
  alternates: { canonical: `${LEGAL.site}/eliminacao-de-dados` },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "resumo",
    title: "Como pedir a eliminação",
    content: (
      <>
        <p className="lead">
          Podes pedir, a qualquer momento, a eliminação dos dados que a{" "}
          {LEGAL.tradeName} tenha sobre ti, e revogar o acesso às tuas contas de
          redes sociais.
        </p>
        <p>
          Envia um email para{" "}
          <a href={`mailto:${LEGAL.privacyEmail}?subject=Pedido%20de%20elimina%C3%A7%C3%A3o%20de%20dados`}>
            {LEGAL.privacyEmail}
          </a>{" "}
          com o assunto <strong>&quot;Pedido de eliminação de dados&quot;</strong>,
          indicando o email ou a conta a que o pedido diz respeito. Confirmamos a
          receção e concluímos a eliminação no prazo de <strong>30 dias</strong>.
        </p>
      </>
    ),
  },
  {
    id: "revogar-meta",
    title: "Revogar o acesso no Facebook e Instagram",
    content: (
      <>
        <p>
          Para retirares imediatamente o acesso da nossa aplicação às tuas contas
          Meta:
        </p>
        <ul>
          <li>
            <strong>Facebook:</strong> Definições e privacidade → Definições →
            Aplicações e sites empresariais (Business Integrations) → seleciona a
            aplicação → <strong>Remover</strong>.
          </li>
          <li>
            <strong>Instagram:</strong> Definições → Aplicações e sites →
            Ativas → seleciona a aplicação → <strong>Remover</strong>.
          </li>
        </ul>
        <p>
          Ao remover, os tokens de acesso deixam de ser válidos e a nossa
          plataforma perde qualquer acesso à conta.
        </p>
      </>
    ),
  },
  {
    id: "revogar-outras",
    title: "Revogar no LinkedIn e TikTok",
    content: (
      <ul>
        <li>
          <strong>LinkedIn:</strong> Definições e privacidade → Privacidade dos
          dados → Aplicações e serviços permitidos → <strong>Remover</strong>.
        </li>
        <li>
          <strong>TikTok:</strong> Definições → Segurança e acesso → Autorização
          de apps → <strong>Remover acesso</strong>.
        </li>
      </ul>
    ),
  },
  {
    id: "o-que-eliminamos",
    title: "O que é eliminado",
    content: (
      <>
        <p>Ao processar um pedido de eliminação, removemos:</p>
        <ul>
          <li>Tokens de acesso e ligações às tuas contas;</li>
          <li>
            Dados de conta, métricas e conteúdos guardados na nossa plataforma
            associados a ti;
          </li>
          <li>
            Os teus dados de contacto, salvo os que a lei nos obrigue a conservar
            (ex.: documentos de faturação).
          </li>
        </ul>
        <p>
          Dados que estejam nas próprias plataformas (Facebook, Instagram,
          LinkedIn, TikTok) continuam sujeitos às políticas dessas plataformas.
          A eliminação junto delas faz-se nas respetivas definições de conta.
        </p>
      </>
    ),
  },
  {
    id: "contacto",
    title: "Precisas de ajuda?",
    content: (
      <p>
        Se tiveres dúvidas sobre este processo, escreve para{" "}
        <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a> e
        ajudamos-te a concluir o pedido.
      </p>
    ),
  },
];

export default function EliminacaoDadosPage() {
  return (
    <LegalDoc
      label="// Legal"
      title="Eliminação de Dados"
      subtitle="Pede a remoção dos teus dados e revoga o acesso às tuas contas, de forma simples e rápida."
      sections={sections}
    />
  );
}
