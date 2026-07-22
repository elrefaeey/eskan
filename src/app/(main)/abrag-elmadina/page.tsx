"use client";

import { useLenis } from "@/hooks/useLenis";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import MadinaProjectCardsSection from "@/features/abrag-elmadina/components/MadinaProjectCardsSection";
import MadinaLocationSection from "@/features/abrag-elmadina/components/MadinaLocationSection";
import { MADINA_HERO } from "@/features/abrag-elmadina/constants";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ProjectHero } from "@/components/shared";

export default function AbragElmadinaPage() {
  const { projectDetails, isLoading } = useMadinaProjectDetails();
  useLenis();

  if (isLoading) return <LoadingPage />;
  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);

  return (
    <div className="w-full page" >
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: MADINA_HERO.badge, color: "primary" }}
        title={MADINA_HERO.title}
        description={MADINA_HERO.description}
        videoId={MADINA_HERO.videoId}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <MadinaLocationSection />
        <MadinaProjectCardsSection />
      </div>
    </div>
  );
}
