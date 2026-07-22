import type { Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const PROJECT_CARD_VIEWPORT_AMOUNT = 0.15;

export const projectCardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const PROJECT_CARD_SHADOW_TRANSITION = "transition-shadow duration-300";
export const PROJECT_CARD_BUTTON_TRANSITION = "transition-colors duration-200";
