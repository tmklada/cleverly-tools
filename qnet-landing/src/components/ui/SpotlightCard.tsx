import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  lift?: boolean;
  onClick?: () => void;
  as?: "div" | "article" | "button";
  ariaLabel?: string;
};

/** بطاقة زجاجية مع توهّج ذهبي يتبع المؤشر + رفع خفيف عند الـ hover */
export default function SpotlightCard({
  children,
  className = "",
  dark = false,
  lift = true,
  onClick,
  as = "div",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  const Comp = motion.create(as) as typeof motion.div;

  return (
    <Comp
      ref={ref as never}
      onMouseMove={onMove as never}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={lift && !reduce ? { y: -6, scale: 1.01 } : undefined}
      transition={{ duration: 0.5, ease: EASE }}
      className={`spotlight ${dark ? "spotlight-dark glass-dark" : "bg-white/80 hairline"} rounded-3xl transition-shadow duration-500 ease-[var(--ease-premium)] ${
        dark ? "hover:shadow-[0_30px_80px_-30px_rgba(201,169,97,0.25)]" : "card-shadow hover:card-shadow-lg"
      } ${onClick ? "cursor-pointer text-start" : ""} ${className}`}
    >
      {children}
    </Comp>
  );
}
