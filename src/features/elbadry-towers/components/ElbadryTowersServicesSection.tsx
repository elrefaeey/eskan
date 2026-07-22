"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import CardsInfo from "@/components/Projects/ElbadryTowers/CardsInfo";

export default function ElbadryTowersServicesSection() {
  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <CardsInfo />
    </AnimatedSection>
  );
}
