"use client";

import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import {
  GPI_IMAGES,
  GPI_WHY_ITEMS,
  GPI_WHY_SUBTITLE,
  GPI_WHY_TITLE,
} from "../constants";

export default function GpiWhySection() {
  return (
    <AnimatedSection
      variant={fadeUp}
      className="sec-padding grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-stretch"
    >
      <div className="flex flex-col gap-4 order-2 md:order-1">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-2">{GPI_WHY_TITLE}</h2>
        <p className="text-[#555] text-body-base md:text-lg mb-2">{GPI_WHY_SUBTITLE}</p>
        <ul className="flex flex-col gap-3">
          {GPI_WHY_ITEMS.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[#333] text-body-base md:text-lg leading-relaxed"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative w-full min-h-[280px] rounded-xl overflow-hidden order-1 md:order-2">
        <ProjectImgsSlider rounded height="h-full" images={[...GPI_IMAGES]} />
      </div>
    </AnimatedSection>
  );
}
