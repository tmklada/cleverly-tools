import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { why } from "@/content/ar";

export default function WhyMe() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-night" />
        <div className="absolute inset-0 opacity-[0.07] grid-fade invert" />
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.22),transparent_60%)] blur-3xl animate-drift" />
      </div>

      <div className="container-x">
        <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} text={why.text} onDark />

        <RevealGroup as="ul" gap={0.08} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {why.items.map((it, i) => {
            const Icon = it.icon;
            return (
              <RevealItem as="li" key={it.title}>
                <SpotlightCard dark className="group h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-gold-light ring-1 ring-white/10 transition-all duration-500 ease-[var(--ease-premium)] group-hover:bg-gold/15 group-hover:ring-gold/30">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="mt-6 block text-[11px] font-semibold tracking-[0.2em] text-white/35">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-bold text-white">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{it.desc}</p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
