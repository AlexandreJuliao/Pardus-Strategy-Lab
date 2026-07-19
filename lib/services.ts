import {
  Brain, Monitor, ShoppingBag, MessageCircle, LayoutGrid, Lightbulb,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  ia: Brain,
  web: Monitor,
  ecom: ShoppingBag,
  chat: MessageCircle,
  apps: LayoutGrid,
  consult: Lightbulb,
};

export interface ServiceData {
  slug: string;
  iconKey: keyof typeof ICONS;
  n: string;
  title: string;
  tagline: string;
  short: string;
  intro: string;
  problem: string;
  deliverables: string[];
  approach: { n: string; title: string; desc: string }[];
  tech: string[];
  outcomes: { stat: string; label: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "sistemas-de-ia",
    iconKey: "ia",
    n: "01",
    title: "Sistemas de IA",
    tagline: "Inteligência que trabalha enquanto dormes.",
    short: "Assistentes inteligentes que tratam do trabalho repetitivo por ti: respondem, organizam e decidem em segundos, a qualquer hora.",
    intro: "Criamos inteligência artificial que trabalha sozinha nos bastidores do teu negócio: responde a pedidos, organiza informação e trata das tarefas chatas que roubam horas à tua equipa. Tu ficas com o tempo para o que só tu podes fazer.",
    problem: "A tua equipa passa horas em tarefas manuais e repetitivas: copiar dados, responder às mesmas perguntas, andar de uma ferramenta para outra. Cada hora nisso é uma hora longe do que importa. Quase toda a gente sabe que a inteligência artificial pode ajudar, mas não sabe por onde começar nem em quem confiar.",
    deliverables: [
      "Assistentes inteligentes que agem sozinhos",
      "Automação de tarefas do início ao fim",
      "Organização e ligação da tua informação",
      "IA que responde com base nos teus documentos",
      "Um painel simples para veres tudo a funcionar",
      "Ligação às ferramentas que já usas",
    ],
    approach: [
      { n: "01", title: "Onde faz sentido", desc: "Descobrimos juntos as tarefas com mais potencial para automatizar e o retorno que trazem." },
      { n: "02", title: "Primeiro teste", desc: "Montamos uma primeira versão a funcionar em dias, não meses, para veres o impacto real." },
      { n: "03", title: "A trabalhar a sério", desc: "Pomos tudo em pleno funcionamento, com segurança e uma pessoa sempre pronta a intervir quando é preciso." },
    ],
    tech: ["OpenAI", "Claude", "Automação", "Python", "Supabase"],
    outcomes: [
      { stat: "24/7", label: "Sempre a trabalhar por ti" },
      { stat: "Segundos", label: "Do pedido à resposta" },
      { stat: "Menos", label: "Trabalho manual e repetitivo" },
    ],
    faq: [
      { q: "Os meus dados ficam seguros?", a: "Sim. A privacidade está na base de tudo o que fazemos. Os teus dados ficam isolados, nunca são usados para treinar nada, e podemos instalar tudo só para ti quando fizer sentido." },
      { q: "E se a inteligência artificial se enganar?", a: "Nos pontos importantes há sempre uma validação e uma pessoa a decidir. A IA acelera o trabalho, mas não fica sozinha onde o risco é maior." },
    ],
  },
  {
    slug: "websites",
    iconKey: "web",
    n: "02",
    title: "Websites",
    tagline: "Rápidos. Bonitos. Feitos para converter.",
    short: "Sites rápidos, bonitos e pensados para transformar visitantes em clientes. Da página simples ao site completo.",
    intro: "Cada site que fazemos tem uma missão: aparecer no Google, abrir num instante e transformar quem visita em cliente. Com um design que parece feito à medida da tua marca, porque é mesmo.",
    problem: "Quando um site é lento ou não te representa, perdes clientes todos os dias. As pessoas desistem antes de abrir e a tua marca não se destaca. Um bom site trabalha por ti: rápido, fácil de encontrar no Google e com a tua cara.",
    deliverables: [
      "Design 100% à medida da tua marca",
      "Site rápido e moderno",
      "Preparado para o Google desde o início",
      "Editas textos e imagens sozinho, sem depender de ninguém",
      "Abre depressa em qualquer telemóvel",
      "Sabes quantos visitantes se tornaram clientes",
    ],
    approach: [
      { n: "01", title: "Estratégia", desc: "Definimos objetivos, público e a história que o site tem de contar." },
      { n: "02", title: "Design", desc: "Vês a tua marca ganhar forma em maquetas reais, antes de escrevermos uma linha de código." },
      { n: "03", title: "Construção e lançamento", desc: "Construímos, afinamos e colocamos no ar, e ensinamos-te a gerir o conteúdo." },
    ],
    tech: ["Design à medida", "Preparado p/ Google", "Multi-dispositivo", "Rápido"],
    outcomes: [
      { stat: "Rápido", label: "Abre num instante" },
      { stat: "Google", label: "Pronto para ser encontrado" },
      { stat: "Teu", label: "Editas sem depender de ninguém" },
    ],
    faq: [
      { q: "Posso editar o site sozinho?", a: "Sim. Deixamos-te uma forma simples de editar textos, imagens e páginas, e ensinamos-te a fazê-lo, sem tocares em código." },
      { q: "Tratam do alojamento e domínio?", a: "Tratamos de tudo: domínio, alojamento e segurança. Entregamos-te um site pronto e no ar, não um ficheiro para te desenrascares." },
    ],
  },
  {
    slug: "e-commerce",
    iconKey: "ecom",
    n: "03",
    title: "E-commerce",
    tagline: "Lojas construídas para vender.",
    short: "Lojas online feitas para vender, com pagamentos, gestão de stock e relatórios, tudo no mesmo sítio.",
    intro: "Juntamos pagamentos, gestão de stock e relatórios numa loja só tua, com uma experiência de compra tão simples que os clientes voltam e gastam mais de cada vez. Uma loja que vende enquanto descansas.",
    problem: "À medida que uma loja cresce, as comissões e os limites das soluções prontas começam a pesar. Faz sentido ter uma loja que seja mesmo tua: sem taxas por venda, com o design que queres e livre para crescer ao teu ritmo.",
    deliverables: [
      "Loja completa com gestão de produtos",
      "Pagamentos por cartão e MB Way",
      "Painel de administração à medida",
      "Ligação ao teu sistema de stock",
      "Emails automáticos de encomenda",
      "Finalização de compra rápida e sem fricção",
    ],
    approach: [
      { n: "01", title: "Produtos e percurso", desc: "Organizamos produtos, variantes, stock e o caminho de compra ideal." },
      { n: "02", title: "Ligações", desc: "Ligamos pagamentos, envios, faturação e o teu stock num só sistema." },
      { n: "03", title: "A vender mais", desc: "Medimos e afinamos a loja para venderes mais a cada visita." },
    ],
    tech: ["Stripe", "MB Way", "Gestão de stock", "Relatórios"],
    outcomes: [
      { stat: "0%", label: "Comissões a terceiros" },
      { stat: "24/7", label: "Vende enquanto descansas" },
      { stat: "Tua", label: "A loja e os dados são teus" },
    ],
    faq: [
      { q: "Migram a minha loja atual?", a: "Sim. Passamos produtos, clientes e histórico da tua loja atual, sem perderes o teu lugar no Google nem os teus dados." },
      { q: "Funciona com MB Way?", a: "Sim. Aceitamos MB Way, cartão e outros métodos populares em Portugal." },
    ],
  },
  {
    slug: "chatbots-automacoes",
    iconKey: "chat",
    n: "04",
    title: "Chatbots & Automações",
    tagline: "Atendimento que nunca dorme.",
    short: "Assistentes que respondem aos teus clientes na hora, no WhatsApp e no site, a qualquer hora do dia ou da noite.",
    intro: "Um assistente que nunca dorme: responde a perguntas, percebe quem é cliente a sério e regista tudo por ti, para nenhum contacto ficar sem resposta e nenhuma venda escapar.",
    problem: "Os contactos chegam fora de horas e arrefecem. Os clientes esperam horas por respostas simples. A tua equipa repete as mesmas respostas dezenas de vezes por dia. Cada minuto de espera pode ser um cliente perdido.",
    deliverables: [
      "Assistente no WhatsApp e no site",
      "Percebe sozinho quem está pronto para comprar",
      "Regista tudo na tua base de clientes",
      "Trata sozinho dos pedidos mais comuns",
      "Passa para uma pessoa sempre que for preciso",
      "Relatórios do que os clientes mais perguntam",
    ],
    approach: [
      { n: "01", title: "Perguntas e respostas", desc: "Mapeamos as perguntas reais dos teus clientes e as respostas certas." },
      { n: "02", title: "Construção", desc: "Ensinamos o assistente com o teu conhecimento e ligamo-lo às tuas ferramentas." },
      { n: "03", title: "A melhorar sempre", desc: "Acompanhamos as conversas e afinamos as respostas ao longo do tempo." },
    ],
    tech: ["WhatsApp", "Claude", "OpenAI", "Automação"],
    outcomes: [
      { stat: "Segundos", label: "Tempo de resposta" },
      { stat: "24/7", label: "Sempre disponível" },
      { stat: "Zero", label: "Contactos sem resposta" },
    ],
    faq: [
      { q: "O assistente parece um robô?", a: "Não. Usamos a inteligência artificial mais avançada, com o tom da tua marca. Os clientes têm conversas naturais, não menus rígidos." },
      { q: "Liga ao meu WhatsApp?", a: "Sim. Ligamos ao WhatsApp Business oficial e à tua base de clientes." },
    ],
  },
  {
    slug: "apps-empresariais",
    iconKey: "apps",
    n: "05",
    title: "Apps Empresariais",
    tagline: "Software à medida da tua operação.",
    short: "Programas à medida do teu negócio: para gerires clientes, equipa e operação num só sítio, em vez de dez folhas de Excel.",
    intro: "Criamos o programa que a tua empresa precisa e ainda não existe: gestão de clientes, tarefas e números, tudo organizado e em tempo real, feito à volta da forma como já trabalhas.",
    problem: "A tua operação vive em dez folhas de Excel, três ferramentas que não falam entre si e conhecimento que só está na cabeça de uma pessoa. Cresce assim e o caos cresce contigo. Precisas de um sistema, não de remendos.",
    deliverables: [
      "Gestão de clientes e operação à medida",
      "Painéis com os teus números em tempo real",
      "Portais para clientes e para a equipa",
      "Ligação às ferramentas que já usas",
      "Acessos e permissões para cada pessoa",
      "Automação das tarefas internas",
    ],
    approach: [
      { n: "01", title: "Descoberta", desc: "Percebemos os teus processos, as dores e o que a tua equipa precisa mesmo." },
      { n: "02", title: "Primeira versão", desc: "Entregamos uma primeira versão a funcionar cedo, para começares a usar já no dia a dia." },
      { n: "03", title: "Evolução", desc: "Vamos acrescentando funcionalidades passo a passo, à medida que cresces." },
    ],
    tech: ["Gestão à medida", "Tempo real", "Acessos seguros"],
    outcomes: [
      { stat: "Tudo", label: "Num só sistema" },
      { stat: "Tempo real", label: "Visibilidade da operação" },
      { stat: "Menos", label: "Trabalho manual" },
    ],
    faq: [
      { q: "Liga ao que já uso?", a: "Sim. Ligamos às ferramentas que já usas: faturação, email, calendários, para nada ficar isolado." },
      { q: "Cresce com o meu negócio?", a: "Sim. Construímos de forma segura e organizada, pensada para crescer contigo em pessoas e funcionalidades." },
    ],
  },
  {
    slug: "consultoria-em-ia",
    iconKey: "consult",
    n: "06",
    title: "Consultoria em IA",
    tagline: "Estratégia antes de tecnologia.",
    short: "Ajudamos-te a perceber onde a tecnologia e a inteligência artificial fazem a diferença no teu negócio, e por onde começar.",
    intro: "Para quem quer crescer com tecnologia mas não sabe por onde começar. Analisamos como trabalhas, desenhamos um plano claro e acompanhamos-te até ao resultado, com ou sem a nossa equipa a construir.",
    problem: "Toda a gente fala de inteligência artificial, mas a maioria dos projetos morre na apresentação. Investe-se nas ferramentas erradas, sem plano, e o retorno nunca aparece. O risco não é a tecnologia. É começar pelo sítio errado.",
    deliverables: [
      "Análise de como trabalhas hoje",
      "Plano de implementação por prioridades",
      "Escolha das ferramentas e parceiros certos",
      "Análise do retorno e do risco",
      "Acompanhamento ao longo da execução",
      "Formação da equipa",
    ],
    approach: [
      { n: "01", title: "Diagnóstico", desc: "Avaliamos como trabalhas, que informação tens e onde estás em termos de tecnologia." },
      { n: "02", title: "Plano", desc: "Ordenamos as ideias por impacto e esforço, com o retorno esperado de cada uma." },
      { n: "03", title: "Execução", desc: "Acompanhamos a implementação e formamos a equipa para ganhar autonomia." },
    ],
    tech: ["Estratégia", "Análise", "Plano", "Formação"],
    outcomes: [
      { stat: "Clareza", label: "Sobre onde investir" },
      { stat: "Retorno", label: "Estimado por ideia" },
      { stat: "0", label: "Dinheiro desperdiçado" },
    ],
    faq: [
      { q: "Têm de ser vocês a construir?", a: "Não. Entregamos o plano e podes executá-lo com a tua equipa. Se quiseres, construímos nós. A decisão é tua." },
      { q: "Serve para a minha área?", a: "O nosso método adapta-se a qualquer setor. Ajustamos a análise ao teu negócio e ao teu contexto." },
    ],
  },
];

export function getService(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
