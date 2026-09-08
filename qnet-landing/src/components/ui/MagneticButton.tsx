import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useCanHover } from "@/lib/useHover";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  strength?: number;
  onClick?: () => void;
};

/**
 * زر "مغناطيسي": ينجذب قليلاً نحو المؤشر على سطح المكتب.
 * على اللمس أو مع prefers-reduced-motion يعمل كزر عادي.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  ariaLabel,
  external = true,
  strength = 0.28,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const active = canHover && !reduce;

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center justify-center gap-2.5 select-none ${className}`}
    >
      {children}
    </motion.a>
  );
}
