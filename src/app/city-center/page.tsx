"use client";

import { useEffect, useRef } from "react";
import { Loader2, Store } from "lucide-react";
import { ProjectHero, StatsGrid } from "@/components/shared";
import { useLenis } from "@/hooks/useLenis";
import { useCityCenterProjectDetails } from "@/features/city-center/hooks/useCityCenterProjectDetails";
import { useCityCenterConstructionImages } from "@/features/city-center/hooks/useCityCenterConstructionImages";
import { CityCenterInvestmentSection } from "@/features/city-center/components/CityCenterInvestmentSection";
import { CityCenterConstructionProgress } from "@/features/city-center/components/construction-progress";
import { CityCenterContractSection } from "@/features/city-center/components/CityCenterContractSection";
import { CityCenterLevelsSection } from "@/features/city-center/components/CityCenterLevelsSection";
import {
  CITY_CENTER_HERO,
  CITY_CENTER_LEVELS_SECTION_ID,
  CITY_CENTER_STATS,
} from "@/features/city-center/constants";

const CityCenterPage = () => {
  const shouldMount = useRef(true);
  const levelsRef = useRef<HTMLDivElement>(null);

  const { data: projectDetails, isLoading: isLoadingProject } = useCityCenterProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } = useCityCenterConstructionImages();

  useLenis();

  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  if (isLoadingProject || isLoadingImages) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const imagesSlider = constructionImages?.map((img) => img.img) || [];

  return (
    <div className="w-full page" >
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: CITY_CENTER_HERO.badge, color: "primary" }}
        title={projectDetails.name}
        location={projectDetails.location}
        description={CITY_CENTER_HERO.description}
        highlightText={CITY_CENTER_HERO.highlightText}
        videoId={projectDetails.video || CITY_CENTER_HERO.defaultVideoId}
        ctaButtons={[
          {
            text: "احجز وحدتك الآن",
            icon: <Store className="w-5 h-5" />,
            onClick: () =>
              levelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
            variant: "outline",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <StatsGrid stats={CITY_CENTER_STATS} colorScheme="primary" variant="strip" className="sec-padding" />
        <CityCenterInvestmentSection images={imagesSlider} />
        <CityCenterConstructionProgress />
        <CityCenterContractSection />

        <div ref={levelsRef} id={CITY_CENTER_LEVELS_SECTION_ID}>
          <CityCenterLevelsSection img={headerImages[0]} />
        </div>
      </div>
    </div>
  );
};

export default CityCenterPage;
