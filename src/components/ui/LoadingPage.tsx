"use client";

import { BrandSpinner } from "@/components/common/BrandSpinner";
import { cn } from "@/lib/utils";

interface LoadingPageProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** use="page" for full route loaders; "section" for in-content lists */
  variant?: "page" | "section";
}

export function LoadingPage({
  className,
  size = "md",
  variant = "page",
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#FAFBFC]",
        variant === "page" ? "page min-h-[50vh]" : "py-8 sm:py-12",
        className,
      )}
      role="status"
      aria-label="جاري التحميل"
    >
      <BrandSpinner size={size} />
    </div>
  );
}
