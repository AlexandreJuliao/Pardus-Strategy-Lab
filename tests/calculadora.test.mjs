// Testes da lógica da Calculadora (lib/calculadora.ts): correm com `npm test`
// (node --test; o Node lê o TypeScript diretamente, sem compilar).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  alternar,
  ecraCompleto,
  emailValido,
  limparEvento,
  limparRespostas,
  limparUtm,
  progresso,
  telefonePT,
} from "../lib/calculadora.ts";

const completo = {
  setor: "Beleza e estética",
  equipa: "2 a 5",
  tem: ["Site", "Instagram"],
  site: " casalume.pt ",
  ig: "@casalume",
  satBrand: 6,
  melhorBrand: "o site parece antigo",
  canais: ["Recomendações", "Anúncios pagos"],
  mkt: "Sou eu",
  onde: ["Google"],
  satVis: 4,
  melhorVis: "dependo de recomendações",
  volume: "50 a 150",
  ticket: "50 a 150 €",
  tempo: ["Marcações e agenda", "Responder a mensagens"],
  gere: "Um CRM",
  cobre: ["Clientes e contactos"],
  qualSoft: "HubSpot",
  satAuto: 3,
  autoUma: "lembrar as marcações",
  prior: "Mais clientes",
  prazo: "Nos próximos 3 meses",
  inv: "Sim, já tenho um valor em mente",
  valor: "1.000 a 2.500 €",
};

test("telemóvel PT: 9 dígitos, +351 opcional, devolve E.164", () => {
  assert.equal(telefonePT("912 345 678"), "+351912345678");
  assert.equal(telefonePT("+351 912-345-678"), "+351912345678");
  assert.equal(telefonePT("00351912345678"), "+351912345678");
  assert.equal(telefonePT("219 876 543"), "+351219876543");
  assert.equal(telefonePT("91234567"), null);
  assert.equal(telefonePT("9123456789"), null);
  assert.equal(telefonePT("+34 612 345 678"), null);
  assert.equal(telefonePT("812345678"), null);
});

test("email", () => {
  assert.ok(emailValido("marta@casalume.pt"));
  assert.ok(!emailValido("marta@casalume"));
  assert.ok(!emailValido("marta casalume.pt"));
});

test("barra: 8 + 90·(1−(1−t)^1.6), rápida no início e lenta no fim", () => {
  assert.equal(progresso(1), 8);
  assert.equal(progresso(12), 98);
  const passos = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(progresso);
  for (let i = 1; i < passos.length; i++) assert.ok(passos[i] > passos[i - 1]);
  assert.ok(passos[1] - passos[0] > passos[10] - passos[9]);
});

test("escolha múltipla: tocar de novo tira, a ordem é a dos toques, «Ainda nada disto» é exclusivo", () => {
  assert.deepEqual(alternar(["A", "B"], "A"), ["B"]);
  assert.deepEqual(alternar(["B"], "C"), ["B", "C"]);
  assert.deepEqual(alternar(["Site", "Logótipo"], "Ainda nada disto"), ["Ainda nada disto"]);
  assert.deepEqual(alternar(["Ainda nada disto"], "Site"), ["Site"]);
});

test("ecrã 8 pede 2 dores e, com programa/CRM, as áreas que cobre", () => {
  assert.ok(!ecraCompleto(8, { tempo: ["Marcações e agenda"], gere: "WhatsApp" }));
  assert.ok(ecraCompleto(8, { tempo: ["Marcações e agenda", "Faturação e cobranças"], gere: "WhatsApp" }));
  assert.ok(!ecraCompleto(8, { tempo: ["Marcações e agenda", "Faturação e cobranças"], gere: "Um CRM" }));
  assert.ok(ecraCompleto(8, { tempo: ["Marcações e agenda", "Faturação e cobranças"], gere: "Um CRM", cobre: ["Faturação"] }));
  assert.ok(!ecraCompleto(11, { inv: "Sim, já tenho um valor em mente" }));
  assert.ok(ecraCompleto(11, { inv: "Ainda não pensei nisso" }));
});

test("limparRespostas aceita o completo e mantém a ordem das dores", () => {
  const r = limparRespostas(completo);
  assert.ok(r);
  assert.equal(r.site, "casalume.pt");
  assert.deepEqual(r.tempo, ["Marcações e agenda", "Responder a mensagens"]);
  assert.equal(r.valor, "1.000 a 2.500 €");
});

test("limparRespostas larga os condicionais que já não se aplicam", () => {
  const r = limparRespostas({
    ...completo,
    tem: ["Logótipo"],
    satBrand: 10,
    canais: ["Recomendações"],
    gere: "WhatsApp",
    inv: "Ainda não pensei nisso",
  });
  assert.ok(r);
  for (const k of ["site", "ig", "melhorBrand", "onde", "cobre", "qualSoft", "valor"]) assert.equal(r[k], undefined, k);
});

test("limparRespostas rejeita valores fora das listas e respostas em falta", () => {
  assert.equal(limparRespostas({ ...completo, setor: "Pesca" }), null);
  assert.equal(limparRespostas({ ...completo, tempo: ["Marcações e agenda"] }), null);
  assert.equal(limparRespostas({ ...completo, satVis: 11 }), null);
  assert.equal(limparRespostas({ ...completo, cobre: [] }), null);
  assert.equal(limparRespostas({ ...completo, valor: undefined }), null);
  assert.equal(limparRespostas({ ...completo, tem: ["Site", "Ainda nada disto"] }), null);
  const { prazo, ...semPrazo } = completo;
  assert.ok(prazo);
  assert.equal(limparRespostas(semPrazo), null);
});

test("texto livre cortado a 500", () => {
  const r = limparRespostas({ ...completo, melhorVis: "x".repeat(900) });
  assert.equal(r.melhorVis.length, 500);
});

test("eventos: sem dados pessoais, ecrã só de 2 a 13, lead_id só no concluiu", () => {
  const sessao = "2b6f0cc9-4a2e-4d7b-9a1e-1f2d3c4b5a69";
  assert.deepEqual(limparEvento({ sessao, tipo: "abriu", utm: { source: "meta", foo: "x" }, email: "a@b.pt" }), {
    sessao,
    tipo: "abriu",
    utm: { source: "meta" },
    lead_id: null,
  });
  assert.equal(limparEvento({ sessao, tipo: "ecra", ecra: 1 }), null);
  assert.equal(limparEvento({ sessao, tipo: "ecra", ecra: 14 }), null);
  assert.equal(limparEvento({ sessao, tipo: "ecra", ecra: 8 }).ecra, 8);
  assert.equal(limparEvento({ sessao, tipo: "abriu", lead_id: sessao }).lead_id, null);
  assert.equal(limparEvento({ sessao, tipo: "concluiu", lead_id: sessao }).lead_id, sessao);
  assert.equal(limparEvento({ sessao: "nao-e-uuid", tipo: "abriu" }), null);
  assert.equal(limparEvento({ sessao, tipo: "outro" }), null);
});

test("utm: só as cinco chaves", () => {
  assert.deepEqual(limparUtm({ source: "meta", campaign: "calc", fbclid: "x", term: "" }), { source: "meta", campaign: "calc" });
});
