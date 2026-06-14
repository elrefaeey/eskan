"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Loader2, Store, TrendingUp, Users, MoveDown } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useMallImages } from "@/features/mall/hooks/useMallImages";
import { useMallConstructionImages } from "@/features/mall/hooks/useMallConstructionImages";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import SouqIstanbulUnits from "@/components/Projects/SouqIstanbul/SouqIstanbulUnits";
import { ProjectHero, FeaturesHighlights } from "@/components/shared";
import type { HighlightItem } from "@/components/shared";

const highlights: HighlightItem[] = [
  { icon: Store, title: "سوق متخصص", desc: "طفرة واضافة كبيرة للأسواق التجارية بالمنصورة ضمن أكبر مركز تجاري متعدد الأسواق" },
  { icon: TrendingUp, title: "عائد مميز", desc: "مسطحات بنائية تتجاوز 21 ألف متر بعوائد استثمارية مرتفعة" },
  { icon: Users, title: "جمهور ضخم", desc: "المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية للشراء والتسوق" },
];

const SouqIstanbul = () => {
  useLenis();

  const { data: mallImagesData, isLoading: isLoadingMall } = useMallImages();
  const { data: constructionImagesData, isLoading: isLoadingConstruction } = useMallConstructionImages();

  if (isLoadingMall || isLoadingConstruction) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const headerImages = mallImagesData?.data?.map((img) => img.img) || [];
  const constructionImages = constructionImagesData?.data?.map((img) => img.img) || [];

  return (
    <div className="container page px-4" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        isLoading={isLoadingMall}
        visualType="slider"
        images={headerImages}
        badge={{ text: "سوق اسطنبول — مول البدري", color: "red" }}
        title="سوق اسطنبول"
        subtitle="آخر شارع الأتوبيس الجديد من اتجاه البحر الصغير"
        description="يعتبر سوق اسطنبول طفرة وإضافة كبيرة للأسواق التجارية بالمنصورة، والذي تنشئه حاليًا مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة المطور العقاري للمشروع ضمن أكبر مركز تجاري متعدد الأسواق بالمنصورة وعلى مسطحات بنائية تتجاوز 21 ألف متر، ليكون المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية للشراء والتسوق."
        ctaButtons={[
          {
            text: "حدد مواصفات محلك",
            icon: <Store className="w-5 h-5" />,
            scrollToId: "units-section",
            variant: "primary",
          },
        ]}
        className="mb-10"
      />

      {/* ── مميزات ── */}
      <FeaturesHighlights highlights={highlights} cols={3} className="mb-10" />

      {/* ── ما يتميز به المشروع + المراحل التنفيذية ── */}
      {(constructionImages.length > 0) && (
        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100 items-stretch"
        >
          {/* الكلام — يمين */}
          <div className="flex flex-col gap-4 order-1">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
              ما يتميز به المشروع
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
                "سوق متخصص يضم أرقى ماركات الملابس والإكسسوار والمنتجات التركية",
                "مستهدف ليكون الوجهة الرئيسية للتسوق لأكثر من 10 مليون من أبناء الدقهلية",
                "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
                "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[#333] text-base leading-relaxed">
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
        <SouqIstanbulUnits />
      </AnimatedSection>
      </div>

    </div>
  );
};

export default SouqIstanbul;
