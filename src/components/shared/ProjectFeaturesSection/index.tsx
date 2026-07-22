"use client";

import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { MALL_SECTIONS } from "@/features/mall/constants";

export interface ProjectFeaturesSectionProps {
  features: readonly string[];
  images: string[];
  title?: string;
  bulletStyle?: "dot" | "check";
  minImageHeight?: string;
  imageOrder?: "start" | "end";
  className?: string;
}

export default function ProjectFeaturesSection({
  features,
  images,
  title = MALL_SECTIONS.features,
  bulletStyle = "dot",
  minImageHeight = "min-h-[280px]",
  imageOrder = "end",
  className,
}: ProjectFeaturesSectionProps) {
  const textOrder = imageOrder === "start" ? "order-1 md:order-2" : "order-1";
  const imageSlotOrder = imageOrder === "start" ? "order-2 md:order-1" : "order-2";

  return (
    <AnimatedSection
      variant={fadeUp}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 sec-padding bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-stretch",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", textOrder)}>
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
          {title}
        </h2>
        <ul className="flex flex-col gap-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed"
            >
              {bulletStyle === "check" ? (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
              )}
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {images.length > 0 && (
        <div
          className={cn(
            "relative w-full rounded-xl overflow-hidden",
            minImageHeight,
            imageSlotOrder,
          )}
        >
          <ProjectImgsSlider rounded height="h-full" images={images} />
        </div>
      )}
    </AnimatedSection>
  );
}
