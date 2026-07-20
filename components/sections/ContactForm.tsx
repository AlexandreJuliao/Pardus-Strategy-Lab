"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

interface FormState {
  nome: string;
  email: string;
  empresa: string;
  tipo: string;
  mensagem: string;
  budget: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const TIPOS = [
  "Website", "E-commerce", "Sistema de IA", "App Empresarial",
  "Chatbot & Automação", "Consultoria", "Outro",
];
const BUDGETS = [
  "Até 1.000€", "1.000€ – 3.000€", "3.000€ – 6.000€", "Mais de 6.000€", "Ainda não sei",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    nome: "", email: "", empresa: "", tipo: "", mensagem: "", budget: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.nome.trim()) next.nome = "Indica o teu nome.";
    if (!form.email.trim()) next.email = "Indica o teu email.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Email inválido.";
    if (!form.empresa.trim()) next.empresa = "Indica a tua empresa.";
    if (!form.tipo) next.tipo = "Escolhe o tipo de projeto.";
    if (!form.budget) next.budget = "Escolhe um budget.";
    if (!form.mensagem.trim()) next.mensagem = "Escreve uma mensagem.";
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
        body: JSON.stringify({ origem: "Contacto", ...form, website: hp }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      router.push("/obrigado");
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-[8px] border border-line bg-surface p-6 md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
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
              Mensagem recebida!
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm text-text-secondary">
              Obrigado. Entramos em contacto em menos de 24 horas.
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Nome" error={errors.nome} required>
                <input className="field" type="text" value={form.nome} onChange={update("nome")} placeholder="O teu nome" aria-invalid={!!errors.nome} />
              </Field>
              <Field label="Email" error={errors.email} required>
                <input className="field" type="email" value={form.email} onChange={update("email")} placeholder="email@empresa.com" aria-invalid={!!errors.email} />
              </Field>
            </div>

            <Field label="Empresa" error={errors.empresa} required>
              <input className="field" type="text" value={form.empresa} onChange={update("empresa")} placeholder="Nome da tua empresa" aria-invalid={!!errors.empresa} />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Tipo de projeto" error={errors.tipo} required>
                <select className="field" value={form.tipo} onChange={update("tipo")} aria-invalid={!!errors.tipo}>
                  <option value="" disabled>Seleciona…</option>
                  {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Budget" error={errors.budget} required>
                <select className="field" value={form.budget} onChange={update("budget")} aria-invalid={!!errors.budget}>
                  <option value="" disabled>Seleciona…</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Mensagem" error={errors.mensagem} required>
              <textarea className="field resize-none" rows={5} value={form.mensagem} onChange={update("mensagem")} placeholder="Conta-nos sobre o teu projeto…" aria-invalid={!!errors.mensagem} />
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
              className="btn-shine group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-gold py-4 font-sans font-medium text-[#0a0a0a] shadow-[0_10px_30px_-16px_rgba(212,175,96,0.6)] transition-all duration-200 ease-premium hover:bg-gold-bright hover:shadow-[0_18px_46px_-18px_rgba(212,175,96,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
            >
              {sending ? "A enviar…" : "Pedir consultoria gratuita"}
              {!sending && (
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              )}
            </button>

            {sendError && (
              <p className="text-center font-sans text-[13px] text-gold">
                Não deu para enviar agora. Tenta de novo ou escreve direto para
                geral@pardus-lab.com.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label, error, required, children,
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
