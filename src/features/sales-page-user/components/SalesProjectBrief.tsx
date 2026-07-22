"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { PROJECT_BRIEF_DELAY } from "../animations";

interface SalesProjectBriefProps {
  description: string;
}

export default function SalesProjectBrief({
  description,
}: SalesProjectBriefProps) {
  return (
    <AnimatedSection delay={PROJECT_BRIEF_DELAY} className="sec-padding">
      <h3 className="h3 text-primary">نبذة عن المشروع</h3>
      <p className="mt-3 max-w-4xl whitespace-pre-line text-base leading-relaxed text-[#444] md:text-lg lg:text-xl">
        {description}
      </p>
    </AnimatedSection>
  );
}
