"use client";

import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/common/animations/AnimatedSection";

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * نوع العنصر المرئي لجانب الخريطة:
 * - iframe: خريطة Google Maps مضمّنة (abrag-elbadry, gallery-ground)
 * - image:  صورة ثابتة بدلاً من الخريطة (abrag-elmadina/residential)
 */
export type MapVisualType = "iframe" | "image";

/** Props الكاملة لـ MapSection */
export interface MapSectionProps {
  // ─── Visual ────────────────────────────────────────
  /** نوع العنصر المرئي */
  visualType?: MapVisualType;
  /** رابط Google Maps embed — مطلوب عند visualType === 'iframe' */
  embedUrl?: string;
  /** عنوان iframe للـ accessibility */
  iframeTitle?: string;
  /** مسار الصورة الثابتة — مطلوب عند visualType === 'image' */
  imageSrc?: string;
  /** alt نص الصورة الثابتة */
  imageAlt?: string;
  /** كلاس CSS على حاوية الصورة/الخريطة */
  visualClassName?: string;
  /** كلاس CSS إضافي على الـ iframe مباشرة (rounded, shadow, height) */
  iframeClassName?: string;

  // ─── Content ───────────────────────────────────────
  /** عنوان القسم (افتراضي: "موقع المشروع") */
  title?: string;
  /** وصف نصي للموقع */
  description: string;
  /** كلاس CSS على نص الوصف — يُستخدم لتخصيص حجم الخط (افتراضي: "text-base md:text-lg leading-[2]") */
  descriptionClassName?: string;
  /** رابط فتح الخريطة خارجياً على Google Maps */
  externalMapUrl?: string;
  /** نص زر الخريطة الخارجي (افتراضي: "عرض على الخريطة") */
  externalMapText?: string;
  /** كلاس CSS على زر الخريطة الخارجي — يُستخدم لتخصيص الحجم والـ padding */
  buttonClassName?: string;
  /**
   * محتوى إضافي تحت الوصف (مثل dropdown المرحلة في abrag-elmadina).
   * يُمرر كـ ReactNode للمرونة.
   */
  extraContent?: React.ReactNode;

  // ─── Layout ────────────────────────────────────────
  /**
   * ترتيب الخريطة:
   * - "map-right": الخريطة على اليسار، النص على اليمين (abrag-elbadry)
   * - "map-left":  الخريطة على اليمين، النص على اليسار (gallery-ground)
   */
  mapPosition?: "map-right" | "map-left";
  /** كلاس CSS إضافي على الـ grid الداخلي (يُستخدم لإضافة gap مثلاً) */
  gridClassName?: string;
  /** كلاس CSS على حاوية النص — يُستخدم لتخصيص gap-* إذا احتجت تغيير الافتراضي gap-5 */
  textContainerClassName?: string;
  /** إظهار الـ divider الأخضر بين العنوان والوصف (افتراضي: false) */
  showDivider?: boolean;
  /** كلاس CSS على أيقونة MapPin في العنوان (افتراضي: "w-7 h-7") */
  titleIconClassName?: string;
  /** كلاس CSS إضافي على الحاوية الخارجية */
  className?: string;
  /** نمط خلفية الحاوية */
  containerVariant?: "gray" | "transparent" | "primary-light" | "card";
}

// ─── Container variant map ────────────────────────────────────────────────────

const containerVariantMap = {
  gray:            "mb-12 bg-[#f5f5f5] rounded-2xl overflow-hidden",
  transparent:     "mb-10 rounded-2xl bg-primary/5",
  "primary-light": "mb-10 rounded-2xl bg-primary/5",
  // card: بدون padding داخلي — يُمرر عبر gridClassName لتجنب double-padding مع p-6 النص
  card:            "mb-10 bg-[#f8f8f8] rounded-2xl border border-gray-100",
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * MapSection — قسم موقع المشروع المشترك.
 *
 * مستخلص من: abrag-elbadry (iframe + نص + زر خريطة)
 *             gallery-ground (iframe + نص + زر خريطة)
 *             abrag-elmadina/residential (صورة ثابتة + نص + dropdown مرحلة)
 *
 * يدعم نوعين من العناصر المرئية:
 *  - iframe: خريطة Google Maps مضمّنة
 *  - image:  صورة ثابتة
 *
 * الاستخدام مع iframe:
 * ```tsx
 * <MapSection
 *   visualType="iframe"
 *   embedUrl="https://www.google.com/maps?q=...&output=embed"
 *   externalMapUrl="https://maps.app.goo.gl/..."
 *   description="يقع المشروع في..."
 *   title="موقع المشروع"
 * />
 * ```
 *
 * الاستخدام مع صورة:
 * ```tsx
 * <MapSection
 *   visualType="image"
 *   imageSrc="/assets/projects/map.png"
 *   description="يقع المشروع في..."
 *   extraContent={<PhasesDropdown />}
 * />
 * ```
 */
export default function MapSection({
  visualType = "iframe",
  embedUrl,
  iframeTitle = "موقع المشروع",
  imageSrc,
  imageAlt = "موقع المشروع",
  visualClassName,
  iframeClassName,
  title = "موقع المشروع",
  description,
  descriptionClassName,
  externalMapUrl,
  externalMapText = "عرض على الخريطة",
  buttonClassName,
  extraContent,
  mapPosition = "map-right",
  showDivider = false,
  gridClassName,
  textContainerClassName,
  titleIconClassName,
  className,
  containerVariant = "gray",
}: MapSectionProps) {

  // ── تحديد ترتيب العناصر بناءً على mapPosition ────────────────────────────
  const mapOrder  = mapPosition === "map-right" ? "order-1"        : "order-1 md:order-2";
  const textOrder = mapPosition === "map-right" ? "order-2"        : "order-2 md:order-1";

  const containerClass = containerVariantMap[containerVariant];

  return (
    <AnimatedSection
      as="section"
      duration={0.5}
      className={cn(containerClass, className)}
    >
      <div className={cn("grid grid-cols-1 md:grid-cols-2 items-stretch", gridClassName)}>

        {/* ── الجانب المرئي (iframe أو صورة) ── */}
        <div
          className={cn(
            "relative w-full min-h-[280px]",
            mapOrder,
            visualClassName,
          )}
        >
          {visualType === "iframe" && embedUrl && (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "280px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={cn("w-full h-full", iframeClassName)}
              title={iframeTitle}
            />
          )}

          {visualType === "image" && imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
            />
          )}
        </div>

        {/* ── جانب النص ── */}
        <div
          className={cn(
            "flex flex-col justify-center gap-5 p-6 md:p-10",
            textContainerClassName,
            textOrder,
          )}
        >
          {/* عنوان القسم */}
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <MapPin className={cn("shrink-0", titleIconClassName ?? "w-7 h-7")} />
            {title}
          </h2>

          {/* Divider — اختياري، افتراضي: مخفي */}
          {showDivider && (
            <div className="w-10 h-1 bg-primary rounded" />
          )}

          {/* وصف الموقع */}
          <p className={cn("text-[#333] leading-[2]", descriptionClassName ?? "text-base md:text-lg")}>
            {description}
          </p>

          {/* زر الخريطة الخارجية */}
          {externalMapUrl && (
            <a
              href={externalMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors duration-200 w-fit",
                buttonClassName ?? "px-6 py-3 text-base",
              )}
            >
              <MapPin className="w-5 h-5" />
              {externalMapText}
            </a>
          )}

          {/* محتوى إضافي (dropdown، إلخ) */}
          {extraContent}
        </div>
      </div>
    </AnimatedSection>
  );
}
