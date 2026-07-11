"use client";

import { Building2 } from "lucide-react";
import { ProjectHero } from "@/components/shared";
import { ELBADRY_TOWERS_HERO, ELBADRY_UNITS_SECTION_ID } from "../constants";

interface ElbadryTowersHeroProps {
  images: string[];
  name: string;
  location: string;
  description: string;
}

export default function ElbadryTowersHero({
  images,
  name,
  location,
  description,
}: ElbadryTowersHeroProps) {
  return (
    <ProjectHero
      visualType="slider"
      images={images}
      badge={{ text: ELBADRY_TOWERS_HERO.badge, color: "primary" }}
      title={name}
      location={location}
      description={description}
      videoId={ELBADRY_TOWERS_HERO.videoId}
      videoButtonText={ELBADRY_TOWERS_HERO.videoButtonText}
      ctaButtons={[
        {
          text: ELBADRY_TOWERS_HERO.unitsButtonText,
          icon: <Building2 className="w-5 h-5" />,
          scrollToId: ELBADRY_UNITS_SECTION_ID,
          variant: "outline",
        },
      ]}
      className="sec-padding mb-0 border-b border-gray-100"
    />
  );
}
