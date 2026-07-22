"use client";

import { Store } from "lucide-react";
import { CityCenterLevelPage } from "@/features/city-center/components/CityCenterLevelPage";
import { useNoopLevelImage } from "@/features/city-center/hooks/useNoopLevelImage";
import {
  BAZAR_HERO,
  BAZAR_HIGHLIGHTS,
  BAZAR_PRICE_CHART_DESCRIPTION,
  BAZAR_SECTION,
  BAZAR_WHY_INVEST,
} from "@/features/bazar/constants";
import { useBazarUnits } from "@/features/bazar/hooks/useBazarUnits";
import { useBazarSpaces } from "@/features/bazar/hooks/useBazarSpaces";
import { useBazarRevenues } from "@/features/bazar/hooks/useBazarRevenues";
import { useBazarNumbers } from "@/features/bazar/hooks/useBazarNumbers";
import { useBazarImage } from "@/features/bazar/hooks/useBazarImage";

function BazarLevelPage() {
  return (
    <CityCenterLevelPage
      content={{
        section: BAZAR_SECTION,
        hero: BAZAR_HERO,
        highlights: BAZAR_HIGHLIGHTS,
        priceChartDescription: BAZAR_PRICE_CHART_DESCRIPTION,
        whyInvest: { ...BAZAR_WHY_INVEST, showSearchIcon: true },
      }}
      adapters={{
        useUnits: useBazarUnits,
        useSpaces: useBazarSpaces,
        useRevenues: useBazarRevenues,
        useNumbers: useBazarNumbers,
        useHeaderImage: useNoopLevelImage,
        useWhyImage: useBazarImage,
      }}
      ctaIcon={<Store className="w-5 h-5" />}
    />
  );
}

export default BazarLevelPage;
