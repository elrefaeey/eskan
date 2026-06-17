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

const data = [
  { period: "يناير", price: 9500, growth: null },
  { period: "أبريل", price: 11500, growth: "+21%" },
  { period: "يوليو", price: 13000, growth: "+37%" },
  { period: "سبتمبر", price: 14000, growth: "+47%" },
];

const COLORS = ["#a8d5b5", "#7ec49a", "#4da876", "#1F503B"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl text-right" dir="rtl">
        <p className="text-primary font-extrabold text-lg">2024 — {d.period}</p>
        <p className="text-primary font-extrabold text-2xl mt-1">
          {d.price.toLocaleString()} <span className="text-sm font-normal text-gray-400">جنيه / م²</span>
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
      {value.toLocaleString()}
    </text>
  );
};

export default function ElbadryPriceChart() {
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
              تطور سعر المتر — 2024
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5 border border-white/20">
            <ArrowUpRight className="w-4 h-4 text-white" />
            <span className="text-white font-extrabold text-sm">+47%</span>
            <span className="text-white/70 text-xs">نمو خلال 2024</span>
          </div>
        </div>
        <p className="text-white/60 text-xs md:text-sm mt-1">رسم بياني يوضح ارتفاع سعر المتر في الوحدات السكنية في مشروع أبراج البدري</p>
      </div>

      {/* Chart */}
      <div className="px-1 md:px-6 pt-6 pb-2">
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={data} margin={{ top: 28, right: 5, left: -10, bottom: 0 }}>
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
            <XAxis dataKey="period" tick={{ fill: "#888", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[8000, 15500]}
              tick={{ fill: "#aaa", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf4", radius: 8 }} />
            <Area type="monotone" dataKey="price" fill="url(#areaGradBadry)" stroke="none" />
            <Bar dataKey="price" radius={[10, 10, 0, 0]} maxBarSize={52} fill="url(#barGradBadry)">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
            <Line type="monotone" dataKey="price" stroke="#1F503B" strokeWidth={2.5} dot={{ fill: "#fff", stroke: "#1F503B", strokeWidth: 2.5, r: 5 }} activeDot={{ r: 7, fill: "#1F503B" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 border-t border-gray-100">
        {[...data].reverse().map((row, i) => (
          <div
            key={row.period}
            className={`flex flex-col items-center text-center py-4 px-1 gap-1 border-r border-gray-100 last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}
          >
            <span className={`font-extrabold text-body-base md:text-lg ${i === 0 ? "text-primary" : "text-gray-700"}`}>
              {row.price.toLocaleString()}
            </span>
            {row.growth && (
              <span className="text-primary text-[10px] md:text-xs font-bold">{row.growth}</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
