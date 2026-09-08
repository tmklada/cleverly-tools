import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppButton } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/ar";
import { EASE } from "@/lib/motion";

export default function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" aria-labelledby="final-title" className="relative isolate overflow-x-clip py-28 sm:py-36 lg:py-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-night" />
        <div className="absolute inset-0 opacity-[0.06] grid-fade invert" />
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.28),transparent_60%)] blur-3xl animate-drift" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(37,211,102,0.14),transparent_60%)] blur-3xl animate-drift" style={{ animationDelay: "-11s" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="container-x text-center">
        <h2 id="final-title" className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-8xl">
          {finalCta.title.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.15 }}
            >
              {i === 1 ? <span className="text-gold-gradient animate-shimmer">{line}</span> : line}
            </motion.span>
          ))}
        </h2>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">{finalCta.text}</p>
        </Reveal>

        <Reveal delay={0.4} className="mt-11 flex justify-center">
          <WhatsAppButton size="xl" onDark className="w-full sm:w-auto">
            {finalCta.cta}
          </WhatsAppButton>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-7 text-sm tracking-wide text-white/45">{finalCta.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
