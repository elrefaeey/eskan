"use client";

import { useLenis } from "@/hooks/useLenis";
import useProjectDetails from "@/features/elbadry-towers/hooks/useProjectDetails";
import ElbadryProjectCardsSection from "@/features/elbadry-towers/components/ElbadryProjectCardsSection";
import {
  ELBADRY_HERO,
  ELBADRY_LOCATION,
  ELBADRY_LOCATION_SECTION_DEFAULTS,
} from "@/features/elbadry-towers/constants";
import { LoadingPage } from "@/components/ui/LoadingPage";
import {
  ProjectHero,
  LocationSection,
  ProjectMap,
  SectionContent,
  ExternalMapLink,
  MAP_LOCATION_DESCRIPTION_CLASS,
} from "@/components/shared";

export default function AbragElBadry() {
  const { projectDetails, isLoading } = useProjectDetails(1);
  useLenis();

  if (isLoading) return <LoadingPage />;
  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((i) => i.img);

  return (
    <div className="w-full page">
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={ELBADRY_HERO.badge}
        title={ELBADRY_HERO.title}
        location={projectDetails.location}
        description={projectDetails.description}
        videoId={ELBADRY_HERO.videoId}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <LocationSection
          {...ELBADRY_LOCATION_SECTION_DEFAULTS}
          className="sec-padding"
        >
          <ProjectMap
            embedUrl={ELBADRY_LOCATION.embedUrl}
            title={ELBADRY_LOCATION.title}
          />
          <SectionContent
            description={ELBADRY_LOCATION.description}
            descriptionClassName={MAP_LOCATION_DESCRIPTION_CLASS}
          >
            <ExternalMapLink href={ELBADRY_LOCATION.externalMapHref} />
          </SectionContent>
        </LocationSection>

        <ElbadryProjectCardsSection />
      </div>
    </div>
  );
}
