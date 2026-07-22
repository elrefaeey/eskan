import type { LevelOptionsResult } from "../types/level-page";

/** Stable empty options hook for level pages that hide a filter (e.g. clothes revenue). */
export function useNoopLevelOptions(): LevelOptionsResult {
  return { data: [], isLoading: false };
}
