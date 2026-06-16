"use client";

import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Store, CheckCircle2, Loader2 } from "lucide-react";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import ElbadryActivities from "@/components/Projects/ElbadryTrade/ElbadryActivities";
import ElbadryTradePriceChart from "@/components/Projects/ElbadryTrade/ElbadryTradePriceChart";
import { useLenis } from "@/hooks/useLenis";
import { useElbadryTradeProjectDetails } from "@/features/elbadry-trade/hooks/useElbadryTradeProjectDetails";
import { useElbadryTradeConstructionImages } from "@/features/elbadry-trade/hooks/useElbadryTradeConstructionImages";
import { useVideoLinks } from "@/features/elbadry-trade/hooks/useVideoLinks";
import { ProjectHero } from "@/components/shared";

function ElbadryTrade() {
  useLenis();

  const { data: projectDetails, isLoading: isLoadingProject } = useElbadryTradeProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } = useElbadryTradeConstructionImages();
  const { data: videoLinks } = useVideoLinks();

  if (isLoadingProject || isLoadingImages) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const videoLink = videoLinks?.find((l) => l.name === "gomla mall")?.link || "jWCRs6Oc_0g";
  const imagesSlider = constructionImages?.map((img) => img.img) || [];

  return (
    <div className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: "مشروع تجاري", className: "bg-[#4A36A2]/10 text-[#4A36A2]" }}
        title={projectDetails.name}
        location={projectDetails.location}
        description={projectDetails.description}
        videoId={videoLink}
        className="mb-12"
      />

      <div className="container mx-auto">

        {/* ── ما يتميز به المشروع + جولة 3D ── */}
        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100 items-stretch"
        >
          {/* الكلام — يمين */}
          <div className="flex flex-col gap-4 order-1">
            <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4">
              ما يتميز به المشروع
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
                "مشروع ضخم بمسطحات بنائية تتجاوز 21 ألف متر مربع",
                "مستهدف ليكون الوجهة الرئيسية للتسوق لأكثر من 10 مليون من أبناء الدقهلية",
                "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
                "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[#333] text-base leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* الصور — شمال */}
          <div className="relative w-full rounded-xl overflow-hidden order-2 min-h-[280px]">
            <ProjectImgsSlider rounded={true} height="h-full" images={imagesSlider} />
          </div>
        </AnimatedSection>

        {/* ── جولة 3D ── */}
        <AnimatedSection duration={0.5} className="mb-12">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold border-r-4 border-primary pr-4 mb-4">
            جولة 3D للمشروع
          </h2>
          <iframe
            className="w-full rounded-2xl h-72 md:h-[480px]"
            loading="lazy"
            src="https://momento360.com/e/u/36a8763404934b80a8f94f1ea11c3e65?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"
            title="3d model badry mall"
          />
        </AnimatedSection>

        {/* ── Chart ── */}
        <AnimatedSection duration={0.5} className="mb-12">
          <ElbadryTradePriceChart />
        </AnimatedSection>

        {/* ── الأنشطة التجارية ── */}
        <AnimatedSection as="section" duration={0.5} className="mb-12">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-6 border-r-4 border-primary pr-4">
            الأنشطة التجارية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ElbadryActivities />
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

export default ElbadryTrade;
