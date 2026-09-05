"use client";

import { motion } from "framer-motion";
import { MessageCircle, Star, Wrench, Droplets, Flame } from "lucide-react";
import MockFrame from "./MockFrame";

/**
 * O "produto" debaixo do hero: um site de cliente fictício (Canalizações
 * Ribeiro) a receber pedidos. Cream por dentro, para contrastar com a LP navy
 * e ler-se como um site real, não como a nossa UI.
 */
export default function MockSite() {
  return (
    <div className="relative">
      <MockFrame url="canalizacoesribeiro.pt">
        <div className="relative bg-[#f3efe6] text-[#1a1610]">
          {/* nav */}
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3 md:px-8">
            <span className="font-display text-[15px] font-bold tracking-tight">
              Ribeiro<span className="text-[#b8923f]">.</span>
            </span>
            <span className="hidden gap-6 font-sans text-[11px] text-black/55 md:flex">
              <span>Serviços</span>
              <span>Urgências 24h</span>
              <span>Sobre</span>
              <span>Contactos</span>
            </span>
            <span className="rounded-[4px] bg-[#1a1610] px-3 py-1.5 font-sans text-[11px] font-medium text-[#f3efe6]">
              Pedir orçamento
            </span>
          </div>

          {/* hero do site fictício */}
          <div className="grid grid-cols-1 gap-6 px-5 pb-6 pt-7 md:grid-cols-[1.15fr_1fr] md:px-8 md:pb-9 md:pt-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/60 px-2.5 py-1 font-sans text-[10px] font-medium text-black/60">
                <Star size={10} className="fill-[#e0a92c] text-[#e0a92c]" />
                4,9 · 132 avaliações no Google
              </span>
              <h3 className="mt-3 font-display text-[clamp(20px,3vw,34px)] font-bold leading-[1.05] tracking-tight">
                Canalizador em Lisboa,
                <br />
                na sua porta em <span className="text-[#b8923f]">60 minutos.</span>
              </h3>
              <p className="mt-3 max-w-sm font-sans text-[12px] leading-relaxed text-black/60 md:text-[13px]">
                Desentupimentos, fugas e esquentadores. Orçamento fechado antes de começar, 24 horas por dia.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-[4px] bg-[#b8923f] px-3.5 py-2 font-sans text-[11.5px] font-semibold text-[#1a1610]">
                  Pedir orçamento grátis
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-black/[0.12] bg-white/70 px-3 py-2 font-sans text-[11.5px] font-medium">
                  <MessageCircle size={13} className="text-[#25D366]" />
                  WhatsApp
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 self-end md:gap-3">
              {[
                { icon: Droplets, t: "Desentupimentos" },
                { icon: Wrench, t: "Fugas de água" },
                { icon: Flame, t: "Esquentadores" },
              ].map(({ icon: Icon, t }) => (
                <div
                  key={t}
                  className="rounded-[8px] border border-black/[0.06] bg-white/70 p-2.5 md:p-3.5"
                >
                  <Icon size={15} className="text-[#b8923f]" strokeWidth={1.8} />
                  <p className="mt-2 font-sans text-[10px] font-medium leading-tight md:text-[11.5px]">
                    {t}
                  </p>
                  <span className="mt-1.5 block h-1 w-8 rounded-full bg-black/[0.08]" />
                  <span className="mt-1 block h-1 w-12 rounded-full bg-black/[0.06]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </MockFrame>

      {/* notificações flutuantes: o site a trabalhar */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-2 top-6 hidden items-center gap-3 rounded-[10px] border border-line bg-[#0b0f1a]/95 p-3 pr-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur md:flex lg:-right-10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
          <MessageCircle size={16} />
        </span>
        <div className="leading-tight">
          <p className="font-sans text-[12.5px] font-medium text-text-primary">Novo pedido de orçamento</p>
          <p className="font-sans text-[11px] text-text-secondary">Odivelas · há 2 minutos</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12, x: -8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-2 bottom-8 hidden items-center gap-3 rounded-[10px] border border-line bg-[#0b0f1a]/95 p-3 pr-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur md:flex lg:-left-10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-display text-[13px] font-bold text-gold">
          1.º
        </span>
        <div className="leading-tight">
          <p className="font-sans text-[12.5px] font-medium text-text-primary">Google: «canalizador lisboa»</p>
          <p className="font-sans text-[11px] text-text-secondary">Primeira página, primeiro resultado</p>
        </div>
      </motion.div>
    </div>
  );
}
