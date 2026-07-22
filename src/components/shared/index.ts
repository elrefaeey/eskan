/**
 * shared/index.ts
 *
 * نقطة التصدير المركزية لجميع المكونات المشتركة بين صفحات المشاريع.
 */

export { default as ProjectHero } from "./ProjectHero/index";
export type {
  ProjectHeroProps,
  ProjectHeroSliderProps,
  ProjectHeroStaticProps,
  ProjectHeroGradientProps,
  HeroCtaButton,
  HeroBadgeColor,
  HeroVisualType,
} from "./ProjectHero/index";

export { default as YouTubeDialog } from "./YouTubeDialog";
export type { YouTubeDialogProps } from "./YouTubeDialog";

export { default as StatsGrid } from "./StatsGrid";
export type { StatsGridProps, StatItem, StatsColorScheme, StatsVariant } from "./StatsGrid";

export { default as FeaturesHighlights } from "./FeaturesHighlights";
export type { FeaturesHighlightsProps, HighlightItem } from "./FeaturesHighlights";

export { default as ProjectFeaturesSection } from "./ProjectFeaturesSection";
export type { ProjectFeaturesSectionProps } from "./ProjectFeaturesSection";

export { default as ProjectTour3DSection } from "./ProjectTour3DSection";
export type { ProjectTour3DSectionProps } from "./ProjectTour3DSection";

export { default as ProjectUnitsSection } from "./ProjectUnitsSection";
export type { ProjectUnitsSectionProps } from "./ProjectUnitsSection";

export { default as LocationSection } from "./LocationSection";
export {
  GRAY_MAP_LOCATION_DEFAULTS,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "./LocationSection";

export { default as ProjectMap } from "./ProjectMap";

export { default as ProjectImage } from "./ProjectImage";

export { default as SectionContent } from "./SectionContent";

export { default as ExternalMapLink } from "./ExternalMapLink";
