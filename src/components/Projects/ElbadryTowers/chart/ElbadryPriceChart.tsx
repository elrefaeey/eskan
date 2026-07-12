"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { usePriceChartLayout } from "@/hooks/usePriceChartLayout";
import { data, totalGrowth, formatPrice } from "./utils";
import PriceChartView from "./PriceChartView";

export default function ElbadryPriceChart() {
  const { isCompact, chartMargin, yAxisWidth, chartWrapperClass, yAxisTick } = usePriceChartLayout();

  return (
    <AnimatedSection
      duration={0.6}
      className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#2d8a57] px-5 md:px-8 py-5" dir="rtl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white shrink-0" />
            <h3 className="text-white font-extrabold text-lg md:text-xl">
              تطور سعر المتر — 2023 — 2026
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5 border border-white/20">
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span className="text-white font-extrabold text-sm">{totalGrowth}</span>
            <span className="text-white/70 text-xs">نمو خلال 4 سنوات</span>
          </div>
        </div>
        <p className="text-white/60 text-xs md:text-sm mt-1">رسم بياني يوضح ارتفاع سعر المتر في الوحدات السكنية في مشروع أبراج البدري</p>
      </div>

      {/* Chart */}
      <PriceChartView
        data={data}
        isCompact={isCompact}
        chartMargin={chartMargin}
        yAxisWidth={yAxisWidth}
        chartWrapperClass={chartWrapperClass}
        yAxisTick={yAxisTick}
      />

      <div className="grid grid-cols-4 border-t border-gray-100 bg-white" dir="ltr">
        {data.map((row) => (
          <div
            key={row.year}
            className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-center py-3 px-1 sm:py-4 sm:px-2 md:py-5 md:px-4 bg-white border-r border-gray-100 last:border-0"
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
