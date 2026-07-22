"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";

interface CityCenterWhyInvestSectionProps {
  title: string;
  description: string;
  floorPlanImage: string;
  floorPlanAlt: string;
  showSearchIcon?: boolean;
}

export function CityCenterWhyInvestSection({
  title,
  description,
  floorPlanImage,
  floorPlanAlt,
  showSearchIcon = false,
}: CityCenterWhyInvestSectionProps) {
  return (
    <AnimatedSection
      variant={fadeUp}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 sec-padding bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-center"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          {showSearchIcon && (
            <img src="/assets/icons/glass-icon.svg" alt="" className="w-7 h-7" />
          )}
          {title}
        </h2>
        <p className="text-[#333] text-body-base md:text-lg leading-[2]">{description}</p>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={floorPlanImage}
          alt={floorPlanAlt}
          className="w-full h-auto max-h-[280px] object-contain rounded-xl"
        />
      </div>
    </AnimatedSection>
  );
}
