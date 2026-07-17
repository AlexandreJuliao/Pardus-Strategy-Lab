import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/legal/LegalDoc";
import { LEGAL, SUBPROCESSORS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Pardus recolhe, usa e protege dados pessoais — website, plataforma de gestão e integrações com Meta (Facebook/Instagram), LinkedIn e TikTok. RGPD.",
  alternates: { canonical: `${LEGAL.site}/privacidade` },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "responsavel",
    title: "Responsável pelo tratamento",
    content: (
      <>
        <p className="lead">
          Esta política explica como são tratados os dados pessoais no âmbito do
          website <strong>{LEGAL.site.replace("https://", "")}</strong> e da
          plataforma de gestão da {LEGAL.tradeName}.
        </p>
        <p>O responsável pelo tratamento dos dados é:</p>
        <ul>
          <li>
            <strong>{LEGAL.legalName}</strong> ({LEGAL.tradeName})
          </li>
          <li>{LEGAL.status}</li>
          <li>NIF: {LEGAL.nif}</li>
          <li>Morada: {LEGAL.address}</li>
          <li>
            Contacto:{" "}
            <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>
            {" · "}
            {LEGAL.phone}
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ambito",
    title: "A quem se aplica",
    content: (
      <>
        <p>Esta política cobre três grupos de pessoas:</p>
        <ul>
          <li>
            <strong>Visitantes do website</strong> — quem navega ou preenche o
            formulário de contacto.
          </li>
          <li>
            <strong>Clientes e potenciais clientes</strong> — quem contrata ou
            avalia os nossos serviços.
          </li>
          <li>
            <strong>Titulares de contas geridas</strong> — clientes que nos
            autorizam a gerir as suas páginas e contas de redes sociais e
            publicidade (Meta/Facebook/Instagram, LinkedIn, TikTok) através da
            nossa plataforma.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "dados",
    title: "Que dados recolhemos",
    content: (
      <>
        <h3>Do website</h3>
        <ul>
          <li>
            Dados de contacto que nos dás no formulário: nome, email, telefone
            (opcional) e a mensagem que escreves.
          </li>
          <li>
            Dados técnicos mínimos de funcionamento e de segurança (ex.: tipo de
            dispositivo, páginas visitadas), conforme a secção de{" "}
            <a href="#cookies">Cookies</a>.
          </li>
        </ul>
        <h3>Das integrações de redes sociais e publicidade</h3>
        <p>
          Quando um cliente nos autoriza (via início de sessão seguro / OAuth) a
          gerir os seus ativos, acedemos apenas ao necessário para prestar o
          serviço:
        </p>
        <ul>
          <li>
            Identificadores e tokens de acesso das contas/páginas autorizadas.
          </li>
          <li>
            Conteúdos e publicações que criamos ou agendamos em nome do titular.
          </li>
          <li>
            Métricas e estatísticas das páginas, publicações e campanhas
            (insights) para reporte.
          </li>
          <li>
            Quando o cliente ativa funcionalidades de{" "}
            <strong>mensagens automáticas / chatbot</strong>, as mensagens
            trocadas nas páginas ou contas autorizadas, usadas
            exclusivamente para responder e prestar apoio em nome do titular.
          </li>
        </ul>
        <p>
          Recolhemos apenas o necessário para o serviço, nunca acedemos a contas
          sem autorização expressa do respetivo titular, e não usamos estes
          dados para qualquer finalidade além da prestação do serviço a esse
          titular.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Finalidades e bases legais",
    content: (
      <>
        <ul>
          <li>
            <strong>Responder a contactos e pedidos</strong> — base:
            diligências pré-contratuais / interesse legítimo.
          </li>
          <li>
            <strong>Prestar os serviços contratados</strong> (gestão de redes,
            publicidade, desenvolvimento) — base: execução do contrato.
          </li>
          <li>
            <strong>Gerir contas de redes sociais e campanhas</strong> em nome
            dos clientes — base: execução do contrato com o cliente, que é o
            titular/controlador desses dados.
          </li>
          <li>
            <strong>Comunicações de marketing</strong> (quando aplicável) — base:
            consentimento, revogável a qualquer momento.
          </li>
          <li>
            <strong>Cumprir obrigações legais</strong> (ex.: faturação,
            contabilidade) — base: obrigação legal.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "meta",
    title: "Uso das plataformas Meta, LinkedIn e TikTok",
    content: (
      <>
        <p>
          A nossa plataforma usa as APIs oficiais da Meta (Facebook e Instagram),
          do LinkedIn e do TikTok para gerir os ativos que os clientes nos
          autorizam.
        </p>
        <ul>
          <li>
            Usamos os dados obtidos por estas APIs <strong>exclusivamente</strong>{" "}
            para prestar o serviço ao titular da conta (publicar, agendar, medir
            resultados e reportar).
          </li>
          <li>
            <strong>Não vendemos</strong> dados obtidos por estas plataformas nem
            os usamos para publicidade própria não relacionada.
          </li>
          <li>
            Cumprimos os termos e políticas de cada plataforma, incluindo as{" "}
            <em>Meta Platform Terms</em> e as <em>Developer Policies</em>.
          </li>
          <li>
            O acesso pode ser revogado pelo titular a qualquer momento nas
            definições da respetiva rede social, ou por pedido a nós (ver{" "}
            <a href="/eliminacao-de-dados">Eliminação de Dados</a>).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "subprocessadores",
    title: "Com quem partilhamos dados",
    content: (
      <>
        <p>
          Não vendemos dados pessoais. Recorremos a prestadores de serviços
          (subprocessadores) que os tratam por nossa conta, sob contrato e apenas
          para as finalidades acima:
        </p>
        <ul>
          {SUBPROCESSORS.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong> — {s.purpose} ({s.location}).
            </li>
          ))}
        </ul>
        <p>
          Podemos ainda divulgar dados quando exigido por lei ou por autoridade
          competente.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "Transferências internacionais",
    content: (
      <p>
        Sempre que um subprocessador trate dados fora do Espaço Económico
        Europeu, essa transferência é feita com salvaguardas adequadas,
        tipicamente as <strong>Cláusulas Contratuais-Tipo</strong> aprovadas pela
        Comissão Europeia, garantindo um nível de proteção equivalente ao do
        RGPD.
      </p>
    ),
  },
  {
    id: "conservacao",
    title: "Durante quanto tempo guardamos",
    content: (
      <ul>
        <li>
          Contactos do website: até 24 meses após o último contacto, salvo se
          resultar uma relação contratual.
        </li>
        <li>
          Dados de clientes e faturação: pelo prazo legal aplicável (em regra, 10
          anos para documentos fiscais).
        </li>
        <li>
          Tokens e dados de contas geridas: enquanto durar a autorização; são
          eliminados quando o serviço termina ou o acesso é revogado.
        </li>
      </ul>
    ),
  },
  {
    id: "direitos",
    title: "Os teus direitos",
    content: (
      <>
        <p>Ao abrigo do RGPD, tens direito a:</p>
        <ul>
          <li>Aceder aos teus dados e obter uma cópia;</li>
          <li>Retificar dados incorretos ou desatualizados;</li>
          <li>Apagar os teus dados (&quot;direito a ser esquecido&quot;);</li>
          <li>Limitar ou opor-te a determinados tratamentos;</li>
          <li>Portabilidade dos dados;</li>
          <li>Retirar o consentimento a qualquer momento.</li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, escreve para{" "}
          <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>.
          Tens também o direito de apresentar reclamação à autoridade de
          controlo: {LEGAL.supervisoryAuthority}.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        O website usa apenas cookies e tecnologias essenciais ao seu
        funcionamento e segurança. Caso venham a ser usadas ferramentas de
        medição de audiência ou de publicidade (ex.: Meta Pixel), estas só serão
        ativadas mediante o teu consentimento, através de um aviso próprio.
      </p>
    ),
  },
  {
    id: "seguranca",
    title: "Segurança",
    content: (
      <p>
        Aplicamos medidas técnicas e organizativas adequadas — encriptação em
        trânsito (HTTPS), controlo de acessos, autenticação e minimização de
        dados — para proteger a informação contra acesso, perda ou divulgação não
        autorizados.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "Alterações a esta política",
    content: (
      <p>
        Podemos atualizar esta política para refletir mudanças legais ou nos
        nossos serviços. A versão em vigor é sempre a publicada nesta página, com
        a data de atualização indicada no índice.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <LegalDoc
      label="// Legal"
      title="Política de Privacidade"
      subtitle="Como recolhemos, usamos e protegemos dados pessoais — com transparência e em conformidade com o RGPD."
      sections={sections}
    />
  );
}
