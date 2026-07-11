"use client";

import {
  LocationSection,
  ProjectMap,
  SectionContent,
  ExternalMapLink,
} from "@/components/shared";
import {
  GALLERY_GROUND_LOCATION,
  GALLERY_GROUND_LOCATION_SECTION_DEFAULTS,
} from "../constants";

export default function GalleryGroundLocationSection() {
  return (
    <LocationSection {...GALLERY_GROUND_LOCATION_SECTION_DEFAULTS} className="sec-padding">
      <ProjectMap
        embedUrl={GALLERY_GROUND_LOCATION.embedUrl}
        title={GALLERY_GROUND_LOCATION.title}
      />
      <SectionContent
        accentScheme="primary"
        description={GALLERY_GROUND_LOCATION.description}
        descriptionClassName="text-body-base md:text-lg leading-[2]"
        titleIconClassName="w-6 h-6"
      >
        <ExternalMapLink
          accentScheme="primary"
          href={GALLERY_GROUND_LOCATION.externalMapHref}
          className="px-5 py-3 text-sm mt-2"
        />
      </SectionContent>
    </LocationSection>
  );
}
