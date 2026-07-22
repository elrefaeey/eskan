"use client";

import { Store } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useMallImages } from "@/features/mall/hooks/useMallImages";
import { useMallConstructionImages } from "@/features/mall/hooks/useMallConstructionImages";
import {
  SOUQ_ISTANBUL_HERO,
  SOUQ_ISTANBUL_HIGHLIGHTS,
} from "@/features/souq-istanbul/constants";
import SouqIstanbulFeaturesSection from "@/features/souq-istanbul/components/SouqIstanbulFeaturesSection";
import SouqIstanbulUnitsSection from "@/features/souq-istanbul/components/SouqIstanbulUnitsSection";
import { MALL_UNITS_SECTION_ID } from "@/features/mall/constants";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { FeaturesHighlights, ProjectHero } from "@/components/shared";

const SouqIstanbul = () => {
  useLenis();

  const { data: mallImagesData, isLoading: isLoadingMall } = useMallImages();
  const { data: constructionImagesData, isLoading: isLoadingConstruction } =
    useMallConstructionImages();

  if (isLoadingMall || isLoadingConstruction) return <LoadingPage />;

  const headerImages = mallImagesData?.data?.map((img) => img.img) || [];
  const constructionImages = constructionImagesData?.data?.map((img) => img.img) || [];

  return (
    <div className="page" >
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: SOUQ_ISTANBUL_HERO.badge, color: "red" }}
        title={SOUQ_ISTANBUL_HERO.title}
        subtitle={SOUQ_ISTANBUL_HERO.subtitle}
        description={SOUQ_ISTANBUL_HERO.description}
        ctaButtons={[
          {
            text: SOUQ_ISTANBUL_HERO.ctaText,
            icon: <Store className="w-5 h-5" />,
            scrollToId: MALL_UNITS_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={SOUQ_ISTANBUL_HIGHLIGHTS} cols={3} />
        {constructionImages.length > 0 && (
          <SouqIstanbulFeaturesSection images={constructionImages} />
        )}
        <SouqIstanbulUnitsSection />
      </div>
    </div>
  );
};

export default SouqIstanbul;
