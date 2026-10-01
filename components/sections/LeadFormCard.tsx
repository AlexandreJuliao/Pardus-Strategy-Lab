"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { newEventId, trackFormInvalid, trackLead } from "@/lib/tracking";
import { scrollToEl } from "@/lib/scrollTo";
import { atribuicao } from "@/lib/attribution";
import { ROOT_DOMAIN, VERTICAL_SLUGS } from "@/lib/verticals";

// O formulário de pedido do site, igual em todo o lado: homepage e LPs (dentro
// do LeadForm) e /contacto. Um só sítio para os campos, a validação e o envio,
// para as leads chegarem sempre com a mesma forma ao n8n e ao CRM do office.

interface FormState {
  nome: string;
  telefone: string;
  email: string;
  negocio: string;
  localidade: string;
  site: string;
  mensagem: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Ordem no ecrã e nome curto, para o aviso junto ao botão. */
const OBRIGATORIOS: [keyof FormState, string][] = [
  ["nome", "Nome"],
  ["telefone", "Telemóvel"],
  ["email", "Email"],
  ["negocio", "Nome do negócio"],
  ["localidade", "Localidade"],
];

export interface LeadFormCardProps {
  /** Vai no evento Lead (content_name), na coluna "Origem" da folha e no source do office */
  origem?: string;
  formTitle?: string;
  /** o que se promete marcar depois de enviar: "para marcar a tua ___" */
  promessa?: string;
  cta?: string;
  negocioPlaceholder?: string;
  /**
   * Para onde ir depois de enviar. Por omissão descobre-se do caminho: numa
   * landing page servida em /<vertical> o obrigado é o dela, no resto do site
   * é o /obrigado normal.
   */
  thanksPath?: string;
}

export default function LeadFormCard({
  origem = "Homepage",
  formTitle = "Marcar a minha consultoria",
  promessa = "consultoria gratuita",
  cta = "Quero a consultoria gratuita",
  negocioPlaceholder = "Ex.: Clínica Sorriso, Imobiliária Horizonte…",
  thanksPath,
}: LeadFormCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const vertical = pathname.split("/")[1];
  const thanks =
    thanksPath ?? (VERTICAL_SLUGS.includes(vertical) ? `/${vertical}/obrigado` : "/obrigado");
  const [form, setForm] = useState<FormState>({
    nome: "",
    telefone: "",
    email: "",
    negocio: "",
    localidade: "",
    site: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [hp, setHp] = useState(""); // honeypot
  const formRef = useRef<HTMLFormElement>(null);

  // O preenchimento automático do browser às vezes escreve no campo sem avisar
  // o React. No envio junta-se ao estado o que está mesmo no ecrã, para não se
  // pedir outra vez um campo que a pessoa já vê preenchido.
  const lerFormulario = (): FormState => {
    const dados = formRef.current ? new FormData(formRef.current) : null;
    const valores = { ...form };
    for (const k of Object.keys(valores) as (keyof FormState)[]) {
      if (!valores[k].trim() && dados) valores[k] = String(dados.get(k) ?? "");
    }
    return valores;
  };

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (form: FormState): Errors => {
    const next: Errors = {};
    if (!form.nome.trim()) next.nome = "Diz-nos como te chamas.";
    // O primeiro contacto é por WhatsApp: sem um número que dê para lá chegar,
    // a lead fica parada. 9 algarismos é o mínimo de um número português.
    if (!form.telefone.trim()) next.telefone = "Precisamos do teu número para te enviar mensagem.";
    else if (form.telefone.replace(/\D/g, "").length < 9)
      next.telefone = "Este número não parece certo.";
    if (!form.email.trim()) next.email = "Precisamos do teu email para responder.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Este email não parece certo.";
    if (!form.negocio.trim()) next.negocio = "Diz-nos como se chama o teu negócio.";
    if (!form.localidade.trim()) next.localidade = "Diz-nos onde fica o negócio.";
    // Site e mensagem opcionais de propósito: escrever um parágrafo no telemóvel
    // é a maior barreira do formulário e quem vem de um anúncio ainda não tem o
    // problema formulado. O resto encontra-se online e tira-se na chamada.
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const valores = lerFormulario();
    setForm(valores);
    const next = validate(valores);
    setErrors(next);
    if (Object.keys(next).length) {
      // No telemóvel o erro fica acima, fora do ecrã, e o botão parece não
      // fazer nada (a 30/09 alguém carregou 9 vezes e desistiu). Leva-se a
      // pessoa ao primeiro campo em falta e o aviso repete-se junto ao botão.
      const primeiro = OBRIGATORIOS.find(([k]) => next[k])?.[0];
      const campo = primeiro && formRef.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`);
      if (campo) {
        scrollToEl(campo.closest("label") ?? campo, -120);
        campo.focus({ preventScroll: true });
      }
      trackFormInvalid(origem, Object.keys(next));
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      const eventId = newEventId();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origem,
          ...valores,
          ...atribuicao(),
          pardus_hp: hp,
          eventId,
          sourceUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error();
      await trackLead(origem, eventId);
      setSubmitted(true);
      router.push(thanks);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-[8px] border border-line bg-surface p-6 md:p-8 gold-glow">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gold gold-glow"
            >
              <Check size={32} strokeWidth={2.5} className="text-gold" />
            </motion.div>
            <p className="mt-6 font-display text-xl font-semibold text-text-primary">
              Pedido recebido!
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-text-secondary">
              Entramos em contacto em menos de 24 horas para marcar a tua {promessa}. Até já.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-5"
          >
            <p className="font-display text-lg font-semibold text-text-primary">
              {formTitle}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Nome" error={errors.nome} required>
                <input
                  className="field"
                  type="text"
                  autoComplete="name"
                  name="nome"
                  value={form.nome}
                  onChange={update("nome")}
                  placeholder="O teu nome"
                  aria-invalid={!!errors.nome}
                />
              </Field>
              <Field label="Telemóvel (WhatsApp)" error={errors.telefone} required>
                <input
                  className="field"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={update("telefone")}
                  placeholder="912 345 678"
                  aria-invalid={!!errors.telefone}
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email} required>
              <input
                className="field"
                type="email"
                autoComplete="email"
                name="email"
                  value={form.email}
                onChange={update("email")}
                placeholder="email@empresa.com"
                aria-invalid={!!errors.email}
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Nome do negócio" error={errors.negocio} required>
                <input
                  className="field"
                  type="text"
                  autoComplete="organization"
                  name="negocio"
                  value={form.negocio}
                  onChange={update("negocio")}
                  placeholder={negocioPlaceholder}
                  aria-invalid={!!errors.negocio}
                />
              </Field>
              <Field label="Localidade" error={errors.localidade} required>
                <input
                  className="field"
                  type="text"
                  autoComplete="address-level2"
                  name="localidade"
                  value={form.localidade}
                  onChange={update("localidade")}
                  placeholder="Ex.: Braga"
                  aria-invalid={!!errors.localidade}
                />
              </Field>
            </div>

            <Field label="Site ou Instagram (opcional)" error={errors.site}>
              <input
                className="field"
                type="text"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                name="site"
                  value={form.site}
                onChange={update("site")}
                placeholder="www.onegocio.pt ou @onegocio"
                aria-invalid={!!errors.site}
              />
            </Field>

            <Field label="O que gostavas de melhorar? (opcional)" error={errors.mensagem}>
              <textarea
                className="field resize-none"
                rows={3}
                name="mensagem"
                  value={form.mensagem}
                onChange={update("mensagem")}
                placeholder="O que te tira mais tempo, ou onde sentes que perdes clientes"
                aria-invalid={!!errors.mensagem}
              />
            </Field>

            {/* honeypot — invisível para humanos, apanha bots */}
            <input
              type="text"
              name="pardus_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {Object.keys(errors).some((k) => errors[k as keyof FormState]) && (
              <p role="alert" className="font-sans text-[13px] text-gold">
                Falta preencher ou corrigir:{" "}
                {OBRIGATORIOS.filter(([k]) => errors[k]).map(([, nome]) => nome).join(", ")}.
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-shine group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[4px] bg-gold py-4 font-sans font-medium text-[#0a0a0a] shadow-[0_10px_30px_-16px_rgba(212,175,96,0.6)] transition-all duration-200 ease-premium hover:bg-gold-bright hover:shadow-[0_18px_46px_-18px_rgba(212,175,96,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
            >
              {sending ? "A enviar…" : cta}
              {!sending && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>

            {sendError && (
              <p className="text-center font-sans text-[13px] text-gold">
                Não deu para enviar agora. Tenta de novo ou escreve para
                geral@pardus-lab.com.
              </p>
            )}

            {/* Absoluto: nas LPs em subdomínio, /privacidade não existe. */}
            <p className="text-center font-sans text-[12.5px] leading-relaxed text-text-muted">
              Vamos contactar-te por WhatsApp, email ou telefone apenas sobre este
              pedido.{" "}
              <a
                href={`https://${ROOT_DOMAIN}/privacidade`}
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 hover:text-text-secondary"
              >
                Política de privacidade
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="mono-tiny text-text-secondary">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </span>
      {children}
      {error && <span className="font-sans text-[13px] text-gold">{error}</span>}
    </label>
  );
}
