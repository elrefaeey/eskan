"use client";

import { LocationSection, ProjectImage, SectionContent } from "@/components/shared";
import { MADINA_LOCATION } from "../constants";
import MadinaPhaseSelector from "./MadinaPhaseSelector";

export function MadinaResidentialLocationSection() {
  return (
    <LocationSection
      mediaPosition="end"
      containerVariant="primary-flat"
      contentSlotClassName="gap-5"
      className="sec-padding"
    >
      <ProjectImage src={MADINA_LOCATION.planImage} alt={MADINA_LOCATION.planImageAlt} />
      <SectionContent
        description={MADINA_LOCATION.description}
        showDivider
        titleIconClassName="w-6 h-6"
      >
        <MadinaPhaseSelector />
      </SectionContent>
    </LocationSection>
  );
}
