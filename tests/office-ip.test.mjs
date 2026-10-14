// O IP que o site manda ao office (x-calculadora-ip) só pode vir do cabeçalho
// que a Vercel garante. Os que o cliente controla são ignorados.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ipDoBrowser } from "../lib/office.ts";

const pedido = (h) => new Request("https://pardus-lab.com/api/calculadora/evento", { method: "POST", headers: h });

test("usa o x-vercel-forwarded-for", () => {
  assert.equal(ipDoBrowser(pedido({ "x-vercel-forwarded-for": "203.0.113.7" })), "203.0.113.7");
  assert.equal(ipDoBrowser(pedido({ "x-vercel-forwarded-for": "2001:db8::1" })), "2001:db8::1");
});

test("um IP falsificado em x-forwarded-for ou x-real-ip é ignorado", () => {
  assert.equal(ipDoBrowser(pedido({ "x-forwarded-for": "1.2.3.4", "x-real-ip": "5.6.7.8" })), null);
  assert.equal(
    ipDoBrowser(pedido({ "x-forwarded-for": "1.2.3.4", "x-vercel-forwarded-for": "203.0.113.7" })),
    "203.0.113.7",
  );
});

test("um IP inválido não é enviado", () => {
  assert.equal(ipDoBrowser(pedido({ "x-vercel-forwarded-for": "não-é-ip" })), null);
  assert.equal(ipDoBrowser(pedido({ "x-vercel-forwarded-for": "999.1.1.1" })), null);
  assert.equal(ipDoBrowser(pedido({ "x-vercel-forwarded-for": "" })), null);
  assert.equal(ipDoBrowser(pedido({})), null);
});
