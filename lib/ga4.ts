// Google Analytics 4 do site. O id é público (vai no HTML), por isso fica aqui
// e serve o components/Analytics.tsx e o envio do servidor.
export const GA4_ID = "G-EZ1S3CPSZX";

/**
 * Conta a lead no GA4 a partir do servidor (Measurement Protocol), para quem
 * não aceitou os cookies. Sem isto o GA4 só via leads de quem carregou em
 * «Aceitar»: o `generate_lead` do browser (lib/tracking.ts) só corre aí, e o
 * evento-chave ficava a zero.
 *
 * Quem aceitou conta pelo browser, que liga a lead à visita e à campanha; por
 * isso o servidor só envia quando a escolha não é «aceite», e nunca há dois
 * eventos para a mesma lead. Não lê nem guarda nada no browser: o client_id é
 * novo a cada lead e não vai nenhum dado da pessoa, só a origem do formulário.
 *
 * Segredo em GA4_MP_SECRET (Admin → Fluxos de dados → Measurement Protocol).
 * Sem ele, não envia e avisa nos logs. Nunca lança.
 */
/**
 * A página vem do browser: só se aceita um URL dos domínios da Pardus, e sem
 * query string nem fragmento (podem trazer gclid, fbclid ou até um email).
 */
export function paginaLimpa(url?: string): string | undefined {
  try {
    const u = new URL(url ?? "");
    if (u.protocol !== "https:") return undefined;
    if (u.hostname !== "pardus-lab.com" && !u.hostname.endsWith(".pardus-lab.com")) return undefined;
    return u.origin + u.pathname;
  } catch {
    return undefined;
  }
}

export async function sendLeadToGa4(lead: { origem: string; pagina?: string }): Promise<boolean> {
  const pagina = paginaLimpa(lead.pagina);
  const secret = process.env.GA4_MP_SECRET;
  if (!secret) {
    console.error("[ga4-mp] GA4_MP_SECRET em falta — evento NÃO enviado");
    return false;
  }
  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_ID}&api_secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: crypto.randomUUID(),
          events: [
            {
              name: "generate_lead",
              params: {
                form_origem: lead.origem,
                ...(pagina ? { page_location: pagina } : {}),
              },
            },
          ],
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    // O /mp/collect responde 2xx mesmo a eventos mal formados; só falhas de
    // rede ou do Google chegam aqui.
    if (!res.ok) {
      console.error("[ga4-mp] falhou:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[ga4-mp] erro de rede:", (err as Error).name);
    return false;
  }
}
