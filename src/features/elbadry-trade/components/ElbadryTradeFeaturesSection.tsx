"use client";

import { ProjectFeaturesSection } from "@/components/shared";
import { ELBADRY_TRADE_FEATURES } from "../constants";

interface ElbadryTradeFeaturesSectionProps {
  images: string[];
}

export default function ElbadryTradeFeaturesSection({
  images,
}: ElbadryTradeFeaturesSectionProps) {
  return (
    <ProjectFeaturesSection
      features={ELBADRY_TRADE_FEATURES}
      images={images}
      bulletStyle="check"
    />
  );
}
