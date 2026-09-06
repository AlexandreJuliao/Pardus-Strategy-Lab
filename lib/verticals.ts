// Verticais "PARDUS. <Nicho>" — uma landing page por nicho, servida no seu
// subdomínio (websites.pardus-lab.com, …). Fonte única: middleware (hosts),
// páginas /lp/[vertical], metadata e o formulário (origem da lead) leem daqui.
//
// Regras de copy: PT-PT na 2.ª pessoa, uma palavra `accent-serif` por headline,
// "desde" só nas verticais de produto (nunca nas de indústria), sem "3x sem juros".

export type MockKind = "search" | "chat" | "score" | "chart";

export type Vertical = {
  slug: string;
  /** produto = preço "desde" visível; industria = sistemas à medida, sem preço */
  kind: "produto" | "industria";
  /** Descriptor do lockup: PARDUS. + WEBSITES */
  name: string;
  /** Linha explicativa (obrigatória nas indústrias) */
  descriptor?: string;
  /** Vai no evento Lead (content_name), na coluna "origem" (n8n) e no source (Office) */
  origem: string;
  /** lockup oficial da vertical; sem ele usa-se o tipográfico */
  logo?: string;
  seo: { title: string; description: string };
  hero: {
    /** a headline em linhas; o recuo cresce de linha para linha */
    lines: { t: string; accent?: boolean }[];
    sub: string;
    metricNumber: string;
    metric: string;
    cta: string;
    ctaSecondary?: { label: string; targetId: string };
    /** legenda por baixo do monitor */
    proof: string;
  };
  stats: { value: string; label: string }[];
  statement: { pre: string; accent: string; post?: string; sub: string };
  bento: { title: string; desc: string; mock: MockKind; wide?: boolean }[];
  /** o site como canal de aquisição: subir no Google e converter a visita */
  organic: {
    pre: string;
    accent: string;
    intro: string;
    points: string[];
    query: string;
    result: string;
    resultUrl: string;
    cta: string;
  };
  /** formulário do site a ser preenchido + notificação a chegar ao dono */
  flow: {
    title: string;
    intro: string;
    cta: string;
    formTitle: string;
    formIntro: string;
    submit: string;
    fields: { label: string; placeholder: string; value: string; wide?: boolean }[];
    notify: { title: string; also: string };
  };
  features: { icon: "text" | "globe" | "shield" | "zap" | "chart" | "phone"; title: string; desc: string }[];
  process: { when: string; title: string; desc: string }[];
  pricing?: {
    intro: string;
    plans: { name: string; desc: string; price: string; items: string[]; featured?: boolean }[];
    note: string;
  };
  /** aparte: o que se pode juntar ao site mais tarde */
  extras: {
    pre: string;
    accent: string;
    intro: string;
    items: { icon: "bot" | "inbox" | "workflow" | "shop" | "care"; title: string; desc: string }[];
  };
  faq: { q: string; a: string }[];
  form: { title: string; intro: string; cta: string; negocioPlaceholder: string };
};

export const VERTICALS: Record<string, Vertical> = {
  websites: {
    slug: "websites",
    kind: "produto",
    name: "Websites",
    origem: "LP Websites",
    logo: "/img/logo/pardus-websites.png",
    seo: {
      title: "PARDUS. Websites · O teu site pronto em 2 semanas",
      description:
        "Sites profissionais para negócios em Portugal: design à medida, rápidos no telemóvel, ligados ao WhatsApp e a aparecer no Google. Desde 399€. Consultoria gratuita.",
    },
    hero: {
      lines: [
        { t: "Websites à medida" },
        { t: "que fazem o teu negócio" },
        { t: "subir de nível", accent: true },
      ],
      sub: "Desenhamos, escrevemos e lançamos em duas semanas.",
      metricNumber: "2 a 10",
      metric: "pedidos de orçamento por mês.",
      cta: "Quero o meu site",
      ctaSecondary: { label: "Ver preços", targetId: "investimento" },
      proof: "Site que fizemos para a Al Durr, casas modulares",
    },
    stats: [
      { value: "2 sem.", label: "Do primeiro contacto ao site no ar" },
      { value: "98/100", label: "Velocidade no teste do Google" },
      { value: "100%", label: "Domínio, código e acessos teus" },
      { value: "24h", label: "Resposta a qualquer pedido" },
    ],
    statement: {
      pre: "Um site bonito que não traz trabalho é só",
      accent: "decoração.",
      sub: "Antes de desenhar o que quer que seja, perguntamos como é que este site te vai dar dinheiro.",
    },
    bento: [
      {
        title: "Apareces no Google",
        desc: "Estrutura e textos escritos para as pesquisas que os teus clientes fazem mesmo, com o teu serviço e a tua zona.",
        mock: "search",
        wide: true,
      },
      {
        title: "Contactos direto no WhatsApp",
        desc: "Botão sempre à mão. Quem chega ao site fala contigo em dois toques, em vez de preencher um formulário de dez campos.",
        mock: "chat",
      },
      {
        title: "Rápido em qualquer telemóvel",
        desc: "Mais de 70% das visitas vêm do telemóvel. O teu site abre em menos de 2 segundos, em qualquer rede.",
        mock: "score",
      },
      {
        title: "Uma plataforma só tua",
        desc: "Entras e vês tudo: quantas visitas teve o site, de onde vieram e quantos pedidos entraram, num painel que se lê em dois minutos. Os contactos ficam lá, com quem já respondeste e quem falta. E se quiseres mudar um texto ou uma foto, pedes por ali à equipa.",
        mock: "chart",
        wide: true,
      },
    ],
    organic: {
      pre: "Clientes que te encontram",
      accent: "sozinhos.",
      intro: "Cada página é feita para aparecer nas pesquisas certas e transformar a visita num contacto.",
      points: [
        "Textos escritos à volta do que as pessoas procuram mesmo.",
        "Páginas rápidas no telemóvel, que é o que o Google premeia.",
        "O caminho até ao contacto, pensado ao pormenor.",
      ],
      query: "casas modulares chave na mão",
      result: "Al Durr · Casas modulares em A-frame",
      resultUrl: "aldurr.pt",
      cta: "Quero um site assim",
    },
    flow: {
      title: "Cada pedido chega-te ao telemóvel",
      intro: "Quem preenche o formulário do site aparece-te no WhatsApp e no email no mesmo minuto, com nome, contacto e o que precisa. Respondes quando puderes, sem perder ninguém.",
      cta: "Quero isto no meu site",
      formTitle: "Tem terreno? Falamos.",
      formIntro: "Respondemos em 24 horas com uma primeira estimativa.",
      submit: "Pedir estimativa",
      fields: [
        { label: "Nome", placeholder: "O seu nome", value: "Miguel Antunes" },
        { label: "Telemóvel", placeholder: "9xx xxx xxx", value: "938 210 447" },
        { label: "O que precisa", placeholder: "Conte-nos o que procura", value: "Terreno em Sintra, interessado no modelo T2 Family", wide: true },
      ],
      notify: { title: "Novo pedido no site", also: "Também no email da empresa, com os mesmos dados" },
    },
    features: [
      { icon: "text", title: "Textos e imagens incluídos", desc: "Escrevemos e escolhemos as imagens contigo. Não precisas de chegar com nada pronto." },
      { icon: "globe", title: "Domínio, alojamento e email", desc: "Registamos o teu domínio, pomos o site no ar e criamos o email profissional. Tudo em teu nome." },
      { icon: "chart", title: "Acesso à plataforma", desc: "Um painel só teu com as visitas, os pedidos que entraram e um sítio para pedires alterações à equipa. Incluído, sem mensalidade obrigatória." },
      { icon: "shield", title: "30 dias de acompanhamento", desc: "Depois do lançamento ficamos por perto: ajustes, dúvidas e afinações, sem custo." },
    ],
    process: [
      { when: "Dia 1", title: "Conversa de 20 minutos", desc: "Percebemos o que fazes, quem te compra e o que o site tem de resolver. Sais da conversa com o preço fechado." },
      { when: "Dias 2 a 11", title: "Desenho e construção", desc: "Em 10 dias úteis mostramos-te o site a funcionar. Afinamos contigo até estar certo." },
      { when: "Dia 12", title: "Lançamento e formação", desc: "Pomos no ar, ligamos o Google e o WhatsApp, e mostramos-te como mudar textos e imagens sozinho." },
    ],
    pricing: {
      intro: "Preço fechado antes de começar. O valor final depende do que o teu site precisa, mas parte daqui.",
      plans: [
        {
          name: "Landing page",
          desc: "Uma página, para captar contactos a partir de anúncios ou do Google.",
          price: "399€",
          items: ["1 página com formulário e WhatsApp", "Textos e imagens incluídos", "Domínio e alojamento no 1.º ano", "No ar em 7 dias úteis"],
        },
        {
          name: "Site profissional",
          desc: "O site completo do teu negócio, com todas as páginas que precisas.",
          price: "899€",
          featured: true,
          items: ["Até 6 páginas (serviços, sobre, contactos…)", "Textos, imagens e SEO base", "Domínio, alojamento e email profissional", "Painel para editares sozinho", "30 dias de acompanhamento"],
        },
      ],
      note: "Precisas de vender online? Temos lojas desde 1.899€. Adaptamo-nos a várias formas de pagamento e, se quiseres que cuidemos do site todos os meses, há avenças desde 90€/mês.",
    },
    extras: {
      pre: "Quando o site estiver a trabalhar,",
      accent: "há mais.",
      intro: "Também construímos sistemas de gestão, lojas online, aplicações internas e automação com inteligência artificial. Nada disto é preciso para arrancar, mas quando fizer falta já sabes a quem pedir.",
      items: [
        { icon: "bot", title: "Assistente no WhatsApp", desc: "Responde a quem escreve fora de horas e marca por ti." },
        { icon: "inbox", title: "Gestão de pedidos", desc: "Todos os contactos num só sítio, com quem já respondeu e quem falta." },
        { icon: "workflow", title: "Automações", desc: "Orçamentos, lembretes e faturas a sair sozinhos." },
        { icon: "shop", title: "Loja online", desc: "Vender no próprio site, sem comissões de terceiros." },
        { icon: "care", title: "Avença de cuidado", desc: "Atualizações, segurança e posição no Google, todos os meses." },
      ],
    },
    faq: [
      { q: "Quanto tempo demora mesmo?", a: "Uma landing page fica no ar em cerca de 7 dias úteis; um site profissional em 2 semanas. O prazo conta a partir da conversa inicial, e o que mais o atrasa é a aprovação do teu lado, por isso mantemos tudo simples." },
      { q: "O que preciso de vos dar?", a: "Quase nada: o nome do negócio, o que fazes e para quem, e o teu logótipo se tiveres. Os textos e as imagens tratamos nós contigo. Se não tiveres logótipo, fazemos um simples incluído." },
      { q: "O site fica meu ou vosso?", a: "Teu. Domínio em teu nome, alojamento na tua conta, código entregue. Se um dia quiseres mudar de agência, levas tudo contigo." },
      { q: "E depois do lançamento?", a: "Tens 30 dias de acompanhamento incluídos para ajustes e dúvidas. Depois, se quiseres que tratemos das atualizações, segurança e posição no Google todos os meses, há uma avença desde 90€/mês. Opcional." },
      { q: "Como vejo os resultados do site?", a: "Damos-te acesso a uma plataforma nossa, só tua. Lá vês as visitas, de onde vieram e todos os pedidos que entraram, sem precisares de perceber de Google Analytics. É também por lá que pedes alterações: escreves o que queres mudar e a equipa trata." },
      { q: "Como funciona o pagamento?", a: "Metade para arrancar, metade no lançamento, ou outra forma que te dê mais jeito. Falamos disso na primeira conversa, sem surpresas." },
    ],
    form: {
      title: "Vamos falar do teu site",
      intro: "20 minutos, sem custo. Ouvimos o que precisas, dizemos o que faz sentido fazer e quanto custa. Se não for connosco, dizemos isso também.",
      cta: "Quero a minha consultoria gratuita",
      negocioPlaceholder: "Ex.: oficina, restaurante, escritório de advogados…",
    },
  },
};

export const VERTICAL_SLUGS = Object.keys(VERTICALS);
export const ROOT_DOMAIN = "pardus-lab.com";

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS[slug];
}

/**
 * O URL público da landing page. Enquanto o subdomínio não tiver registo DNS,
 * a página vive no domínio principal, em pardus-lab.com/<slug> — é este o URL
 * que os anúncios usam e o que vai no canónico. Quando o DNS estiver de pé,
 * troca-se pelo subdomínio e repõe-se o redirecionamento
 * no middleware.
 */
export function verticalUrl(slug: string) {
  return `https://${ROOT_DOMAIN}/${slug}`;
}
