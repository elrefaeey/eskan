"use client";

import { Store } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import useGalleryGroundFilters from "@/features/gallery-ground/hooks/useGalleryGroundFilters";
import useProjectDetails from "@/features/gallery-ground/hooks/useProjectDetails";
import useConstructionPhases from "@/features/gallery-ground/hooks/useConstructionPhases";
import GalleryGroundFeaturesSection from "@/features/gallery-ground/components/GalleryGroundFeaturesSection";
import GalleryGroundLocationSection from "@/features/gallery-ground/components/GalleryGroundLocationSection";
import GalleryGroundUnitsSection from "@/features/gallery-ground/components/GalleryGroundUnitsSection";
import {
  GALLERY_GROUND_STATS,
  GALLERY_GROUND_UNITS_SECTION_ID,
} from "@/features/gallery-ground/constants";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ProjectHero, StatsGrid } from "@/components/shared";

function GalleryGroundPage() {
  const { spaces, meterPrices } = useGalleryGroundFilters();
  const { projectDetails, isLoading } = useProjectDetails();
  const { constructionPhases, isLoading: phasesLoading } =
    useConstructionPhases();

  useLenis();

  if (isLoading || phasesLoading) return <LoadingPage />;
  if (!projectDetails) return null;

  const sliderImages = projectDetails.imgs?.map((img) => img.img) || [];
  const phaseImages = Array.isArray(constructionPhases)
    ? constructionPhases.map((p) => p.img)
    : constructionPhases?.img
      ? [constructionPhases.img]
      : [];

  return (
    <main className="w-full page" dir="rtl">
      <ProjectHero
        visualType="slider"
        images={sliderImages}
        badge={{ text: "مشروع تجاري", color: "purple" }}
        title={projectDetails.name}
        location={projectDetails.location}
        description={projectDetails.description}
        accentScheme="primary"
        ctaButtons={[
          {
            text: "احجز وحدتك الآن",
            icon: <Store className="w-5 h-5" />,
            scrollToId: GALLERY_GROUND_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <StatsGrid
          stats={GALLERY_GROUND_STATS}
          colorScheme="primary"
          className="sec-padding mb-0"
        />
        <GalleryGroundFeaturesSection phaseImages={phaseImages} />
        <GalleryGroundLocationSection />
        <GalleryGroundUnitsSection spaces={spaces} meterPrices={meterPrices} />
      </div>
    </main>
  );
}

export default GalleryGroundPage;
