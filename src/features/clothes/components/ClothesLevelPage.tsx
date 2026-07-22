"use client";

import { Shirt } from "lucide-react";
import { CityCenterLevelPage } from "@/features/city-center/components/CityCenterLevelPage";
import { useNoopLevelImage } from "@/features/city-center/hooks/useNoopLevelImage";
import { useNoopLevelOptions } from "@/features/city-center/hooks/useNoopLevelOptions";
import {
  CLOTHES_HERO,
  CLOTHES_HIGHLIGHTS,
  CLOTHES_PRICE_CHART_DESCRIPTION,
  CLOTHES_SECTION,
} from "@/features/clothes/constants";
import { useClothesUnits } from "@/features/clothes/hooks/useClothesUnits";
import { useClothesSpaces } from "@/features/clothes/hooks/useClothesSpaces";
import { useClothesNumbers } from "@/features/clothes/hooks/useClothesNumbers";
import { useClothesHeaderImage } from "@/features/clothes/hooks/useClothesHeaderImage";

function ClothesLevelPage() {
  return (
    <CityCenterLevelPage
      content={{
        section: CLOTHES_SECTION,
        hero: CLOTHES_HERO,
        highlights: CLOTHES_HIGHLIGHTS,
        priceChartDescription: CLOTHES_PRICE_CHART_DESCRIPTION,
        dir: "rtl",
        showRevenueFilter: false,
      }}
      adapters={{
        useUnits: useClothesUnits,
        useSpaces: useClothesSpaces,
        useRevenues: useNoopLevelOptions,
        useNumbers: useClothesNumbers,
        useHeaderImage: useClothesHeaderImage,
        useWhyImage: useNoopLevelImage,
      }}
      ctaIcon={<Shirt className="w-5 h-5" />}
    />
  );
}

export default ClothesLevelPage;
