"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeColorMap } from "./constants";
import type { ProjectHeroProps } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

type HeroContentProps = Pick<
  ProjectHeroProps,
  "badge" | "title" | "subtitle" | "location" | "description" | "highlightText"
>;

// ─── HeroContent ──────────────────────────────────────────────────────────────
// الجانب النصي من الـ Hero.
// يعرض: badge → title → subtitle → location → divider → description → highlightText

export default function HeroContent({
  badge,
  title,
  subtitle,
  location,
  description,
  highlightText,
}: HeroContentProps) {

  // تحديد كلاس الـ badge — يُفضّل className المخصص على color map
  const badgeClass = badge
    ? badge.className ?? badgeColorMap[badge.color ?? "primary"]
    : "";

  return (
    <div className="flex flex-col gap-3">

      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "inline-block font-bold text-sm px-3 py-1 rounded-full w-fit",
            badgeClass,
          )}
        >
          {badge.text}
        </span>
      )}

      {/* عنوان المشروع H1 */}
      <h1 className="text-primary text-3xl md:text-4xl font-extrabold leading-tight">
        {title}
      </h1>

      {/* نص فرعي (اختياري) */}
      {subtitle && (
        <p className="text-[#555] text-body-sm">{subtitle}</p>
      )}

      {/* الموقع — HeroLocation inline (لا يستحق ملفاً مستقلاً) */}
      {location && (
        <div className="flex items-center gap-1.5 text-[#555] text-body-sm">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span>{location}</span>
        </div>
      )}

      {/* Divider الأخضر */}
      <div className="w-10 h-1 bg-primary rounded" />

      {/* الوصف */}
      <div className="text-[#444] text-body-base md:text-lg leading-[1.9]">
        {description}
      </div>

      {/* نص مميّز اختياري */}
      {highlightText && (
        <p className="text-primary font-extrabold text-body-base mt-1">
          {highlightText}
        </p>
      )}

    </div>
  );
}
