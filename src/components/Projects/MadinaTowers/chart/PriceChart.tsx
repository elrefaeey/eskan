"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { cn } from "@/lib/utils";
import { usePriceChartLayout } from "@/hooks/usePriceChartLayout";
import { data, totalGrowth, formatPrice } from "./utils";
import PriceChartView from "./PriceChartView";

export default function PriceChart() {
  const { isCompact, chartMargin, yAxisWidth, yAxisTick } = usePriceChartLayout();
  const summaryRows = data;

  return (
    <AnimatedSection
      duration={0.6}
      className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
    >
      <div className="bg-gradient-to-l from-primary to-[#2d8a57] px-4 py-4 sm:px-6 sm:py-5 md:px-8" dir="rtl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2 min-w-0">
            <TrendingUp className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="text-white font-extrabold text-base leading-snug sm:text-lg md:text-xl">
                تطور سعر المتر — 2023 — 2026
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                رسم بياني يوضح ارتفاع سعر المتر في الوحدات السكنية في مشروع أبراج المدينة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-2 border border-white/20 shrink-0 self-start sm:self-auto">
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span className="text-white font-extrabold text-sm">{totalGrowth}</span>
            <span className="text-white/70 text-xs whitespace-nowrap">نمو خلال 4 سنوات</span>
          </div>
        </div>
      </div>

      <PriceChartView
        data={data}
        isCompact={isCompact}
        chartMargin={chartMargin}
        yAxisWidth={yAxisWidth}
        yAxisTick={yAxisTick}
      />

      <div className="grid grid-cols-4 border-t border-gray-100 bg-white" dir="ltr">
        {summaryRows.map((row) => (
          <div
            key={row.year}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-0.5 text-center bg-white",
              "py-2 px-0.5 sm:py-4 sm:px-2 md:py-5 md:px-4",
              "border-r border-gray-100 last:border-0",
            )}
          >
            <span className="font-extrabold leading-none tabular-nums whitespace-nowrap text-[9px] sm:text-sm md:text-lg text-gray-700">
              {formatPrice(row.price)}
            </span>
            <span className="text-gray-400 text-[8px] sm:text-xs leading-tight">سعر المتر</span>
            <span className="text-gray-500 text-[8px] sm:text-xs">{row.year}</span>
            {row.growth && (
              <span className="text-primary text-[8px] sm:text-xs font-bold">{row.growth}</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
