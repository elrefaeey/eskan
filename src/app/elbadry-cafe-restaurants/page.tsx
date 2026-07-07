"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Loader2, Coffee, TrendingUp, Users, MoveDown } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useMallConstructionImages } from "@/features/mall/hooks/useMallConstructionImages";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import CafeRestaurantUnits from "@/components/Projects/CafeRestaurants/CafeRestaurantUnits";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";

const highlights: HighlightItem[] = [
  { icon: Coffee, title: "مطاعم وكافيهات", desc: "دور كامل مخصص للمطاعم والكافيهات في موقع يستهدف ملايين الزوار" },
  { icon: TrendingUp, title: "عائد مميز", desc: "عوائد إيجارية مرتفعة في أكبر مركز تجاري متعدد الأسواق بالمنصورة" },
  { icon: Users, title: "جمهور ضخم", desc: "المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية للترفيه والتسوق" },
];

const CafeAndRestaurants = () => {
  useLenis();

  const { data: constructionImagesData, isLoading } = useMallConstructionImages();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const constructionImages = constructionImagesData?.data?.map((img) => img.img) || [];
  const headerImages = ["/assets/elbadry-trade/cafe1.jpg", "/assets/elbadry-trade/cafe2.jpg"];

  return (
    <div className="page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: "مطاعم وكافيهات — مول البدري", color: "primary" }}
        title="مطاعم وكافيهات"
        subtitle="آخر شارع الأتوبيس الجديد من اتجاه البحر الصغير"
        description="يعتبر مشروع المطاعم والكافيهات طفرة وإضافة كبيرة للمشاريع التجارية بالمنصورة، والذي تنشئه حاليًا مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة المطور العقاري للمشروع ضمن أكبر مركز تجاري متعدد الأسواق بالمنصورة وعلى مسطحات بنائية تتجاوز 21 ألف متر، ليكون المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية."
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Coffee className="w-5 h-5" />,
            scrollToId: "units-section",
            variant: "primary",
          },
        ]}
        className="mb-10"
      />

      <div className="container mx-auto">

      {/* ── مميزات ── */}
      <FeaturesHighlights highlights={highlights} cols={3} className="mb-10" />

      {/* ── ما يتميز به المشروع + المراحل التنفيذية ── */}
      {constructionImages.length > 0 && (
        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-[#f8f8f8] rounded-2xl p-4 md:p-8 border border-gray-100 items-stretch"
        >
          {/* الكلام — يمين */}
          <div className="flex flex-col gap-4 order-1">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
              ما يتميز به المشروع
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
                "دور كامل مخصص للمطاعم والكافيهات بتصميم عصري متكامل",
                "مستهدف ليكون الوجهة الرئيسية للترفيه والتسوق لأكثر من 10 مليون من أبناء الدقهلية",
                "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
                "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[#333] text-body-base leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* الصور — شمال */}
          <div className="relative w-full rounded-xl overflow-hidden order-2 min-h-[280px]">
            <ProjectImgsSlider rounded={true} height="h-full" images={constructionImages} />
          </div>
        </AnimatedSection>
      )}

      {/* ── الوحدات ── */}
      <div id="units-section">
        <AnimatedSection duration={0.5} className="mb-10">
        <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4 flex items-center gap-2">
          <MoveDown className="w-5 h-5" />
          الوحدات المتاحة
        </h2>
        <CafeRestaurantUnits />
      </AnimatedSection>
      </div>

      </div>

    </div>
  );
};

export default CafeAndRestaurants;
