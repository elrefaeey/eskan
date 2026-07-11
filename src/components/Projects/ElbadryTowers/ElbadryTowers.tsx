"use client";

import { useEffect, useRef } from "react";
import ElbadryToursUnits from "@/components/Projects/ElbadryTowers/ElbadryToursUnits";
import { useLenis } from "@/hooks/useLenis";
import useProjectDetails from "@/features/elbadry-towers/hooks/useProjectDetails";
import useConstructionPhases from "@/features/elbadry-towers/hooks/useConstructionPhases";
import ElbadryTowersHero from "@/features/elbadry-towers/components/ElbadryTowersHero";
import ElbadryTowersServicesSection from "@/features/elbadry-towers/components/ElbadryTowersServicesSection";
import ElbadryTowersFeaturesSection from "@/features/elbadry-towers/components/ElbadryTowersFeaturesSection";
import ElbadryTowersPriceSection from "@/features/elbadry-towers/components/ElbadryTowersPriceSection";
import ElbadryTowersTour3DSection from "@/features/elbadry-towers/components/ElbadryTowersTour3DSection";
import { LoadingPage } from "@/components/ui/LoadingPage";

function ElbadryTowers() {
  useLenis();

  const { projectDetails, isLoading: projectLoading } = useProjectDetails(1);
  const { constructionPhases, isLoading: phasesLoading } = useConstructionPhases();
  const shouldMount = useRef(true);

  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  if (projectLoading || phasesLoading) return <LoadingPage />;
  if (!projectDetails || !constructionPhases) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const phaseImages = constructionPhases.map((p) => p.img);

  return (
    <div className="w-full page">
      <ElbadryTowersHero
        images={headerImages}
        name={projectDetails.name}
        location={projectDetails.location}
        description={projectDetails.description}
      />

      <div className="container mx-auto">
        <ElbadryTowersServicesSection />
        <ElbadryTowersFeaturesSection phaseImages={phaseImages} />
        <ElbadryTowersPriceSection />
        <ElbadryTowersTour3DSection />
        <ElbadryToursUnits />
      </div>
    </div>
  );
}

export default ElbadryTowers;
