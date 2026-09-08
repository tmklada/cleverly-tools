import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import { nav, a11y } from "@/content/ar";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ease-[var(--ease-premium)] sm:px-5 ${
            scrolled || open ? "glass card-shadow" : "bg-transparent border border-transparent"
          }`}
        >
          <Logo />

          <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-1 lg:flex">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft/80 transition-colors hover:text-ink after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 after:ease-[var(--ease-premium)] hover:after:scale-x-100"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={a11y.openWhatsapp}
              className="hidden h-10 items-center gap-2 rounded-full bg-ink ring-1 ring-white/15 px-4 text-[14px] font-semibold text-white transition-all duration-500 ease-[var(--ease-premium)] hover:bg-ink-soft hover:shadow-[0_10px_24px_-10px_rgba(10,10,12,0.6)] sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4 text-wa" />
              {nav.cta}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.menuClose : nav.menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-black/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="container-x lg:hidden"
          >
            <div className="mt-2 rounded-2xl bg-white p-3 hairline card-shadow-lg">
              <nav aria-label="قائمة الجوال" className="flex flex-col">
                {nav.links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE }}
                    className="rounded-xl px-4 py-3 text-base font-medium text-ink transition hover:bg-black/5"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a11y.openWhatsapp}
                className="mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-base font-semibold text-white"
              >
                <WhatsAppIcon className="h-5 w-5 text-wa" />
                {nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
