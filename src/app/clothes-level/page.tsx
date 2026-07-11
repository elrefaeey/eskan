"use client";

import { Shirt } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FeaturesHighlights, ProjectHero } from "@/components/shared";
import { CityCenterPriceChart } from "@/features/city-center/components/CityCenterPriceChart";
import { CityCenterUnitsSection } from "@/features/city-center/components/CityCenterUnitsSection";
import { CITY_CENTER_UNITS_SECTION_ID } from "@/features/city-center/constants";
import { useClothesUnits } from "@/features/clothes/hooks/useClothesUnits";
import { useClothesSpaces } from "@/features/clothes/hooks/useClothesSpaces";
import { useClothesNumbers } from "@/features/clothes/hooks/useClothesNumbers";
import { useClothesHeaderImage } from "@/features/clothes/hooks/useClothesHeaderImage";
import {
  CLOTHES_HERO,
  CLOTHES_HIGHLIGHTS,
  CLOTHES_PRICE_CHART_DESCRIPTION,
  CLOTHES_SECTION,
} from "@/features/clothes/constants";
import { useLenis } from "@/hooks/useLenis";

const ClothesLevel = () => {
  const searchParams = useSearchParams();
  const filters = {
    space: searchParams.get("space") || "",
    revenue: searchParams.get("revenue") || "",
    number: searchParams.get("number") || "",
  };

  const { data: units, isLoading: isLoadingUnits, handlePaginate, hasMore } =
    useClothesUnits(filters);
  const { data: spaces } = useClothesSpaces();
  const { data: numbers } = useClothesNumbers();
  const { data: headerImage, isLoading: isLoadingHeader } = useClothesHeaderImage();

  useLenis();

  return (
    <div className="page" dir="rtl">
      <ProjectHero
        isLoading={isLoadingHeader}
        visualType="static"
        staticImage={headerImage?.img || ""}
        staticImageAlt={CLOTHES_HERO.staticImageAlt}
        badge={{ text: CLOTHES_HERO.badge, color: "primary" }}
        title={CLOTHES_HERO.title}
        subtitle={CLOTHES_HERO.subtitle}
        description={CLOTHES_HERO.description}
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Shirt className="w-5 h-5" />,
            scrollToId: CITY_CENTER_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={CLOTHES_HIGHLIGHTS} cols={3} className="sec-padding" />
        <CityCenterPriceChart description={CLOTHES_PRICE_CHART_DESCRIPTION} />

        <CityCenterUnitsSection
          section={CLOTHES_SECTION}
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

export default ClothesLevel;
