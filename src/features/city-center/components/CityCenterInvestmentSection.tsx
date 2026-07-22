"use client";

import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { fadeUp } from "@/lib/animations";
import {
  CITY_CENTER_INVESTMENT,
  CITY_CENTER_PROJECT_FEATURES,
} from "../constants";

interface CityCenterInvestmentSectionProps {
  images: string[];
}

export function CityCenterInvestmentSection({ images }: CityCenterInvestmentSectionProps) {
  return (
    <AnimatedSection
      variant={fadeUp}
      className="sec-padding bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5 order-2 md:order-1">
          <div>
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-2">
              {CITY_CENTER_INVESTMENT.title}
            </h2>
            <p className="text-[#333] text-body-base md:text-lg leading-[2]">
              {CITY_CENTER_INVESTMENT.description}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-primary text-xl font-extrabold border-r-4 border-primary pr-3 mb-3">
              {CITY_CENTER_INVESTMENT.featuresTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {CITY_CENTER_PROJECT_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative w-full h-64 md:h-auto rounded-xl overflow-hidden order-1 md:order-2">
          <ProjectImgsSlider rounded images={images} height="h-64 md:!h-full" />
        </div>
      </div>
    </AnimatedSection>
  );
}
