import type { Transition, Variants } from "framer-motion";

// ─── Legacy exports (main branch — preserved for existing pages) ─────────────

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const formVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

export const formItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const heroVariant: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

export const heroTitleVariant: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 1 } },
};

export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const inViewOnce = { once: true, margin: "-80px" };

// ─── Shared animation system (eskan source of truth) ─────────────────────────

const EASE_OUT = "easeOut" as const;
const EASE_IN = "easeIn" as const;
const EASE_IN_OUT = "easeInOut" as const;

export const viewportOnce = { once: true as const };

export const viewportOnceAmount = (amount: number) =>
  ({ once: true as const, amount });

export const progressBarTransition: Transition = {
  duration: 1.2,
  ease: EASE_OUT,
};

export const constructionProgressCountTransition: Transition = {
  duration: 1.4,
  ease: EASE_OUT,
};


export const constructionCircleStrokeTransition: Transition = {
  duration: 1.4,
  ease: EASE_OUT,
};


export const constructionTimelineTransition: Transition = {
  duration: 1.2,
  ease: EASE_OUT,
};


export const constructionProgressWidthVariant = (widthPercent: string): Variants => ({
  hidden: { width: 0 },
  visible: { width: widthPercent, transition: progressBarTransition },
});


export const constructionTimelineWidthVariant = (widthPercent: string): Variants => ({
  hidden: { width: 0 },
  visible: { width: widthPercent, transition: constructionTimelineTransition },
});



export const springButtonTransition: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 10,
};

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

export const projectCardsStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const projectCardsTitleVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const projectCardItemVariant: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const footerStaggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

export const footerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const dropdownVariant: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
};
