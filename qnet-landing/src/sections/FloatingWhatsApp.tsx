import { motion, useReducedMotion } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import { floating, a11y } from "@/content/ar";
import { EASE } from "@/lib/motion";

/** زر واتساب عائم ثابت – جوال وسطح مكتب */
export default function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={a11y.openWhatsapp}
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 left-5 z-[80] flex items-center gap-3 rounded-full bg-[#25d366] py-3 pe-5 ps-3 text-white shadow-[0_14px_36px_-10px_rgba(37,211,102,0.7)] transition-shadow duration-500 hover:shadow-[0_20px_44px_-10px_rgba(37,211,102,0.85)] sm:bottom-7 sm:left-7"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <span className="relative grid h-10 w-10 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </span>
      <span className="text-[15px] font-semibold">{floating.label}</span>
    </motion.a>
  );
}
