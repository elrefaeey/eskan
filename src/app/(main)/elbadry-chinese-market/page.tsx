"use client";

import { Store } from "lucide-react";
import {
  CHINESE_MARKET_FEATURES,
  CHINESE_MARKET_HERO_DESCRIPTION,
  CHINESE_MARKET_IMAGES,
} from "@/constants/chineseMarket";
import { CHINESE_MARKET_HIGHLIGHTS } from "@/features/chinese-market/constants";
import ChineseMarketInquirySection from "@/features/chinese-market/components/ChineseMarketInquirySection";
import ChineseMarketUnits from "@/features/chinese-market/components/ChineseMarketUnits";
import { MALL_INQUIRY_SECTION_ID } from "@/features/mall/constants";
import { FeaturesHighlights, ProjectFeaturesSection, ProjectHero } from "@/components/shared";

const ChineseMarket = () => {

  return (
    <div className="page">
      <ProjectHero
        visualType="slider"
        images={[...CHINESE_MARKET_IMAGES]}
        badge={{
          text: "سوق الصين العظيم — مول البدري",
          className: "bg-[#C59D28]/10 text-[#C59D28]",
        }}
        title="سوق الصين العظيم"
        subtitle="آخر شارع الأتوبيس الجديد من اتجاه البحر الصغير"
        description={CHINESE_MARKET_HERO_DESCRIPTION}
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Store className="w-5 h-5" />,
            scrollToId: MALL_INQUIRY_SECTION_ID,
            variant: "primary",
          },
        ]}
        className="sec-padding mb-0"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={CHINESE_MARKET_HIGHLIGHTS} cols={3} />
        <ProjectFeaturesSection
          features={CHINESE_MARKET_FEATURES}
          images={[...CHINESE_MARKET_IMAGES]}
        />

        <div className="sec-padding">
          <h2 className="text-primary font-bold text-xl md:text-2xl lg:text-3xl mb-6">
            الوحدات المتاحة
          </h2>
          <ChineseMarketUnits />
        </div>

        {/* <ChineseMarketInquirySection /> */}
      </div>
    </div>
  );
};

export default ChineseMarket;
