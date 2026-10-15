// Regra n.º 1 da Calculadora: o caminho antigo (formulário de consultoria) não
// muda. O único ficheiro partilhado que a Calculadora tocou foi o envio à API
// de Conversões da Meta (lib/metaCapi.ts), que ganhou uma categoria opcional.
// Sem ela, o evento tem de sair exatamente como antes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { sendLeadToMeta } from "../lib/metaCapi.ts";

async function corpoEnviado(lead) {
  const antes = globalThis.fetch;
  const token = process.env.META_CAPI_TOKEN;
  let corpo = null;
  globalThis.fetch = async (_url, init) => {
    corpo = JSON.parse(init.body);
    return new Response("{}", { status: 200 });
  };
  process.env.META_CAPI_TOKEN = "teste";
  try {
    await sendLeadToMeta(lead);
  } finally {
    globalThis.fetch = antes;
    if (token === undefined) delete process.env.META_CAPI_TOKEN;
    else process.env.META_CAPI_TOKEN = token;
  }
  return corpo;
}

test("formulário de consultoria: categoria continua «Consultoria gratuita»", async () => {
  const c = await corpoEnviado({ eventId: "e1", email: "a@b.pt", origem: "Website" });
  assert.equal(c.data[0].custom_data.content_category, "Consultoria gratuita");
  assert.equal(c.data[0].custom_data.content_name, "Website");
  assert.equal(c.data[0].event_name, "Lead");
});

test("Calculadora: categoria própria", async () => {
  const c = await corpoEnviado({ eventId: "e2", email: "a@b.pt", origem: "Calculadora de Crescimento", categoria: "Calculadora de Crescimento" });
  assert.equal(c.data[0].custom_data.content_category, "Calculadora de Crescimento");
});
