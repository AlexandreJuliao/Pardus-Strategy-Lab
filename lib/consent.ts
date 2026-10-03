// Consentimento para as ferramentas que não são essenciais: o Meta Pixel e o
// Google Analytics 4. Sem «Aceitar», nenhuma das duas carrega (art. 5.º da Lei
// 41/2004). O PostHog não entra aqui: corre sem cookies e sem guardar nada no
// browser (ver components/Analytics.tsx).
//
// A escolha fica num cookie próprio, e não em localStorage, porque o servidor
// também a tem de ler: o /api/lead só passa os cookies _fbp/_fbc à Meta se a
// pessoa tiver aceitado. Guardar a escolha é essencial (sem isso não se pode
// respeitá-la), por isso este cookie não precisa de consentimento.
//
// Se a lista de ferramentas mudar (entrar uma nova, por exemplo), muda-se o
// nome do cookie: toda a gente volta a ver o aviso e escolhe outra vez.

export type Escolha = "aceite" | "recusado";

export const CONSENT_COOKIE = "pardus_consent";

/** Seis meses. Depois disso o aviso volta a aparecer. */
const DURACAO_S = 60 * 60 * 24 * 182;

/** Disparado quando a escolha muda (detail: Escolha). */
export const EVENTO_ESCOLHA = "pardus:consentimento";
/** Disparado pelo «Definições de cookies» do rodapé para reabrir o aviso. */
export const EVENTO_DEFINICOES = "pardus:cookies-definicoes";

function valorDoCookie(cookies: string, nome: string) {
  return cookies.match(new RegExp(`(?:^|;\\s*)${nome}=([^;]+)`))?.[1];
}

/** A escolha guardada no cabeçalho Cookie de um pedido (para o servidor). */
export function escolhaNoPedido(cookieHeader: string | null): Escolha | null {
  const v = valorDoCookie(cookieHeader ?? "", CONSENT_COOKIE);
  return v === "aceite" || v === "recusado" ? v : null;
}

/** A escolha guardada neste browser, ou null se a pessoa ainda não escolheu. */
export function lerEscolha(): Escolha | null {
  if (typeof document === "undefined") return null;
  return escolhaNoPedido(document.cookie);
}

/**
 * O domínio onde a escolha fica. Nos domínios da Pardus é o principal, com
 * ponto à frente, para valer também nas landing pages dos subdomínios
 * (websites.pardus-lab.com): quem escolheu num sítio não volta a ser
 * perguntado no outro. Em localhost fica só no host.
 */
function dominioPartilhado() {
  const h = window.location.hostname;
  return h === "pardus-lab.com" || h.endsWith(".pardus-lab.com") ? "; domain=.pardus-lab.com" : "";
}

export function guardarEscolha(escolha: Escolha) {
  const seguro = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${escolha}; path=/; max-age=${DURACAO_S}; SameSite=Lax${dominioPartilhado()}${seguro}`;
  window.dispatchEvent(new CustomEvent<Escolha>(EVENTO_ESCOLHA, { detail: escolha }));
}

export function abrirDefinicoes() {
  window.dispatchEvent(new Event(EVENTO_DEFINICOES));
}

/**
 * Apaga os cookies que casam com `padrao`. Um cookie só se apaga com o mesmo
 * domínio com que foi criado, e o Pixel e o GA4 criam-nos no domínio principal
 * (.pardus-lab.com), por isso tenta-se o host e cada domínio acima dele.
 */
export function apagarCookies(padrao: RegExp) {
  if (typeof document === "undefined") return;
  const nomes = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((n): n is string => !!n && padrao.test(n));
  if (!nomes.length) return;

  const partes = window.location.hostname.split(".");
  const dominios = [""];
  for (let i = 0; i < partes.length - 1; i++) {
    dominios.push(`; domain=.${partes.slice(i).join(".")}`);
  }
  for (const nome of nomes) {
    for (const d of dominios) {
      document.cookie = `${nome}=; path=/; max-age=0${d}`;
    }
  }
}

/** Cookies do Meta Pixel (_fbp, _fbc) e do Google Analytics (_ga, _ga_<id>, _gid, _gat…). */
export const COOKIES_DE_MEDICAO = /^(_fbp|_fbc|_ga|_ga_.+|_gid|_gat.*)$/;
/** Cookies que o Microsoft Clarity deixou antes de sair do site. */
export const COOKIES_DO_CLARITY = /^(_clck|_clsk)$/;
