"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type SectionContentProps = {
  description: string;
  descriptionClassName?: string;
  showDivider?: boolean;
  titleIconClassName?: string;
  children?: ReactNode;
};

export default function SectionContent({
  description,
  descriptionClassName,
  showDivider = false,
  titleIconClassName,
  children,
}: SectionContentProps) {
  return (
    <>
      <h2 className="text-primary text-2xl md:text-3xl font-extrabold flex items-center gap-2">
        <MapPin className={cn("shrink-0", titleIconClassName ?? "w-7 h-7")} />
        موقع المشروع
      </h2>

      {showDivider && (
        <div className="w-10 h-1 bg-primary rounded" />
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
