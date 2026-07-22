import type { Transition, Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const heroImageInitial = { scale: 1.08, opacity: 0 };
export const heroImageAnimate = { scale: 1, opacity: 1 };
export const heroImageTransition: Transition = {
  duration: 1.1,
  ease: EASE_OUT,
};

export const heroBadgeVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.25, duration: 0.5 },
  },
};

export const heroTitleVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.6 },
  },
};

export const AGENT_CARD_DELAY = 0;
export const PROJECT_BRIEF_DELAY = 0.1;
export const LEAD_FORM_DELAY = 0.15;
