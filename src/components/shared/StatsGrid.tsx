"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BarChart3, type LucideIcon } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

// ─── Types ───────────────────────────────────────────────────────────────────

/** عنصر إحصائية واحدة */
export interface StatItem {
  /** القيمة الرقمية أو النصية المعروضة بشكل كبير */
  value: string;
  /** التسمية التوضيحية أسفل القيمة */
  label: string;
  /** أيقونة اختيارية من lucide-react */
  icon?: LucideIcon;
}

/** @deprecated اللون ثابت أخضر — لا يتغير حسب المشروع */
export type StatsColorScheme = "primary";

/** نمط العرض */
export type StatsVariant = "cards" | "strip";

/** Props الكاملة لـ StatsGrid */
export interface StatsGridProps {
  /** مصفوفة الإحصائيات المطلوب عرضها */
  stats: StatItem[];
  /**
   * @deprecated محفوظ للتوافق — الإحصائيات دائماً باللون الأخضر
   */
  colorScheme?: StatsColorScheme;
  /**
   * نمط العرض:
   * - strip: شريط أفقي واحد (افتراضي)
   * - cards: بطاقات منفصلة مع أيقونات
   */
  variant?: StatsVariant;
  /** كلاس CSS إضافي على الحاوية الخارجية */
  className?: string;
}

// ─── Color scheme map ────────────────────────────────────────────────────────

const statsColors = {
  accent: "bg-primary",
  gradient: "from-primary to-[#4a9e6e]",
  iconBg: "bg-primary/10",
  icon: "text-primary",
  value: "text-primary",
} as const;

// ─── Strip variant ───────────────────────────────────────────────────────────

function StatsStrip({
  stats,
  colors,
  className,
}: {
  stats: StatItem[];
  colors: typeof statsColors;
  className?: string;
}) {
  return (
    <motion.div
      data-stats-variant="strip"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5",
        className,
      )}
    >
      <div className={cn("h-2 bg-gradient-to-l", colors.gradient)} />

      <div className="flex flex-wrap bg-gray-50/60 md:flex-nowrap">
        {stats.map((stat, i) => {
          const total = stats.length;
          const isLast = i === total - 1;
          const isLeftCol = i % 2 === 0;
          const isLoneLastOnMobile = total % 2 !== 0 && isLast;
          const inTopMobileRow = i < 2 && total > 2;

          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-1.5 bg-white p-4 text-center transition-colors md:flex-1 md:gap-2 md:p-6",
                isLoneLastOnMobile
                  ? "w-full border-t border-gray-200 md:w-auto md:border-t-0"
                  : "w-1/2 md:w-auto",
                !isLoneLastOnMobile && isLeftCol && "border-e border-gray-200",
                inTopMobileRow && "border-b border-gray-200 md:border-b-0",
                !isLast && "md:border-e md:border-gray-200",
              )}
            >
              <p className={cn("text-2xl font-extrabold leading-none tabular-nums md:text-3xl", colors.value)}>
                {stat.value}
              </p>
              <p className="max-w-[9rem] text-[#555] text-body-sm font-medium leading-snug md:max-w-none">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Cards variant ─────────────────────────────────────────────────────────────

function StatsCards({
  stats,
  colors,
  className,
}: {
  stats: StatItem[];
  colors: typeof statsColors;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 grid gap-4",
        stats.length <= 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon ?? BarChart3;

        return (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-5"
          >
            <div
              className={cn(
                "absolute inset-y-0 end-0 w-1 rounded-s-full opacity-80 transition-opacity group-hover:opacity-100",
                colors.accent,
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute -start-6 -top-6 h-20 w-20 rounded-full opacity-[0.06] transition-transform duration-300 group-hover:scale-110",
                colors.accent,
              )}
            />

            <div className="relative flex flex-col items-center gap-2.5 text-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                  colors.iconBg,
                )}
              >
                <Icon className={cn("h-5 w-5", colors.icon)} strokeWidth={2} />
              </div>
              <p className={cn("text-2xl font-extrabold leading-none tabular-nums md:text-3xl", colors.value)}>
                {stat.value}
              </p>
              <p className="text-muted-foreground text-body-sm leading-snug">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * StatsGrid — شبكة إحصائيات المشروع.
 *
 * يدعم نمطين:
 * - cards: بطاقات منفصلة مع أيقونات
 * - strip: شريط أفقي واحد
 */
export default function StatsGrid({
  stats,
  variant = "strip",
  className,
}: StatsGridProps) {
  const colors = statsColors;

  if (variant === "strip") {
    return <StatsStrip stats={stats} colors={colors} className={className} />;
  }

  return <StatsCards stats={stats} colors={colors} className={className} />;
}
