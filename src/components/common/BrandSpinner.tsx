"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CONFIG = {
  sm: { box: 64, logo: 46, ring: 2.5 },
  md: { box: 80, logo: 58, ring: 3 },
  lg: { box: 96, logo: 70, ring: 3.5 },
} as const;

export function BrandSpinner({ size = "md", className }: BrandSpinnerProps) {
  const { box, logo, ring } = SIZE_CONFIG[size];

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="status"
      aria-label="جاري التحميل"
      style={{ width: box, height: box }}
    >
      <div
        className="absolute inset-0 rounded-full border-[#E3EBE7] border-t-[#498E56] border-r-[#1F503B]/40 animate-spin"
        style={{ borderWidth: ring }}
        aria-hidden="true"
      />

      <Image
        src="/assets/layout/logo.png"
        alt=""
        width={logo}
        height={logo}
        className="relative z-10 object-contain animate-[brandLogoPulse_1.5s_ease-in-out_infinite]"
        style={{ width: logo, height: logo }}
        priority
      />
    </div>
  );
}
