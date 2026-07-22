import type { Transition, Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const CARDS_SECTION_HEADER_VARIANT: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const CARDS_SECTION_STAGGER_DELAY = 0.12;

export const createCardsSectionCardVariant = (index: number): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT,
      delay: index * CARDS_SECTION_STAGGER_DELAY,
    },
  },
});

export const CARD_HOVER_TRANSITION: Transition = {
  duration: 0.3,
  ease: EASE_OUT,
};

export const CARD_HOVER_OFFSET = -4;

export const CARD_CTA_TRANSITION = "transition-all duration-300";
export const CARD_CTA_ARROW_CLASSES =
  "size-5 transition-transform duration-300 group-hover:-translate-x-1";
