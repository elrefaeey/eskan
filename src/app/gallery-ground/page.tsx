"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Store, CheckCircle2, Loader2, TrendingUp, Layers, Award } from "lucide-react";
import SelectInput from "@/components/SelectInput";
import GalleryGroundList from "@/features/gallery-ground/components/GalleryGroundList";
import { useLenis } from "@/hooks/useLenis";
import useGalleryGroundFilters from "@/features/gallery-ground/hooks/useGalleryGroundFilters";
import useProjectDetails from "@/features/gallery-ground/hooks/useProjectDetails";
import useConstructionPhases from "@/features/gallery-ground/hooks/useConstructionPhases";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import { ProjectHero, StatsGrid } from "@/components/shared";
import type { StatItem } from "@/components/shared";
import MapSection from "@/components/shared/MapSection";

const galleryGroundLocations = [
  { value: "ابراج المدينة 1", label: "ابراج المدينة 1" },
  { value: "ابراج المدينة 2", label: "ابراج المدينة 2" },
];

const projectFeatures = [
  "أول مجمع تجاري متخصص في الدلتا في بيع وتجارة مواد البناء، التشطيب، الديكور، الأثاث، والفرش المنزلي",
  "مجمع تجاري مرخّص بالكامل وتحت الإنشاء، مما يمنح ليك أمان وثقة في التنفيذ",
  "موقع استراتيجي سهل الوصول، دقيقة واحدة فقط من شارع قناة السويس، 10 دقائق من جامعة المنصورة، 5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية",
  "أعلى عائد استثماري يتخطى 40% خلال سنة و100% خلال فترة التسليم",
  "أنت بتتملك في مشروع بيستهدف 20 مليون مواطن من أهالي الدلتا",
];

const stats: StatItem[] = [
  { label: "الأول من نوعه في الدلتا",   value: "#1",   icon: Award },
  { label: "ألف متر مربع",              value: "15",   icon: Layers },
  { label: "طوابق تجارية",              value: "6",    icon: Store },
  { label: "عائد استثماري خلال سنة",    value: "40%+", icon: TrendingUp },
];

function GalleryGroundPage() {
  const searchParams = useSearchParams();
  const unitsRef = useRef<HTMLDivElement>(null);
  const { spaces, meterPrices } = useGalleryGroundFilters();
  const { projectDetails, isLoading } = useProjectDetails();
  const { constructionPhases, isLoading: phasesLoading } = useConstructionPhases();

  useLenis();

  if (isLoading || phasesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  const sliderImages = projectDetails.imgs?.map((img) => img.img) || [];
  const phaseImages = Array.isArray(constructionPhases)
    ? constructionPhases.map((p) => p.img)
    : constructionPhases?.img
      ? [constructionPhases.img]
      : [];

  return (
    <main className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={sliderImages}
        badge={{ text: "مشروع تجاري", className: "bg-[#4A36A2]/15 text-[#4A36A2]" }}
        title={projectDetails.name}
        location={projectDetails.location}
        description={projectDetails.description}
        ctaButtons={[{
          text: "احجز وحدتك الآن",
          icon: <Store className="w-5 h-5" />,
          onClick: () => unitsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          variant: "primary",
        }]}
        className="mb-10"
      />

      <div className="container mx-auto px-4">
      <StatsGrid stats={stats} colorScheme="purple" className="mb-10" />

      {/* ── ما يميز الاستثمار ── */}
      <AnimatedSection
        duration={0.5}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100"
      >
        {/* صور المراحل */}
        {phaseImages.length > 0 && (
          <div className="relative w-full h-64 md:h-auto rounded-xl overflow-hidden order-2 md:order-1">
            <ProjectImgsSlider images={phaseImages} height="h-64 md:!h-full" rounded={true} />
          </div>
        )}

        <div className="flex flex-col gap-4 order-1 md:order-2">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold">
            ما يميز الاستثمار في أرض المعارض
          </h2>
          <ul className="flex flex-col gap-3">
            {projectFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-[#333] text-base md:text-lg leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ── موقع المشروع ── */}
      <MapSection
        embedUrl="https://www.google.com/maps?q=31.050302,31.410547&output=embed&t=k"
        iframeTitle="موقع أرض المعارض"
        iframeClassName="rounded-xl"
        visualClassName="rounded-xl overflow-hidden"
        description="موقع استراتيجي سهل الوصول، دقيقة واحدة فقط من شارع قناة السويس، 10 دقائق من جامعة المنصورة، 5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية. يقع المشروع في الاتجاه المقابل لـ كوبري جديلة مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة والدلتا."
        descriptionClassName="text-base md:text-lg leading-[2]"
        externalMapUrl="https://maps.app.goo.gl/unEGE1Y6QCEZP2wM6"
        buttonClassName="px-5 py-3 text-sm mt-2"
        titleIconClassName="w-6 h-6"
        textContainerClassName="gap-3 p-6 md:p-8"
        mapPosition="map-left"
        gridClassName="gap-6"
        containerVariant="card"
        className="mb-10"
      />

      {/* ── الوحدات ── */}
      <div ref={unitsRef}>
        <AnimatedSection duration={0.5} className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-r-4 border-primary pr-4">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold">احجز الآن</h2>
          <div className="flex gap-2 flex-wrap">
            <SelectInput options={galleryGroundLocations} name="location" placeholder="الموقع" className="w-auto" />
            <SelectInput options={meterPrices} name="meter_price" placeholder="سعر المتر" className="w-auto" />
            <SelectInput options={spaces} name="space" placeholder="المساحة" className="w-auto" />
          </div>
        </div>

        {searchParams.get("location") || searchParams.get("meter_price") || searchParams.get("space") ? (
          <GalleryGroundList />
        ) : (
          <>
            <GalleryGroundList />
          </>
        )}
      </AnimatedSection>
      </div>

      </div>{/* end container */}
    </main>
  );
}

export default GalleryGroundPage;
