// Emil Kowalski animation constants
// Rule: Use ease-out as default, custom cubic-bezier over built-in CSS
// Rule: Keep UI animations under 300ms

export const EASING = {
  // Standard UI transition (ease-out default)
  default: [0.25, 1, 0.5, 1] as const,
  // iOS-style drawer/sheet animation
  ios: [0.32, 0.72, 0, 1] as const,
  // Spring feel for interactive elements
  spring: { type: "spring", stiffness: 400, damping: 30 } as const,
  // Gentle spring for larger elements
  gentleSpring: { type: "spring", stiffness: 300, damping: 25 } as const,
};

export const DURATION = {
  fast: 0.15,   // 150ms - button press, immediate feedback
  normal: 0.2,  // 200ms - standard UI transitions
  slow: 0.3,    // 300ms - max for UI animations
  drawer: 0.5,  // 500ms - drawer/sheet animations
};

// Fade in + slide up — for page sections
export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.normal, ease: EASING.default },
};

// Stagger children — for card grids
export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: DURATION.normal, ease: EASING.default },
};

// Button press — scale(0.97) on press (Emil: never scale(0))
export const buttonTap = { scale: 0.97 };
export const buttonHover = { scale: 1.02 };

// Card hover
export const cardHover = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASING.default },
};

// Fade in — simple opacity transition
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.normal },
};

// Slide in from bottom (for results, notifications)
export const slideInBottom = {
  initial: { opacity: 0, y: 24, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 12, scale: 0.97 },
  transition: { duration: DURATION.normal, ease: EASING.default },
};

// Scroll reveal threshold
export const SCROLL_THRESHOLD = 0.15;
