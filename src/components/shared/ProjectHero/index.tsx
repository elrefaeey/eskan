"use client";

import { cn } from "@/lib/utils";
import HeroMedia from "./HeroMedia";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import HeroSkeleton from "./HeroSkeleton";
import type { ProjectHeroProps } from "./types";

// ─── Re-exports (public API) ──────────────────────────────────────────────────
// تُعيد تصدير جميع الـ types للحفاظ على نفس الـ public API السابق
export type { ProjectHeroProps, HeroCtaButton, HeroBadgeColor, HeroVisualType } from "./types";

// ─── ProjectHero ──────────────────────────────────────────────────────────────
/**
 * ProjectHero — القسم العلوي المشترك لصفحات المشاريع.
 *
 * يدعم ثلاثة أنواع من الجانب المرئي:
 *  - slider:   Swiper slider من مصفوفة صور
 *  - static:   صورة ثابتة واحدة بـ next/image
 *  - gradient: خلفية gradient بدون صورة
 *
 * يحتوي على:
 *  - Badge تصنيفي
 *  - عنوان H1 + موقع + divider + وصف
 *  - زر فيديو YouTube (اختياري)
 *  - أزرار CTA متعددة
 *  - Loading State داخلي (skeleton)
 *
 * لا يحتوي على أي منطق API — يستقبل البيانات جاهزة من الصفحة الأم.
 *
 * البنية الداخلية:
 *  ├── HeroMedia    — الجانب المرئي
 *  ├── HeroContent  — النص (badge/title/location/description)
 *  ├── HeroActions  — الأزرار (video/CTA)
 *  └── HeroSkeleton — loading state
 */
export default function ProjectHero({
  isLoading = false,
  visualType = "slider",
  images = [],
  staticImage,
  staticImageAlt = "project image",
  gradientClassName,
  gradientContent,
  badge,
  title,
  subtitle,
  location,
  description,
  highlightText,
  videoId,
  videoButtonText = "مشاهدة فيديو المشروع",
  ctaButtons = [],
  dir = "rtl",
  className,
  contentClassName,
  mediaClassName,
}: ProjectHeroProps) {

  // ── Loading State ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className={cn("mb-10 bg-white", className)} dir={dir}>
        <div className="container mx-auto">
          <HeroSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("mb-10 bg-white", className)} dir={dir}>
      <div className="container mx-auto">
        <div className="rounded-2xl overflow-hidden bg-white grid grid-cols-1 md:grid-cols-2">

          {/* ── الجانب المرئي ── */}
          <HeroMedia
            visualType={visualType}
            images={images}
            staticImage={staticImage}
            staticImageAlt={staticImageAlt}
            gradientClassName={gradientClassName}
            gradientContent={gradientContent}
            mediaClassName={mediaClassName}
          />

          {/* ── الجانب النصي + الأزرار ── */}
          <div
            className={cn(
              "flex flex-col justify-between gap-4 p-6 md:p-8 order-2",
              contentClassName,
            )}
          >
            <HeroContent
              badge={badge}
              title={title}
              subtitle={subtitle}
              location={location}
              description={description}
              highlightText={highlightText}
            />

            <HeroActions
              videoId={videoId}
              videoButtonText={videoButtonText}
              ctaButtons={ctaButtons}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
