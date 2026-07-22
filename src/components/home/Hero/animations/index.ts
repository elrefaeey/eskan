import type { Transition, Variants } from "framer-motion";
import { HERO_GRID_COLS } from "@/features/home/constants/hero";

const HERO_TEXT_EASE = [0.25, 0.46, 0.45, 0.94] as const;
const HERO_IMAGE_SCALE_EASE = [0.25, 0.1, 0.25, 1] as const;
const HERO_TILE_EASE = [0.65, 0, 0.35, 1] as const;
const HERO_OVERLAY_EASE = [0.33, 1, 0.68, 1] as const;

export const HERO_TEXT_STAGGER_DELAY = 0.15;
export const HERO_TEXT_DURATION = 0.8;

export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: HERO_TEXT_DURATION,
      ease: HERO_TEXT_EASE,
      delay: index * HERO_TEXT_STAGGER_DELAY,
    },
  }),
};

export const HERO_IMAGE_SCALE_DURATION = 7;

export const heroCurrentImageInitial = { scale: 1.1, opacity: 1 };
export const heroCurrentImageAnimate = { scale: 1.3, opacity: 1 };

export const heroCurrentImageTransition: Transition = {
  scale: { duration: HERO_IMAGE_SCALE_DURATION, ease: HERO_IMAGE_SCALE_EASE },
};

export const createHeroNextImageInitial = (isMobileIntro: boolean) => ({
  scale: isMobileIntro ? 1 : 1.1,
  opacity: 0.8,
});

export const createHeroNextImageAnimate = (isMobileIntro: boolean) => ({
  scale: isMobileIntro ? 1 : 1.3,
  opacity: 1,
});

export const heroNextImageTransition: Transition = {
  scale: { duration: HERO_IMAGE_SCALE_DURATION, ease: HERO_IMAGE_SCALE_EASE },
  opacity: { duration: 0.6, ease: "easeInOut" },
};

export const HERO_OVERLAY_OPACITY = 0.35;

export const heroOverlayTransition: Transition = {
  duration: 1.5,
  delay: 0.3,
  ease: HERO_OVERLAY_EASE,
};

export const HERO_TILE_COL_DELAY = 0.045;
export const HERO_TILE_ROW_DELAY = 0.035;
export const HERO_TILE_SCALE_DURATION = 0.9;
export const HERO_TILE_SCALE_X_DELAY_OFFSET = 0.05;
export const HERO_TILE_OPACITY_DURATION = 0.5;
export const HERO_TILE_OPACITY_DELAY_OFFSET = 0.3;

export const heroTileInitial = { scaleY: 1, scaleX: 1, opacity: 1 };
export const heroTileAnimate = { scaleY: 0, scaleX: 0, opacity: 0 };

export const calculateHeroTileDelay = (
  row: number,
  col: number,
  randomOffset: number,
) =>
  (HERO_GRID_COLS - 1 - col) * HERO_TILE_COL_DELAY +
  row * HERO_TILE_ROW_DELAY +
  randomOffset;

export const createHeroTileTransition = (delay: number): Transition => ({
  scaleY: { duration: HERO_TILE_SCALE_DURATION, delay, ease: HERO_TILE_EASE },
  scaleX: {
    duration: HERO_TILE_SCALE_DURATION,
    delay: delay + HERO_TILE_SCALE_X_DELAY_OFFSET,
    ease: HERO_TILE_EASE,
  },
  opacity: {
    duration: HERO_TILE_OPACITY_DURATION,
    delay: delay + HERO_TILE_OPACITY_DELAY_OFFSET,
    ease: "easeOut",
  },
});
