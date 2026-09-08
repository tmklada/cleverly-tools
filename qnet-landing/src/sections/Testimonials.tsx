import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/content/ar";

/**
 * ⚠️ PLACEHOLDER TESTIMONIALS
 * كل الشهادات هنا نماذج فارغة (isPlaceholder: true) – استبدلها في src/content/ar.ts
 * بشهادات حقيقية وبموافقة أصحابها فقط.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-cream-2 to-cream" />
      <div className="container-x">
        <SectionHeading id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <RevealGroup
          as="ul"
          gap={0.09}
          className="scrollbar-none -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {testimonials.items.map((t, i) => (
            <RevealItem as="li" key={i} className="w-[84%] shrink-0 snap-center sm:w-[60%] md:w-auto" data-placeholder={t.isPlaceholder ? "true" : undefined}>
              <SpotlightCard as="article" className="relative flex h-full flex-col p-7 sm:p-8">
                {t.isPlaceholder && (
                  <span className="absolute left-4 top-4 rounded-full bg-cream-2 px-2.5 py-1 text-[10px] font-semibold text-muted">
                    {testimonials.placeholderBadge}
                  </span>
                )}
                <Quote className="h-7 w-7 text-gold/70" strokeWidth={1.5} aria-hidden />
                <p className="mt-5 flex-1 text-pretty text-[15px] leading-relaxed text-ink-soft sm:text-base">{t.text}</p>
                <footer className="mt-7 flex items-center gap-3">
                  <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cream-2 to-white hairline text-sm font-bold text-gold-ink">
                    {i + 1}
                  </span>
                  <div className="leading-tight">
                    <p className="text-[15px] font-semibold text-ink">{t.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                  </div>
                </footer>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
