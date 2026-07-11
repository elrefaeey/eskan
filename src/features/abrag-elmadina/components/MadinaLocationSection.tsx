"use client";

import {
  LocationSection,
  ProjectMap,
  SectionContent,
  ExternalMapLink,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "@/components/shared";
import {
  MADINA_LOCATION,
  MADINA_LOCATION_SECTION_DEFAULTS,
} from "../constants";

export default function MadinaLocationSection() {
  return (
    <LocationSection {...MADINA_LOCATION_SECTION_DEFAULTS} className="sec-padding">
      <ProjectMap embedUrl={MADINA_LOCATION.embedUrl} title={MADINA_LOCATION.title} />
      <SectionContent
        description={MADINA_LOCATION.description}
        descriptionClassName={MAP_LOCATION_DESCRIPTION_CLASS}
      >
        <ExternalMapLink href={MADINA_LOCATION.externalMapHref} />
      </SectionContent>
    </LocationSection>
  );
}
