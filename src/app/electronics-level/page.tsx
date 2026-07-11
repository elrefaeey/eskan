"use client";

import { Cpu } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FeaturesHighlights, ProjectHero } from "@/components/shared";
import { CityCenterPriceChart } from "@/features/city-center/components/CityCenterPriceChart";
import { CityCenterUnitsSection } from "@/features/city-center/components/CityCenterUnitsSection";
import { CityCenterWhyInvestSection } from "@/features/city-center/components/CityCenterWhyInvestSection";
import { CITY_CENTER_UNITS_SECTION_ID } from "@/features/city-center/constants";
import { useElectronicsUnits } from "@/features/electronics/hooks/useElectronicsUnits";
import { useElectronicsSpaces } from "@/features/electronics/hooks/useElectronicsSpaces";
import { useElectronicsNumbers } from "@/features/electronics/hooks/useElectronicsNumbers";
import { useElectronicsImage } from "@/features/electronics/hooks/useElectronicsImage";
import { useElectronicsHeaderImage } from "@/features/electronics/hooks/useElectronicsHeaderImage";
import {
  ELECTRONICS_HERO,
  ELECTRONICS_HIGHLIGHTS,
  ELECTRONICS_PRICE_CHART_DESCRIPTION,
  ELECTRONICS_SECTION,
  ELECTRONICS_WHY_INVEST,
} from "@/features/electronics/constants";
import { useLenis } from "@/hooks/useLenis";

const ElectronicsLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } =
    useElectronicsUnits(filters);
  const { data: spaces } = useElectronicsSpaces();
  const { data: numbers } = useElectronicsNumbers();
  const { data: electronicsImage } = useElectronicsImage();
  const { data: headerImage, isLoading: isLoadingHeader } = useElectronicsHeaderImage();

  useLenis();

  return (
    <div className="page">
      <ProjectHero
        isLoading={isLoadingHeader}
        visualType="static"
        staticImage={headerImage?.img || ""}
        staticImageAlt={ELECTRONICS_HERO.staticImageAlt}
        badge={{ text: ELECTRONICS_HERO.badge, color: "primary" }}
        title={ELECTRONICS_HERO.title}
        subtitle={ELECTRONICS_HERO.subtitle}
        description={ELECTRONICS_HERO.description}
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Cpu className="w-5 h-5" />,
            scrollToId: CITY_CENTER_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={ELECTRONICS_HIGHLIGHTS} cols={3} className="sec-padding" />
        <CityCenterPriceChart description={ELECTRONICS_PRICE_CHART_DESCRIPTION} />

        {electronicsImage?.img && (
          <CityCenterWhyInvestSection {...ELECTRONICS_WHY_INVEST} />
        )}

        <CityCenterUnitsSection
          section={ELECTRONICS_SECTION}
          units={units}
          isLoading={isLoadingUnits}
          hasMore={hasMore}
          onPaginate={handlePaginate}
          filterOptions={{ numbers, spaces }}
        />
      </div>
    </div>
  );
};

export default ElectronicsLevel;
