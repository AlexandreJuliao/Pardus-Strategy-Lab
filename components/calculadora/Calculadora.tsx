"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./calculadora.css";
import Capa from "./Capa";
import ModalPrivacidade from "./ModalPrivacidade";
import { AreaTexto, Bilhete, Caixa, Campo, Cartoes, Chips, Escala, Eyebrow, Logotipo, Visto } from "./ui";
import {
  CANAIS,
  COBRE,
  ECRA_CALCULO,
  ECRA_CONTACTO,
  ECRA_OBRIGADO,
  ECRA_PRIMEIRA_PERGUNTA,
  ECRA_ULTIMA_PERGUNTA,
  EQUIPA,
  GERE,
  INV,
  MKT,
  ONDE,
  PRAZO,
  PRIOR,
  SECOES,
  SETORES,
  TEM,
  TEMPO,
  TEXTO_CONSENTIMENTO,
  TICKET,
  UTM_CHAVES,
  VALOR,
  VOLUME,
  abaixoDe10,
  alternar,
  anuncia,
  ecraCompleto,
  emailValido,
  parteCompleta,
  partesDoEcra,
  precisaCobre,
  progresso,
  telefonePT,
  temInstagram,
  temSite,
  temValor,
  type Rascunho,
  type TipoEvento,
  type Utm,
} from "@/lib/calculadora";
import { newEventId, trackCalculadoraInicio, trackCalculadoraLead } from "@/lib/tracking";

// Calculadora de Crescimento Pardus: a página inteira, um ecrã de cada vez.
// Ecrãs (como no desenho aprovado, Main.dc.html): 0 capa · 2 a 11 perguntas ·
// 12 «A calcular…» · 13 contacto · 14 obrigado.
//
// O browser só fala com as rotas do próprio site (/api/calculadora e
// /api/calculadora/evento); são elas que levam tudo ao office.
//
// Nenhum link para fora até ao obrigado: sem cabeçalho nem rodapé do site, o
// logótipo não é link, e a política de privacidade abre numa janela por cima.

/**
 * Onde se marca a conversa no fim. Sem NEXT_PUBLIC_CALCULADORA_MARCAR_URL,
 * abre o WhatsApp da Pardus (+351 930 507 433), onde a assistente marca a
 * reunião, com a mensagem já escrita.
 */
const MARCAR_URL =
  process.env.NEXT_PUBLIC_CALCULADORA_MARCAR_URL ||
  `https://wa.me/351930507433?text=${encodeURIComponent(
    "Olá! Acabei de fazer a Calculadora de Crescimento e gostava de marcar a conversa de 20 minutos.",
  )}`;

const CHAVE_SESSAO = "pardus_calc_sessao";
const CHAVE_ABRIU = "pardus_calc_abriu";

function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** O uuid desta visita, guardado no sessionStorage (apaga-se ao fechar o separador). */
function lerSessao(): string {
  try {
    const guardada = sessionStorage.getItem(CHAVE_SESSAO);
    if (guardada) return guardada;
    const nova = uuid();
    sessionStorage.setItem(CHAVE_SESSAO, nova);
    return nova;
  } catch {
    return uuid();
  }
}

const TEXTOS_CALCULO = (site?: string) => [
  site ? `A analisar ${site}` : "A procurar o seu negócio online",
  "A ver a sua ficha no Google",
  "A procurar anúncios ativos",
  "A comparar com negócios da sua zona",
];

export default function Calculadora() {
  const [ecra, setEcra] = useState(0);
  // A parte do ecrã à vista (os ecrãs 5 e 8 mostram-se em partes; ver partesDoEcra).
  const [parte, setParte] = useState(0);
  const [r, setR] = useState<Rascunho>({});
  const [nome, setNome] = useState("");
  const [negocio, setNegocio] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [consentiu, setConsentiu] = useState(false);
  const [armadilha, setArmadilha] = useState("");
  const [passo, setPasso] = useState(0);
  const [tentou, setTentou] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [privacidade, setPrivacidade] = useState<{ seccao: string | null } | null>(null);

  const sessao = useRef("");
  const ecraAtual = useRef(0);
  ecraAtual.current = ecra;
  const utm = useRef<Utm>({});
  const fbclid = useRef("");
  const vistos = useRef(new Set<number>());
  const titulo = useRef<HTMLHeadingElement>(null);
  const corpo = useRef<HTMLDivElement>(null);

  // ── Funil ────────────────────────────────────────────────────────────────
  const evento = useCallback((tipo: TipoEvento, extra: { ecra?: number; lead_id?: string | null } = {}) => {
    if (!sessao.current) return;
    try {
      void fetch("/api/calculadora/evento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessao: sessao.current, tipo, utm: utm.current, lead_id: null, ...extra }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* a contagem nunca atrapalha quem preenche */
    }
  }, []);

  // Ao abrir: a sessão, as utm e o fbclid do endereço, e o «abriu» (uma vez por sessão).
  useEffect(() => {
    sessao.current = lerSessao();
    const q = new URLSearchParams(window.location.search);
    const u: Utm = {};
    for (const k of UTM_CHAVES) {
      const v = q.get(`utm_${k}`);
      if (v) u[k] = v.slice(0, 200);
    }
    utm.current = u;
    fbclid.current = (q.get("fbclid") ?? "").slice(0, 500);

    let jaAbriu = false;
    try {
      jaAbriu = sessionStorage.getItem(CHAVE_ABRIU) === sessao.current;
      sessionStorage.setItem(CHAVE_ABRIU, sessao.current);
    } catch {
      /* sem sessionStorage conta-se na mesma */
    }
    if (!jaAbriu) evento("abriu");
  }, [evento]);

  // Cada ecrã visto conta uma vez por visita; o foco vai para o título, para
  // quem usa leitor de ecrã ouvir a pergunta nova.
  useEffect(() => {
    if (ecra >= ECRA_PRIMEIRA_PERGUNTA && ecra <= ECRA_CONTACTO && !vistos.current.has(ecra)) {
      vistos.current.add(ecra);
      evento("ecra", { ecra });
    }
    setTentou(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (corpo.current) corpo.current.scrollTop = 0;
    if (ecra !== 0) titulo.current?.focus({ preventScroll: true });
  }, [ecra, parte, evento]);

  // «A calcular…»: os quatro passos, um a cada 1,4 s, e depois o contacto.
  useEffect(() => {
    if (ecra !== ECRA_CALCULO) return;
    setPasso(0);
    let p = 0;
    const t = window.setInterval(() => {
      p += 1;
      if (p >= 5) {
        window.clearInterval(t);
        mudarEcra(ECRA_CONTACTO, "substituir");
      } else setPasso(p);
    }, 1400);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecra]);

  // ── Navegação, com o botão «voltar» do telemóvel a andar entre ecrãs ─────
  function mudarEcra(e: number, modo: "novo" | "substituir" = "novo", p = 0) {
    setEcra(e);
    setParte(p);
    try {
      if (modo === "novo") window.history.pushState({ calc: e, parte: p }, "");
      else window.history.replaceState({ calc: e, parte: p }, "");
    } catch {
      /* sem histórico, os botões da página chegam */
    }
  }

  useEffect(() => {
    const aoVoltar = (ev: PopStateEvent) => {
      const estado = ev.state as { calc?: unknown; parte?: unknown } | null;
      const alvo = estado?.calc;
      const alvoParte = typeof estado?.parte === "number" ? estado.parte : 0;
      if (ecraAtual.current === ECRA_OBRIGADO) return; // depois de enviar, não se volta ao formulário
      if (typeof alvo !== "number") {
        setEcra(0);
        setParte(0);
        return;
      }
      setEcra(alvo === ECRA_CALCULO ? ECRA_ULTIMA_PERGUNTA : alvo);
      setParte(alvo === ECRA_CALCULO ? 0 : alvoParte);
    };
    window.addEventListener("popstate", aoVoltar);
    return () => window.removeEventListener("popstate", aoVoltar);
  }, []);

  // A política abre numa janela, venha o link de onde vier (incluindo o «Saber
  // mais» do aviso de cookies).
  const abrirPrivacidade = useCallback((seccao: string | null = null) => setPrivacidade({ seccao }), []);
  const fecharPrivacidade = useCallback(() => setPrivacidade(null), []);
  useEffect(() => {
    const cliques = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (!a || a.closest("[data-calc-privacidade]") || !/^\/privacidade(#|$)/.test(href)) return;
      e.preventDefault();
      abrirPrivacidade(href.split("#")[1] || null);
    };
    document.addEventListener("click", cliques, true);
    return () => document.removeEventListener("click", cliques, true);
  }, [abrirPrivacidade]);

  // ── Respostas ────────────────────────────────────────────────────────────
  const guardar = <K extends keyof Rascunho>(k: K, v: Rascunho[K]) => setR((a) => ({ ...a, [k]: v }));
  const escolherVarios = (k: "tem" | "canais" | "onde" | "tempo" | "cobre") => (v: string) =>
    setR((a) => ({ ...a, [k]: alternar(a[k], v) }));

  function comecar() {
    if (!nome.trim() || !negocio.trim()) return;
    evento("arrancou");
    trackCalculadoraInicio();
    mudarEcra(ECRA_PRIMEIRA_PERGUNTA);
  }

  // As partes do ecrã à vista (1 na maior parte dos ecrãs).
  const partes = partesDoEcra(ecra, r);
  const p = Math.min(parte, partes - 1);
  const ultimaParte = p === partes - 1;

  function voltar() {
    if (p > 0) return mudarEcra(ecra, "novo", p - 1);
    if (ecra === ECRA_PRIMEIRA_PERGUNTA) return mudarEcra(0);
    if (ecra === ECRA_CONTACTO) return mudarEcra(ECRA_ULTIMA_PERGUNTA);
    mudarEcra(ecra - 1, "novo", partesDoEcra(ecra - 1, r) - 1);
  }

  const telefoneOk = !!telefonePT(tel);
  const emailOk = emailValido(email);
  const ok =
    ecra === ECRA_CONTACTO
      ? emailOk && telefoneOk && consentiu
      : parteCompleta(ecra, p, r) && (!ultimaParte || ecraCompleto(ecra, r));

  function avancar() {
    if (!ok) {
      setTentou(true);
      return;
    }
    if (!ultimaParte) {
      mudarEcra(ecra, "novo", p + 1);
      return;
    }
    if (ecra === ECRA_ULTIMA_PERGUNTA) {
      evento("calculou");
      mudarEcra(ECRA_CALCULO);
      return;
    }
    mudarEcra(ecra + 1);
  }

  function submeterPergunta(e: React.FormEvent) {
    e.preventDefault();
    avancar();
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    if (!ok) {
      setTentou(true);
      // Leva a pessoa ao primeiro campo por corrigir, que pode estar fora de vista.
      requestAnimationFrame(() =>
        corpo.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"], input[type="checkbox"]:not(:checked)')
          ?.focus(),
      );
      return;
    }
    setEnviando(true);
    setErroEnvio("");
    const eventId = newEventId();
    try {
      const res = await fetch("/api/calculadora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessao: sessao.current,
          nome: nome.trim(),
          negocio: negocio.trim(),
          email: email.trim(),
          telefone: tel.trim(),
          consentimento: consentiu,
          respostas: r,
          utm: utm.current,
          fbclid: fbclid.current,
          pagina: window.location.pathname,
          referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "",
          sourceUrl: window.location.href,
          eventId,
          pardus_hp: armadilha,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; lead_id?: string | null } | null;
      if (!res.ok || !json?.ok) {
        setErroEnvio(
          res.status === 422
            ? "Confirme o email e o telemóvel, e tente outra vez."
            : "Não conseguimos enviar agora. Tente outra vez dentro de instantes.",
        );
        setEnviando(false);
        return;
      }
      evento("concluiu", { lead_id: json.lead_id ?? null });
      await trackCalculadoraLead(eventId);
      setEnviando(false);
      mudarEcra(ECRA_OBRIGADO, "substituir");
    } catch {
      setErroEnvio("Não conseguimos enviar agora. Verifique a ligação e tente outra vez.");
      setEnviando(false);
    }
  }

  // ── Ecrãs ────────────────────────────────────────────────────────────────
  const neg = negocio.trim();
  const primeiroNome = nome.trim();

  let tituloEcra = "";
  let sub = "";
  /** o subtítulo pode esconder-se nos ecrãs muito baixos (.calc-ajuda) */
  let subSecundario = false;
  let blocos: React.ReactNode = null;

  if (ecra === 2) {
    tituloEcra = primeiroNome ? `Em que área trabalha, ${primeiroNome}?` : "Em que área trabalha?";
    blocos = (
      <>
        <Chips opcoes={SETORES} valor={r.setor} aoEscolher={(v) => guardar("setor", v)} rotuloPadrao="Área do negócio" />
        <Chips
          opcoes={EQUIPA}
          valor={r.equipa}
          aoEscolher={(v) => guardar("equipa", v)}
          rotulo="Quantas pessoas trabalham no negócio, contando consigo?"
        />
      </>
    );
  } else if (ecra === 3) {
    tituloEcra = "O que é que o negócio já tem?";
    sub = "Escolha tudo o que se aplica.";
    blocos = (
      <>
        <Chips opcoes={TEM} valor={r.tem} aoEscolher={escolherVarios("tem")} multi rotuloPadrao={tituloEcra} />
        {temSite(r) ? (
          <div className="flex flex-col gap-[var(--calc-gap-bloco)]">
            <Campo
              rotulo="Endereço do site (opcional)"
              valor={r.site ?? ""}
              aoMudar={(v) => guardar("site", v)}
              ph="Ex.: casalume.pt"
              autoComplete="url"
              inputMode="url"
              maxLength={300}
            />
            <p className="calc-ajuda m-0 text-[13px] leading-[1.4] text-[#c3cde0]">
              Analisamos o site por si antes de lhe enviarmos o cálculo.
            </p>
          </div>
        ) : null}
        {temInstagram(r) ? (
          <Campo rotulo="Instagram (opcional)" valor={r.ig ?? ""} aoMudar={(v) => guardar("ig", v)} ph="Ex.: @casalume" maxLength={100} />
        ) : null}
      </>
    );
  } else if (ecra === 4) {
    tituloEcra = "De 0 a 10, como avalia a imagem do seu negócio?";
    sub = "Logótipo, site, redes: tudo o que um cliente vê antes de o contactar.";
    blocos = (
      <>
        <Escala valor={r.satBrand} aoEscolher={(n) => guardar("satBrand", n)} min="0 · muito fraca" max="10 · perfeita" rotulo={tituloEcra} />
        {abaixoDe10(r.satBrand) ? (
          <AreaTexto
            rotulo="O que faltava para ser um 10?"
            valor={r.melhorBrand}
            aoMudar={(v) => guardar("melhorBrand", v)}
            ph="Ex.: o site parece antigo, o logótipo já não diz o que fazemos…"
          />
        ) : null}
      </>
    );
  } else if (ecra === 5 && p === 1) {
    // Só para quem anuncia: a pergunta que antes aparecia por baixo, agora a seguir.
    tituloEcra = "Onde anuncia?";
    blocos = <Chips opcoes={ONDE} valor={r.onde} aoEscolher={escolherVarios("onde")} multi rotuloPadrao={tituloEcra} />;
  } else if (ecra === 5) {
    tituloEcra = "Como é que os clientes novos o encontram?";
    sub = "Escolha tudo o que se aplica.";
    blocos = (
      <>
        <Chips opcoes={CANAIS} valor={r.canais} aoEscolher={escolherVarios("canais")} multi rotuloPadrao={tituloEcra} />
        <Chips opcoes={MKT} valor={r.mkt} aoEscolher={(v) => guardar("mkt", v)} rotulo="Quem trata do marketing hoje?" />
      </>
    );
  } else if (ecra === 6) {
    tituloEcra = "De 0 a 10, como avalia o número de clientes novos que chegam?";
    blocos = (
      <>
        <Escala valor={r.satVis} aoEscolher={(n) => guardar("satVis", n)} min="0 · quase nenhum" max="10 · mais do que preciso" rotulo={tituloEcra} />
        {abaixoDe10(r.satVis) ? (
          <AreaTexto
            rotulo="O que gostava que mudasse?"
            valor={r.melhorVis}
            aoMudar={(v) => guardar("melhorVis", v)}
            ph="Ex.: dependo só de recomendações, no Google só aparecem os concorrentes…"
          />
        ) : null}
      </>
    );
  } else if (ecra === 7) {
    tituloEcra = "Como é um mês normal?";
    sub = "Serve para ajustarmos o plano ao tamanho real do negócio. Fica só entre nós.";
    blocos = (
      <>
        <Chips opcoes={VOLUME} valor={r.volume} aoEscolher={(v) => guardar("volume", v)} rotulo="Quantos clientes atende, ou vendas faz, num mês normal?" />
        <Chips opcoes={TICKET} valor={r.ticket} aoEscolher={(v) => guardar("ticket", v)} rotulo="Quanto deixa, em média, cada cliente de cada vez?" />
      </>
    );
  } else if (ecra === 8 && p === 1) {
    tituloEcra = "Como gere isso hoje?";
    blocos = <Chips opcoes={GERE} valor={r.gere} aoEscolher={(v) => guardar("gere", v)} rotuloPadrao={tituloEcra} />;
  } else if (ecra === 8 && p === 2) {
    // Só com programa próprio ou CRM.
    tituloEcra = "Que áreas do negócio é que já cobre?";
    blocos = (
      <>
        <Chips opcoes={COBRE} valor={r.cobre} aoEscolher={escolherVarios("cobre")} multi rotuloPadrao={tituloEcra} />
        <Campo
          rotulo="Como se chama? (opcional)"
          valor={r.qualSoft ?? ""}
          aoMudar={(v) => guardar("qualSoft", v)}
          ph="Ex.: Moloni, Primavera, HubSpot"
          maxLength={120}
        />
      </>
    );
  } else if (ecra === 8) {
    tituloEcra = "Onde perde mais tempo todas as semanas?";
    sub = "Escolha pelo menos 2, por ordem: primeiro onde perde mais tempo.";
    blocos = (
      <Chips
        opcoes={TEMPO}
        valor={r.tempo}
        aoEscolher={escolherVarios("tempo")}
        multi
        ordem
        rotuloPadrao={tituloEcra}
        dica="Toque de novo para tirar. A ordem atualiza-se sozinha."
      />
    );
  } else if (ecra === 9) {
    tituloEcra = "De 0 a 10, como avalia a organização do dia a dia?";
    sub = "Mensagens, marcações, papéis, equipa: tudo o que acontece nos bastidores.";
    blocos = (
      <>
        <Escala valor={r.satAuto} aoEscolher={(n) => guardar("satAuto", n)} min="0 · um caos" max="10 · tudo afinado" rotulo={tituloEcra} />
        {abaixoDe10(r.satAuto) ? (
          <AreaTexto
            rotulo="Se uma tarefa pudesse passar a funcionar sozinha amanhã, qual seria?"
            valor={r.autoUma}
            aoMudar={(v) => guardar("autoUma", v)}
            ph="Ex.: responder às mesmas perguntas no WhatsApp, lembrar os clientes das marcações…"
          />
        ) : null}
      </>
    );
  } else if (ecra === 10) {
    tituloEcra = "Se só pudesse melhorar uma coisa este ano, qual seria?";
    blocos = (
      <>
        <Cartoes opcoes={PRIOR} valor={r.prior} aoEscolher={(v) => guardar("prior", v)} rotuloPadrao={tituloEcra} lado />
        <Chips opcoes={PRAZO} valor={r.prazo} aoEscolher={(v) => guardar("prazo", v)} rotulo="Para quando quer começar?" />
      </>
    );
  } else if (ecra === 11) {
    tituloEcra = "Já pensou em investir para pôr isto a andar?";
    sub = "Não há respostas certas. Ajuda-nos a propor um primeiro passo à sua medida.";
    blocos = (
      <>
        <Cartoes opcoes={INV.map((t) => [t, ""] as const)} valor={r.inv} aoEscolher={(v) => guardar("inv", v)} rotuloPadrao={tituloEcra} />
        {temValor(r) ? (
          <Chips
            opcoes={VALOR}
            valor={r.valor}
            aoEscolher={(v) => guardar("valor", v)}
            rotulo="À volta de quanto?"
            dica="Para o primeiro passo. Pode sempre ajustar depois."
          />
        ) : null}
      </>
    );
  } else if (ecra === ECRA_CONTACTO) {
    tituloEcra = "O seu número está pronto";
    sub = "Diga-nos para onde o enviamos. Revela-se no seu email em poucos minutos, com tudo o que encontrámos.";
    subSecundario = true;
    const bilhete = String(parseInt(sessao.current.replace(/-/g, "").slice(0, 6) || "0", 16) % 10000).padStart(4, "0");
    blocos = (
      <>
        <Bilhete rotulo={`Bilhete N.º ${bilhete} · ${neg || "o seu negócio"}`} />
        <div className="flex flex-col gap-[var(--calc-gap-bloco)]">
          <Campo
            rotulo="Email"
            tipo="email"
            valor={email}
            aoMudar={setEmail}
            ph="nome@empresa.pt"
            autoComplete="email"
            inputMode="email"
            erro={tentou && !emailOk ? "Escreva um email válido, por exemplo nome@empresa.pt." : undefined}
          />
          <Campo
            rotulo="Telemóvel"
            tipo="tel"
            valor={tel}
            aoMudar={setTel}
            ph="912 345 678"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            erro={tentou && !telefoneOk ? "Escreva um número português com 9 dígitos (pode começar por +351)." : undefined}
          />
          {/* Armadilha para robôs: escondida de pessoas e de leitores de ecrã. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Não preencher
              <input type="text" name="pardus_hp" tabIndex={-1} autoComplete="off" value={armadilha} onChange={(e) => setArmadilha(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Caixa marcada={consentiu} aoMudar={setConsentiu}>
            {TEXTO_CONSENTIMENTO}
          </Caixa>
          {tentou && !consentiu ? (
            <p className="m-0 pl-[34px] text-[13px] leading-[1.35] text-[#ffc9b8]">Para lhe enviarmos o cálculo, precisamos desta autorização.</p>
          ) : null}
        </div>
        <p className="m-0 text-[13px] leading-[1.4] text-[#c3cde0] [@media(max-height:700px)]:text-[12px]">
          Os seus dados não são vendidos nem cedidos a terceiros.{" "}
          <button type="button" onClick={() => abrirPrivacidade()} className="cursor-pointer text-[#f0d089] underline underline-offset-2 hover:text-[#ffe7b0]">
            Ler a política de privacidade
          </button>
          .
        </p>
      </>
    );
  }

  const naCapa = ecra === 0;
  const noFormulario = (ecra >= ECRA_PRIMEIRA_PERGUNTA && ecra <= ECRA_ULTIMA_PERGUNTA) || ecra === ECRA_CONTACTO;
  // As partes de um ecrã avançam a barra aos bocadinhos, até ao ecrã seguinte.
  const pct = noFormulario ? progresso(ecra === ECRA_CONTACTO ? 12 : ecra + p / partes) : 0;
  const dicaBarra =
    ecra >= 2 && ecra <= 3 ? "Cerca de 3 minutos" : (ecra >= 10 && ecra <= 11) || ecra === ECRA_CONTACTO ? "Quase a terminar" : "";
  const textoBotao =
    ecra === ECRA_CONTACTO ? (enviando ? "A enviar…" : "Enviar e revelar o meu número") : ecra === ECRA_ULTIMA_PERGUNTA ? "Calcular o meu número" : "Continuar";

  return (
    <div className="calc-raiz relative min-h-[100svh]" data-preso={naCapa ? undefined : ""}>
      <div className="calc-fundo" aria-hidden="true">
        <svg>
          <filter id="calc-grao">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#calc-grao)" />
        </svg>
      </div>

      {naCapa ? (
        <main>
          <Capa
            nome={nome}
            negocio={negocio}
            aoMudarNome={setNome}
            aoMudarNegocio={setNegocio}
            aoComecar={comecar}
            abrirPrivacidade={() => abrirPrivacidade()}
          />
        </main>
      ) : null}

      {noFormulario ? (
        // Preso ao ecrã: cabeçalho em cima, botão em baixo e a pergunta no meio.
        // O meio ainda pode rolar, só como rede de segurança (teclado aberto,
        // telemóvel deitado); no estado normal cada passo cabe sem scroll.
        <main className="fixed inset-0 z-10 flex flex-col overflow-hidden pt-[env(safe-area-inset-top)]">
          <div className="flex h-[var(--calc-topo)] shrink-0 items-center justify-between px-1.5 md:px-4">
            <button
              type="button"
              aria-label="Voltar à pergunta anterior"
              onClick={voltar}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] text-[#eef2f9]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <Eyebrow className="tracking-[2.5px]">{SECOES[ecra]}</Eyebrow>
            <button
              type="button"
              aria-label="Fechar e voltar ao início"
              onClick={() => mudarEcra(0)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] text-[#c3cde0]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div
            className="h-1 shrink-0 bg-[rgba(8,16,38,0.45)]"
            role="progressbar"
            aria-label="Progresso do diagnóstico"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className="h-1 bg-[#d4af60] transition-[width] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ width: `${pct}%` }} />
          </div>
          <p className="calc-ajuda mx-auto mb-0 mt-1 min-h-4 w-full max-w-[608px] px-[var(--calc-margem)] text-right text-[12px] leading-4 text-[#c3cde0]">{dicaBarra}</p>

          <form onSubmit={ecra === ECRA_CONTACTO ? enviar : submeterPergunta} className="flex min-h-0 flex-1 flex-col" noValidate>
            <div ref={corpo} data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="relative mx-auto flex w-full max-w-[608px] flex-col gap-[var(--calc-gap)] px-[var(--calc-margem)] pb-[var(--calc-corpo-pb)] pt-[var(--calc-corpo-pt)]">
                <div className="flex flex-col gap-2 [@media(max-height:700px)]:gap-1">
                  <h2
                    ref={titulo}
                    tabIndex={-1}
                    className="calc-display m-0 text-[length:var(--calc-titulo)] font-[650] leading-[1.12] tracking-[-0.6px] outline-none"
                  >
                    {tituloEcra}
                  </h2>
                  {sub ? (
                    <p className={`m-0 text-[length:var(--calc-sub)] leading-[1.4] text-[#c3cde0] ${subSecundario ? "calc-ajuda" : ""}`}>{sub}</p>
                  ) : null}
                </div>
                {blocos}
              </div>
            </div>
            {/* Sem fundo próprio: uma faixa mais escura aqui ficava a fazer degrau com a
                barra do browser, que mostra a cor de base da página. */}
            <div className="shrink-0 border-t border-[rgba(238,242,249,0.12)] pb-[max(var(--calc-rodape-pb),env(safe-area-inset-bottom))] pt-[var(--calc-rodape-pt)]">
              <div className="mx-auto w-full max-w-[608px] px-[var(--calc-margem)]">
                <p aria-live="polite" className="m-0 empty:hidden mb-2 text-center text-[13px] text-[#ffc9b8]">
                  {erroEnvio || (tentou && !ok && ecra !== ECRA_CONTACTO ? "Responda às perguntas deste passo para continuar." : "")}
                </p>
                <button
                  type="submit"
                  aria-disabled={!ok || enviando}
                  className={`h-[var(--calc-botao-h)] w-full cursor-pointer rounded-[4px] border-0 text-[17px] font-bold transition-colors ${
                    ok && !enviando ? "bg-[#d4af60] text-[#05070e] hover:bg-[#e2c47e]" : "bg-[rgba(8,16,38,0.45)] text-[#9fadc8]"
                  }`}
                >
                  {textoBotao}
                </button>
              </div>
            </div>
          </form>
        </main>
      ) : null}

      {ecra === ECRA_CALCULO ? (
        <main className="fixed inset-0 z-10 flex flex-col items-center justify-center overflow-y-auto px-[var(--calc-margem)] pb-[max(16px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
          <div className="flex w-full max-w-[480px] flex-col items-center gap-[clamp(14px,3.5dvh,30px)]">
            <div className="calc-girar box-border flex h-[var(--calc-roda)] w-[var(--calc-roda)] items-center justify-center rounded-full border-[5px] border-dashed border-[#d4af60] bg-[#0c1a36] shadow-[0_14px_36px_rgba(4,10,30,0.55)]" aria-hidden="true">
              <span className="font-wordmark text-[34px] font-semibold text-[#f0d089] [@media(max-height:700px)]:text-[26px]">P.</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 ref={titulo} tabIndex={-1} className="calc-display m-0 text-[clamp(24px,4.2dvh,30px)] font-bold leading-[1.15] tracking-[-0.6px] outline-none">
                A calcular o seu <span className="text-[#e2c47e]">número…</span>
              </h2>
              <p className="m-0 text-[15px] text-[#c3cde0]">{neg ? `Com as respostas sobre ${neg}.` : "Com as suas respostas."}</p>
            </div>
            <ol className="m-0 flex w-full list-none flex-col border-t border-[rgba(238,242,249,0.15)] p-0" aria-live="polite">
              {TEXTOS_CALCULO(temSite(r) ? r.site?.trim() || undefined : undefined).map((t, i) => {
                const feito = passo > i;
                const atual = passo === i;
                return (
                  <li key={t} className="flex items-center gap-3.5 border-b border-[rgba(238,242,249,0.15)] py-[clamp(8px,1.8dvh,14px)]">
                    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center" aria-hidden="true">
                      {feito ? (
                        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#d4af60] text-[#05070e]">
                          <Visto tamanho={15} />
                        </span>
                      ) : atual ? (
                        <span className="calc-pulsar-rapido h-3.5 w-3.5 rounded-full bg-[#f0d089]" />
                      ) : (
                        <span className="h-3 w-3 rounded-full border-2 border-[rgba(238,242,249,0.35)]" />
                      )}
                    </span>
                    <p className={`m-0 text-[15px] ${passo >= i ? "text-[#eef2f9]" : "text-[#9fadc8]"}`}>
                      {t}
                      <span className="sr-only">{feito ? " (feito)" : atual ? " (a decorrer)" : ""}</span>
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </main>
      ) : null}

      {ecra === ECRA_OBRIGADO ? (
        <main className="fixed inset-0 z-10 overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-[608px] flex-col gap-[clamp(10px,2.4dvh,20px)] px-[var(--calc-margem)] pb-[max(clamp(12px,3dvh,32px),env(safe-area-inset-bottom))] pt-[calc(clamp(12px,3.3dvh,28px)_+_env(safe-area-inset-top))]">
          <Logotipo className="text-center text-[26px] tracking-[3px] [@media(max-height:700px)]:text-[22px]" />
          <div className="flex flex-1 flex-col justify-center gap-[clamp(10px,2.6dvh,22px)]">
            <div className="box-border flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-dashed border-[#d4af60] bg-[#0c1a36] text-[#f0d089] [@media(max-height:700px)]:h-12 [@media(max-height:700px)]:w-12" aria-hidden="true">
              <Visto tamanho={26} />
            </div>
            <h2 ref={titulo} tabIndex={-1} className="calc-display m-0 text-[clamp(26px,4.4dvh,34px)] font-bold leading-[1.08] tracking-[-0.8px] outline-none">
              {`Obrigado${primeiroNome ? `, ${primeiroNome}` : ""}.`}
            </h2>
            <p className="m-0 text-[16px] leading-[1.45] text-[#d3dbea] [@media(max-height:700px)]:text-[15px]">
              {`O seu número${neg ? ` para ${neg}` : ""} vai a caminho de ${email.trim() || "o seu email"}.`}
            </p>
            <dl className="m-0 flex flex-col border-t border-[rgba(238,242,249,0.15)]">
              {[
                ["Agora", "O seu número no email, por área"],
                ["Junto", "O que encontrámos no Google, no site e nos anúncios"],
                ["Se quiser", "Uma conversa de 20 minutos, sem compromisso"],
              ].map(([q, t]) => (
                <div key={q} className="flex gap-3.5 border-b border-[rgba(238,242,249,0.15)] py-[clamp(7px,1.6dvh,14px)]">
                  <dt className="w-[72px] shrink-0 text-[12px] font-semibold uppercase tracking-[2px] text-[#e2c47e]">{q}</dt>
                  <dd className="m-0 text-[15px] leading-[1.35] [@media(max-height:700px)]:text-[14px]">{t}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={MARCAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-calc-botao
              className="flex h-[var(--calc-botao-h)] items-center justify-center rounded-[4px] bg-[#d4af60] text-[17px] font-bold text-[#05070e] no-underline transition-colors hover:bg-[#e2c47e]"
            >
              Marcar já a conversa
            </a>
            <a href="/" data-calc-botao className="flex h-11 items-center justify-center text-[14px] text-[#c3cde0] no-underline hover:text-[#eef2f9]">
              Voltar ao site
            </a>
          </div>
          </div>
        </main>
      ) : null}

      {privacidade ? <ModalPrivacidade seccao={privacidade.seccao} aoFechar={fecharPrivacidade} /> : null}
    </div>
  );
}
