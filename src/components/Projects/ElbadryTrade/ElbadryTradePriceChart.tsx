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
import { usePriceChartLayout, buildPriceChartGrowthData, calcTotalGrowthFromBase } from "@/hooks/usePriceChartLayout";

const pricePoints = [
  { period: "يناير", price: 22000 },
  { period: "أبريل", price: 26500 },
  { period: "يوليو", price: 30000 },
  { period: "سبتمبر", price: 34000 },
];

const data = buildPriceChartGrowthData(pricePoints);
const totalGrowth = calcTotalGrowthFromBase(pricePoints);

const COLORS = ["#c4b8e8", "#9b87d4", "#7259b8", "#4A36A2"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl text-right" dir="rtl">
        <p className="text-[#4A36A2] font-extrabold text-lg">2024 — {d.period}</p>
        <p className="text-[#4A36A2] font-extrabold text-2xl mt-1">
          {d.price.toLocaleString()} <span className="text-sm font-normal text-gray-400">جنيه / م²</span>
        </p>
        {d.growth && (
          <p className="text-[#4A36A2] font-bold text-sm mt-1 flex items-center gap-1 justify-end">
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
    <text x={x + width / 2} y={y - 6} fill="#4A36A2" textAnchor="middle" fontSize={fontSize} fontWeight={700}>
      {value.toLocaleString()}
    </text>
  );
};

export default function ElbadryTradePriceChart() {
  const { isCompact, chartMargin, yAxisWidth, chartWrapperClass, yAxisTick } = usePriceChartLayout({
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

      <div className={chartWrapperClass}>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id="barGradTrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A36A2" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7259b8" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="areaGradTrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A36A2" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#4A36A2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="period" tick={{ fill: "#888", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[18000, 38000]}
              tick={yAxisTick}
              axisLine={false}
              tickLine={false}
              tickMargin={0}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={yAxisWidth}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f3fb", radius: 8 }} />
            <Area type="monotone" dataKey="price" fill="url(#areaGradTrade)" stroke="none" />
            <Bar dataKey="price" radius={[10, 10, 0, 0]} maxBarSize={52} fill="url(#barGradTrade)">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4A36A2"
              strokeWidth={2.5}
              dot={{ fill: "#fff", stroke: "#4A36A2", strokeWidth: 2.5, r: 5 }}
              activeDot={{ r: 7, fill: "#4A36A2" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 border-t border-gray-100">
        {[...data].reverse().map((row, i) => (
          <div
            key={row.period}
            className={`flex flex-col items-center text-center py-4 px-1 gap-1 border-r border-gray-100 last:border-0 ${i === 0 ? "bg-[#4A36A2]/5" : ""}`}
          >
            <span className={`font-extrabold text-body-base md:text-lg ${i === 0 ? "text-[#4A36A2]" : "text-gray-700"}`}>
              {row.price.toLocaleString()}
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
