"use client";

import { ProjectFeaturesSection } from "@/components/shared";
import { GALLERY_GROUND_FEATURES, GALLERY_GROUND_FEATURES_TITLE } from "../constants";

interface GalleryGroundFeaturesSectionProps {
  phaseImages: string[];
}

export default function GalleryGroundFeaturesSection({
  phaseImages,
}: GalleryGroundFeaturesSectionProps) {
  if (phaseImages.length === 0) return null;

  return (
    <ProjectFeaturesSection
      features={GALLERY_GROUND_FEATURES}
      images={phaseImages}
      title={GALLERY_GROUND_FEATURES_TITLE}
      imageOrder="start"
      minImageHeight="h-64 md:min-h-[280px]"
    />
  );
}
