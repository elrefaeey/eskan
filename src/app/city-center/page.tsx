"use client";

import { useEffect, useRef } from "react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { Store, CheckCircle2, Loader2, ShieldCheck, Building2, TrendingUp, BarChart3, Maximize2 } from "lucide-react";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import Levels from "@/components/Projects/CityCenter/Levels";
import ConstructionProgress from "@/components/Projects/CityCenter/ConstructionProgress";
import { useCityCenterProjectDetails } from "@/features/city-center/hooks/useCityCenterProjectDetails";
import { useCityCenterConstructionImages } from "@/features/city-center/hooks/useCityCenterConstructionImages";
import { useLenis } from "@/hooks/useLenis";
import { ProjectHero, StatsGrid } from "@/components/shared";
import type { StatItem } from "@/components/shared";

const projectFeatures = [
  "مول مرخص وفي مرحلة متقدمة في الإنشاءات",
  "أول مول متخصص في المنصورة وأكبر تنوع للمحلات التجارية في الدلتا",
  "منظومة خدمات متكاملة: تكييف مركزي، سلالم كهربائية، نظام أمني، بدروم وجراج واسع",
  "مساحات ترفيهية مصممة لإسعاد الأطفال وإضفاء جو من المتعة على العائلات",
];

const contractSteps = [
  "فور التوقيع على العقد يتم نقل حصة من أرض المشروع تمثل قيمة مبلغ مقدم التعاقد",
  "أسلوب السداد من خلال حسابات بنك الإسكان والتعمير — حساب شركات",
  "نظام سداد مرتبط بتقدم الأعمال في المشروع",
];

const stats: StatItem[] = [
  { label: "طوابق تجارية",       value: "6",      icon: Building2 },
  { label: "مباع من المشروع",    value: "80%",    icon: BarChart3 },
  { label: "مسطحات بنائية",      value: "13000م", icon: Maximize2 },
  { label: "أعلى عائد استثماري", value: "25%",    icon: TrendingUp },
];

const CityCenterPage = () => {
  const shouldMount = useRef(true);
  const levelsRef = useRef<HTMLDivElement>(null);

  const { data: projectDetails, isLoading: isLoadingProject } = useCityCenterProjectDetails();
  const { data: constructionImages, isLoading: isLoadingImages } = useCityCenterConstructionImages();

  useLenis();

  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  if (isLoadingProject || isLoadingImages) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const imagesSlider = constructionImages?.map((img) => img.img) || [];

  return (
    <div className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="slider"
        images={headerImages}
        badge={{ text: "مول تجاري متكامل", color: "primary" }}
        title={projectDetails.name}
        location={projectDetails.location}
        description="مول متخصص يضم الإلكترونيات والملابس، دور بازارات، فود كورت، وهايبر بيت الجملة لكي يجذب آلاف الزوار يوميًا. وحدات صغيرة ومتوسطة في موقع يخدم الدلتا بالكامل."
        highlightText="امتلك الآن… مشروع متكامل مش مجرد محل"
        videoId={projectDetails.video || "jWCRs6Oc_0g"}
        ctaButtons={[{
          text: "احجز وحدتك الآن",
          icon: <Store className="w-5 h-5" />,
          onClick: () => levelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          variant: "outline",
        }]}
        className="mb-12"
      />

      <div className="container mx-auto">

        {/* Stats */}
        <StatsGrid stats={stats} colorScheme="primary" className="mb-12" />

        {/* الاستثمار + ما يميز المشروع */}
        <AnimatedSection
          duration={0.5}
          className="mb-12 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* النص */}
            <div className="flex flex-col gap-5 order-2 md:order-1">
              <div>
                <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-2">الاستثمار في سيتي سنتر</h2>
                <p className="text-[#333] text-base md:text-lg leading-[2]">
                  الاستثمار في محلات التجارية في مول سيتي سنتر هو الأفضل لأنه يحقق عائد استثماري سريع.
                  توفر إسكان المنصورة فرصة الاستثمار بغرض إعادة البيع أو العائد الإيجاري بعقود ملزمة
                  من شركة الإدارة، مما يعني توفُر كل شهر دخل ثابت يُأمن لك حياتك وحياة أسرتك.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-primary text-xl font-extrabold border-r-4 border-primary pr-3 mb-3">
                  ما يميز المشروع
                </h3>
                <ul className="flex flex-col gap-2">
                  {projectFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#333] text-base leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* الصورة */}
            <div className="relative w-full h-64 md:h-auto rounded-xl overflow-hidden order-1 md:order-2">
              <ProjectImgsSlider rounded={true} images={imagesSlider} height="h-64 md:!h-full" />
            </div>
          </div>
        </AnimatedSection>

        {/* Construction Progress */}
        <div className="mb-12">
          <ConstructionProgress />
        </div>

        {/* أسلوب التعاقد + نظام الإدارة */}
        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-[#f8f8f8] border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-primary text-2xl font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              أسلوب تعاقد يضمن لك أموالك
            </h2>
            <p className="text-[#555] text-base leading-relaxed">
              سيتي سنتر المنصورة يتم تنفيذه بنظام اتحاد الملاك — أقوى وأضمن نظام تعاقد يحقق الأمان للمتعاقدين:
            </p>
            <ul className="flex flex-col gap-3">
              {contractSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-[#333] text-base leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary rounded-2xl p-6 flex flex-col gap-4 text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <Building2 className="w-6 h-6 shrink-0" />
              نظام إدارة قوي
            </h2>
            <div className="flex flex-col gap-3 text-white/90 text-base leading-[2]">
              <p>
                <span className="font-bold text-white">الشركة المالكة:</span> شركة توب براون — حامد الطنطاوي
                (المالك لمول الطنطاوي للأدوات المنزلية ومطاعم قصر الأسماك)
              </p>
              <p>
                <span className="font-bold text-white">المطور العقاري وإدارة المشروعات:</span> إسكان المنصورة العقارية
                بخبرة تتجاوز 17 سنة في إدارة المشروعات العقارية الكبرى
              </p>
              <p>
                <span className="font-bold text-white">الاستشاري الهندسي:</span> مهندس ربيع السعدني
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* الوحدات */}
        <div ref={levelsRef}>
          <Levels img={headerImages[0]} loading={false} />
        </div>

      </div>
    </div>
  );
};

export default CityCenterPage;
