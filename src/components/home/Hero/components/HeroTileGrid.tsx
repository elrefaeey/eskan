import { motion } from "framer-motion";
import {
  HERO_GRID_COLS,
  HERO_GRID_ROWS,
  HERO_TOTAL_TILES,
} from "@/features/home/constants/hero";
import {
  calculateHeroTileDelay,
  createHeroTileTransition,
  heroTileAnimate,
  heroTileInitial,
} from "../animations";

interface HeroTileGridProps {
  animationKey: number;
  tileOffsets: number[];
}

export default function HeroTileGrid({ animationKey, tileOffsets }: HeroTileGridProps) {
  return (
    <div
      key={animationKey}
      className="absolute inset-0 grid pointer-events-none z-20"
      style={{
        gridTemplateColumns: `repeat(${HERO_GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${HERO_GRID_ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: HERO_TOTAL_TILES }).map((_, index) => {
        const row = Math.floor(index / HERO_GRID_COLS);
        const col = index % HERO_GRID_COLS;
        const delay = calculateHeroTileDelay(row, col, tileOffsets[index]);

        return (
          <motion.div
            key={index}
            initial={heroTileInitial}
            animate={heroTileAnimate}
            transition={createHeroTileTransition(delay)}
            className="bg-primary origin-center"
            style={{
              boxShadow: "0 0 3px rgba(0,0,0,0.15)",
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}
