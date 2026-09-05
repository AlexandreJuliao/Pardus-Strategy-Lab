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
  seo: { title: string; description: string };
  hero: {
    pill: string;
    pre: string;
    accent: string;
    post?: string;
    sub: string;
    cta: string;
    ctaSecondary?: { label: string; targetId: string };
    trust: string[];
  };
  stats: { value: string; label: string }[];
  statement: { pre: string; accent: string; post?: string; sub: string };
  bento: { title: string; desc: string; mock: MockKind; wide?: boolean }[];
  demo: {
    title: string;
    intro: string;
    business: string;
    script: { who: "them" | "us"; text: string; at: string }[];
    done: string;
  };
  features: { icon: "text" | "globe" | "shield" | "zap" | "chart" | "phone"; title: string; desc: string }[];
  process: { title: string; desc: string }[];
  pricing?: {
    intro: string;
    plans: { name: string; desc: string; price: string; items: string[]; featured?: boolean }[];
    note: string;
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
    seo: {
      title: "PARDUS. Websites · O teu site pronto em 2 semanas",
      description:
        "Sites profissionais para negócios em Portugal: design à medida, rápidos no telemóvel, ligados ao WhatsApp e a aparecer no Google. Desde 399€. Consultoria gratuita.",
    },
    hero: {
      pill: "Sites profissionais · entrega em 2 semanas",
      pre: "Um site novo em 2 semanas, feito para",
      accent: "captar.",
      sub: "Design à tua medida, rápido em qualquer telemóvel, ligado ao WhatsApp e a aparecer no Google. Tratamos de tudo: textos, imagens, domínio e alojamento.",
      cta: "Quero o meu site",
      ctaSecondary: { label: "Ver preços", targetId: "investimento" },
      trust: ["Consultoria gratuita", "Resposta em 24h", "Domínio e código teus"],
    },
    stats: [
      { value: "2 sem.", label: "Do primeiro contacto ao site no ar" },
      { value: "98/100", label: "Velocidade no teste do Google" },
      { value: "100%", label: "Domínio, código e acessos teus" },
      { value: "24h", label: "Resposta a qualquer pedido" },
    ],
    statement: {
      pre: "Um site bonito que não traz clientes é só",
      accent: "decoração.",
      sub: "Cada página que fazemos tem um objetivo: o teu telefone tocar.",
    },
    bento: [
      {
        title: "Apareces no Google",
        desc: "Estrutura, velocidade e textos pensados para o Google te encontrar quando alguém procura o que fazes na tua zona.",
        mock: "search",
        wide: true,
      },
      {
        title: "Contactos direto no WhatsApp",
        desc: "Botão sempre à mão. Quem chega ao site fala contigo em dois toques, sem formulários compridos.",
        mock: "chat",
      },
      {
        title: "Rápido em qualquer telemóvel",
        desc: "Mais de 70% das visitas vêm do telemóvel. O teu site abre em menos de 2 segundos, em qualquer rede.",
        mock: "score",
      },
      {
        title: "Sabes o que está a acontecer",
        desc: "Visitas, pedidos e de onde vêm, num painel simples. Sem relatórios que ninguém lê.",
        mock: "chart",
        wide: true,
      },
    ],
    demo: {
      title: "É assim que o teu site atende quem chega",
      intro: "Um cliente entra às 22h, carrega no WhatsApp e recebe resposta na hora. Sem ninguém do outro lado. Isto pode ser o teu negócio.",
      business: "Canalizações Ribeiro",
      script: [
        { who: "them", text: "Boa noite, vi o site. Fazem desentupimentos urgentes?", at: "22:14" },
        { who: "us", text: "Boa noite! Fazemos, sim, 24h. Em que zona está?", at: "22:14" },
        { who: "them", text: "Odivelas. É a cozinha, está tudo a transbordar.", at: "22:15" },
        { who: "us", text: "Já mandei o pedido ao técnico de serviço. Liga-lhe em 5 minutos. Feche a torneira de segurança entretanto 🙏", at: "22:15" },
      ],
      done: "Pedido entregue ao técnico · o cliente não foi para a concorrência",
    },
    features: [
      { icon: "text", title: "Textos e imagens incluídos", desc: "Escrevemos e escolhemos as imagens contigo. Não precisas de chegar com nada pronto." },
      { icon: "globe", title: "Domínio, alojamento e email", desc: "Registamos o teu domínio, pomos o site no ar e criamos o email profissional. Tudo em teu nome." },
      { icon: "shield", title: "30 dias de acompanhamento", desc: "Depois do lançamento ficamos por perto: ajustes, dúvidas e afinações, sem custo." },
    ],
    process: [
      { title: "Conversa de 20 minutos", desc: "Percebemos o teu negócio, quem são os teus clientes e o que o site tem de fazer. Sais com preço fechado." },
      { title: "Desenho e construção", desc: "Em 10 dias úteis mostramos-te o site a funcionar. Afinamos contigo até estar certo." },
      { title: "Lançamento e formação", desc: "Pomos no ar, ligamos o Google e o WhatsApp, e mostramos-te como mudar textos e imagens sozinho." },
    ],
    pricing: {
      intro: "Preço fechado antes de começar. O valor final depende do que o teu site precisa, mas começa aqui.",
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
    faq: [
      { q: "Quanto tempo demora mesmo?", a: "Uma landing page fica no ar em cerca de 7 dias úteis; um site profissional em 2 semanas. O prazo conta a partir da conversa inicial, e o que mais o atrasa é a aprovação do teu lado, por isso mantemos tudo simples." },
      { q: "O que preciso de vos dar?", a: "Quase nada: o nome do negócio, o que fazes e para quem, e o teu logótipo se tiveres. Os textos e as imagens tratamos nós contigo. Se não tiveres logótipo, fazemos um simples incluído." },
      { q: "O site fica meu ou vosso?", a: "Teu. Domínio em teu nome, alojamento na tua conta, código entregue. Se um dia quiseres mudar de agência, levas tudo contigo. Nunca ficas preso a nós." },
      { q: "E depois do lançamento?", a: "Tens 30 dias de acompanhamento incluídos para ajustes e dúvidas. Depois, se quiseres que tratemos das atualizações, segurança e posição no Google todos os meses, há uma avença desde 90€/mês. Opcional." },
      { q: "Como funciona o pagamento?", a: "Metade para arrancar, metade no lançamento, ou outra forma que te dê mais jeito. Falamos disso na primeira conversa, sem surpresas." },
    ],
    form: {
      title: "Vamos falar do teu site",
      intro: "20 minutos, sem custo. Dizemos-te o que faz sentido para o teu negócio e quanto custa, sem rodeios.",
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

export function verticalUrl(slug: string) {
  return `https://${slug}.${ROOT_DOMAIN}`;
}
