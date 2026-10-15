"use client";

import { useRef } from "react";
import { Bola, Campo, Eyebrow, Logotipo } from "./ui";

// A capa da Calculadora: no telemóvel como em Main.dc.html (ecrã 0), no
// computador como em Desktop.dc.html. Um só formulário (nome + negócio) que,
// no telemóvel, fica por baixo do cartão e, no computador, à esquerda dele.

const ANALISAMOS: [string, string, string][] = [
  ["O seu site", "Se abre depressa no telemóvel e se o Google o consegue ler.", "velocidade no telemóvel e se o Google o lê"],
  ["A sua ficha no Google Maps", "Estrelas, opiniões, fotografias e horário.", "estrelas, opiniões, fotografias e horário"],
  ["Pesquisas no Google", "Se aparece quando procuram o que vende, e onde.", "se aparece quando procuram o que vende"],
  ["Anúncios", "Se tem anúncios ativos e se mede quem visita o site.", "se tem anúncios ativos e se mede as visitas"],
  ["Concorrentes da sua zona", "Como estão os negócios parecidos com o seu.", "como estão os negócios parecidos com o seu"],
  ["O seu dia a dia", "Onde perde tempo e o que pode passar a funcionar sozinho.", ""],
];

const PASSOS = [
  "Responde a perguntas rápidas, quase todas com um toque.",
  "Enquanto responde, analisamos o seu site, a ficha do Google e os anúncios.",
  "Recebe o seu número por email, com o que encontrámos online.",
];

const FAQ: [string, string][] = [
  ["É mesmo gratuito?", "Sim. Sem compromisso e sem pedir cartão."],
  ["Quanto tempo leva?", "Cerca de 3 minutos."],
  ["O que recebo?", "O investimento estimado por área e o que encontrámos online sobre o seu negócio."],
];

const BOTAO_OURO =
  "cursor-pointer rounded-[4px] border-0 bg-[#d4af60] font-bold text-[#05070e] transition-colors hover:bg-[#e2c47e]";

export default function Capa({
  nome,
  negocio,
  aoMudarNome,
  aoMudarNegocio,
  aoComecar,
  abrirPrivacidade,
}: {
  nome: string;
  negocio: string;
  aoMudarNome: (v: string) => void;
  aoMudarNegocio: (v: string) => void;
  aoComecar: () => void;
  abrirPrivacidade: () => void;
}) {
  const pronto = !!(nome.trim() && negocio.trim());
  const campoNome = useRef<HTMLInputElement>(null);

  function submeter(e: React.FormEvent) {
    e.preventDefault();
    if (pronto) aoComecar();
    else campoNome.current?.focus();
  }

  // O botão do fundo da página (computador): começa se já houver nome e
  // negócio; se não, leva ao formulário lá em cima.
  function botaoDeBaixo() {
    if (pronto) return aoComecar();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    campoNome.current?.focus();
  }

  const notaLegal = (
    <p className="m-0 text-center text-[12px] leading-[1.5] text-[#c3cde0] md:text-left md:text-[13px]">
      Gratuito · sem compromisso · resultado por email
      <br className="md:hidden" />
      <span className="hidden md:inline">. </span>
      Ao continuar, aceita a nossa{" "}
      <button type="button" onClick={abrirPrivacidade} className="cursor-pointer text-[#f0d089] underline underline-offset-2 hover:text-[#ffe7b0]">
        política de privacidade
      </button>
      .
    </p>
  );

  return (
    <div className="relative z-10 overflow-x-clip">
      {/* Os traços dourados do canto e da diagonal */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[26px] w-[26px] border-l-2 border-t-2 border-[#d4af60] md:h-10 md:w-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[150px] top-0 h-px w-[420px] origin-left rotate-[24deg] bg-[rgba(212,175,96,0.35)] md:left-[36%] md:w-[1100px] md:rotate-[18deg]"
      />

      {/* ── Herói ── */}
      <section className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col gap-[18px] px-6 pb-7 pt-[calc(26px_+_env(safe-area-inset-top))] md:min-h-[min(900px,100svh)] md:gap-0 md:px-12 md:pb-16 md:pt-[calc(48px_+_env(safe-area-inset-top))] lg:px-24">
        <header className="flex flex-col items-center gap-[18px] md:flex-row md:justify-between">
          <Logotipo className="text-[40px] tracking-[3px] md:text-[34px] md:tracking-[4px]" />
          <Eyebrow className="hidden md:block md:text-[13px]">Diagnóstico gratuito · 3 minutos</Eyebrow>
        </header>

        <div className="flex flex-1 flex-col gap-[18px] md:flex-row md:items-center md:gap-12 lg:gap-20">
          <div className="flex flex-1 flex-col gap-[18px] md:max-w-[620px] md:gap-[26px]">
            <div className="flex flex-col gap-2.5 md:gap-[26px]">
              <Eyebrow className="text-center md:hidden">Diagnóstico gratuito · 3 minutos</Eyebrow>
              <h1 className="calc-display m-0 text-center text-[40px] font-bold leading-[1.02] tracking-[-1.2px] md:text-left md:text-[clamp(52px,5vw,72px)] md:leading-none md:tracking-[-2.4px]">
                Quanto custa <span className="text-[#e2c47e]">crescer o seu Negócio?</span>
              </h1>
              <p className="m-0 text-center text-[15px] leading-[1.5] text-[#d3dbea] md:max-w-[540px] md:text-left md:text-[20px]">
                Analisamos o seu negócio online e dizemos-lhe, com números, o que melhorar primeiro
                <span className="hidden md:inline"> e quanto investir</span>.
              </p>
            </div>

            {/* Cartão do telemóvel */}
            <div className="flex flex-col gap-3 rounded-[6px] border border-[rgba(212,175,96,0.5)] bg-[rgba(8,16,38,0.42)] p-[18px] md:hidden">
              <div className="flex items-center justify-between gap-3">
                <Eyebrow className="text-[12px] tracking-[2.5px]">Recebe por email, grátis</Eyebrow>
                <p className="calc-display calc-pulsar m-0 shrink-0 whitespace-nowrap rounded-[4px] bg-[rgba(212,175,96,0.18)] px-2.5 py-1 text-[15px] font-bold text-[#f0d089]">
                  <span aria-hidden="true">?.??? €</span>
                  <span className="sr-only">Valor por revelar</span>
                </p>
              </div>
              {["Quanto investir para crescer, por área", "O que encontrámos no seu site, no Google e nos anúncios", "Como está face aos concorrentes da sua zona"].map((t) => (
                <div key={t} className="flex items-start gap-2.5">
                  <Bola className="mt-px" />
                  <p className="m-0 text-[15px] leading-[1.4]">{t}</p>
                </div>
              ))}
            </div>

            <form onSubmit={submeter} className="mt-1 flex flex-col gap-[18px] md:mt-0 md:gap-[26px]" noValidate>
              <div className="flex flex-col gap-2.5 md:flex-row md:items-end md:gap-3">
                <div className="md:flex-1">
                  <Campo
                    rotulo="Primeiro nome"
                    valor={nome}
                    aoMudar={aoMudarNome}
                    ph="Ex.: Marta"
                    autoComplete="given-name"
                    altura={52}
                    maxLength={80}
                    inputRef={campoNome}
                  />
                </div>
                <div className="md:flex-1">
                  <Campo
                    rotulo="Nome do negócio"
                    valor={negocio}
                    aoMudar={aoMudarNegocio}
                    ph="Ex.: Casa Lume"
                    autoComplete="organization"
                    altura={52}
                    maxLength={120}
                  />
                </div>
              </div>
              <button
                type="submit"
                aria-disabled={!pronto}
                className={`h-14 w-full text-[17px] md:h-[60px] md:w-auto md:self-start md:px-9 md:text-[18px] ${
                  pronto ? BOTAO_OURO : "cursor-pointer rounded-[4px] border-0 bg-[rgba(212,175,96,0.45)] font-bold text-[rgba(5,7,14,0.7)]"
                }`}
              >
                Começar o diagnóstico grátis →
              </button>
              {notaLegal}
            </form>
          </div>

          {/* Cartão do computador */}
          <aside className="hidden w-[min(520px,42vw)] shrink-0 flex-col gap-1.5 rounded-[8px] border border-[rgba(212,175,96,0.5)] bg-[rgba(8,16,38,0.45)] px-8 py-[30px] shadow-[0_30px_70px_rgba(4,10,30,0.35)] md:flex">
            <div className="flex items-center justify-between gap-4 pb-2.5">
              <Eyebrow className="text-[13px]">O que analisamos por si</Eyebrow>
              <p className="calc-display calc-pulsar m-0 shrink-0 whitespace-nowrap rounded-[4px] bg-[rgba(212,175,96,0.18)] px-3 py-1.5 text-[18px] font-bold text-[#f0d089]">
                <span aria-hidden="true">?.??? €</span>
                <span className="sr-only">Valor por revelar</span>
              </p>
            </div>
            {ANALISAMOS.filter((a) => a[2]).map(([t, , curta]) => (
              <div key={t} className="flex items-start gap-3.5 border-t border-[rgba(238,242,249,0.12)] py-3.5">
                <Bola px={24} icone={15} className="mt-px" />
                <div className="flex flex-col gap-0.5">
                  <p className="m-0 text-[17px] font-semibold">{t}</p>
                  <p className="m-0 text-[15px] text-[#c3cde0]">{curta}</p>
                </div>
              </div>
            ))}
            <p className="m-0 mt-2.5 border-t border-[rgba(212,175,96,0.4)] pt-4 text-[15px] leading-[1.5] text-[#eef2f9]">
              Recebe por email <b className="text-[#f0d089]">quanto investir, por área</b>, e tudo o que encontrámos.
            </p>
          </aside>
        </div>
        <p className="m-0 hidden text-center text-[13px] text-[#c3cde0] md:block" aria-hidden="true">
          Desça para saber como funciona ↓
        </p>
      </section>

      {/* ── Como funciona ── */}
      <section className="bg-[rgba(8,16,38,0.45)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-9 px-6 pb-[max(36px,env(safe-area-inset-bottom))] pt-10 md:gap-16 md:px-12 md:py-20 lg:px-24">
          <div className="flex flex-col gap-3.5 md:gap-[18px]">
            <div className="flex flex-col gap-3.5 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="flex flex-col gap-2.5">
                <Eyebrow>O que analisamos por si, de graça</Eyebrow>
                <h2 className="calc-display m-0 hidden text-[36px] font-bold tracking-[-0.8px] md:block">
                  Olhamos para o seu negócio como um cliente olharia.
                </h2>
                <p className="m-0 text-[15px] leading-[1.5] text-[#d3dbea] md:hidden">
                  Antes de lhe dar um número, olhamos para o seu negócio como um cliente olharia.
                </p>
              </div>
              <p className="m-0 hidden max-w-[340px] text-right text-[14px] leading-[1.5] text-[#c3cde0] md:block">
                Não pedimos acesso a nenhuma conta. Usamos só dados públicos e as suas respostas.
              </p>
            </div>
            <ul className="m-0 flex list-none flex-col border-t border-[rgba(238,242,249,0.15)] p-0 md:grid md:grid-cols-2 md:gap-x-10 md:border-t-0 lg:grid-cols-3">
              {ANALISAMOS.map(([t, d]) => (
                <li key={t} className="flex gap-3 border-b border-[rgba(238,242,249,0.15)] py-3.5 md:gap-3.5 md:border-b-0 md:border-t md:py-5">
                  <Bola px={22} icone={13} className="mt-px md:hidden" />
                  <Bola px={26} icone={15} className="mt-0.5 hidden md:flex" />
                  <div className="flex flex-col gap-0.5 md:gap-1">
                    <p className="m-0 text-[16px] font-semibold md:text-[19px]">{t}</p>
                    <p className="m-0 text-[14px] leading-[1.45] text-[#c3cde0] md:text-[16px] md:leading-[1.5]">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="m-0 text-[13px] leading-[1.5] text-[#c3cde0] md:hidden">
              Não pedimos acesso a nenhuma conta. Usamos só dados públicos e as suas respostas.
            </p>
          </div>

          <div className="flex flex-col gap-9 md:grid md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-3.5 md:gap-[18px]">
              <Eyebrow>Como funciona</Eyebrow>
              <ol className="m-0 flex list-none flex-col gap-3.5 p-0 md:gap-[18px]">
                {PASSOS.map((t, i) => (
                  <li key={t} className="flex items-start gap-3.5 md:gap-[18px]">
                    <span className="calc-display w-6 text-[26px] font-bold text-[#f0d089] md:w-[30px] md:text-[34px]" aria-hidden="true">
                      {i + 1}
                    </span>
                    <p className="m-0 mt-1 text-[15px] leading-[1.5] md:mt-1.5 md:text-[18px]">{t}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3.5 md:gap-[18px]">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <dl className="m-0 flex flex-col gap-3.5 md:gap-[18px]">
                {FAQ.map(([q, a], i) => (
                  <div
                    key={q}
                    className={`flex flex-col gap-1 ${i < FAQ.length - 1 ? "md:border-b md:border-[rgba(238,242,249,0.15)] md:pb-4" : ""}`}
                  >
                    <dt className="text-[15px] font-semibold md:text-[18px]">{q}</dt>
                    <dd className="m-0 text-[14px] leading-[1.5] text-[#c3cde0] md:text-[16px]">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <footer className="flex flex-col gap-2 border-t border-[rgba(238,242,249,0.15)] pt-5 md:flex-row md:items-center md:justify-between md:gap-6 md:pt-7">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
              <Logotipo className="text-[22px] tracking-[3px] md:text-[26px]" />
              <p className="m-0 text-[13px] leading-[1.5] text-[#c3cde0] md:text-[14px]">
                Estúdio de desenvolvimento: sites, lojas online, automações e software para negócios em Portugal.
              </p>
            </div>
            <button type="button" onClick={botaoDeBaixo} className={`hidden h-[52px] shrink-0 px-7 text-[16px] md:block ${BOTAO_OURO}`}>
              Começar o diagnóstico grátis →
            </button>
          </footer>
        </div>
      </section>
    </div>
  );
}
