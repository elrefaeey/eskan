"use client";

import { useLenis } from "@/hooks/useLenis";
import { useElbadryTradeProjectDetails } from "@/features/elbadry-trade/hooks/useElbadryTradeProjectDetails";
import { useElbadryTradeConstructionImages } from "@/features/elbadry-trade/hooks/useElbadryTradeConstructionImages";
import { useVideoLinks } from "@/features/elbadry-trade/hooks/useVideoLinks";
import { ELBADRY_TRADE_HERO } from "@/features/elbadry-trade/constants";
import ElbadryTradeFeaturesSection from "@/features/elbadry-trade/components/ElbadryTradeFeaturesSection";
import ElbadryTradeActivitiesSection from "@/features/elbadry-trade/components/ElbadryTradeActivitiesSection";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ProjectHero, ProjectTour3DSection } from "@/components/shared";
import { MALL_TOUR_3D } from "@/features/mall/constants";

function ElbadryTrade() {
  useLenis();

  const { data: projectDetails, isLoading: isLoadingProject } = useElbadryTradeProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } = useElbadryTradeConstructionImages();
  const { data: videoLinks } = useVideoLinks();

  if (isLoadingProject || isLoadingImages) return <LoadingPage />;
  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const videoLink =
    videoLinks?.find((l) => l.name === ELBADRY_TRADE_HERO.videoLinkName)?.link ||
    ELBADRY_TRADE_HERO.defaultVideoId;
  const constructionSliderImages = constructionImages?.map((img) => img.img) || [];

  return (
    <div className="w-full page" dir="rtl">
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: ELBADRY_TRADE_HERO.badge, className: ELBADRY_TRADE_HERO.badgeClassName }}
        title={projectDetails.name}
        location={projectDetails.location}
        description={projectDetails.description}
        videoId={videoLink}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <ElbadryTradeFeaturesSection images={constructionSliderImages} />
        <ProjectTour3DSection src={MALL_TOUR_3D.src} iframeTitle={MALL_TOUR_3D.title} />
        <ElbadryTradeActivitiesSection />
      </div>
    </div>
  );
}

export default ElbadryTrade;
