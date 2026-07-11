"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { MALL_SECTIONS, MALL_UNITS_SECTION_ID } from "@/features/mall/constants";

export interface ProjectUnitsSectionProps {
  children: ReactNode;
  sectionId?: string;
  title?: string;
  icon?: LucideIcon;
}

export default function ProjectUnitsSection({
  children,
  sectionId = MALL_UNITS_SECTION_ID,
  title = MALL_SECTIONS.units,
  icon: Icon,
}: ProjectUnitsSectionProps) {
  return (
    <div id={sectionId}>
      <AnimatedSection variant={fadeUp} className="sec-padding">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {title}
        </h2>
        {children}
      </AnimatedSection>
    </div>
  );
}
