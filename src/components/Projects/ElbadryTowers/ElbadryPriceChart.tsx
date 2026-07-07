"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Area,
} from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import {
  formatChartPrice,
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
  usePriceChartLayout,
} from "@/hooks/usePriceChartLayout";

const pricePoints = [
  { year: "2023", price: 9000 },
  { year: "2024", price: 12000 },
  { year: "2025", price: 16000 },
  { year: "2026", price: 19000 },
];

const data = buildPriceChartGrowthData(pricePoints);
const totalGrowth = calcTotalGrowthFromBase(pricePoints);

const COLORS = ["#a8d5b5", "#5cb888", "#3d9a6e", "#1F503B"];

const formatPrice = formatChartPrice;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl text-right" dir="rtl">
        <p className="text-primary font-extrabold text-lg">{d.year}</p>
        <p className="text-primary font-extrabold text-2xl mt-1">
          {formatPrice(d.price)} <span className="text-sm font-normal text-gray-400">جنيه / م²</span>
        </p>
        {d.growth && (
          <p className="text-primary font-bold text-sm mt-1 flex items-center gap-1 justify-end">
            <ArrowUpRight className="w-3 h-3" />
            {d.growth} نمو
          </p>
        )}
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ x, y, width, value, viewBox }: any) => {
  const chartWidth = viewBox?.width || 300;
  const fontSize = chartWidth < 300 ? 10 : 13;
  return (
    <text x={x + width / 2} y={y - 6} fill="#1F503B" textAnchor="middle" fontSize={fontSize} fontWeight={700}>
      {formatPrice(value)}
    </text>
  );
};

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
      <div className={chartWrapperClass}>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="barGradBadry" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4da876" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="areaGradBadry" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1F503B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "#888", fontSize: isCompact ? 10 : 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[8000, 20000]}
              tick={yAxisTick}
              axisLine={false}
              tickLine={false}
              tickMargin={0}
              tickFormatter={(v) => formatPrice(v)}
              ticks={[9000, 12000, 16000, 19000]}
              width={yAxisWidth}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf4", radius: 8 }} />
            <Area type="monotone" dataKey="price" fill="url(#areaGradBadry)" stroke="none" />
            <Bar dataKey="price" radius={[10, 10, 0, 0]} maxBarSize={isCompact ? 36 : 52} fill="url(#barGradBadry)">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              {!isCompact && <LabelList content={<CustomLabel />} />}
            </Bar>
            <Line type="monotone" dataKey="price" stroke="#1F503B" strokeWidth={isCompact ? 2 : 2.5} dot={{ fill: "#fff", stroke: "#1F503B", strokeWidth: 2.5, r: isCompact ? 4 : 5 }} activeDot={{ r: 7, fill: "#1F503B" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

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
