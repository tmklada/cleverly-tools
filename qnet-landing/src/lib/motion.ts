import type { Transition, Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const premium: Transition = { duration: 0.8, ease: EASE };

/** Fade + slide + blur – الحركة الأساسية في الصفحة */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: premium },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: premium },
};

/** viewport افتراضي لكل Scroll reveal */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" } as const;
