"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExternalMapLinkProps = {
  href: string;
  children?: string;
  className?: string;
  /** لون accent — الافتراضي primary (أخضر) */
  accentScheme?: "primary" | "purple";
};

const accentStyles = {
  primary: "bg-primary hover:bg-primary/90",
  purple: "bg-[#4A36A2] hover:bg-[#4A36A2]/90",
} as const;

export default function ExternalMapLink({
  href,
  children = "عرض على الخريطة",
  className,
  accentScheme = "primary",
}: ExternalMapLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 text-white font-bold rounded-xl transition-colors duration-200 w-fit",
        accentStyles[accentScheme],
        className ?? "px-6 py-3 text-base",
      )}
    >
      <MapPin className="w-5 h-5" />
      {children}
    </a>
  );
}
