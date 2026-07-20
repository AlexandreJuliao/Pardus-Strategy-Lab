"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_ITEMS as QA } from "@/lib/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative section-pad">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            label="// FAQ"
            title={<>Perguntas frequentes</>}
            intro="O que precisas de saber antes de começarmos."
          />

          <div className="flex flex-col">
            {QA.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-line last:border-b-0">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-[17px] font-medium transition-colors ${
                        isOpen ? "text-gold" : "text-text-primary"
                      }`}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={20}
                      className={`shrink-0 text-gold transition-transform duration-300 ease-premium ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 font-sans text-[15px] leading-relaxed text-text-secondary">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
