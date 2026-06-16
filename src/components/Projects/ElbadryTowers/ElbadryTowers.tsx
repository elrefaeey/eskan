"use client";

import { useEffect, useRef } from "react";
import { MapPin, Building2 } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import CardsInfo from "@/components/Projects/ElbadryTowers/CardsInfo";
import ElbadryToursUnits from "@/components/Projects/ElbadryTowers/ElbadryToursUnits";
import { useLenis } from "@/hooks/useLenis";
import useProjectDetails from "@/features/elbadry-towers/hooks/useProjectDetails";
import useConstructionPhases from "@/features/elbadry-towers/hooks/useConstructionPhases";
import { LoadingPage } from "@/components/ui/LoadingPage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoVideo } from "react-icons/go";

function ElbadryTowers() {
  useLenis();

  const { projectDetails, isLoading: projectLoading } = useProjectDetails(1);
  const { constructionPhases, isLoading: phasesLoading } = useConstructionPhases();
  const shouldMount = useRef(true);
  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  if (projectLoading || phasesLoading) return <LoadingPage />;
  if (!projectDetails || !constructionPhases) return null;

  const headerImages = projectDetails.imgs.map((img) => img.img);
  const phaseImages = constructionPhases.map((p) => p.img);

  return (
    <div className="w-full page" dir="rtl">

      {/* ── Hero ── */}
      <section className="mb-12 bg-white border-b border-gray-100">
        <div className="rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2 container mx-auto">

          {/* الصورة */}
          <div className="relative h-80 max-h-80 md:h-auto md:min-h-[300px] md:max-h-none order-1 rounded-2xl overflow-hidden">
            <ProjectImgsSlider images={headerImages} height="h-full md:!h-full" rounded={false} />
          </div>

          {/* النص */}
          <div className="flex flex-col justify-between gap-4 py-6 max-md:px-0 md:p-8 order-2">
            <div>
              <div className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full w-fit mb-3">
                مشروع سكني
              </div>
              <h1 className="text-primary text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                {projectDetails.name}
              </h1>
              <div className="flex items-center gap-1.5 text-[#555] text-sm mb-4">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{projectDetails.location}</span>
              </div>
              <div className="w-16 h-1.5 bg-primary rounded mb-4" />
              <p className="text-[#444] text-base md:text-lg leading-[1.9]">
                {projectDetails.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-3 bg-primary text-white font-bold text-base rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors duration-200 w-fit">
                    <GoVideo className="size-5" />
                    مشاهدة فيديو المشروع
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden sm:rounded-2xl">
                  <DialogHeader className="px-4 pt-4 sm:px-6">
                    <DialogTitle className="text-base sm:text-lg">فيديو المشروع</DialogTitle>
                  </DialogHeader>
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/jWCRs6Oc_0g"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <button
                onClick={() => document.getElementById("units-section")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="flex items-center gap-2 border-2 border-primary text-primary font-bold text-base rounded-xl px-6 py-3 hover:bg-primary/5 transition-colors w-fit"
              >
                <Building2 className="w-5 h-5" />
                عرض الوحدات
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">

        {/* ── مميزات المشروع ── */}
        <AnimatedSection duration={0.5} className="mb-12">
          <CardsInfo />
        </AnimatedSection>

        {/* ── ما يتميز به المشروع ── */}
        <AnimatedSection
          duration={0.5}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 bg-[#f8f8f8] rounded-2xl p-6 md:p-8 border border-gray-100 items-stretch"
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
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* الصور — شمال */}
          <div className="relative w-full rounded-xl overflow-hidden order-2 min-h-[300px]">
            <ProjectImgsSlider rounded={true} height="h-full" images={phaseImages} />
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
            title="جولة 3D أبراج البدري"
          />
        </AnimatedSection>

        {/* ── الوحدات ── */}
        <div>
          <ElbadryToursUnits />
        </div>

      </div>
    </div>
  );
}

export default ElbadryTowers;
