"use client";

import { GoVideo } from "react-icons/go";
import { cn } from "@/lib/utils";
import YouTubeDialog from "../YouTubeDialog";
import type { HeroCtaButton } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroActionsProps {
  videoId?: string;
  videoButtonText: string;
  ctaButtons: HeroCtaButton[];
}

const accentStyles = {
  primary: {
    solid: "bg-primary text-white hover:bg-primary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
  },
  purple: {
    solid: "bg-[#4A36A2] text-white hover:bg-[#4A36A2]/90",
    outline: "border-2 border-[#4A36A2] text-[#4A36A2] hover:bg-[#4A36A2]/5",
  },
} as const;

// ─── Helper: حل زر CTA ───────────────────────────────────────────────────────
// يحدد الـ action المناسب للزر:
// 1. scrollToId → smooth scroll
// 2. href       → window.location
// 3. onClick    → callback مخصص

function resolveCtaAction(btn: HeroCtaButton) {
  return () => {
    if (btn.scrollToId) {
      document.getElementById(btn.scrollToId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (btn.href) {
      window.location.href = btn.href;
      return;
    }
    btn.onClick?.();
  };
}

// ─── HeroActions ─────────────────────────────────────────────────────────────
// منطقة الأزرار في الـ Hero.
// تعرض: زر الفيديو (إذا مُرر videoId) + أزرار CTA المخصصة.

export default function HeroActions({
  videoId,
  videoButtonText,
  ctaButtons,
}: HeroActionsProps) {
  const accent = accentStyles.primary;

  return (
    <div className="flex flex-wrap gap-3">

      {/* زر الفيديو — يظهر تلقائياً إذا مُرر videoId */}
      {videoId && (
        <YouTubeDialog videoId={videoId} dialogTitle="فيديو المشروع">
          <button className={cn("flex items-center justify-center gap-2 font-bold text-base rounded-xl px-5 py-3 transition-colors w-full md:w-fit", accent.solid)}>
            <GoVideo className="size-5" />
            {videoButtonText}
          </button>
        </YouTubeDialog>
      )}

      {/* أزرار CTA المخصصة */}
      {ctaButtons.map((btn, i) => {
        const handleClick = resolveCtaAction(btn);
        const isOutline = btn.variant === "outline";

        return (
          <button
            key={i}
            onClick={handleClick}
            disabled={btn.disabled}
            className={cn(
              "flex items-center justify-center gap-2 font-bold text-base rounded-xl px-5 py-3 transition-colors w-full md:w-fit",
              isOutline ? accent.outline : accent.solid,
            )}
          >
            {btn.icon}
            {btn.text}
          </button>
        );
      })}

    </div>
  );
}
