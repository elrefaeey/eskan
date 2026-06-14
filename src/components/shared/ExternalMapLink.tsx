"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExternalMapLinkProps = {
  href: string;
  children?: string;
  className?: string;
};

export default function ExternalMapLink({
  href,
  children = "عرض على الخريطة",
  className,
}: ExternalMapLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors duration-200 w-fit",
        className ?? "px-6 py-3 text-base",
      )}
    >
      <MapPin className="w-5 h-5" />
      {children}
    </a>
  );
}
