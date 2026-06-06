"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import ProjectImgsSlider from "@/components/Projects/ProjectImagesSlider";
import type { HeroVisualType } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroMediaProps {
  visualType: HeroVisualType;
  // slider
  images: string[];
  // static
  staticImage?: string;
  staticImageAlt: string;
  // gradient
  gradientClassName?: string;
  gradientContent?: React.ReactNode;
  /** كلاس CSS إضافي على wrapper الجانب المرئي — يُستخدم لتخصيص الارتفاع */
  mediaClassName?: string;
}

// ─── HeroMedia ────────────────────────────────────────────────────────────────
// الجانب المرئي من الـ Hero.
// يدعم ثلاثة أوضاع: slider / static image / gradient.

export default function HeroMedia({
  visualType,
  images,
  staticImage,
  staticImageAlt,
  gradientClassName,
  gradientContent,
  mediaClassName,
}: HeroMediaProps) {
  return (
    <div className={cn(
      "relative h-80 max-h-80 md:h-auto md:min-h-[300px] md:max-h-none order-1 rounded-2xl overflow-hidden",
      mediaClassName,
    )}>

      {visualType === "slider" && (
        <ProjectImgsSlider
          images={images}
          height="h-full md:!h-full"
          rounded={false}
        />
      )}

      {visualType === "static" && staticImage && (
        <Image
          src={staticImage}
          alt={staticImageAlt}
          fill
          className="object-cover"
          priority
        />
      )}

      {visualType === "gradient" && (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center",
            gradientClassName ?? "bg-gradient-to-br from-[#1F4B57] to-[#0d3d22]",
          )}
        >
          {gradientContent}
        </div>
      )}

    </div>
  );
}
