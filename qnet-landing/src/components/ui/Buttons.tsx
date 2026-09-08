import type { ReactNode } from "react";
import { ArrowUpLeft } from "lucide-react";
import MagneticButton from "./MagneticButton";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import { a11y } from "@/content/ar";

type Size = "md" | "lg" | "xl";
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px] rounded-full",
  lg: "h-13 px-7 text-base rounded-full",
  xl: "h-16 px-10 text-lg rounded-full",
};

/** زر واتساب الأساسي – كل CTA في الصفحة يستخدمه */
export function WhatsAppButton({
  children,
  size = "lg",
  message,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  size?: Size;
  message?: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <MagneticButton
      href={whatsappLink(message)}
      ariaLabel={a11y.openWhatsapp}
      className={`relative overflow-hidden font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.55)] transition-[box-shadow,transform] duration-500 ease-[var(--ease-premium)] hover:shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] hover:-translate-y-0.5 ${sizes[size]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-l from-[#1fb85a] via-[#25d366] to-[#2ee27a] ${onDark ? "" : ""}`}
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.28)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer"
      />
      <WhatsAppIcon className={size === "xl" ? "relative h-6 w-6" : "relative h-5 w-5"} />
      <span className="relative">{children}</span>
    </MagneticButton>
  );
}

/** زر ثانوي أنيق (رابط داخلي) */
export function GhostButton({
  href,
  children,
  size = "lg",
  onDark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  size?: Size;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <MagneticButton
      href={href}
      external={false}
      strength={0.18}
      className={`font-medium transition-all duration-500 ease-[var(--ease-premium)] ${sizes[size]} ${
        onDark
          ? "glass-dark text-white hover:bg-white/10"
          : "glass text-ink hover:bg-white hover:card-shadow"
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowUpLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 opacity-70" />
    </MagneticButton>
  );
}
