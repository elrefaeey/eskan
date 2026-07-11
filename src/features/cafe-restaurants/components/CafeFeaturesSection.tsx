"use client";

import { ProjectFeaturesSection } from "@/components/shared";
import { CAFE_FEATURES } from "../constants";

interface CafeFeaturesSectionProps {
  images: string[];
}

export default function CafeFeaturesSection({ images }: CafeFeaturesSectionProps) {
  return <ProjectFeaturesSection features={CAFE_FEATURES} images={images} />;
}
