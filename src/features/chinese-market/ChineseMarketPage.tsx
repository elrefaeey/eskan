"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Store, TrendingUp, Users } from "lucide-react";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";
import {
  CHINESE_MARKET_FEATURES,
  CHINESE_MARKET_HERO_DESCRIPTION,
  CHINESE_MARKET_IMAGES,
} from "@/constants/chineseMarket";

const highlights: HighlightItem[] = [
  {
    icon: Store,
    title: "سوق متخصص",
    desc: "أكبر تجمع للمنتجات الصينية في قلب الدلتا داخل مول البدري على مساحة تتجاوز 6000 متر مربع",
  },
  {
    icon: TrendingUp,
    title: "عائد مميز",
    desc: "فرصة استثمارية واعدة بعوائد إيجارية مرتفعة داخل مول البدري",
  },
  {
    icon: Users,
    title: "جمهور ضخم",
    desc: "موقع استراتيجي يستهدف آلاف الزوار يوميًا من الدقهلية والمحافظات المجاورة",
  },
];

const ChineseMarketPage = () => {

  return (
    <div className="page" dir="rtl">
      <ProjectHero
        visualType="slider"
        images={CHINESE_MARKET_IMAGES}
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
            scrollToId: "inquiry-section",
            variant: "primary",
          },
        ]}
        className="mb-10"
      />

      <div className="container mx-auto">
        <FeaturesHighlights highlights={highlights} cols={3} className="mb-10" />

        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-stretch"
        >
          <div className="flex flex-col gap-4 order-1">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
              ما يتميز به المشروع
            </h2>
            <ul className="flex flex-col gap-3">
              {CHINESE_MARKET_FEATURES.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden order-2 min-h-[280px]">
            <ProjectImgsSlider rounded={true} height="h-full" images={CHINESE_MARKET_IMAGES} />
          </div>
        </AnimatedSection>

        <div id="inquiry-section">
          <AnimatedSection
            duration={0.5}
            className="mb-10 bg-white rounded-2xl p-8 md:p-12 border border-gray-100 text-center"
          >
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-4">
              للاستفسار عن الوحدات المتاحة
            </h2>
            <p className="text-[#555] text-body-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              تواصل معنا الآن لمعرفة المساحات المتاحة وفرص الاستثمار في سوق الصين العظيم بمول البدري.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default ChineseMarketPage;
