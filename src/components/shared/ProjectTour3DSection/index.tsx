"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { MALL_SECTIONS } from "@/features/mall/constants";

export interface ProjectTour3DSectionProps {
  src: string;
  iframeTitle: string;
  title?: string;
}

export default function ProjectTour3DSection({
  src,
  iframeTitle,
  title = MALL_SECTIONS.tour3d,
}: ProjectTour3DSectionProps) {
  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4 mb-4">
        {title}
      </h2>
      <iframe
        className="w-full rounded-2xl h-72 md:h-[480px]"
        loading="lazy"
        src={src}
        title={iframeTitle}
      />
    </AnimatedSection>
  );
}
