import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/Buttons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { how } from "@/content/ar";

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], reduce ? ["100%", "100%"] : ["0%", "100%"]);

  return (
    <section id="how" aria-labelledby="how-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading id="how-title" eyebrow={how.eyebrow} title={how.title} />

        <div ref={ref} className="relative mt-16">
          {/* خط التقدّم – أفقي على سطح المكتب، عمودي على الجوال */}
          <div aria-hidden className="absolute inset-y-0 right-[27px] w-px bg-line lg:inset-x-0 lg:top-[27px] lg:right-0 lg:h-px lg:w-full">
            <motion.div style={{ height: line }} className="w-full bg-gradient-to-b from-gold-deep via-gold to-gold-light lg:hidden" />
            <motion.div style={{ width: line }} className="hidden h-full bg-gradient-to-l from-gold-deep via-gold to-gold-light lg:block" />
          </div>

          <RevealGroup as="ol" gap={0.15} className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {how.steps.map((s) => (
              <RevealItem as="li" key={s.n} className="relative flex gap-6 lg:flex-col lg:gap-7">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white hairline card-shadow text-base font-bold text-gold-ink">
                  {s.n}
                </span>
                <div className="pt-2 lg:pt-0">
                  <h3 className="text-xl font-bold text-ink sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted sm:text-base">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-14 flex justify-center" delay={0.2}>
          <WhatsAppButton size="lg">{how.cta}</WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}
