import type { Transition } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const ABOUT_US_TEAM_CONTENT_ANIMATION = {
  y: 20,
  duration: 0.6,
} as const;

export const ABOUT_US_TEAM_IMAGE_ANIMATION = {
  y: 20,
  duration: 0.6,
  delay: 0.12,
} as const;

export const ABOUT_US_TEAM_CARD_ANIMATION = {
  y: 30,
  duration: 0.6,
} as const;

export const ABOUT_US_TEAM_CARD_STAGGER = 0.08;

export const getAboutUsTeamCardDelay = (order: number) =>
  (order - 1) * ABOUT_US_TEAM_CARD_STAGGER;

export const aboutUsDepartmentCardHover = { y: -4 };

export const aboutUsDepartmentCardHoverTransition: Transition = {
  duration: 0.3,
  ease: EASE_OUT,
};
