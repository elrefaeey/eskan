"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeColorMap } from "./constants";
import type { ProjectHeroProps } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

type HeroContentProps = Pick<
  ProjectHeroProps,
  | "badge"
  | "title"
  | "subtitle"
  | "location"
  | "description"
  | "highlightText"
  | "accentScheme"
>;

const accentStyles = {
  primary: { text: "text-primary", bg: "bg-primary" },
  purple: { text: "text-[#4A36A2]", bg: "bg-[#4A36A2]" },
} as const;

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
  accentScheme = "primary",
}: HeroContentProps) {
  const accent = accentStyles[accentScheme];

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
      <h1 className={cn(accent.text, "text-3xl md:text-4xl font-extrabold leading-tight")}>
        {title}
      </h1>

      {/* نص فرعي (اختياري) */}
      {subtitle && (
        <p className="text-[#555] text-body-sm">{subtitle}</p>
      )}

      {/* الموقع — HeroLocation inline (لا يستحق ملفاً مستقلاً) */}
      {location && (
        <div className="flex items-center gap-1.5 text-[#555] text-body-sm">
          <MapPin className={cn("w-4 h-4 shrink-0", accent.text)} />
          <span>{location}</span>
        </div>
      )}

      <div className={cn("w-10 h-1 rounded", accent.bg)} />

      {/* الوصف */}
      <div className="text-[#444] text-body-base md:text-lg leading-[1.9]">
        {description}
      </div>

      {/* نص مميّز اختياري */}
      {highlightText && (
        <p className={cn(accent.text, "font-extrabold text-body-base mt-1")}>
          {highlightText}
        </p>
      )}

    </div>
  );
}
