import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { WhatsAppButton, GhostButton } from "@/components/ui/Buttons";
import { hero } from "@/content/ar";
import { site } from "@/config/site";
import { EASE } from "@/lib/motion";

const chipIcons = [ShieldCheck, Sparkles, Clock];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = hero.title.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-x-clip pt-28 pb-16 sm:pt-36 lg:min-h-[100svh] lg:pb-20 lg:flex lg:items-center"
    >
      {/* ── خلفية: ضوء ذهبي متحرّك + شبكة ناعمة ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,169,97,0.28),transparent_60%)] blur-3xl animate-drift" />
        <div
          className="absolute top-[30%] left-[-15%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(233,217,168,0.32),transparent_60%)] blur-3xl animate-drift"
          style={{ animationDelay: "-9s", animationDuration: "26s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />
      </div>

      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ── النص ── */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 hairline px-3.5 py-1.5 text-xs font-semibold text-gold-ink backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {hero.badge}
          </motion.span>

          <h1
            id="hero-title"
            className="mt-6 text-balance text-[2.6rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem] xl:text-[4.6rem]"
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.08 }}
              >
                {i === words.length - 1 ? <span className="text-gold-gradient animate-shimmer">{w}</span> : w}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-6 text-xl font-medium leading-snug text-ink-soft sm:text-2xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.88 }}
            className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.0 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <WhatsAppButton size="lg" className="w-full sm:w-auto">
              {hero.ctaPrimary}
            </WhatsAppButton>
            <GhostButton href="#world" size="lg" className="w-full sm:w-auto">
              ✨ {hero.ctaSecondary}
            </GhostButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
            aria-label="مزايا"
          >
            {hero.chips.map((c, i) => {
              const Icon = chipIcons[i % chipIcons.length];
              return (
                <li key={c.label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gold-deep" aria-hidden />
                  {c.label}
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* ── الصورة ── */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6">
          <motion.div style={{ y: imgY }} className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none lg:me-0">
            {/* هالة */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-[conic-gradient(from_140deg_at_50%_50%,rgba(201,169,97,0.0),rgba(201,169,97,0.35),rgba(233,217,168,0.0),rgba(201,169,97,0.25),rgba(201,169,97,0))] blur-2xl"
            />

            <motion.figure
              initial={reduce ? false : { opacity: 0, scale: 1.04, clipPath: "inset(12% 8% 12% 8% round 36px)", filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 36px)", filter: "blur(0px)" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
              className="relative aspect-[4/5] max-h-[62svh] w-full overflow-hidden rounded-[36px] bg-night-2 lg:max-h-none lg:aspect-[5/6]"
            >
              <img
                src={site.portrait}
                alt={site.portraitAlt}
                width={800}
                height={770}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              {/* تدرّج سفلي + شريط اسم */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
              <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[36px]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-white sm:text-2xl">{site.name}</p>
                    <p className="mt-1 text-sm text-white/70">{site.role} · {site.roleLatin}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold-light ring-1 ring-white/15 backdrop-blur sm:inline-flex">
                    QNET
                  </span>
                </div>
              </figcaption>
            </motion.figure>

            {/* عناصر عائمة */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
              className="absolute -top-4 -right-3 hidden sm:block lg:-right-6 animate-float"
            >
              <div className="glass card-shadow-lg flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-wa/15 text-wa-deep">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-ink">رد شخصي</p>
                  <p className="text-[12px] text-muted">عبر واتساب</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.25 }}
              className="absolute bottom-28 -right-4 hidden sm:block lg:-right-8 animate-float-slow"
            >
              <div className="glass card-shadow-lg flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/20 text-gold-ink">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-ink">بدون التزام</p>
                  <p className="text-[12px] text-muted">اسأل بحرّية</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── مؤشر التمرير ── */}
      <motion.a
        href="#about"
        aria-label={hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 text-[11px] font-medium tracking-widest text-muted lg:flex"
      >
        <span>{hero.scroll}</span>
        <span className="relative h-9 w-5 rounded-full border border-ink/15">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold animate-scroll-dot" />
        </span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </motion.a>
    </section>
  );
}
