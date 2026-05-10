import type { Transition, Variants } from "framer-motion";

export const ease = {
  cinematic: [0.22, 1, 0.36, 1] as const,
  exitFast: [0.4, 0, 1, 1] as const,
};

export const duration = {
  micro: 0.32,
  hero: 0.6,
};

export const stagger = {
  default: 0.04,
  slow: 0.08,
};

export const spring = {
  soft: { type: "spring", stiffness: 200, damping: 30, mass: 1 } satisfies Transition,
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.9 } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.hero, ease: ease.cinematic },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.hero, ease: ease.cinematic },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.default,
      delayChildren: 0.1,
    },
  },
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
