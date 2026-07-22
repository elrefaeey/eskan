import { useMemo } from "react";
import { HERO_TILE_RANDOM_OFFSET_MAX, HERO_TOTAL_TILES } from "../constants/hero";

export default function useHeroTileOffsets() {
  return useMemo(
    () =>
      Array.from({ length: HERO_TOTAL_TILES }).map(
        () => Math.random() * HERO_TILE_RANDOM_OFFSET_MAX,
      ),
    [],
  );
}
