import { Briefcase, Check } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { opportunity, a11y } from "@/content/ar";
import { businessWhatsappLink } from "@/lib/whatsapp";

export default function Opportunity() {
  return (
    <section id="opportunity" aria-labelledby="opp-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-white hairline card-shadow-lg noise">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-bl from-gold/15 via-transparent to-cream-2" />
            <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.35),transparent_60%)] blur-3xl animate-drift" />

            <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
              <RevealGroup className="lg:col-span-7" gap={0.1}>
                <RevealItem>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white hairline px-3.5 py-1.5 text-xs font-semibold text-gold-ink">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden />
                    {opportunity.eyebrow}
                  </span>
                </RevealItem>
                <RevealItem>
                  <h2 id="opp-title" className="mt-5 text-balance text-3xl font-bold leading-[1.18] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                    {opportunity.titleParts[0]}
                    <span dir="ltr" className="whitespace-nowrap text-gold-gradient">{opportunity.titleParts[1]}</span>
                    {opportunity.titleParts[2]}
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-5 text-pretty text-lg font-medium leading-relaxed text-ink-soft">{opportunity.subtitle}</p>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-[17px]">{opportunity.text}</p>
                </RevealItem>
              </RevealGroup>

              <RevealGroup className="flex flex-col justify-center lg:col-span-5" gap={0.1} delay={0.2}>
                <RevealItem>
                  <ul className="space-y-3.5">
                    {opportunity.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 rounded-2xl bg-white/80 hairline p-4 text-[15px] text-ink-soft">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-ink">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
                <RevealItem className="mt-7">
                  <MagneticButton
                    href={businessWhatsappLink()}
                    ariaLabel={a11y.openWhatsapp}
                    className="h-14 w-full rounded-full bg-ink px-8 text-base font-semibold text-white transition-all duration-500 ease-[var(--ease-premium)] hover:bg-ink-soft hover:shadow-[0_18px_40px_-14px_rgba(10,10,12,0.6)] hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-wa" />
                    {opportunity.cta}
                  </MagneticButton>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-center text-xs leading-relaxed text-muted/80">{opportunity.disclaimer}</p>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
