"use client";

import { FeaturesHighlights, ProjectHero } from "@/components/shared";
import { CityCenterPriceChart } from "@/features/city-center/components/CityCenterPriceChart";
import { CityCenterUnitsSection } from "@/features/city-center/components/CityCenterUnitsSection";
import { CityCenterWhyInvestSection } from "@/features/city-center/components/CityCenterWhyInvestSection";
import { CITY_CENTER_UNITS_SECTION_ID } from "@/features/city-center/constants";
import { useCityCenterLevelFilters } from "@/features/city-center/hooks/useCityCenterLevelFilters";
import type { CityCenterLevelPageProps } from "@/features/city-center/types/level-page";
import { useLenis } from "@/hooks/useLenis";

const DEFAULT_CTA_TEXT = "حدد مواصفات محلك";

export function CityCenterLevelPage({
  content,
  adapters,
  ctaIcon,
}: CityCenterLevelPageProps) {
  const filters = useCityCenterLevelFilters();

  const {
    data: units,
    isLoading: isLoadingUnits,
    handlePaginate,
    hasMore,
  } = adapters.useUnits(filters);
  const { data: spaces, isLoading: isLoadingSpaces } = adapters.useSpaces();
  const { data: revenues, isLoading: isLoadingRevenues } = adapters.useRevenues({
    space: filters.space,
  });
  const { data: numbers, isLoading: isLoadingNumbers } = adapters.useNumbers({
    space: filters.space,
    revenue: filters.revenue,
  });

  const headerImageQuery = adapters.useHeaderImage();
  const whyImageQuery = adapters.useWhyImage();

  useLenis();

  const staticImage =
    content.hero.staticImage || headerImageQuery.data?.img || "";
  const isLoadingHeader = headerImageQuery.isLoading ?? false;
  const showRevenueFilter = content.showRevenueFilter !== false;
  const showWhyInvest = !!content.whyInvest && !!whyImageQuery.data?.img;

  return (
    <div className="page" dir={content.dir}>
      <ProjectHero
        isLoading={isLoadingHeader}
        visualType="static"
        staticImage={staticImage}
        staticImageAlt={content.hero.staticImageAlt}
        badge={{ text: content.hero.badge, color: "primary" }}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        ctaButtons={[
          {
            text: content.ctaText || DEFAULT_CTA_TEXT,
            icon: ctaIcon,
            scrollToId: CITY_CENTER_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights
          highlights={content.highlights}
          cols={3}
          className="sec-padding"
        />
        <CityCenterPriceChart description={content.priceChartDescription} />

        {showWhyInvest && content.whyInvest && (
          <CityCenterWhyInvestSection
            {...content.whyInvest}
            showSearchIcon={content.whyInvest.showSearchIcon}
          />
        )}

        <CityCenterUnitsSection
          section={content.section}
          units={units}
          isLoading={isLoadingUnits}
          hasMore={hasMore}
          onPaginate={handlePaginate}
          showRevenueFilter={showRevenueFilter}
          filterOptions={{
            spaces,
            revenues: showRevenueFilter ? revenues : [],
            numbers,
          }}
          filtersLoading={{
            spaces: isLoadingSpaces,
            revenues: isLoadingRevenues,
            numbers: isLoadingNumbers,
          }}
        />
      </div>
    </div>
  );
}

export default CityCenterLevelPage;
