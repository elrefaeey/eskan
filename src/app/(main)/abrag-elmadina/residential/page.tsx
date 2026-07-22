"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import { MADINA_RESIDENTIAL_HERO } from "@/features/abrag-elmadina/constants";
import { MADINA_RESIDENTIAL_STATS } from "@/features/abrag-elmadina/constants/residential";
import MadinaPriceSection from "@/features/abrag-elmadina/components/MadinaPriceSection";
import { MadinaResidentialLocationSection } from "@/features/abrag-elmadina/components/MadinaResidentialLocationSection";
import MadinaUnitsSection from "@/features/abrag-elmadina/components/MadinaUnitsSection";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ProjectHero, StatsGrid } from "@/components/shared";

export default function ResidentialPage() {
  const searchParams = useSearchParams();
  const unitsRef = useRef<HTMLDivElement>(null);
  const { projectDetails, isLoading } = useMadinaProjectDetails();
  const selectedStep = searchParams.get("step");

  useLenis();

  useEffect(() => {
    if (selectedStep && unitsRef.current) {
      const t = setTimeout(() => {
        unitsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [selectedStep]);

  if (isLoading) return <LoadingPage />;
  if (!projectDetails) return null;

  return (
    <section className="w-full page">
      <ProjectHero
        visualType="slider"
        images={projectDetails.imgs.map((i) => i.img)}
        badge={{ text: MADINA_RESIDENTIAL_HERO.badge, color: "primary" }}
        title={MADINA_RESIDENTIAL_HERO.title}
        location={projectDetails.location}
        description={MADINA_RESIDENTIAL_HERO.description}
        videoId={MADINA_RESIDENTIAL_HERO.videoId}
        className="sec-padding mb-0 border-b border-gray-100"
      />

      <div className="container mx-auto">
        <StatsGrid
          stats={MADINA_RESIDENTIAL_STATS}
          colorScheme="primary"
          variant="strip"
          className="sec-padding mb-0"
        />

        <MadinaPriceSection />
        <MadinaResidentialLocationSection />

        <div ref={unitsRef}>
          <MadinaUnitsSection />
        </div>
      </div>
    </section>
  );
}
