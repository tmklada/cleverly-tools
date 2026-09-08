import { useCallback, useState } from "react";
import { ArrowUpLeft, Check, ImageIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Modal from "@/components/ui/Modal";
import MagneticButton from "@/components/ui/MagneticButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { products, type Product } from "@/content/ar";
import { productWhatsappLink } from "@/lib/whatsapp";
import { a11y } from "@/content/ar";

export default function Products() {
  const [active, setActive] = useState<Product | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="products" aria-labelledby="products-title" className="relative overflow-x-clip py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading id="products-title" eyebrow={products.eyebrow} title={products.title} text={products.text} />

        <RevealGroup
          as="ul"
          gap={0.07}
          className="scrollbar-none -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
        >
          {products.items.map((p) => (
            <RevealItem as="li" key={p.id} className="w-[82%] shrink-0 snap-center sm:w-[62%] md:w-auto">
              <SpotlightCard
                as="button"
                onClick={() => setActive(p)}
                ariaLabel={`${products.more}: ${p.name}`}
                className="group flex h-full w-full flex-col overflow-hidden p-0"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-2">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                  />
                  {p.isPlaceholderImage && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold text-muted backdrop-blur">
                      <ImageIcon className="h-3 w-3" aria-hidden /> صورة مؤقتة
                    </span>
                  )}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-gold-ink uppercase">{p.category}</span>
                  <h3 className="mt-2 text-xl font-bold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    {products.more}
                    <ArrowUpLeft className="h-4 w-4 text-gold-deep transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Modal open={!!active} onClose={close} labelledBy="product-modal-title">
        {active && (
          <div className="grid sm:grid-cols-2">
            <div className="relative aspect-[4/3] bg-cream-2 sm:aspect-auto sm:min-h-[26rem]">
              <img src={active.image} alt={active.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-7 sm:p-9">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-gold-ink uppercase">{active.category}</span>
              <h3 id="product-modal-title" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{active.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{active.long}</p>
              <ul className="mt-5 space-y-2.5">
                {active.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <MagneticButton
                href={productWhatsappLink(active.name)}
                ariaLabel={a11y.openWhatsapp}
                className="mt-7 h-13 w-full rounded-full bg-gradient-to-l from-[#1fb85a] to-[#2ee27a] px-6 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition-transform duration-500 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {products.modalCta}
              </MagneticButton>
              <p className="mt-4 text-xs leading-relaxed text-muted/80">{products.modalNote}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
