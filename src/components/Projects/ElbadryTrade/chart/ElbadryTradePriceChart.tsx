"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { usePriceChartLayout } from "@/hooks/usePriceChartLayout";
import { data, totalGrowth, formatPrice } from "./utils";
import PriceChartView from "./PriceChartView";

export default function ElbadryTradePriceChart() {
  const { chartMargin, yAxisWidth, chartWrapperClass, yAxisTick } = usePriceChartLayout({
    yAxisWidthCompact: 28,
    yAxisWidthDesktop: 30,
  });

  return (
    <AnimatedSection
      duration={0.6}
      className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
    >
      <div className="bg-gradient-to-l from-[#4A36A2] to-[#7259b8] px-5 md:px-8 py-5" dir="rtl">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white shrink-0" />
            <h3 className="text-white font-extrabold text-lg md:text-xl">
              تطور سعر المتر — 2024
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5 border border-white/20">
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span className="text-white font-extrabold text-sm">{totalGrowth}</span>
            <span className="text-white/70 text-xs">نمو خلال 2024</span>
          </div>
        </div>
        <p className="text-white/60 text-xs md:text-sm mt-1">
          رسم بياني يوضح ارتفاع سعر المتر في الوحدات التجارية في مول البدري
        </p>
      </div>

      <PriceChartView
        data={data}
        chartMargin={chartMargin}
        yAxisWidth={yAxisWidth}
        chartWrapperClass={chartWrapperClass}
        yAxisTick={yAxisTick}
      />

      <div className="grid grid-cols-4 border-t border-gray-100">
        {[...data].reverse().map((row, i) => (
          <div
            key={row.period}
            className={`flex flex-col items-center text-center py-4 px-1 gap-1 border-r border-gray-100 last:border-0 ${i === 0 ? "bg-[#4A36A2]/5" : ""}`}
          >
            <span className={`font-extrabold text-body-base md:text-lg ${i === 0 ? "text-[#4A36A2]" : "text-gray-700"}`}>
              {formatPrice(row.price)}
            </span>
            {row.growth && (
              <span className="text-[#4A36A2] text-[10px] md:text-xs font-bold">{row.growth}</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
