"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type SectionContentProps = {
  description: string;
  descriptionClassName?: string;
  showDivider?: boolean;
  titleIconClassName?: string;
  /** لون accent — الافتراضي primary (أخضر) */
  accentScheme?: "primary" | "purple";
  children?: ReactNode;
};

const accentStyles = {
  primary: { text: "text-primary", bg: "bg-primary" },
  purple: { text: "text-[#4A36A2]", bg: "bg-[#4A36A2]" },
} as const;

export default function SectionContent({
  description,
  descriptionClassName,
  showDivider = false,
  titleIconClassName,
  accentScheme = "primary",
  children,
}: SectionContentProps) {
  const accent = accentStyles[accentScheme];

  return (
    <>
      <h2 className={cn(accent.text, "text-2xl md:text-3xl font-extrabold flex items-center gap-2")}>
        <MapPin className={cn("shrink-0", titleIconClassName ?? "w-7 h-7")} />
        موقع المشروع
      </h2>

      {showDivider && (
        <div className={cn("w-10 h-1 rounded", accent.bg)} />
      )}

      <p
        className={cn(
          "text-[#333] leading-[2]",
          descriptionClassName ?? "text-body-base md:text-lg",
        )}
      >
        {description}
      </p>

      {children}
    </>
  );
}
