"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AuroraGlow from "@/components/ui/AuroraGlow";
import CtaButton from "@/components/ui/CtaButton";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Investimento — a oferta em 3 pilares (fechada a 19/10/2026; fonte: «Pardus — Oferta e preços»):
 *   1. Branding — uma imagem digital sólida (site, loja, ficha Google, acompanhamento)
 *   2. Captar — clientes novos pelo Google (arrumar a casa, gestão, anúncios, página de destino)
 *   3. Organizar — um sistema só para a operação (vende-se o diagnóstico, nunca o sistema)
 * "desde" = chão (só o site e a loja variam com o negócio); tudo o resto é preço fixo.
 * Valores sem IVA. Preço no código = `lib/lead-briefing/catalogo.ts` do Pardus OS: mudar um é mudar os dois, no mesmo dia.
 */

/** Alterações fora do âmbito, por hora (fechado a 19/10/2026). Troca-se só aqui. */
const PRECO_HORA = 45;

type Preco = { valor: string; desde?: boolean; unidade?: string };

const BRANDING: { name: string; desc: string; preco: Preco }[] = [
  { name: "Site profissional", desc: "Pensado para o que vendes, com a ficha Google ligada ao site.", preco: { valor: "890€", desde: true } },
  { name: "Loja online", desc: "Vende a qualquer hora, sem comissões.", preco: { valor: "1.890€", desde: true } },
  { name: "Ficha Google", desc: "Taxa fixa, feita dentro de um site ou de uma loja.", preco: { valor: "95€" } },
  { name: "Acompanhamento", desc: "Painel com as métricas do site e das redes, depois da entrega. Ou 250€ por ano. Alterações não incluídas.", preco: { valor: "25€", unidade: "/mês" } },
];

const CAPTAR: { outcome: string; label: string; preco: Preco }[] = [
  { outcome: "Põe a casa em ordem antes de gastar em anúncios", label: "Arrumar a casa: ficha Google, medição de chamadas, formulários, WhatsApp e conta de anúncios", preco: { valor: "100€", unidade: "uma vez" } },
  { outcome: "Aparece a quem procura no Google", label: "Gestão de Google Ads, com otimização e relatório no painel", preco: { valor: "150€", unidade: "/mês" } },
  { outcome: "Os anúncios, pagos por ti direto à Google", label: "Mínimo de 240€ por mês; sobe em setores de clique caro", preco: { valor: "240€", desde: true, unidade: "/mês" } },
  { outcome: "Uma página feita para captar", label: "Página de destino, só se ainda não tiveres um site que sirva", preco: { valor: "390€" } },
];

function Kicker({ n, nome, hint }: { n: string; nome: string; hint: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gold/50" />
        <span className="mono-tiny text-gold">{n} · {nome}</span>
      </div>
      <p className="mt-2 font-sans text-[14.5px] text-text-secondary">{hint}</p>
    </div>
  );
}

function PrecoTag({ p, size }: { p: Preco; size: string }) {
  return (
    <p className="flex items-baseline gap-2">
      {p.desde && <span className="mono-tiny text-text-muted">desde</span>}
      <span className={`font-display font-semibold text-gold ${size}`}>{p.valor}</span>
      {p.unidade && <span className="mono-tiny text-text-muted">{p.unidade}</span>}
    </p>
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
          intro="Ajudamos o negócio a ter uma imagem digital sólida, a captar clientes e a organizar-se. Três caminhos, cada um com o preço à vista: escolhe pelo que te está a faltar. O valor final fecha-se contigo antes de começar."
        />

        {/* 1 — Branding */}
        <div className="mt-14">
          <Kicker n="1" nome="Branding" hint="Não te encontram, ou não passas confiança online." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="snap-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
          >
            {BRANDING.map((s) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                className="spotlight-card group relative flex w-[76%] shrink-0 snap-start flex-col rounded-[8px] border border-line bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-surface sm:w-auto"
              >
                <span className="spotlight-glow" aria-hidden />
                <p className="font-display text-xl font-semibold text-text-primary">{s.name}</p>
                <p className="mt-2 flex-1 font-sans text-[14.5px] leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
                <div className="mt-6">
                  <PrecoTag p={s.preco} size="text-[28px]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2 — Captar */}
        <div className="mt-16">
          <Kicker n="2" nome="Captar" hint="Não te chegam clientes novos. Primeiro arrumamos a casa, depois ligamos os anúncios." />
          <div className="overflow-hidden rounded-[8px] border border-line">
            {CAPTAR.map((w, i) => (
              <motion.div
                key={w.outcome}
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
                <div className="shrink-0 sm:text-right">
                  <PrecoTag p={w.preco} size="text-[24px]" />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-3 font-sans text-[13.5px] text-text-muted">
            Na prática: 490€ no primeiro mês e 390€ por mês a partir daí, dos quais 240€ são anúncios
            que pagas diretamente à Google. Contrato mínimo de 3 meses.
          </p>
        </div>

        {/* 3 — Organizar */}
        <div className="mt-16">
          <Kicker n="3" nome="Organizar" hint="Chegam pedidos e está tudo desorganizado." />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 rounded-[8px] border border-line bg-surface/40 p-6 transition-colors duration-300 hover:bg-surface sm:flex-row sm:items-center sm:justify-between md:px-8 md:py-7"
          >
            <div className="max-w-xl">
              <p className="font-display text-[19px] font-semibold text-text-primary">
                Um sistema só para a operação, começando pelo diagnóstico
              </p>
              <p className="mt-1 font-sans text-[14px] leading-relaxed text-text-secondary">
                90 minutos contigo e um mapa de uma página com as áreas de que o negócio precisa e o
                preço fechado. Se avançares em 30 dias, os 150€ abatem ao projeto.
              </p>
            </div>
            <div className="shrink-0 sm:text-right">
              <PrecoTag p={{ valor: "150€", unidade: "diagnóstico" }} size="text-[24px]" />
            </div>
          </motion.div>
          <p className="mt-3 font-sans text-[13.5px] text-text-muted">
            Uma base comum a tudo e módulos por área: equipa, marcações e serviços, stock e compras,
            faturação e cobranças, atendimento. O preço do sistema fecha-se no diagnóstico, não antes.
          </p>
        </div>

        {/* consultoria (undecided) */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="card-cream flex flex-col justify-between gap-7 rounded-[16px] p-8 md:flex-row md:items-center md:p-9"
          >
            <div>
              <p className="font-display text-[22px] font-semibold text-cream-ink">
                Não sabes por onde <span className="accent-serif text-cream-ink">começar?</span>
              </p>
              <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-[#4a3c22]">
                A maioria chega sem saber ao certo o que precisa. Em 20 minutos, sem
                custo, dizemos-te o que faz sentido, e o que não vale a pena.
              </p>
            </div>
            <div className="shrink-0">
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
          Adaptamo-nos a <span className="text-gold">várias formas de pagamento</span>. Domínio,
          alojamento e conta de anúncios ficam em teu nome ou passam ao custo. Alterações fora do
          âmbito: <span className="text-text-primary">{PRECO_HORA}€/hora</span>.
        </motion.p>
      </div>
    </section>
  );
}
