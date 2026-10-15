import { NextResponse } from "next/server";
import { OFFICE_CLIENT_ID, ipDoBrowser, postOffice } from "@/lib/office";
import { limparEvento } from "@/lib/calculadora";

// Contagem do funil da Calculadora (abriu → arrancou → cada ecrã → calculou →
// concluiu). Sem dados pessoais: só um uuid aleatório da sessão, o tipo, o
// ecrã, as utm e, no «concluiu», o id da lead. Reencaminha para o office do
// lado do servidor, com o token; o browser nunca o vê.
//
// Uma falha aqui nunca pode atrapalhar quem está a preencher, por isso
// responde sempre depressa e sem erro visível (204), mesmo que o office não
// receba. As falhas ficam nos logs da Vercel.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const texto = await req.text().catch(() => "");
  if (texto.length > 4000) return new NextResponse(null, { status: 413 });
  let bruto: unknown = null;
  try {
    bruto = JSON.parse(texto);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const ev = limparEvento(bruto);
  if (!ev) return new NextResponse(null, { status: 400 });

  const ip = ipDoBrowser(req);
  const cabecalhosIp: Record<string, string> = ip ? { "x-calculadora-ip": ip } : {};

  await postOffice(
    "/api/calculadora/eventos",
    {
      client_id: OFFICE_CLIENT_ID,
      sessao: ev.sessao,
      tipo: ev.tipo,
      ...(ev.ecra !== undefined ? { ecra: ev.ecra } : {}),
      utm: ev.utm,
      lead_id: ev.lead_id,
    },
    {
      tentativas: 1,
      timeoutMs: 4000,
      // O office (#125) limita os eventos por visitante, não pelo IP do site.
      cabecalhos: cabecalhosIp,
    },
  );

  return new NextResponse(null, { status: 204 });
}
