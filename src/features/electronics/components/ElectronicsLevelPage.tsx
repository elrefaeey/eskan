"use client";

import { Cpu } from "lucide-react";
import { CityCenterLevelPage } from "@/features/city-center/components/CityCenterLevelPage";
import {
  ELECTRONICS_HERO,
  ELECTRONICS_HIGHLIGHTS,
  ELECTRONICS_PRICE_CHART_DESCRIPTION,
  ELECTRONICS_SECTION,
  ELECTRONICS_WHY_INVEST,
} from "@/features/electronics/constants";
import { useElectronicsUnits } from "@/features/electronics/hooks/useElectronicsUnits";
import { useElectronicsSpaces } from "@/features/electronics/hooks/useElectronicsSpaces";
import { useElectronicsRevenues } from "@/features/electronics/hooks/useElectronicsRevenues";
import { useElectronicsNumbers } from "@/features/electronics/hooks/useElectronicsNumbers";
import { useElectronicsImage } from "@/features/electronics/hooks/useElectronicsImage";
import { useElectronicsHeaderImage } from "@/features/electronics/hooks/useElectronicsHeaderImage";

function ElectronicsLevelPage() {
  return (
    <CityCenterLevelPage
      content={{
        section: ELECTRONICS_SECTION,
        hero: ELECTRONICS_HERO,
        highlights: ELECTRONICS_HIGHLIGHTS,
        priceChartDescription: ELECTRONICS_PRICE_CHART_DESCRIPTION,
        whyInvest: ELECTRONICS_WHY_INVEST,
        dir: "rtl",
      }}
      adapters={{
        useUnits: useElectronicsUnits,
        useSpaces: useElectronicsSpaces,
        useRevenues: useElectronicsRevenues,
        useNumbers: useElectronicsNumbers,
        useHeaderImage: useElectronicsHeaderImage,
        useWhyImage: useElectronicsImage,
      }}
      ctaIcon={<Cpu className="w-5 h-5" />}
    />
  );
}

export default ElectronicsLevelPage;
