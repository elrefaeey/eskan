"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import ElbadryPriceChart from "@/features/elbadry-towers/components/price-chart";
import { ELBADRY_TOWERS_SECTIONS } from "../constants";

export default function ElbadryTowersPriceSection() {
  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <h2 className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        {ELBADRY_TOWERS_SECTIONS.priceChart}
      </h2>
      <ElbadryPriceChart />
    </AnimatedSection>
  );
}
