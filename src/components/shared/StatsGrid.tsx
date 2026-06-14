"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";

// ─── Types ───────────────────────────────────────────────────────────────────

/** عنصر إحصائية واحدة */
export interface StatItem {
  /** القيمة الرقمية أو النصية المعروضة بشكل كبير */
  value: string;
  /** التسمية التوضيحية أسفل القيمة */
  label: string;
  /**
   * أيقونة اختيارية من lucide-react.
   * حالياً غير مُعروضة في التصميم الأصلي لكن محتفظ بها للتوسع.
   */
  icon?: LucideIcon;
}

/** مجموعة ألوان جاهزة مسبقاً تتطابق مع ألوان الصفحات الأصلية */
export type StatsColorScheme = "primary" | "purple" | "teal";

/** Props الكاملة لـ StatsGrid */
export interface StatsGridProps {
  /** مصفوفة الإحصائيات المطلوب عرضها */
  stats: StatItem[];
  /**
   * نظام الألوان:
   * - primary: أخضر (city-center, residential)
   * - purple: بنفسجي (gallery-ground)
   * - teal: أزرق مخضر (vocational-center)
   */
  colorScheme?: StatsColorScheme;
  /** كلاس CSS إضافي على الحاوية الخارجية */
  className?: string;
}

// ─── Color scheme map ────────────────────────────────────────────────────────

const colorMap: Record<
  StatsColorScheme,
  { container: string; value: string }
> = {
  primary: {
    container: "bg-primary/5 border border-primary/20",
    value:     "text-primary",
  },
  purple: {
    container: "bg-[#F2F2F5] border border-[#4A36A2]",
    value:     "text-[#4A36A2]",
  },
  teal: {
    container: "bg-[#1F4B57]/10 border border-[#1F4B57]/20",
    value:     "text-[#1F4B57]",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * StatsGrid — شبكة إحصائيات المشروع.
 *
 * يعرض 2 أو 4 بطاقات إحصائية في grid.
 * يدعم ثلاثة أنظمة ألوان تتطابق مع الصفحات الأصلية.
 *
 * الاستخدام:
 * ```tsx
 * <StatsGrid
 *   stats={[
 *     { value: "80%", label: "مباع من المشروع" },
 *     { value: "6", label: "طوابق تجارية" },
 *   ]}
 *   colorScheme="primary"
 * />
 * ```
 */
export default function StatsGrid({
  stats,
  colorScheme = "primary",
  className,
}: StatsGridProps) {
  const colors = colorMap[colorScheme];

  return (
    <AnimatedSection
      duration={0.4}
      className={cn(
        "grid gap-4 mb-12",
        stats.length <= 2
          ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "rounded-2xl p-4 flex flex-col items-center gap-2 text-center",
            colors.container,
          )}
        >
          <p className={cn("text-2xl md:text-3xl font-extrabold", colors.value)}>
            {stat.value}
          </p>
          <p className="text-[#555] text-sm">{stat.label}</p>
        </div>
      ))}
    </AnimatedSection>
  );
}
