"use client";

import { useState } from "react";
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
  "Menos de 5.000€", "5.000€ – 15.000€", "15.000€ – 30.000€",
  "Mais de 30.000€", "A definir",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nome: "", email: "", empresa: "", tipo: TIPOS[0], mensagem: "", budget: BUDGETS[4],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

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
    if (!form.mensagem.trim()) next.mensagem = "Escreve uma mensagem.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
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

            <Field label="Empresa" error={errors.empresa}>
              <input className="field" type="text" value={form.empresa} onChange={update("empresa")} placeholder="Opcional" />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Tipo de projeto">
                <select className="field" value={form.tipo} onChange={update("tipo")}>
                  {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Budget">
                <select className="field" value={form.budget} onChange={update("budget")}>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Mensagem" error={errors.mensagem} required>
              <textarea className="field resize-none" rows={5} value={form.mensagem} onChange={update("mensagem")} placeholder="Conta-nos sobre o teu projeto…" aria-invalid={!!errors.mensagem} />
            </Field>

            <button
              type="submit"
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-gold py-4 font-sans font-medium text-[#0a0a0a] transition-all duration-200 ease-premium hover:bg-gold-bright hover:shadow-[0_0_30px_-6px_rgba(212,175,96,0.55)]"
            >
              Pedir consultoria gratuita
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
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
