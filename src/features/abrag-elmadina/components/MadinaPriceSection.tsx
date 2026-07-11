"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import MadinaPriceChart from "@/features/abrag-elmadina/components/price-chart";
import { MADINA_SECTIONS } from "../constants";

export default function MadinaPriceSection() {
  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <h2 className="text-[#1a1a1a] text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
        {MADINA_SECTIONS.priceChart}
      </h2>
      <MadinaPriceChart />
    </AnimatedSection>
  );
}
