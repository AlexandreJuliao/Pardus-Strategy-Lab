"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Investimento — disclosure by layers:
 *   1. Sites (priced, the hook)
 *   2. "Pôr o site a trabalhar" — add-ons framed by outcome, low anchors
 *   3. Algo à medida — invitation, no number (price needs context)
 *   4. Não sabes por onde começar? — the free-call door for the undecided
 * Every "desde" is a floor; the real quote is built with the client.
 */

const SITES = [
  { name: "Landing page", desc: "Uma página, feita para captar.", price: "399€" },
  { name: "Site profissional", desc: "Vários separadores, à tua medida.", price: "899€" },
  { name: "Loja online", desc: "Vende a qualquer hora, sem comissões.", price: "1.899€" },
];

const WORK = [
  { outcome: "Responde aos clientes a qualquer hora", label: "Assistente / chatbot", price: "499€" },
  { outcome: "Organiza leads e clientes num só sítio", label: "CRM à medida", price: "900€" },
  { outcome: "Automatiza o trabalho que se repete", label: "Automações & integrações", price: "700€" },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-8 bg-gold/50" />
      <span className="mono-tiny text-gold">{children}</span>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="investimento" className="relative section-pad">
      <AuroraGlow variant="pricing" />
      <div className="shell relative z-10">
        <SectionHeader
          label="// Investimento"
          title={<>Preços claros, <span className="accent-serif text-gold">sem letra pequena.</span></>}
          intro="Mostramos o ponto de partida de tudo o que fazemos. O valor final fecha-se contigo, antes de começar — e adaptamo-nos à forma de pagamento que te der mais jeito."
        />

        {/* 1 — sites */}
        <div className="mt-14">
          <Kicker>O teu site</Kicker>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {SITES.map((s) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="spotlight-card group relative flex flex-col rounded-[8px] border border-line bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface"
              >
                <span className="spotlight-glow" aria-hidden />
                <p className="font-display text-xl font-semibold text-text-primary">{s.name}</p>
                <p className="mt-2 flex-1 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="mono-tiny text-text-muted">desde</span>
                  <span className="font-display text-[28px] font-semibold text-gold">{s.price}</span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2 — add-ons by outcome */}
        <div className="mt-16">
          <Kicker>Pôr o site a trabalhar</Kicker>
          <div className="overflow-hidden rounded-[8px] border border-line">
            {WORK.map((w, i) => (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3 border-b border-line bg-surface/40 p-6 transition-colors duration-300 last:border-b-0 hover:bg-surface sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-7"
              >
                <div>
                  <p className="font-display text-[19px] font-semibold text-text-primary">
                    {w.outcome}
                  </p>
                  <p className="mt-1 font-sans text-[14px] text-text-secondary">{w.label}</p>
                </div>
                <p className="flex shrink-0 items-baseline gap-2 sm:justify-end">
                  <span className="mono-tiny text-text-muted">desde</span>
                  <span className="font-display text-[24px] font-semibold text-gold">{w.price}</span>
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-3 font-sans text-[13.5px] text-text-muted">
            Somam-se a um site ou funcionam à parte. O preço por canal e as ligações fecham-se na proposta.
          </p>
        </div>

        {/* 3 + 4 — à medida (invitation) + consultoria (undecided) */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-[10px] border border-line bg-surface/50 p-8 md:p-9"
          >
            <div>
              <p className="font-display text-[22px] font-semibold text-text-primary">
                Algo maior, <span className="accent-serif text-gold">à medida.</span>
              </p>
              <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-text-secondary">
                Um sistema de gestão, uma app, inteligência artificial à volta do teu
                negócio. Desenhamos contigo, de raiz — o orçamento nasce do teu caso.
              </p>
            </div>
            <div className="mt-7">
              <CtaButton variant="outline" size="md">
                Falar do projeto <ArrowUpRight size={16} />
              </CtaButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="card-cream flex flex-col justify-between rounded-[16px] p-8 md:p-9"
          >
            <div>
              <p className="font-display text-[22px] font-semibold text-cream-ink">
                Não sabes por onde <span className="accent-serif text-cream-ink">começar?</span>
              </p>
              <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-[#4a3c22]">
                A maioria chega sem saber ao certo o que precisa. Em 20 minutos, sem
                custo, dizemos-te o que faz sentido — e o que não vale a pena.
              </p>
            </div>
            <div className="mt-7">
              <CtaButton variant="inverse" size="md">
                Consultoria gratuita <ArrowRight size={16} />
              </CtaButton>
            </div>
          </motion.div>
        </div>

        {/* footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center font-sans text-[14px] text-text-secondary"
        >
          Adaptamo-nos a <span className="text-gold">várias formas de pagamento</span>.
          Precisas de acompanhamento contínuo? Avenças{" "}
          <span className="text-text-primary">desde 90€/mês</span>.
        </motion.p>
      </div>
    </section>
  );
}
