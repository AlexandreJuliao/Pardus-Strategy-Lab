// Verticais "PARDUS. <Nicho>" — uma landing page por nicho, servida no seu
// subdomínio (websites.pardus-lab.com, …). Fonte única: middleware (hosts),
// páginas /lp/[vertical], metadata e o formulário (origem da lead) leem daqui.
//
// Regras de copy: PT-PT na 2.ª pessoa, uma palavra `accent-serif` por headline,
// "desde" só nas verticais de produto (nunca nas de indústria), sem "3x sem juros".

export type MockKind = "search" | "chat" | "score" | "chart" | "pipeline" | "agenda" | "invoice" | "access";

export type Vertical = {
  slug: string;
  /** produto = preço "desde" visível; industria = sistemas à medida, sem preço */
  kind: "produto" | "industria";
  /** que esqueleto de secções a página monta */
  template: "websites" | "softwares";
  /** Descriptor do lockup: PARDUS. + WEBSITES */
  name: string;
  /** versão curta do descriptor, para o cabeçalho em ecrã pequeno */
  nameShort?: string;
  /** Linha explicativa (obrigatória nas indústrias) */
  descriptor?: string;
  /** Vai no evento Lead (content_name), na coluna "origem" (n8n) e no source (Office) */
  origem: string;
  /** lockup oficial da vertical; sem ele usa-se o tipográfico */
  logo?: string;
  seo: { title: string; description: string };
  hero: {
    /** o título, em três linhas */
    lines: { t: string; accent?: boolean }[];
    /** a assinatura, por baixo do ecrã */
    tagline: string;
    /** a pergunta, em rodapé do herói; `figure` acende a dourado */
    question: { pre: string; figure: string; post: string };
    /** a fotografia do aparelho (ver lib/lp-monitor.ts) */
    device: "monitor" | "laptop";
    /** o que corre dentro do ecrã */
    screen: { kind: "video"; webm: string; mp4: string; poster: string; alt: string } | { kind: "platform" };
  };
  stats: { value: string; label: string }[];
  statement: { pre: string; accent: string; post?: string; sub: string };
  bento: { title: string; desc: string; mock: MockKind; wide?: boolean }[];
  /** o site como canal de aquisição: subir no Google e converter a visita */
  organic?: {
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
  flow?: {
    title: string;
    intro: string;
    cta: string;
    formTitle: string;
    formIntro: string;
    submit: string;
    fields: { label: string; placeholder: string; value: string; wide?: boolean }[];
    notify: { title: string; also: string };
  };
  features?: { icon: "text" | "globe" | "shield" | "zap" | "chart" | "phone"; title: string; desc: string }[];
  /** mercados para os quais já há plataforma (LP Softwares) */
  markets?: {
    pre: string;
    accent: string;
    intro: string;
    items: { name: string; status: "producao" | "pronta"; desc: string; modules: string[] }[];
  };
  /** o que o sistema faz sozinho, com um feed ao vivo (LP Softwares) */
  automations?: {
    pre: string;
    accent: string;
    intro: string;
    points: string[];
    cta: string;
    feed: { time: string; text: string; tone?: "gold" | "green" }[];
  };
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
    template: "websites",
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
      tagline: "Desenhamos, escrevemos e lançamos.",
      question: { pre: "Já pensaste ter", figure: "2 a 10", post: "contactos novos todos os meses, sem teres de fazer nada?" },
      device: "monitor",
      screen: {
        kind: "video",
        webm: "/img/lp/aldurr/site.webm",
        mp4: "/img/lp/aldurr/site.mp4",
        poster: "/img/lp/aldurr/site-poster.jpg",
        alt: "O site da Al Durr a ser percorrido, com as animações a correr",
      },
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
      query: "remodelação de cozinha lisboa",
      result: "Oficina do Azulejo · Remodelações em Lisboa",
      resultUrl: "oficinadoazulejo.pt",
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
  softwares: {
    slug: "softwares",
    kind: "industria",
    template: "softwares",
    name: "Softwares de Gestão",
    nameShort: "Softwares",
    descriptor: "Sistemas de gestão à medida",
    origem: "LP Softwares",
    seo: {
      title: "PARDUS. Softwares de Gestão · Um sistema feito à volta da tua empresa",
      description:
        "Plataformas de gestão à medida para empresas em Portugal: pedidos, agenda, obras, faturação e equipas num só sistema, no ar em 4 semanas. Código e dados teus. Consultoria gratuita.",
    },
    hero: {
      lines: [
        { t: "Um sistema de gestão" },
        { t: "feito à volta da tua empresa," },
        { t: "não o contrário.", accent: true },
      ],
      tagline: "Mapeamos, construímos, lançamos.",
      question: { pre: "Já pensaste recuperar", figure: "10 horas", post: "por semana em trabalho que o sistema faz sozinho?" },
      device: "laptop",
      screen: { kind: "platform" },
    },
    stats: [
      { value: "4 sem.", label: "Do mapeamento ao primeiro módulo no ar" },
      { value: "1 painel", label: "A operação toda, sem folhas de cálculo espalhadas" },
      { value: "100%", label: "Código e dados teus, em teu nome" },
      { value: "24h", label: "Resposta a qualquer pedido" },
    ],
    statement: {
      pre: "Software feito para toda a gente não é feito para",
      accent: "ti.",
      sub: "Um sistema à medida começa por perceber como a tua empresa trabalha mesmo — e só depois se desenha.",
    },
    bento: [
      {
        title: "Clientes e pedidos num só fio",
        desc: "Cada contacto entra, ganha dono e avança por etapas até fechar. Vês num relance o que está parado e porquê.",
        mock: "pipeline",
        wide: true,
      },
      {
        title: "Agenda ligada ao trabalho",
        desc: "Visitas, obras, consultas ou reuniões marcadas a partir do próprio pedido, com lembretes a sair sozinhos.",
        mock: "agenda",
      },
      {
        title: "Faturação sem sair do sistema",
        desc: "Orçamento aprovado vira fatura em dois cliques, com o estado de pagamento sempre à vista.",
        mock: "invoice",
      },
      {
        title: "Cada pessoa vê o que lhe compete",
        desc: "Perfis e acessos por função: a equipa de rua vê as suas ordens no telemóvel, a gestão vê os números, o contabilista vê o que precisa. Nada mais, nada menos.",
        mock: "access",
        wide: true,
      },
    ],
    markets: {
      pre: "Já desenhámos para",
      accent: "estes mercados.",
      intro: "Plataformas que já estão em produção ou prontas a adaptar. O teu setor não está aqui? Começa-se pelo mapeamento na mesma.",
      items: [
        { name: "Agências e estúdios", status: "producao", desc: "Clientes, projetos, horas e entregas num só painel.", modules: ["Projetos e tarefas", "Horas por pessoa", "Portal do cliente", "Relatórios mensais"] },
        { name: "Construção e remodelações", status: "producao", desc: "Da visita ao orçamento, da obra à fatura.", modules: ["Pedidos e visitas", "Orçamentos por fases", "Obras e equipas", "Autos e faturação"] },
        { name: "Imobiliário", status: "producao", desc: "Nenhum lead fica sem resposta.", modules: ["Leads e follow-up", "Imóveis e visitas", "Assistente WhatsApp", "Propostas"] },
        { name: "Clínicas e consultórios", status: "pronta", desc: "Consultas, fichas e faturação a falar entre si.", modules: ["Agenda por profissional", "Ficha do paciente", "Lembretes por SMS e WhatsApp", "Faturação"] },
        { name: "Mediadores de seguros", status: "pronta", desc: "Nenhuma renovação esquecida.", modules: ["Apólices e vencimentos", "Alertas de renovação", "Documentos", "Propostas"] },
        { name: "Serviços técnicos", status: "pronta", desc: "Ordens de trabalho da chamada à assinatura.", modules: ["Ordens de trabalho", "Rotas e técnicos", "Stock e peças", "Relatório assinado no local"] },
      ],
    },
    automations: {
      pre: "O que o sistema faz",
      accent: "sozinho.",
      intro: "Cada passo repetitivo da tua operação vira uma regra. Tu tratas das exceções; o resto anda.",
      points: [
        "Um pedido novo cria a tarefa, avisa quem trata e marca o prazo.",
        "Orçamento aceite vira obra, agenda e fatura, sem copiar nada.",
        "O relatório da semana chega-te na segunda de manhã, feito.",
      ],
      cta: "Quero ver isto na minha empresa",
      feed: [
        { time: "09:02", text: "Novo pedido de Sofia Carreira · atribuído a Rita", tone: "gold" },
        { time: "09:04", text: "Orçamento #1187 enviado e aberto pelo cliente" },
        { time: "09:31", text: "Orçamento #1187 aceite · obra criada · visita marcada", tone: "green" },
        { time: "10:15", text: "Lembrete de visita enviado por WhatsApp a Nuno Baltazar" },
        { time: "11:40", text: "Fatura #2041 emitida · a aguardar pagamento" },
        { time: "12:05", text: "Pagamento recebido · fatura #2041 fechada", tone: "green" },
        { time: "12:30", text: "Relatório da semana gerado e enviado à gestão" },
      ],
    },
    process: [
      { when: "Semana 1", title: "Mapeamento", desc: "Sentamo-nos com quem faz o trabalho e desenhamos o fluxo real: onde entram os pedidos, quem decide, o que se repete. Sais com o plano por módulos e o preço de cada um." },
      { when: "Semanas 2 a 4", title: "Primeiro módulo no ar", desc: "Construímos primeiro o que dói mais, quase sempre pedidos e agenda, e a equipa começa a usar a sério, com dados reais." },
      { when: "A partir daí", title: "Módulo a módulo", desc: "Faturação, equipas, relatórios, portal do cliente: cada módulo entra quando o anterior já está a pagar-se. Acompanhamos as primeiras semanas de uso e afinamos o que não encaixa." },
    ],
    pricing: {
      intro: "Não há tabela: o mapeamento fecha o preço de cada módulo antes de se escrever uma linha. Para saberes por onde anda, parte daqui.",
      plans: [
        {
          name: "Primeiro módulo",
          desc: "O módulo que resolve o que mais te custa hoje, no ar em 4 semanas.",
          price: "4.000€",
          items: ["Mapeamento incluído", "Acessos por função", "Versão para telemóvel", "Formação da equipa", "30 dias de acompanhamento"],
        },
        {
          name: "Plataforma completa",
          desc: "A operação inteira, módulo a módulo, ao ritmo da tua equipa.",
          price: "à medida",
          featured: true,
          items: ["Todos os módulos do mapeamento", "Faturação e relatórios", "Portal do cliente", "Ligações a email, WhatsApp e faturação certificada", "Código e dados em teu nome"],
        },
      ],
      note: "Depois do lançamento, a avença de evolução (desde 300€/mês) mantém o sistema a crescer contigo: novos campos, relatórios e automações. Adaptamo-nos a várias formas de pagamento.",
    },
    extras: {
      pre: "Quando o sistema estiver a trabalhar,",
      accent: "há mais.",
      intro: "Também fazemos sites, lojas online e assistentes com inteligência artificial em cima dos teus dados. Nada disto é preciso para arrancar, mas quando fizer falta já sabes a quem pedir.",
      items: [
        { icon: "bot", title: "Assistente sobre os teus dados", desc: "Perguntas em linguagem normal e a resposta sai do sistema." },
        { icon: "inbox", title: "Portal do cliente", desc: "O teu cliente acompanha o estado do pedido sem te ligar." },
        { icon: "workflow", title: "App para a equipa de rua", desc: "Ordens, fotos e assinaturas no telemóvel, mesmo sem rede." },
        { icon: "shop", title: "Site ligado ao sistema", desc: "Os pedidos do site entram direto na plataforma." },
        { icon: "care", title: "Avença de evolução", desc: "Novos campos, relatórios e automações, todos os meses." },
      ],
    },
    faq: [
      { q: "Já uso um programa de faturação e folhas de cálculo. Tenho de deitar tudo fora?", a: "Não. O sistema liga-se ao que já usas quando faz sentido (a faturação certificada continua onde está, por exemplo) e substitui só o que hoje vive em folhas de cálculo e mensagens soltas. O mapeamento decide isso contigo." },
      { q: "Quanto tempo até a equipa estar a usar?", a: "O primeiro módulo fica no ar em cerca de 4 semanas a contar do mapeamento, já com dados reais. Os seguintes entram ao ritmo que a equipa aguenta: não vale a pena lançar tudo de uma vez." },
      { q: "O código e os dados são meus?", a: "Sim. Código entregue, base de dados em conta tua, acessos em teu nome. Se um dia quiseres mudar de fornecedor, levas tudo contigo." },
      { q: "Funciona no telemóvel?", a: "De raiz. A equipa que anda na rua usa a mesma plataforma no telemóvel: ordens, fotos, assinaturas. Quem está no escritório vê tudo a chegar." },
      { q: "E se a minha empresa mudar?", a: "Muda o sistema. É esse o ponto de ser à medida: novos campos, novas etapas, novos relatórios entram pela avença de evolução, sem recomeçar do zero." },
      { q: "Como funciona o pagamento?", a: "Cada módulo tem preço fechado no mapeamento. Pagas uma parte ao arrancar e o resto quando o módulo está a ser usado. Adaptamo-nos a várias formas de pagamento." },
    ],
    form: {
      title: "Vamos mapear a tua operação",
      intro: "45 minutos, sem custo. Ouvimos como a empresa trabalha hoje, dizemos o que faz sentido construir primeiro e quanto custa. Se não for connosco, dizemos isso também.",
      cta: "Quero a minha consultoria gratuita",
      negocioPlaceholder: "Ex.: clínica, construtora, agência, mediador de seguros…",
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
