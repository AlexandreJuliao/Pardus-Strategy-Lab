// Ligação do servidor do site ao office (Pardus OS), para as rotas da
// Calculadora. É o mesmo mecanismo de app/api/lead/route.ts: o pedido sai do
// servidor com o cabeçalho `x-leads-token` e o `client_id` da Pardus, e o
// browser nunca vê o token. Só pode ser importado por código de servidor.
//
// As variáveis são as mesmas que o /api/lead já usa na Vercel
// (OFFICE_LEADS_URL, OFFICE_LEADS_CLIENT_ID, OFFICE_LEADS_TOKEN). OFFICE_URL é
// opcional: serve para apontar as rotas da Calculadora para outro office (um
// de testes, por exemplo) sem mexer no formulário antigo.

const LEADS_URL = process.env.OFFICE_LEADS_URL ?? "https://office.pardus-lab.com/api/leads";

/** A raiz do office, sem barra no fim. */
export const OFFICE_BASE = (process.env.OFFICE_URL || new URL(LEADS_URL).origin).replace(/\/+$/, "");

export const OFFICE_CLIENT_ID =
  process.env.OFFICE_LEADS_CLIENT_ID ?? "38b3c985-3f13-41d5-b202-956fb086bd9d";

export type RespostaOffice = { ok: boolean; status: number; corpo: unknown };

/**
 * POST JSON a um caminho do office, com o token. `tentativas` = 2 dá uma
 * segunda oportunidade quando a falha pode ser passageira (rede, timeout, 5xx,
 * 429); um 4xx que não seja 429 não melhora com nova tentativa. As falhas ficam
 * nos logs da Vercel com o caminho e o código, nunca com dados da pessoa.
 */
export async function postOffice(
  caminho: string,
  corpo: unknown,
  { tentativas = 1, timeoutMs = 8000 }: { tentativas?: number; timeoutMs?: number } = {},
): Promise<RespostaOffice> {
  const token = process.env.OFFICE_LEADS_TOKEN;
  let ultimo: RespostaOffice = { ok: false, status: 0, corpo: null };
  for (let t = 1; t <= tentativas; t++) {
    try {
      const r = await fetch(`${OFFICE_BASE}${caminho}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "x-leads-token": token } : {}),
        },
        body: JSON.stringify(corpo),
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
      });
      const json = await r.json().catch(() => null);
      ultimo = { ok: r.ok, status: r.status, corpo: json };
      if (r.ok) return ultimo;
      console.error(`[office] ${caminho} respondeu ${r.status} (tentativa ${t})`);
      if (r.status < 500 && r.status !== 429) return ultimo;
    } catch (err) {
      console.error(`[office] ${caminho} sem resposta (tentativa ${t}): ${(err as Error).name}`);
    }
    if (t < tentativas) await new Promise((res) => setTimeout(res, 800));
  }
  return ultimo;
}
