"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { MapPin, Building2 } from "lucide-react";
import ProjectBulletList from "./ProjectCard/ProjectBulletList";
import ProjectSegments from "./ProjectCard/ProjectSegments";
import type { ProjectSegment } from "./ProjectCard/ProjectSegments";
import {
  PROJECT_CARD_VIEWPORT_AMOUNT,
  projectCardVariant,
  PROJECT_CARD_SHADOW_TRANSITION,
  PROJECT_CARD_BUTTON_TRANSITION,
} from "./ProjectCard/animations";
export type { ProjectSegment };

interface ProjectCardProps {
  title: string;
  description: string;
  location: string;
  image: string;
  buttonText?: string;
  buttonClick?: () => void;
  reverse?: boolean;
  link: string;
  type: string;
  priority?: boolean;
  segments?: ProjectSegment[];
}

function ProjectCard({
  title,
  description,
  location,
  image,
  reverse = false,
  link,
  type,
  priority = false,
  segments,
}: ProjectCardProps) {
  const router = useRouter();
  const handleNavigate = () => router.push(link);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleNavigate();
  };
  // تقسيم الوصف إلى نقاط — max 3
  const allSentences = description
    .split(/(?<=[.،])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);
  const sentences = (
    allSentences.length > 0 ? allSentences : [description]
  ).slice(0, 3);

  return (
    <AnimatedSection
      variant={projectCardVariant}
      amount={PROJECT_CARD_VIEWPORT_AMOUNT}
    >
      <div
        onClick={handleNavigate}
        className={`cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 ${PROJECT_CARD_SHADOW_TRANSITION} flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* ── الصورة ── */}{" "}
        <div className="relative w-full md:w-[45%] shrink-0 h-64 md:h-auto min-h-[280px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
            quality={50}
            priority={priority}
            {...(priority && { fetchPriority: "high" as const })}
          />
          <div className="absolute top-4 end-4 flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow">
            <Building2 className="w-4 h-4" />
            {type}
          </div>
        </div>
        {/* ── المحتوى ── */}
        <div className="flex flex-col justify-between gap-4 p-5 md:p-7 flex-1">
          {/* العنوان والموقع */}
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-2 leading-snug">
              {title}
            </h2>
            <div className="flex items-center gap-1.5 text-[#555] text-body-sm md:text-base">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{location}</span>
            </div>
          </div>

          {/* النقاط */}
          <ProjectBulletList sentences={sentences} />

          {/* أقسام المشروع الفرعية */}
          {segments && segments.length > 0 && (
            <ProjectSegments segments={segments} />
          )}

          {/* زر التفاصيل */}
          <button
            type="button"
            onClick={handleButtonClick}
            className={`w-full bg-primary text-white font-bold text-base rounded-xl px-5 py-3 hover:bg-primary/90 ${PROJECT_CARD_BUTTON_TRANSITION}`}
          >
            عرض التفاصيل
          </button>
        </div>{" "}
      </div>
    </AnimatedSection>
  );
}

export default ProjectCard;
