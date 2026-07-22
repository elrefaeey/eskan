"use client";

import { ProjectFeaturesSection } from "@/components/shared";
import { SOUQ_ISTANBUL_FEATURES } from "@/features/souq-istanbul/constants";

interface SouqIstanbulFeaturesSectionProps {
  images: string[];
}

export default function SouqIstanbulFeaturesSection({
  images,
}: SouqIstanbulFeaturesSectionProps) {
  return <ProjectFeaturesSection features={SOUQ_ISTANBUL_FEATURES} images={images} />;
}
