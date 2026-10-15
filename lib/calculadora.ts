// Calculadora de Crescimento Pardus: as listas de opções, as regras de cada
// ecrã e a validação, partilhadas pelo browser (components/calculadora) e pelo
// servidor do site (app/api/calculadora). O office volta a validar tudo com
// Zod; as listas têm de ser exatamente estas, porque ele rejeita (400) qualquer
// valor fora delas.
//
// Este ficheiro não importa nada de propósito: corre tal e qual nos testes
// (`npm test`, node --test) sem Next nem aliases.

export const SETORES = [
  "Saúde e bem-estar",
  "Restauração e alojamento",
  "Comércio e loja online",
  "Serviços profissionais",
  "Construção e imobiliário",
  "Beleza e estética",
  "Educação e formação",
  "Outro",
] as const;
export const EQUIPA = ["Só eu", "2 a 5", "6 a 15", "16 a 50", "Mais de 50"] as const;
export const NADA = "Ainda nada disto";
export const TEM = [
  "Logótipo",
  "Site",
  "Loja online",
  "Instagram",
  "Facebook",
  "Ficha no Google Maps",
  "Email com o nome do negócio",
  NADA,
] as const;
export const CANAIS = [
  "Recomendações",
  "Pesquisa no Google",
  "Google Maps",
  "Redes sociais",
  "Anúncios pagos",
  "Passam à porta",
  "Plataformas (ex.: Booking)",
  "Não sei bem",
] as const;
export const MKT = ["Ninguém", "Sou eu", "Alguém da equipa", "Um freelancer", "Uma agência"] as const;
export const ONDE = ["Google", "Facebook e Instagram", "TikTok", "Outro sítio"] as const;
export const VOLUME = ["Até 20", "20 a 50", "50 a 150", "150 a 500", "Mais de 500"] as const;
export const TICKET = ["Até 50 €", "50 a 150 €", "150 a 500 €", "500 a 2.000 €", "Mais de 2.000 €"] as const;
export const TEMPO = [
  "Responder a mensagens",
  "Marcações e agenda",
  "Orçamentos e propostas",
  "Faturação e cobranças",
  "Stock e encomendas",
  "Organizar a equipa",
  "Relatórios e números",
] as const;
export const GERE = ["Papel e memória", "Excel ou Google Sheets", "WhatsApp", "Um programa próprio", "Um CRM"] as const;
export const COBRE = [
  "Clientes e contactos",
  "Vendas e orçamentos",
  "Marcações e agenda",
  "Faturação",
  "Stock e encomendas",
  "Equipa e tarefas",
  "Relatórios e números",
] as const;
/** [valor guardado, área que lhe corresponde, mostrada por baixo no cartão] */
export const PRIOR = [
  ["Imagem e site", "Branding & Web"],
  ["Mais clientes", "Visibilidade & Captação"],
  ["Menos trabalho manual", "Automações & Software"],
] as const;
export const PRAZO = ["Já este mês", "Nos próximos 3 meses", "Ainda este ano", "Só estou a explorar"] as const;
export const INV = [
  "Sim, já tenho um valor em mente",
  "Já pensei, mas não sei quanto",
  "Ainda não pensei nisso",
] as const;
export const VALOR = ["Até 1.000 €", "1.000 a 2.500 €", "2.500 a 5.000 €", "5.000 a 10.000 €", "Mais de 10.000 €"] as const;

/** O cabeçalho de cada ecrã (índice = número do ecrã). */
export const SECOES = [
  "",
  "",
  "O negócio",
  "Branding & Web",
  "Branding & Web",
  "Visibilidade",
  "Visibilidade",
  "O seu mês",
  "Automações",
  "Automações",
  "Prioridades",
  "Investimento",
  "",
  "O seu número",
  "",
] as const;

/**
 * O texto exato da caixa de consentimento. O servidor grava ESTE texto (o dele,
 * não o que o browser mandar) com a hora do envio. Se mudar, muda aqui e fica
 * registado em cada lead nova qual foi a versão aceite.
 */
export const TEXTO_CONSENTIMENTO =
  "Aceito receber o cálculo e ser contactado pela Pardus, por email e WhatsApp, sobre este pedido. Posso cancelar a qualquer momento.";

/** Texto livre: cortado aqui, como no office. */
export const MAX_TEXTO = 500;

export const ECRA_PRIMEIRA_PERGUNTA = 2;
export const ECRA_ULTIMA_PERGUNTA = 11;
export const ECRA_CALCULO = 12;
export const ECRA_CONTACTO = 13;
export const ECRA_OBRIGADO = 14;

/** O que a pessoa respondeu, tal como o browser o guarda enquanto preenche. */
export type Rascunho = {
  setor?: string;
  equipa?: string;
  tem?: string[];
  site?: string;
  ig?: string;
  satBrand?: number;
  melhorBrand?: string;
  canais?: string[];
  mkt?: string;
  onde?: string[];
  satVis?: number;
  melhorVis?: string;
  volume?: string;
  ticket?: string;
  tempo?: string[];
  gere?: string;
  cobre?: string[];
  qualSoft?: string;
  satAuto?: number;
  autoUma?: string;
  prior?: string;
  prazo?: string;
  inv?: string;
  valor?: string;
};

/** A forma `Calculadora.respostas` do contrato, já limpa. */
export type Respostas = {
  setor: string;
  equipa: string;
  tem: string[];
  site?: string;
  ig?: string;
  satBrand: number;
  melhorBrand?: string;
  canais: string[];
  mkt: string;
  onde?: string[];
  satVis: number;
  melhorVis?: string;
  volume: string;
  ticket: string;
  tempo: string[];
  gere: string;
  cobre?: string[];
  qualSoft?: string;
  satAuto: number;
  autoUma?: string;
  prior: string;
  prazo: string;
  inv: string;
  valor?: string;
};

// ── Regras de cada ecrã ─────────────────────────────────────────────────────

export const temSite = (r: Rascunho) => !!r.tem?.some((t) => t === "Site" || t === "Loja online");
export const temInstagram = (r: Rascunho) => !!r.tem?.includes("Instagram");
export const anuncia = (r: Rascunho) => !!r.canais?.includes("Anúncios pagos");
export const precisaCobre = (r: Rascunho) => r.gere === "Um programa próprio" || r.gere === "Um CRM";
export const abaixoDe10 = (n: number | undefined) => n !== undefined && n < 10;
export const temValor = (r: Rascunho) => r.inv === INV[0];

/** Se o ecrã `e` (2 a 11) já tem o que precisa para avançar. */
export function ecraCompleto(e: number, r: Rascunho): boolean {
  switch (e) {
    case 2:
      return !!(r.setor && r.equipa);
    case 3:
      return (r.tem?.length ?? 0) > 0;
    case 4:
      return r.satBrand !== undefined;
    case 5:
      return !!((r.canais?.length ?? 0) > 0 && r.mkt);
    case 6:
      return r.satVis !== undefined;
    case 7:
      return !!(r.volume && r.ticket);
    case 8:
      return !!((r.tempo?.length ?? 0) >= 2 && r.gere && (!precisaCobre(r) || (r.cobre?.length ?? 0) > 0));
    case 9:
      return r.satAuto !== undefined;
    case 10:
      return !!(r.prior && r.prazo);
    case 11:
      return !!(r.inv && (!temValor(r) || r.valor));
    default:
      return true;
  }
}

/**
 * Escolha múltipla: tocar de novo tira; «Ainda nada disto» é exclusivo (limpa
 * o resto, e escolher outra coisa tira-o). A ordem da lista é a ordem dos
 * toques, que é o que dá o ranking no ecrã 8.
 */
export function alternar(lista: readonly string[] | undefined, v: string): string[] {
  let a = (lista ?? []).slice();
  if (a.includes(v)) return a.filter((x) => x !== v);
  a = v === NADA ? [] : a.filter((x) => x !== NADA);
  a.push(v);
  return a;
}

/**
 * A barra: rápida no início e lenta no fim. `n` é o número do ecrã de 2 a 12
 * (o contacto conta como 12).
 */
export function progresso(n: number): number {
  const t = Math.min(1, Math.max(0, (n - 1) / 11));
  return Math.round(8 + 90 * (1 - Math.pow(1 - t, 1.6)));
}

// ── Contacto ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailValido(email: string): boolean {
  const e = email.trim();
  return e.length <= 200 && EMAIL_RE.test(e);
}

/**
 * Telemóvel português: 9 dígitos, com +351 (ou 00351) opcional à frente.
 * Aceita espaços, pontos, hífenes e parênteses. Devolve o número em E.164
 * (+3519XXXXXXXX), que é o que o WhatsApp do office usa, ou null.
 * Começa por 9 (móvel), 2 (fixo) ou 3 (números nómadas).
 */
export function telefonePT(raw: string): string | null {
  const limpo = raw.trim().replace(/[\s.\-()]/g, "");
  const m = limpo.match(/^(?:\+351|00351)?([239]\d{8})$/);
  return m ? `+351${m[1]}` : null;
}

// ── Limpeza do lado do servidor ─────────────────────────────────────────────

const umDe = (lista: readonly string[], v: unknown): v is string => typeof v === "string" && lista.includes(v);

function variosDe(lista: readonly string[], v: unknown): string[] | null {
  if (!Array.isArray(v)) return null;
  const out: string[] = [];
  for (const x of v) {
    if (!umDe(lista, x)) return null;
    if (!out.includes(x)) out.push(x);
  }
  return out;
}

const nota = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 10;

function textoLivre(v: unknown, max = MAX_TEXTO): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max);
  return t || undefined;
}

/**
 * Valida as respostas contra as listas e as regras dos ecrãs e devolve só o
 * que conta: um campo condicional que já não se aplica (o endereço do site
 * depois de tirar «Site», por exemplo) não segue. Devolve null se faltar uma
 * resposta obrigatória ou vier um valor fora das listas.
 */
export function limparRespostas(bruto: unknown): Respostas | null {
  if (!bruto || typeof bruto !== "object") return null;
  const r = bruto as Record<string, unknown>;

  const tem = variosDe(TEM, r.tem);
  const canais = variosDe(CANAIS, r.canais);
  const tempo = variosDe(TEMPO, r.tempo);
  if (!tem || !tem.length || !canais || !canais.length || !tempo || tempo.length < 2) return null;
  if (tem.includes(NADA) && tem.length > 1) return null;

  if (
    !umDe(SETORES, r.setor) ||
    !umDe(EQUIPA, r.equipa) ||
    !nota(r.satBrand) ||
    !umDe(MKT, r.mkt) ||
    !nota(r.satVis) ||
    !umDe(VOLUME, r.volume) ||
    !umDe(TICKET, r.ticket) ||
    !umDe(GERE, r.gere) ||
    !nota(r.satAuto) ||
    !umDe(PRIOR.map((p) => p[0]), r.prior) ||
    !umDe(PRAZO, r.prazo) ||
    !umDe(INV, r.inv)
  ) {
    return null;
  }

  const out: Respostas = {
    setor: r.setor,
    equipa: r.equipa,
    tem,
    satBrand: r.satBrand,
    canais,
    mkt: r.mkt,
    satVis: r.satVis,
    volume: r.volume,
    ticket: r.ticket,
    tempo,
    gere: r.gere,
    satAuto: r.satAuto,
    prior: r.prior,
    prazo: r.prazo,
    inv: r.inv,
  };

  const rascunho: Rascunho = out;
  if (temSite(rascunho)) {
    const site = textoLivre(r.site, 300);
    if (site) out.site = site;
  }
  if (temInstagram(rascunho)) {
    const ig = textoLivre(r.ig, 100);
    if (ig) out.ig = ig;
  }
  if (abaixoDe10(out.satBrand)) {
    const t = textoLivre(r.melhorBrand);
    if (t) out.melhorBrand = t;
  }
  if (anuncia(rascunho)) {
    const onde = variosDe(ONDE, r.onde ?? []);
    if (!onde) return null;
    if (onde.length) out.onde = onde;
  }
  if (abaixoDe10(out.satVis)) {
    const t = textoLivre(r.melhorVis);
    if (t) out.melhorVis = t;
  }
  if (precisaCobre(rascunho)) {
    const cobre = variosDe(COBRE, r.cobre);
    if (!cobre || !cobre.length) return null;
    out.cobre = cobre;
    const qual = textoLivre(r.qualSoft, 120);
    if (qual) out.qualSoft = qual;
  }
  if (abaixoDe10(out.satAuto)) {
    const t = textoLivre(r.autoUma);
    if (t) out.autoUma = t;
  }
  if (temValor(rascunho)) {
    if (!umDe(VALOR, r.valor)) return null;
    out.valor = r.valor;
  }
  return out;
}

// ── Eventos do funil ────────────────────────────────────────────────────────

export const TIPOS_EVENTO = ["abriu", "arrancou", "ecra", "calculou", "concluiu"] as const;
export type TipoEvento = (typeof TIPOS_EVENTO)[number];

export const UTM_CHAVES = ["source", "medium", "campaign", "content", "term"] as const;
export type Utm = Partial<Record<(typeof UTM_CHAVES)[number], string>>;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const uuidValido = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

/** Só as cinco chaves utm, como texto curto. Tudo o resto cai. */
export function limparUtm(bruto: unknown): Utm {
  const out: Utm = {};
  if (!bruto || typeof bruto !== "object") return out;
  const r = bruto as Record<string, unknown>;
  for (const k of UTM_CHAVES) {
    const v = r[k];
    if (typeof v === "string" && v.trim()) out[k] = v.trim().slice(0, 200);
  }
  return out;
}

export type Evento = {
  sessao: string;
  tipo: TipoEvento;
  ecra?: number;
  utm: Utm;
  lead_id: string | null;
};

/**
 * Valida um evento do funil. Nunca leva nome, email nem telefone: só a sessão
 * (um uuid aleatório), o tipo, o ecrã, as utm e, no «concluiu», o id da lead.
 */
export function limparEvento(bruto: unknown): Evento | null {
  if (!bruto || typeof bruto !== "object") return null;
  const r = bruto as Record<string, unknown>;
  if (!uuidValido(r.sessao)) return null;
  if (typeof r.tipo !== "string" || !(TIPOS_EVENTO as readonly string[]).includes(r.tipo)) return null;
  const tipo = r.tipo as TipoEvento;
  const ev: Evento = { sessao: r.sessao.toLowerCase(), tipo, utm: limparUtm(r.utm), lead_id: null };
  if (tipo === "ecra") {
    const e = r.ecra;
    if (typeof e !== "number" || !Number.isInteger(e) || e < ECRA_PRIMEIRA_PERGUNTA || e > ECRA_CONTACTO) return null;
    ev.ecra = e;
  }
  if (tipo === "concluiu" && uuidValido(r.lead_id)) ev.lead_id = r.lead_id;
  return ev;
}
