"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { ELBADRY_TOWERS_FEATURES, ELBADRY_TOWERS_SECTIONS } from "../constants";

interface ElbadryTowersFeaturesSectionProps {
  phaseImages: string[];
}

export default function ElbadryTowersFeaturesSection({
  phaseImages,
}: ElbadryTowersFeaturesSectionProps) {
  return (
    <AnimatedSection
      variant={fadeUp}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 sec-padding bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-stretch"
    >
      <div className="flex flex-col gap-4 order-1">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
          {ELBADRY_TOWERS_SECTIONS.features}
        </h2>
        <ul className="flex flex-col gap-3">
          {ELBADRY_TOWERS_FEATURES.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed"
            >
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden order-2 min-h-[300px]">
        <ProjectImgsSlider rounded height="h-full" images={phaseImages} />
      </div>
    </AnimatedSection>
  );
}
