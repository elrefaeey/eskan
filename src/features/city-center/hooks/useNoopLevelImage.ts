import type { LevelImageResult } from "../types/level-page";

/** Stable no-op image hook for level pages that don't need header/why fetches. */
export function useNoopLevelImage(): LevelImageResult {
  return { data: undefined, isLoading: false };
}
