"use client";

import Image from "next/image";
import { LuCheck } from "react-icons/lu";
import { ChevronLeft } from "lucide-react";
import {
  InvestmentProject,
  InvestmentResponseData,
  getFormIdFromStorage,
  investmentService,
  resolveProjectLink,
} from "@/services/investment";
import { useState } from "react";

interface InvestProjectCardProps {
  project?: InvestmentProject;
  onProjectSelect?: (data: InvestmentResponseData) => void;
}

function InvestProjectCard({
  project,
  onProjectSelect,
}: InvestProjectCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const projectName = project?.name || project?.project_name || "";
  const shareType = project?.share_type || "";
  const miniContent = project?.mini_content || "";
  const projectImage =
    project?.img ||
    "/assets/investment/a85b1d06b2a0ccb73884fcfb7c63c0fd7483089a.png";

  const handleShowDetails = async () => {
    if (project?.external_link) {
      window.location.href = resolveProjectLink(project.external_link);
      return;
    }

    if (!project?.id) return;

    const formId = getFormIdFromStorage();
    if (!formId) return;

    try {
      setIsLoading(true);
      const response = await investmentService.getProjectById(
        formId,
        project.id.toString(),
      );
      onProjectSelect?.(response);
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex flex-col h-full bg-white border border-primary/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-44 sm:h-48">
        {shareType && (
          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[#498E56] text-white">
            <LuCheck size={12} />
            {shareType}
          </span>
        )}
        <Image
          src={projectImage}
          alt={projectName}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-[#1F503B] font-bold text-body-base sm:text-body-lg">
          {projectName}
        </h3>
        {miniContent && (
          <p className="text-[#666] text-body-sm mt-1.5 flex-1 line-clamp-3 leading-relaxed">
            {miniContent}
          </p>
        )}
        <button
          type="button"
          onClick={handleShowDetails}
          disabled={isLoading}
          className="mt-3 w-full inline-flex items-center justify-center gap-1 py-2.5 rounded-xl border-2 border-primary/30 text-primary font-semibold text-body-sm hover:bg-[#F3FAF6] transition-colors disabled:opacity-50"
        >
          {isLoading ? "جاري التحميل..." : "عرض التفاصيل"}
          {!isLoading && <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </article>
  );
}

export default InvestProjectCard;
