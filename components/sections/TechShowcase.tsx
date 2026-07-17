"use client";

import { motion } from "framer-motion";
import { Cpu, Workflow, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import LiveChat from "@/components/ui/LiveChat";

const POINTS = [
  { icon: Cpu, t: "Inteligência que age", d: "Ligada às tuas ferramentas, faz o trabalho — não fica só a conversar." },
  { icon: Workflow, t: "Automação a sério", d: "Tarefas que acontecem sozinhas, dia e noite, sem ninguém a carregar em botões." },
  { icon: ShieldCheck, t: "Seguro desde o início", d: "Os teus dados protegidos e uma pessoa sempre pronta a intervir quando é preciso." },
];

export default function TechShowcase() {
  return (
    <section className="relative border-y border-line bg-bg-2/40 section-pad">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 85% 10%, rgba(63,107,255,0.1), transparent 60%)",
        }}
      />
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeader
            label="Ao vivo"
            title={<>Não falamos de tecnologia.<br />Mostramos.</>}
            intro="Este é o género de assistente que criamos para os nossos clientes: percebe o pedido, responde e até marca a reunião — em segundos, a qualquer hora."
          />
          <div className="mt-9 space-y-5">
            {POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] border border-line bg-white/[0.02] text-gold">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-medium text-text-primary">{p.t}</p>
                    <p className="font-sans text-sm text-text-secondary">{p.d}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiveChat />
        </motion.div>
      </div>
    </section>
  );
}
