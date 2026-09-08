import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { world } from "@/content/ar";

export default function World() {
  return (
    <section id="world" aria-labelledby="world-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cream-2 to-cream" />
      <div className="container-x">
        <SectionHeading id="world-title" eyebrow={world.eyebrow} title={world.title} text={world.text} />

        {/* جوال: تمرير أفقي بـ snap · سطح المكتب: شبكة */}
        <RevealGroup
          as="ul"
          gap={0.07}
          className="scrollbar-none -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {world.categories.map((c) => {
            const Icon = c.icon;
            return (
              <RevealItem as="li" key={c.id} className="w-[78%] shrink-0 snap-center xs:w-[70%] sm:w-[60%] md:w-auto">
                <SpotlightCard className="group h-full p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br from-cream-2 to-white hairline text-gold-ink transition-all duration-500 ease-[var(--ease-premium)] group-hover:from-gold/20 group-hover:to-gold-light/30 group-hover:scale-105">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-muted/70 uppercase">{c.title}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-ink sm:text-2xl">{c.subtitle}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.desc}</p>
                  <span aria-hidden className="mt-6 block h-px w-10 bg-gradient-to-l from-gold to-transparent transition-all duration-700 ease-[var(--ease-premium)] group-hover:w-full" />
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
