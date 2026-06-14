/**
 * animations.ts — Core Framer Motion design system.
 *
 * Usage (in-view):
 *   <AnimatedSection duration={0.5} y={20} />
 *
 * Usage (AnimatePresence):
 *   <motion.div variants={scaleIn} initial="initial" animate="animate" exit="exit" />
 */

import type { Transition, Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;
const EASE_IN = "easeIn" as const;
const EASE_IN_OUT = "easeInOut" as const;

// ─── Viewport presets ─────────────────────────────────────────────────────────

export const viewportOnce = { once: true as const };

export const viewportOnceAmount = (amount: number) =>
  ({ once: true as const, amount });

// ─── Transition presets ───────────────────────────────────────────────────────

export const progressBarTransition: Transition = {
  duration: 1.2,
  ease: EASE_OUT,
};

export const springButtonTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 10,
};

// ─── CORE VARIANTS ────────────────────────────────────────────────────────────

/** Default vertical fade — y:20, duration 0.55 (override via AnimatedSection props) */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** AnimatePresence image switcher + whileInView thumbnails */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_IN_OUT } },
  exit: { opacity: 0, scale: 1.2 },
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_IN_OUT } },
};

export const scaleInModal: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const overlayVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const collapseVariant: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: EASE_IN } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};
