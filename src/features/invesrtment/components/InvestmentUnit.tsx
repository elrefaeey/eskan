"use client";

import { useQuery } from "@tanstack/react-query";
import { GOAL_LABELS } from "@/features/invesrtment/hooks";
import { BOOKING_STEPS } from "@/features/invesrtment/constants/flow-steps";
import { fetchMadinaProjectDetails } from "@/services/abrag-elmadina";
import type { InvestmentResponseData } from "@/services/investment";
import InvestProjectCard from "./InvestProjectCard";
import ShareCard from "./ShareCard";
import { InvestmentAnalysisMessage } from "./InvestmentAnalysisMessage";
import { InvestmentResultsHeader } from "./InvestmentResultsHeader";
import { InvestmentSectionHeading } from "./InvestmentSectionHeading";
import { InvestmentStepsGrid } from "./InvestmentStepsGrid";
import ProjectHeroCard, { isAbragElmadinaProject } from "./ProjectHeroCard";

interface InvestmentUnitProps {
  investmentData: InvestmentResponseData | null;
  selectedGoal?: string;
  onReanalyze?: () => void;
  onProjectSelect?: (data: InvestmentResponseData) => void;
}

function InvestmentUnit({
  investmentData,
  selectedGoal,
  onReanalyze,
  onProjectSelect,
}: InvestmentUnitProps) {
  const { data: madinaProject } = useQuery({
    queryKey: ["madina-project-gallery"],
    queryFn: fetchMadinaProjectDetails,
    enabled: !!investmentData && isAbragElmadinaProject(investmentData.project),
    staleTime: 5 * 60 * 1000,
  });

  if (!investmentData) {
    return (
      <main className="page bg-[#FAFBFC] min-h-[50vh] flex items-center justify-center">
        <p className="text-[#666] text-body-base md:text-lg">
          جاري تحميل البيانات...
        </p>
      </main>
    );
  }

  const { project, units, message, suggested_projects } = investmentData;
  const projectTitle = project.name ?? project.project_name ?? "";
  const goalLabel = selectedGoal ? GOAL_LABELS[selectedGoal] : null;
  const hasUnits = units && units.length > 0;

  const galleryImages = isAbragElmadinaProject(project)
    ? madinaProject?.imgs?.map((item) => item.img).filter(Boolean)
    : undefined;

  return (
    <main className="page bg-[#FAFBFC] pb-10 lg:pb-14">
      <div className="container max-w-6xl pt-4 sm:pt-6 space-y-6 sm:space-y-8">
        <InvestmentResultsHeader
          goalLabel={goalLabel}
          onReanalyze={onReanalyze}
        />

        {message && <InvestmentAnalysisMessage message={message} />}

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

        {hasUnits && (
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
        )}

        {hasUnits && (
          <InvestmentStepsGrid
            title="إزاي تحجز حصتك؟"
            steps={BOOKING_STEPS}
            variant="filled"
          />
        )}

        {suggested_projects && suggested_projects.length > 0 && (
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
        )}
      </div>
    </main>
  );
}

export default InvestmentUnit;
