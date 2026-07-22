import type { ReactNode } from "react";
import type { HighlightItem } from "@/components/shared";
import type { CityCenterUnit } from "@/features/city-center/components/CityCenterUnitCard";

export interface LevelFilterOption {
  value: string;
  label: string;
}

export interface LevelFilters {
  space: string;
  revenue: string;
  number: string;
}

export interface LevelUnitsResult {
  data: CityCenterUnit[];
  isLoading: boolean;
  handlePaginate: () => void;
  hasMore: boolean;
}

export interface LevelOptionsResult {
  data?: LevelFilterOption[];
  isLoading: boolean;
}

export interface LevelImageResult {
  data?: { img?: string } | null;
  isLoading?: boolean;
}

export interface LevelWhyInvestContent {
  title: string;
  description: string;
  floorPlanImage: string;
  floorPlanAlt: string;
  showSearchIcon?: boolean;
}

export interface LevelHeroContent {
  staticImage?: string;
  staticImageAlt: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CityCenterLevelPageContent {
  section: string;
  hero: LevelHeroContent;
  highlights: HighlightItem[];
  priceChartDescription: string;
  whyInvest?: LevelWhyInvestContent;
  ctaText?: string;
  dir?: "rtl" | "ltr";
  /** Clothes level has no rental-revenue filter. Defaults to true. */
  showRevenueFilter?: boolean;
}

export interface CityCenterLevelPageAdapters {
  useUnits: (filters: LevelFilters) => LevelUnitsResult;
  useSpaces: () => LevelOptionsResult;
  useRevenues: (params: { space: string }) => LevelOptionsResult;
  useNumbers: (params: {
    space: string;
    revenue: string;
  }) => LevelOptionsResult;
  useHeaderImage: () => LevelImageResult;
  useWhyImage: () => LevelImageResult;
}

export interface CityCenterLevelPageProps {
  content: CityCenterLevelPageContent;
  adapters: CityCenterLevelPageAdapters;
  ctaIcon: ReactNode;
}
