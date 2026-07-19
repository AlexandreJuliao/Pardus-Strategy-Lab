// Identidade legal + subprocessadores — fonte ÚNICA para as páginas legais.
// Atualizar aqui reflete em /privacidade, /termos e /eliminacao-de-dados.
//
// ⚠️ CAMPOS A CONFIRMAR (marcados TODO): o Julian tem de dar estes dados para
// a informação coincidir com o que for submetido na Meta / LinkedIn / TikTok.

export const LEGAL = {
  tradeName: "Pardus Strategy Lab", // nome comercial (não registado)
  brand: "Pardus",
  legalName: "Alexandre Pinto Julião",
  status: "Empresário em nome individual (atividade aberta em Portugal), sob o nome comercial Pardus Strategy Lab",
  nif: "245 959 289",
  // Morada PÚBLICA = apenas região (privacidade). A morada fiscal completa
  // é usada só na verificação da Meta (documentos privados), nunca no site.
  address: "Mafra, Lisboa, Portugal",
  privacyEmail: "geral@pardus-lab.com",
  contactEmail: "geral@pardus-lab.com",
  phone: "+351 913 387 098",
  site: "https://pardus-lab.com",
  appHost: "office.pardus-lab.com",
  supervisoryAuthority: "Comissão Nacional de Proteção de Dados (CNPD), www.cnpd.pt",
  lastUpdated: "7 de julho de 2026",
} as const;

// Subprocessadores / destinatários dos dados (transparência RGPD art. 13 + Meta Platform Terms).
export const SUBPROCESSORS: { name: string; purpose: string; location: string }[] = [
  { name: "Meta Platforms Ireland Ltd.", purpose: "Gestão de páginas e contas de Facebook e Instagram e campanhas publicitárias, a pedido do titular da conta.", location: "União Europeia (Irlanda)" },
  { name: "LinkedIn Ireland Unlimited Company", purpose: "Gestão de páginas e publicações de LinkedIn, a pedido do titular da conta.", location: "União Europeia (Irlanda)" },
  { name: "TikTok Technology Limited", purpose: "Gestão de conta e publicações de TikTok, a pedido do titular da conta.", location: "União Europeia / EUA (com cláusulas contratuais-tipo)" },
  { name: "Supabase, Inc.", purpose: "Base de dados e autenticação da plataforma de gestão.", location: "União Europeia / EUA (SCCs)" },
  { name: "Vercel, Inc.", purpose: "Alojamento e entrega do website e da plataforma.", location: "EUA (SCCs)" },
  { name: "OpenRouter / Groq", purpose: "Processamento de IA (ex.: resumos de reuniões), sem treino de modelos com os dados.", location: "EUA (SCCs)" },
];
