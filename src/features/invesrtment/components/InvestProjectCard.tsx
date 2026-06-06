"use client";
import Image from "next/image";
import { LuCheck } from "react-icons/lu";
import {
  InvestmentProject,
  InvestmentResponseData,
} from "@/services/investment";
import { useRouter } from "next/navigation";
import {
  getFormIdFromStorage,
  investmentService,
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const projectName = project?.name || project?.project_name || "";
  const shareType = project?.share_type || " ";
  const miniContent = project?.mini_content || project?.project_name || "";
  const projectImage =
    project?.img ||
    "/assets/investment/a85b1d06b2a0ccb73884fcfb7c63c0fd7483089a.png";

  const handleShowDetails = async () => {
    if (project?.external_link) {
      window.location.href = project.external_link;
      return;
    }

    if (!project?.id) return;

    const formId = getFormIdFromStorage();
    if (!formId) {
      console.error("No form ID found");
      return;
    }

    try {
      setIsLoading(true);
      const response = await investmentService.getProjectById(
        formId,
        project.id.toString(),
      );


      // Call callback to update parent component
      if (onProjectSelect) {
        onProjectSelect(response);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1 sm:gap-2 p-3 sm:p-4 bg-[#F1F1F1] rounded-xl h-full">
      <div className="relative">
        <div
          className="bg-[#1F503B] text-white backdrop-opacity-50 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 absolute top-2 left-2 rounded-[44px] flex
               items-center gap-0.5 sm:gap-1 text-sm md:text-base"
        >
          <LuCheck
            size={16}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6"
            color="#FBFBFB"
          />
          {shareType}
        </div>
        <Image
          src={projectImage}
          alt={projectName}
          width={500}
          height={300}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 self-auto object-cover rounded-md"
        />
      </div>
      <h3 className="text-primary font-bold  text-xl md:text-2xl">
        {projectName}
      </h3>
      <p className=" text-lg lg:text-xl text-[#2D2D2D] flex-grow">
        {miniContent}
      </p>
      <button
        onClick={handleShowDetails}
        disabled={isLoading}
        className="bg-transparent border-[#498E56] border-2
              text-[#498E56] text-sm sm:text-base md:text-lg lg:text-xl font-semibold w-full px-3 sm:px-4 py-2 rounded-lg mt-2 hover:bg-[#498E56] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "جاري التحميل..." : "عرض التفاصيل"}
      </button>
    </div>
  );
}

export default InvestProjectCard;
