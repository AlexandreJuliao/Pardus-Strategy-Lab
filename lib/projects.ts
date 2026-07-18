// Anonymized case studies — niche/activity only, never client or company names.
// Single source for the grid (/projetos) and the individual project pages
// (/projetos/[slug]).

export interface ProjectData {
  slug: string;
  name: string;
  category: "IA & Automação" | "Websites" | "E-commerce" | "Apps";
  tagline: string;
  description: string;
  intro: string;
  problem: string;
  builtItems: string[];
  approach: { n: string; title: string; desc: string }[];
  tech: string[];
  outcomes: { stat: string; label: string }[];
  tags: string[];
  image: string;
  metric: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "website-arquitetura-autor",
    name: "Website imersivo para arquitetura de autor",
    category: "Websites",
    tagline: "Um site que se visita como se percorresse a casa.",
    description:
      "Site multilíngue e imersivo, com experiência 3D, para uma marca de arquitetura e construção de casas contemporâneas à medida. Pensado para encantar e transformar visitas em contactos.",
    intro:
      "Uma marca de arquitetura que desenha e constrói casas contemporâneas à medida precisava de um site à altura do que entrega: cada projeto é único, e o site tinha de mostrar isso em vez de se limitar a dizê-lo. Construímos uma experiência imersiva, com modelos em 3D que se exploram diretamente no browser, disponível em vários idiomas para receber clientes de fora de Portugal.",
    problem:
      "As fotografias e plantas tradicionais não faziam justiça ao trabalho — quem visitava o site via um portefólio bonito, mas não sentia o espaço. E como grande parte dos pedidos vinha de fora do país, um site só em português deixava clientes internacionais pelo caminho antes da primeira conversa.",
    builtItems: [
      "Modelos de casas navegáveis em 3D, direto no browser",
      "Site em três idiomas, com deteção automática",
      "Página dedicada a cada tipologia de casa",
      "Formulário de contacto ligado à central de leads da marca",
      "Otimização para o Google em todos os idiomas",
      "Performance cuidada apesar do peso dos modelos 3D",
    ],
    approach: [
      { n: "01", title: "Captação e modelação", desc: "Preparámos os modelos 3D de cada tipologia de casa para correrem bem em qualquer telemóvel ou computador." },
      { n: "02", title: "Experiência e narrativa", desc: "Desenhámos o percurso de navegação para contar a história de cada casa, do exterior ao interior." },
      { n: "03", title: "Lançamento multilíngue", desc: "Traduzimos, testámos em vários países e ligámos tudo à central de contactos da marca." },
    ],
    tech: ["Three.js / R3F", "Next.js", "Multilíngue", "GSAP"],
    outcomes: [
      { stat: "3D", label: "Casas navegáveis no browser" },
      { stat: "3 idiomas", label: "Prontos para clientes de fora" },
      { stat: "Uma só", label: "Central de contactos ligada" },
    ],
    tags: ["Website 3D", "Multilíngue", "Captação de contactos"],
    image: "/img/cases/case-arquitetura.jpg",
    metric: "Multilíngue · 3D",
  },
  {
    slug: "central-contactos-ia",
    name: "Central de contactos com assistente inteligente",
    category: "IA & Automação",
    tagline: "Todas as conversas, um só sítio — e uma resposta sempre pronta.",
    description:
      "Para a mesma marca de arquitetura: um sistema que junta o registo de clientes e as conversas de todas as plataformas — email, Instagram, Facebook e WhatsApp — num só lugar, com um assistente que responde e encaminha cada contacto para o sítio certo.",
    intro:
      "A mesma marca de arquitetura recebia pedidos de várias fontes ao mesmo tempo — email, Instagram, Facebook, WhatsApp — e cada plataforma vivia isolada das outras. Construímos uma central que junta tudo, com um assistente de inteligência artificial que lê cada mensagem, entende o que a pessoa precisa e responde ou encaminha, sem ninguém ter de estar sempre a saltar entre apps.",
    problem:
      "Nenhuma pessoa consegue vigiar quatro plataformas ao mesmo tempo sem deixar coisas escapar. Pedidos ficavam sem resposta durante horas, contactos repetiam-se em sítios diferentes, e a equipa perdia tempo a copiar informação de um lado para o outro em vez de falar com quem interessava.",
    builtItems: [
      "Caixa de entrada única para email, Instagram, Facebook e WhatsApp",
      "Assistente que lê e responde a perguntas comuns sozinho",
      "Encaminhamento automático para a pessoa certa quando é preciso",
      "Registo de cada contacto ligado ao histórico do cliente",
      "Alertas em tempo real para pedidos urgentes",
      "Relatórios semanais do volume e tipo de contactos",
    ],
    approach: [
      { n: "01", title: "Ligação das plataformas", desc: "Ligámos email, Instagram, Facebook e WhatsApp à mesma central, sem perder o histórico de cada um." },
      { n: "02", title: "Treino do assistente", desc: "Ensinámos o assistente com as perguntas reais dos clientes da marca e as respostas certas para cada uma." },
      { n: "03", title: "Afinação contínua", desc: "Acompanhámos as primeiras semanas de conversas reais e fomos afinando tom e respostas." },
    ],
    tech: ["OpenAI", "Claude", "Automação", "Multicanal"],
    outcomes: [
      { stat: "4 canais", label: "Reunidos numa só caixa" },
      { stat: "Segundos", label: "Até à primeira resposta" },
      { stat: "Zero", label: "Contactos perdidos entre apps" },
    ],
    tags: ["Tudo num só lugar", "Assistente IA", "Multicanal"],
    image: "/img/cases/case-leads-inbox.jpg",
    metric: "Conversas num só lugar",
  },
  {
    slug: "loja-bem-estar-emagrecimento",
    name: "Loja online de bem-estar e emagrecimento",
    category: "E-commerce",
    tagline: "Uma loja pensada para vender enquanto a equipa dorme.",
    description:
      "Loja completa para uma marca de suplementos e emagrecimento, com o sistema interno de gestão de produtos, encomendas e operação do negócio — tudo ligado.",
    intro:
      "Uma marca de suplementos alimentares e emagrecimento precisava de sair de uma solução de loja pronta que já lhe estava a ficar pequena — comissões por venda, pouca liberdade de design e limites na gestão de stock. Construímos uma loja só dela, com um sistema interno por trás que junta produtos, encomendas e operação num único sítio.",
    problem:
      "Cada venda tinha uma comissão a sair do lado da marca, e à medida que o negócio crescia, essa fatia começava a pesar a sério. Ao mesmo tempo, gerir stock e encomendas em ferramentas separadas criava erros — produtos vendidos sem stock, encomendas esquecidas, relatórios que tinham de ser montados à mão.",
    builtItems: [
      "Loja completa com gestão de produtos e variantes",
      "Pagamentos por cartão e MB Way",
      "Painel de administração à medida do negócio",
      "Ligação direta ao stock, sem folhas soltas",
      "Emails automáticos em cada etapa da encomenda",
      "Relatórios de vendas prontos a usar",
    ],
    approach: [
      { n: "01", title: "Produtos e percurso", desc: "Organizámos o catálogo, as variantes e desenhámos um caminho de compra sem fricção." },
      { n: "02", title: "Sistema interno", desc: "Construímos o painel de gestão que junta stock, encomendas e faturação num só sítio." },
      { n: "03", title: "Migração e lançamento", desc: "Passámos produtos e histórico da loja anterior sem perder posições no Google." },
    ],
    tech: ["Stripe", "MB Way", "Gestão de stock", "Relatórios"],
    outcomes: [
      { stat: "0%", label: "Comissões a terceiros" },
      { stat: "Tudo", label: "Loja e stock no mesmo sítio" },
      { stat: "Automático", label: "Email em cada encomenda" },
    ],
    tags: ["Loja online", "Gestão de produto", "Sistema interno"],
    image: "/img/cases/case-ecommerce.jpg",
    metric: "Loja + gestão",
  },
  {
    slug: "plataforma-gestao-agencia",
    name: "Plataforma de gestão para uma agência",
    category: "Apps",
    tagline: "A operação toda de uma agência, dentro de uma app só.",
    description:
      "Plataforma completa de gestão para uma agência criativa: tarefas, equipa, finanças, contabilidade, projetos e uma agenda com gestão de horas por pessoa — tudo reunido numa só app.",
    intro:
      "Uma agência criativa geria tarefas, equipa, finanças e projetos em várias ferramentas diferentes, sem nenhuma a falar com as outras. Construímos uma plataforma à medida que junta tudo isso — projetos, pessoas, agenda e números — numa app só, pensada para o dia a dia real de uma equipa criativa.",
    problem:
      "Informação espalhada por várias ferramentas significa tempo perdido a juntar tudo à mão, e decisões tomadas sem a imagem completa. A equipa sabia o que estava a acontecer em cada ferramenta isolada, mas ninguém tinha uma visão do negócio inteiro num único sítio.",
    builtItems: [
      "Gestão de projetos e tarefas por equipa",
      "Agenda com gestão de horas por pessoa",
      "Módulo financeiro e de contabilidade interna",
      "Painéis com os números do negócio em tempo real",
      "Acessos e permissões por função",
      "Tudo acessível em telemóvel e computador",
    ],
    approach: [
      { n: "01", title: "Mapeamento da operação", desc: "Percebemos como a equipa trabalhava de facto, ferramenta a ferramenta, antes de desenhar nada." },
      { n: "02", title: "Construção modular", desc: "Entregámos primeiro o essencial — projetos e agenda — e fomos somando finanças e relatórios." },
      { n: "03", title: "Adoção pela equipa", desc: "Acompanhámos as primeiras semanas de uso real e ajustámos o que não encaixava no dia a dia." },
    ],
    tech: ["Gestão à medida", "Tempo real", "Acessos seguros"],
    outcomes: [
      { stat: "1 app", label: "Para toda a operação" },
      { stat: "Tempo real", label: "Números sempre à vista" },
      { stat: "Por pessoa", label: "Gestão de horas e tarefas" },
    ],
    tags: ["App de gestão", "Equipa & finanças", "Agenda própria"],
    image: "/img/cases/case-pardus-os.jpg",
    metric: "Toda a operação numa app",
  },
  {
    slug: "assistente-consultas-nutricao",
    name: "Assistente que marca consultas sozinho",
    category: "IA & Automação",
    tagline: "Perguntas respondidas e consultas marcadas, sem ninguém a meio.",
    description:
      "Para uma profissional de nutrição: um assistente que conversa com quem chega, tira dúvidas e marca as consultas automaticamente, sem ninguém ter de estar sempre a responder.",
    intro:
      "Uma profissional de nutrição respondia sozinha a todas as mensagens de quem queria marcar consulta — muitas delas fora de horas, muitas com as mesmas perguntas. Construímos um assistente que conversa com quem chega, esclarece o essencial e marca a consulta diretamente na agenda, sem esperar por ninguém.",
    problem:
      "Cada pergunta repetida — preços, disponibilidade, o que levar à primeira consulta — tirava tempo a uma agenda já cheia. E fora de horas, as mensagens ficavam simplesmente à espera até ao dia seguinte, com o risco real de a pessoa desistir e procurar outra solução entretanto.",
    builtItems: [
      "Assistente disponível a qualquer hora, no WhatsApp",
      "Respostas às perguntas mais comuns, com o tom da profissional",
      "Marcação de consultas diretamente na agenda",
      "Confirmações e lembretes automáticos",
      "Passagem para a profissional sempre que o caso pede",
      "Histórico de conversas ligado a cada cliente",
    ],
    approach: [
      { n: "01", title: "Perguntas frequentes", desc: "Reunimos as perguntas reais que a profissional recebia e as respostas que já dava de cor." },
      { n: "02", title: "Ligação à agenda", desc: "Ligámos o assistente diretamente ao calendário, para marcar sem intervenção manual." },
      { n: "03", title: "Acompanhamento", desc: "Seguimos as primeiras semanas de conversas reais para afinar tom e casos-limite." },
    ],
    tech: ["WhatsApp", "Claude", "OpenAI", "Agenda automática"],
    outcomes: [
      { stat: "24/7", label: "Sempre a responder" },
      { stat: "Automático", label: "Da pergunta à consulta marcada" },
      { stat: "Menos", label: "Mensagens repetidas para responder" },
    ],
    tags: ["Chatbot", "Agendamento automático", "Saúde"],
    image: "/img/cases/case-nutri.jpg",
    metric: "Marcações automáticas",
  },
];

export function getProject(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const PROJECT_SLUGS = PROJECTS.map((p) => p.slug);
export const PROJECT_FILTERS = [
  "Todos",
  "IA & Automação",
  "Websites",
  "E-commerce",
  "Apps",
] as const;
