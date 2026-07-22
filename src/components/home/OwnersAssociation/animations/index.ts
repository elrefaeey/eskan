import type { Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const OWNERS_ASSOCIATION_VIEWPORT_AMOUNT = 0.3;

export const ownersAssociationContainerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const ownersAssociationTextVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.1 } },
};

export const ownersAssociationImageVariant: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.2 } },
};
