"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { ELBADRY_TOUR_3D, ELBADRY_TOWERS_SECTIONS } from "../constants";

export default function ElbadryTowersTour3DSection() {
  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4 mb-4">
        {ELBADRY_TOWERS_SECTIONS.tour3d}
      </h2>
      <iframe
        className="w-full rounded-2xl h-72 md:h-[480px]"
        loading="lazy"
        src={ELBADRY_TOUR_3D.src}
        title={ELBADRY_TOUR_3D.title}
      />
    </AnimatedSection>
  );
}
