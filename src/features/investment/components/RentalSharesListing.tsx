"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import ShareCard from "@/features/investment/components/ShareCard";
import { InvestmentAnalysisMessage } from "@/features/investment/components/InvestmentAnalysisMessage";
import { InvestmentSectionHeading } from "@/features/investment/components/InvestmentSectionHeading";
import ProjectHeroCard from "@/features/investment/components/ProjectHeroCard";
import { useGpiInvestmentUnits } from "@/features/gpi/hooks/useGpiInvestmentUnits";
import {
  GPI_HERO,
  GPI_IMAGES,
  GPI_INVESTMENT_PROJECT_ID,
} from "@/features/gpi/constants";
import type {
  InvestmentProject,
  InvestmentResponseData,
} from "@/services/investment";
import { AnimateInView } from "@/components/common/animations";
import {
  InvestmentMessageSkeleton,
  InvestmentUnitsSkeleton,
} from "@/features/investment/components/InvestmentLoader";

interface RentalSharesListingProps {
  onBack: () => void;
  investmentData?: InvestmentResponseData | null;
  isLoadingMessage?: boolean;
  messageError?: string | null;
}

/** مؤقت لحد ما الباك يصلّح project/units لمسار التقسيط */
function buildGpiDisplayProject(unitProjectId?: number): InvestmentProject {
  return {
    id: unitProjectId || GPI_INVESTMENT_PROJECT_ID,
    project_name: GPI_HERO.title,
    name: GPI_HERO.title,
    project_type: GPI_HERO.badge,
    share_type: "عائد إيجاري",
    mini_content: GPI_HERO.description,
    location: "المنصورة — معهد إعداد الخريجين (GPI)",
    profit_rate: "عائد شهري مستقر",
    installment_options: "متاح",
    img: GPI_IMAGES[0],
    units: [],
    external_link: "/gpi",
  };
}

export default function RentalSharesListing({
  onBack,
  investmentData = null,
  isLoadingMessage = false,
  messageError = null,
}: RentalSharesListingProps) {
  const { data: gpiUnits, isLoading: isLoadingUnits } = useGpiInvestmentUnits();
  const trimmedMessage = investmentData?.message?.trim() || "";
  const [showContent, setShowContent] = useState(!trimmedMessage);

  useEffect(() => {
    setShowContent(!trimmedMessage);
  }, [trimmedMessage]);

  const handleMessageComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  const units = gpiUnits ?? [];
  const hasUnits = units.length > 0;

  const displayProject = useMemo(
    () => buildGpiDisplayProject(units[0]?.investment_project_id),
    [units],
  );

  const galleryImages = useMemo(() => [...GPI_IMAGES], []);
  const canShowContent =
    showContent || (!trimmedMessage && !isLoadingMessage);

  return (
    <main className="bg-[#FAFBFC] page pt-5 sm:pt-6 pb-10 lg:mt-[82px]">
      <div className="container max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-5 rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-primary text-sm font-semibold shadow-sm hover:bg-primary/5 hover:border-primary/30 transition-colors"
        >
          رجوع
          <ArrowRight className="w-4 h-4" />
        </button>

        <header className="mb-5 sm:mb-6 text-center">
          <h1 className="font-extrabold text-[1.5rem] sm:text-3xl text-[#1F503B] leading-tight">
            دخل شهري ثابت — تقسيط
          </h1>
          <p className="text-[#888] text-sm sm:text-base mt-1.5 max-w-lg mx-auto">
            توصية مخصصة ليك من نافع — مستشارك العقاري
          </p>
        </header>

        {isLoadingMessage && !trimmedMessage ? (
          <InvestmentMessageSkeleton />
        ) : trimmedMessage ? (
          <InvestmentAnalysisMessage
            message={trimmedMessage}
            onComplete={handleMessageComplete}
          />
        ) : messageError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm sm:text-base text-center">
            {messageError}
          </div>
        ) : null}

        {canShowContent && (
          <>
            <AnimateInView className="mb-8 sm:mb-10" duration={0.6} y={24}>
              <section>
                <InvestmentSectionHeading
                  title="المشروع المقترح"
                  level="subsection"
                  className="mb-3 px-1"
                />
                <ProjectHeroCard
                  project={displayProject}
                  projectTitle={GPI_HERO.title}
                  galleryImages={galleryImages}
                />
              </section>
            </AnimateInView>

            <InvestmentSectionHeading
              title="الحصص المتاحة بنظام التقسيط"
              subtitle="اختار الحصة اللي تناسبك واحجز مباشرة"
              level="section"
              className="mb-4 sm:mb-6"
            />

            {isLoadingUnits ? (
              <InvestmentUnitsSkeleton />
            ) : hasUnits ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {units.map((unit) => (
                  <ShareCard key={unit.id} unit={unit} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-primary/15 bg-white px-6 py-10 text-center max-w-xl mx-auto">
                <p className="text-primary font-bold text-lg">
                  لا توجد حصص متاحة حالياً
                </p>
                <p className="text-[#666] mt-2 text-sm">
                  سيتم إضافة وحدات التقسيط بعائد إيجاري قريباً
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
