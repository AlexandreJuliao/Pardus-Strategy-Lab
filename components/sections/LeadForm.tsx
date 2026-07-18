"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, Search, Map, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  negocio: string;
  mensagem: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  {
    icon: Search,
    title: "Olhamos para o teu negócio",
    desc: "Percebemos como trabalhas hoje e onde se está a perder tempo, dinheiro ou clientes.",
  },
  {
    icon: Map,
    title: "Dizemos-te o que faz sentido",
    desc: "Onde a inteligência artificial pode automatizar trabalho, e o que muda com um site, uma loja ou um assistente.",
  },
  {
    icon: HeartHandshake,
    title: "Sem compromisso",
    desc: "Sais com um caminho claro na mão, avancemos juntos ou não. A conversa é tua para levar.",
  },
];

export default function LeadForm() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    telefone: "",
    negocio: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.nome.trim()) next.nome = "Diz-nos como te chamas.";
    if (!form.email.trim()) next.email = "Precisamos do teu email para responder.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Este email não parece certo.";
    if (!form.negocio.trim()) next.negocio = "Conta-nos o que fazes.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origem: "Homepage", ...form, website: hp }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="consultoria"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-bg-2/50 section-pad"
    >
      <AuroraGlow variant="cta" />
      <div className="shell relative z-10 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* the offer */}
        <div>
          <SectionHeader
            label="Consultoria gratuita"
            title={
              <>
                Meia hora que pode mudar
                <br />o teu <span className="text-gold">próximo ano</span>
              </>
            }
            intro="Marca uma conversa connosco, sem custo nenhum. Olhamos para o teu negócio e dizemos-te com honestidade o que faz sentido — e o que não faz."
          />

          <div className="mt-10 space-y-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-medium text-text-primary">
                      {s.title}
                    </p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
            {["Sem custo", "Sem compromisso", "Resposta em 24h"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check size={14} strokeWidth={2.6} className="text-gold" />
                <span className="font-sans text-[13.5px] text-text-secondary">{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* the form */}
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
                  Entramos em contacto em menos de 24 horas para marcar a tua
                  consultoria gratuita. Até já.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-5"
              >
                <p className="font-display text-lg font-semibold text-text-primary">
                  Marcar a minha consultoria
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Nome" error={errors.nome} required>
                    <input
                      className="field"
                      type="text"
                      value={form.nome}
                      onChange={update("nome")}
                      placeholder="O teu nome"
                      aria-invalid={!!errors.nome}
                    />
                  </Field>
                  <Field label="Email" error={errors.email} required>
                    <input
                      className="field"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="email@empresa.com"
                      aria-invalid={!!errors.email}
                    />
                  </Field>
                </div>

                <Field label="Telemóvel" error={errors.telefone}>
                  <input
                    className="field"
                    type="tel"
                    value={form.telefone}
                    onChange={update("telefone")}
                    placeholder="Opcional — se preferires que te liguemos"
                  />
                </Field>

                <Field label="O teu negócio" error={errors.negocio} required>
                  <input
                    className="field"
                    type="text"
                    value={form.negocio}
                    onChange={update("negocio")}
                    placeholder="Ex.: clínica, loja, imobiliária, restaurante…"
                    aria-invalid={!!errors.negocio}
                  />
                </Field>

                <Field label="O que gostavas de melhorar?" error={errors.mensagem}>
                  <textarea
                    className="field resize-none"
                    rows={4}
                    value={form.mensagem}
                    onChange={update("mensagem")}
                    placeholder="Opcional — o que te tira mais tempo, ou onde sentes que perdes clientes."
                  />
                </Field>

                {/* honeypot — invisível para humanos, apanha bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-shine group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[4px] bg-gold py-4 font-sans font-medium text-[#0a0a0a] shadow-[0_10px_30px_-16px_rgba(212,175,96,0.6)] transition-all duration-200 ease-premium hover:bg-gold-bright hover:shadow-[0_18px_46px_-18px_rgba(212,175,96,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
                >
                  {sending ? "A enviar…" : "Quero a consultoria gratuita"}
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

                <p className="text-center font-sans text-[12.5px] text-text-muted">
                  Sem custo e sem compromisso. Só te contactamos por causa disto.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
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
