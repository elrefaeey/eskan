"use client";

import { useSearchParams } from "next/navigation";
import type { LevelFilters } from "../types/level-page";

export function useCityCenterLevelFilters(): LevelFilters {
  const searchParams = useSearchParams();

  return {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };
}
