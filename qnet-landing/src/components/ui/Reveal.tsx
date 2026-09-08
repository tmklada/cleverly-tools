import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: ElementType;
  once?: boolean;
};

/** Scroll reveal – fade + slide + blur، يحترم prefers-reduced-motion */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion.create(as as "div");
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** حاوية Stagger – الأبناء يستخدمون <RevealItem /> */
export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const Comp = motion.create(as as "div");
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
}) {
  const Comp = motion.create(as as "div");
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
