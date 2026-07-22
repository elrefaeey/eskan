export const DEFAULT_HERO_IMAGES = [
  "/assets/home/hero/hero1.jpg",
  "/assets/home/hero/hero2.jpg",
  "/assets/home/hero/hero3.jpg",
  "/assets/home/hero/hero4.jpg",
] as const;

export const HERO_SLIDESHOW_INTERVAL_MS = 4000;
export const HERO_MOBILE_BREAKPOINT = 768;

export const HERO_GRID_COLS = 6;
export const HERO_GRID_ROWS = 5;
export const HERO_TOTAL_TILES = HERO_GRID_COLS * HERO_GRID_ROWS;
export const HERO_TILE_RANDOM_OFFSET_MAX = 0.02;

export const HERO_IMAGE_SIZES =
  "(max-width: 768px) 94vw, (max-width: 1024px) 50vw, 57vw";
