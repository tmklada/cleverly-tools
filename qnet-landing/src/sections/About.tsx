import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppButton } from "@/components/ui/Buttons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { about } from "@/content/ar";
import { site } from "@/config/site";
import { EASE } from "@/lib/motion";

export default function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* بطاقة الصورة */}
        <div className="lg:col-span-5">
          <Reveal className="relative mx-auto max-w-md lg:max-w-none">
            <div className="glass card-shadow-lg relative rounded-[32px] p-3">
              <motion.div
                initial={reduce ? false : { clipPath: "inset(0 0 100% 0 round 24px)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0 round 24px)" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
                className="relative aspect-square overflow-hidden rounded-3xl bg-night-2"
              >
                <img
                  src={site.portrait}
                  alt={site.portraitAlt}
                  width={800}
                  height={770}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[var(--ease-premium)] hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
              </motion.div>
              {/* شريط إحصاءات */}
              <dl className="mt-3 grid grid-cols-3 divide-x divide-x-reverse divide-line rounded-2xl bg-white/70 px-2 py-4 text-center">
                {about.stats.map((s) => (
                  <div key={s.label} className="px-2">
                    <dt className="order-2 text-[11px] leading-tight text-muted">{s.label}</dt>
                    <dd dir="ltr" className="text-xl font-bold text-gold-gradient sm:text-2xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div aria-hidden className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,97,0.22),transparent_55%)] blur-2xl" />
          </Reveal>
        </div>

        {/* النص */}
        <RevealGroup className="lg:col-span-7" gap={0.1}>
          <RevealItem>
            <span className="inline-flex items-center gap-2 rounded-full bg-white hairline px-3.5 py-1.5 text-xs font-semibold text-gold-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {about.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 id="about-title" className="mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
              {about.title}
            </h2>
          </RevealItem>
          {about.paragraphs.map((p, i) => (
            <RevealItem key={i}>
              <p className={`text-pretty leading-relaxed text-muted ${i === 0 ? "mt-6 text-lg sm:text-xl text-ink-soft" : "mt-4 text-base sm:text-lg"}`}>
                {p}
              </p>
            </RevealItem>
          ))}
          <RevealItem className="mt-8">
            <WhatsAppButton size="lg">{about.cta}</WhatsAppButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
