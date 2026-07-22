"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { ConstructionPhasesTimeline } from "./ConstructionPhasesTimeline";
import { ConstructionProgressHeader } from "./ConstructionProgressHeader";
import { ConstructionProgressMetrics } from "./ConstructionProgressMetrics";

export function CityCenterConstructionProgress() {
  return (
    <AnimatedSection
      variant={fadeUp}
      className="sec-padding bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm [direction:rtl]"
    >
      <ConstructionProgressHeader />
      <ConstructionProgressMetrics />
      <ConstructionPhasesTimeline />
    </AnimatedSection>
  );
}
