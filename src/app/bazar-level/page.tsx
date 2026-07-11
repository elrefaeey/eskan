"use client";

import { Store } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FeaturesHighlights, ProjectHero } from "@/components/shared";
import { CityCenterPriceChart } from "@/features/city-center/components/CityCenterPriceChart";
import { CityCenterUnitsSection } from "@/features/city-center/components/CityCenterUnitsSection";
import { CityCenterWhyInvestSection } from "@/features/city-center/components/CityCenterWhyInvestSection";
import { CITY_CENTER_UNITS_SECTION_ID } from "@/features/city-center/constants";
import { useBazarUnits } from "@/features/bazar/hooks/useBazarUnits";
import { useBazarSpaces } from "@/features/bazar/hooks/useBazarSpaces";
import { useBazarRevenues } from "@/features/bazar/hooks/useBazarRevenues";
import { useBazarNumbers } from "@/features/bazar/hooks/useBazarNumbers";
import { useBazarImage } from "@/features/bazar/hooks/useBazarImage";
import {
  BAZAR_HERO,
  BAZAR_HIGHLIGHTS,
  BAZAR_PRICE_CHART_DESCRIPTION,
  BAZAR_SECTION,
  BAZAR_WHY_INVEST,
} from "@/features/bazar/constants";
import { useLenis } from "@/hooks/useLenis";

const BazarLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } = useBazarUnits(filters);
  const { data: spaces } = useBazarSpaces();
  const { data: revenues } = useBazarRevenues();
  const { data: numbers } = useBazarNumbers();
  const { data: bazarImage } = useBazarImage();

  useLenis();

  return (
    <div className="page" dir="rtl">
      <ProjectHero
        visualType="static"
        staticImage={BAZAR_HERO.staticImage}
        staticImageAlt={BAZAR_HERO.staticImageAlt}
        badge={{ text: BAZAR_HERO.badge, color: "primary" }}
        title={BAZAR_HERO.title}
        subtitle={BAZAR_HERO.subtitle}
        description={BAZAR_HERO.description}
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Store className="w-5 h-5" />,
            scrollToId: CITY_CENTER_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={BAZAR_HIGHLIGHTS} cols={3} className="sec-padding" />
        <CityCenterPriceChart description={BAZAR_PRICE_CHART_DESCRIPTION} />

        {bazarImage?.img && (
          <CityCenterWhyInvestSection {...BAZAR_WHY_INVEST} showSearchIcon />
        )}

        <CityCenterUnitsSection
          section={BAZAR_SECTION}
          units={units}
          isLoading={isLoadingUnits}
          hasMore={hasMore}
          onPaginate={handlePaginate}
          filterOptions={{ revenues, numbers, spaces }}
        />
      </div>
    </div>
  );
};

export default BazarLevel;
