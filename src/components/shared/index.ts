/**
 * shared/index.ts
 *
 * نقطة التصدير المركزية لجميع المكونات المشتركة بين صفحات المشاريع.
 * المرحلة الأولى — المكونات الأساسية الخمسة.
 */

export { default as ProjectHero } from "./ProjectHero/index";
export type { ProjectHeroProps, HeroCtaButton, HeroBadgeColor, HeroVisualType } from "./ProjectHero/index";

export { default as YouTubeDialog } from "./YouTubeDialog";
export type { YouTubeDialogProps } from "./YouTubeDialog";

export { default as StatsGrid } from "./StatsGrid";
export type { StatsGridProps, StatItem, StatsColorScheme } from "./StatsGrid";

export { default as FeaturesHighlights } from "./FeaturesHighlights";
export type { FeaturesHighlightsProps, HighlightItem } from "./FeaturesHighlights";

export { default as MapSection } from "./MapSection";
export type { MapSectionProps, MapVisualType } from "./MapSection";
