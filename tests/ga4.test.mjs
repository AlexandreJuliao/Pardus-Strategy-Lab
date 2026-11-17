// Envio da lead ao GA4 pelo servidor (lib/ga4.ts), com o fetch simulado.
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { GA4_ID, paginaLimpa, sendLeadToGa4 } from "../lib/ga4.ts";

const fetchOriginal = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = fetchOriginal;
  delete process.env.GA4_MP_SECRET;
});

test("sem GA4_MP_SECRET não envia", async () => {
  let chamado = false;
  globalThis.fetch = async () => {
    chamado = true;
    return new Response(null, { status: 204 });
  };
  assert.equal(await sendLeadToGa4({ origem: "Homepage" }), false);
  assert.equal(chamado, false);
});

test("envia generate_lead com a origem e sem dados da pessoa", async () => {
  process.env.GA4_MP_SECRET = "segredo-de-teste";
  let pedido;
  globalThis.fetch = async (url, init) => {
    pedido = { url: String(url), corpo: JSON.parse(init.body) };
    return new Response(null, { status: 204 });
  };
  const ok = await sendLeadToGa4({ origem: "Homepage", pagina: "https://www.pardus-lab.com/" });
  assert.equal(ok, true);
  assert.ok(pedido.url.startsWith("https://www.google-analytics.com/mp/collect?"));
  assert.ok(pedido.url.includes(`measurement_id=${GA4_ID}`));
  assert.match(pedido.corpo.client_id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(pedido.corpo.events, [
    {
      name: "generate_lead",
      params: { form_origem: "Homepage", page_location: "https://www.pardus-lab.com/" },
    },
  ]);
});

test("a página vai sem query string e só dos domínios da Pardus", () => {
  assert.equal(
    paginaLimpa("https://www.pardus-lab.com/contacto?email=a%40b.pt&gclid=x#form"),
    "https://www.pardus-lab.com/contacto",
  );
  assert.equal(paginaLimpa("https://websites.pardus-lab.com/"), "https://websites.pardus-lab.com/");
  assert.equal(paginaLimpa("https://evil-pardus-lab.com/"), undefined);
  assert.equal(paginaLimpa("http://www.pardus-lab.com/"), undefined);
  assert.equal(paginaLimpa("lixo"), undefined);
  assert.equal(paginaLimpa(undefined), undefined);
});

test("falha do Google não lança", async () => {
  process.env.GA4_MP_SECRET = "segredo-de-teste";
  globalThis.fetch = async () => {
    throw new TypeError("fetch failed");
  };
  assert.equal(await sendLeadToGa4({ origem: "Calculadora" }), false);
});
