"use client";

import { Coffee } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useMallConstructionImages } from "@/features/mall/hooks/useMallConstructionImages";
import {
  CAFE_HERO,
  CAFE_HERO_IMAGES,
  CAFE_HIGHLIGHTS,
} from "@/features/cafe-restaurants/constants";
import CafeFeaturesSection from "@/features/cafe-restaurants/components/CafeFeaturesSection";
import CafeUnitsSection from "@/features/cafe-restaurants/components/CafeUnitsSection";
import { MALL_UNITS_SECTION_ID } from "@/features/mall/constants";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { FeaturesHighlights, ProjectHero } from "@/components/shared";

const CafeAndRestaurants = () => {
  useLenis();

  const { data: constructionImagesData, isLoading } = useMallConstructionImages();

  if (isLoading) return <LoadingPage />;

  const constructionImages = constructionImagesData?.data?.map((img) => img.img) || [];

  return (
    <div className="page" >
      <ProjectHero
        visualType="slider"
        images={[...CAFE_HERO_IMAGES]}
        badge={{ text: CAFE_HERO.badge, color: "primary" }}
        title={CAFE_HERO.title}
        subtitle={CAFE_HERO.subtitle}
        description={CAFE_HERO.description}
        ctaButtons={[
          {
            text: CAFE_HERO.ctaText,
            icon: <Coffee className="w-5 h-5" />,
            scrollToId: MALL_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={CAFE_HIGHLIGHTS} cols={3} />
        {constructionImages.length > 0 && (
          <CafeFeaturesSection images={constructionImages} />
        )}
        <CafeUnitsSection />
      </div>
    </div>
  );
};

export default CafeAndRestaurants;
