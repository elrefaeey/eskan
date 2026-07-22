"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { fetchMadinaProjectDetails } from "@/services/abrag-elmadina";
import type { InvestmentResponseData } from "@/services/investment";
import { AnimateInView } from "@/components/common/animations";
import {
  GPI_IMAGES,
} from "@/features/gpi/constants";
import InvestProjectCard from "./InvestProjectCard";
import ShareCard from "./ShareCard";
import { InvestmentAnalysisMessage } from "./InvestmentAnalysisMessage";
import { InvestmentSectionHeading } from "./InvestmentSectionHeading";
import ProjectHeroCard, { isAbragElmadinaProject } from "./ProjectHeroCard";
import { LoadingPage } from "@/components/ui/LoadingPage";

interface InvestmentUnitProps {
  investmentData: InvestmentResponseData | null;
  onProjectSelect?: (data: InvestmentResponseData) => void;
  onBack?: () => void;
  /** عنوان أعلى الصفحة (مثلاً مسار الإيجاري) */
  pageTitle?: string;
  pageSubtitle?: string;
}

function isGpiProject(
  project: InvestmentResponseData["project"],
): boolean {
  const title = `${project.name ?? ""} ${project.project_name ?? ""}`;
  // مطابقة بالاسم فقط — مش بالـ id (عشان id غلط كان بيركب صور GPI على أبراج المدينة)
  return (
    title.includes("GPI") ||
    title.includes("إعداد الخريجين") ||
    project.id === 14
  );
}

function InvestmentUnit({
  investmentData,
  onProjectSelect,
  onBack,
  pageTitle,
  pageSubtitle = "توصية مخصصة ليك من نافع — مستشارك العقاري",
}: InvestmentUnitProps) {
  const apiMessage = investmentData?.message?.trim() || "";
  const [showContent, setShowContent] = useState(!apiMessage);

  useEffect(() => {
    setShowContent(!apiMessage);
  }, [apiMessage]);

  const handleMessageComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  const project = investmentData?.project;
  const isMadina = !!project && isAbragElmadinaProject(project);
  const isGpi = !!project && isGpiProject(project);

  const { data: madinaProject } = useQuery({
    queryKey: ["madina-project-gallery"],
    queryFn: fetchMadinaProjectDetails,
    enabled: isMadina,
    staleTime: 5 * 60 * 1000,
  });

  const galleryImages = useMemo(() => {
    if (!project) return undefined;
    if (isGpi) return [...GPI_IMAGES];
    if (isMadina) {
      return madinaProject?.imgs?.map((item) => item.img).filter(Boolean);
    }
    return undefined;
  }, [project, isGpi, isMadina, madinaProject]);

  if (!investmentData) {
    return <LoadingPage />;
  }

  const { units, suggested_projects } = investmentData;
  const projectTitle = project?.name ?? project?.project_name ?? "";
  const hasUnits = !!units && units.length > 0;

  return (
    <main className="bg-[#FAFBFC] page pt-5 sm:pt-6 pb-10 lg:mt-[82px]">
      <div className="container max-w-6xl">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-primary text-sm font-semibold shadow-sm hover:bg-primary/5 hover:border-primary/30 transition-colors"
          >
            رجوع
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {pageTitle && (
          <header className="mb-5 sm:mb-6 text-center">
            <h1 className="font-extrabold text-[1.5rem] sm:text-3xl text-[#1F503B] leading-tight">
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="text-[#888] text-sm sm:text-base mt-1.5 max-w-lg mx-auto">
                {pageSubtitle}
              </p>
            )}
          </header>
        )}

        {apiMessage && (
          <InvestmentAnalysisMessage
            message={apiMessage}
            onComplete={handleMessageComplete}
          />
        )}

        {showContent && project && (
          <>
            <AnimateInView className="mb-8 sm:mb-10" duration={0.6} y={24}>
              <section>
                <InvestmentSectionHeading
                  title="المشروع المقترح"
                  level="subsection"
                  className="mb-3 px-1"
                />
                <ProjectHeroCard
                  project={project}
                  projectTitle={projectTitle}
                  galleryImages={galleryImages}
                />
              </section>
            </AnimateInView>

            {hasUnits ? (
              <AnimateInView
                className="mb-8 sm:mb-10"
                duration={0.6}
                y={24}
                delay={0.15}
              >
                <section>
                  <InvestmentSectionHeading
                    title="الوحدات المتاحة"
                    subtitle="اختار الحصة اللي تناسبك واحجز مباشرة"
                    level="section"
                    className="mb-4"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {units!.map((unit) => (
                      <ShareCard key={unit.id} unit={unit} />
                    ))}
                  </div>
                </section>
              </AnimateInView>
            ) : (
              <div className="mb-8 rounded-2xl border border-primary/15 bg-white px-6 py-10 text-center max-w-xl mx-auto">
                <p className="text-primary font-bold text-lg">
                  لا توجد وحدات متاحة حالياً
                </p>
              </div>
            )}

            {suggested_projects && suggested_projects.length > 0 && (
              <AnimateInView duration={0.6} y={24} delay={0.3}>
                <section>
                  <InvestmentSectionHeading
                    title="بدائل استثمارية مقترحة"
                    subtitle="مشاريع تانية ممكن تناسبك"
                    level="section"
                    className="mb-4"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {suggested_projects.map((suggestedProject) => (
                      <InvestProjectCard
                        key={suggestedProject.id}
                        project={suggestedProject}
                        onProjectSelect={onProjectSelect}
                      />
                    ))}
                  </div>
                </section>
              </AnimateInView>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default InvestmentUnit;
