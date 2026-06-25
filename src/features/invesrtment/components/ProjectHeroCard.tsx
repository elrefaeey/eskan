"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LuCheck } from "react-icons/lu";
import { MapPin } from "lucide-react";
import type { InvestmentResponseData } from "@/services/investment";

export function isAbragElmadinaProject(
  project: InvestmentResponseData["project"],
): boolean {
  const title = `${project.name ?? ""} ${project.project_name ?? ""}`;
  return (
    project.id === 5 ||
    title.includes("أبراج المدينة") ||
    title.toLowerCase().includes("abrag")
  );
}

interface ProjectHeroCardProps {
  project: InvestmentResponseData["project"];
  projectTitle: string;
  galleryImages?: string[];
}

export default function ProjectHeroCard({
  project,
  projectTitle,
  galleryImages,
}: ProjectHeroCardProps) {
  const images = useMemo(() => {
    const unique = [...new Set(galleryImages?.filter(Boolean) ?? [])];
    if (unique.length >= 3) return unique.slice(0, 3);
    if (project.img) return [project.img];
    return unique;
  }, [galleryImages, project.img]);

  const useGallery = images.length >= 3;
  const [mobileIndex, setMobileIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const visibleImages = useMemo(
    () => images.filter((src) => !failedImages.includes(src)),
    [images, failedImages],
  );

  const displayImages =
    visibleImages.length >= 3
      ? visibleImages
      : images.length >= 3
        ? images
        : [project.img].filter(Boolean);

  const safeMobileIndex =
    displayImages.length > 0 ? mobileIndex % displayImages.length : 0;

  useEffect(() => {
    setMobileIndex(0);
    setFailedImages([]);
  }, [images.join("|")]);

  useEffect(() => {
    if (!useGallery || displayImages.length < 2) return;
    const timer = setInterval(() => {
      setMobileIndex((i) => (i + 1) % displayImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [useGallery, displayImages.length]);

  const handleImageError = (src: string) => {
    setFailedImages((prev) => (prev.includes(src) ? prev : [...prev, src]));
  };

  return (
    <section className="bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-sm">
      {useGallery && displayImages.length >= 3 ? (
        <>
          <div className="hidden md:grid md:grid-cols-3 gap-0.5 bg-gray-100">
            {displayImages.slice(0, 3).map((src, i) => (
              <div key={src} className="relative h-[220px] lg:h-[280px]">
                <Image
                  src={src}
                  alt={`${projectTitle} - ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="33vw"
                  onError={() => handleImageError(src)}
                />
              </div>
            ))}
          </div>
          <div className="md:hidden relative h-[220px] bg-gray-100">
            <Image
              key={displayImages[safeMobileIndex]}
              src={displayImages[safeMobileIndex]}
              alt={projectTitle}
              fill
              unoptimized
              className="object-cover transition-opacity duration-500"
              sizes="100vw"
              priority
              onError={() => handleImageError(displayImages[safeMobileIndex])}
            />
          </div>
        </>
      ) : (
        <div className="relative h-[220px] sm:h-[280px] lg:h-[320px] bg-gray-100">
          {project.img && (
            <Image
              src={project.img}
              alt={projectTitle}
              fill
              unoptimized
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>
      )}

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.project_type && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-body-sm bg-[#F3FAF6] text-[#1F503B] border border-primary/15">
              <LuCheck size={14} />
              {project.project_type}
            </span>
          )}
          {project.installment_options &&
            project.installment_options !== "null" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-body-sm bg-[#F3FAF6] text-[#1F503B] border border-primary/15">
                <LuCheck size={14} />
                متاح التقسيط
              </span>
            )}
          {project.profit_rate && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-body-sm bg-[#498E56] text-white">
              <LuCheck size={14} />
              عائد {project.profit_rate}%
            </span>
          )}
        </div>

        <h2 className="h2 text-[#1F503B] leading-tight">
          حصص {project.share_type} — {projectTitle}
        </h2>

        {project.location && (
          <p className="text-[#666] text-body-base md:text-lg mt-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            {project.location}
          </p>
        )}

        {project.mini_content && (
          <p className="text-[#555] text-body-base md:text-lg mt-3 leading-relaxed">
            {project.mini_content}
          </p>
        )}
      </div>
    </section>
  );
}
