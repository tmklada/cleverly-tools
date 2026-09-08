import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { faq } from "@/content/ar";
import { EASE } from "@/lib/motion";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />

        <RevealGroup className="mx-auto mt-14 max-w-3xl divide-y divide-line rounded-[28px] bg-white hairline card-shadow" gap={0.06}>
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <RevealItem key={i} className="px-6 sm:px-8">
                <h3>
                  <button
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-start sm:py-6"
                  >
                    <span className={`text-base font-semibold transition-colors sm:text-lg ${isOpen ? "text-ink" : "text-ink-soft"}`}>
                      {it.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "rgba(201,169,97,0.18)" : "rgba(243,241,234,1)" }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gold-ink"
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
