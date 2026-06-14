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
  { year: "2022", price: 60, phase: "بداية المشروع", growth: null },
  { year: "2023", price: 72, phase: "الهيكل الإنشائي", growth: "+20%" },
  { year: "2024", price: 85, phase: "المباني", growth: "+18%" },
  { year: "2025", price: 95, phase: "التشطيبات", growth: "+12%" },
  { year: "2026", price: 110, phase: "التسليم", growth: "+16%" },
];

const COLORS = ["#a8d5b5", "#7ec49a", "#4da876", "#2d8a57", "#1F503B"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl text-right" dir="rtl">
        <p className="text-primary font-extrabold text-lg">{d.year}</p>
        <p className="text-[#555] text-sm">{d.phase}</p>
        <p className="text-primary font-extrabold text-2xl mt-1">
          {d.price}k <span className="text-sm font-normal text-gray-400">جنيه / م²</span>
        </p>
        {d.growth && (
          <p className="text-green-600 font-bold text-sm mt-1 flex items-center gap-1 justify-end">
            <ArrowUpRight className="w-3 h-3" />
            {d.growth} عن العام السابق
          </p>
        )}
      </div>
    );
  }
  return null;
};

const CustomLabel = ({ x, y, width, value }: any) => (
  <text x={x + width / 2} y={y - 8} fill="#1F503B" textAnchor="middle" fontSize={13} fontWeight={700}>
    {value}k
  </text>
);

export default function PriceChart() {
  return (
    <AnimatedSection
      duration={0.6}
      className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-primary to-[#2d8a57] px-5 md:px-8 py-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-white" />
            <h3 className="text-white font-extrabold text-lg md:text-xl">
              تطور سعر المتر 2022 — 2026
            </h3>
          </div>
          <p className="text-white/60 text-xs md:text-sm">السعر بالألف جنيه مع تقدم مراحل الإنشاء</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5 shrink-0 border border-white/20">
          <ArrowUpRight className="w-4 h-4 text-white" />
          <span className="text-white font-extrabold text-sm">+83%</span>
          <span className="text-white/70 text-xs">نمو خلال 5 سنوات</span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 md:px-6 pt-6 pb-2">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={data} margin={{ top: 28, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4da876" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1F503B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "#888", fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 120]} tick={{ fill: "#aaa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} width={38} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf4", radius: 8 }} />
            <Area type="monotone" dataKey="price" fill="url(#areaGrad)" stroke="none" />
            <Bar dataKey="price" radius={[10, 10, 0, 0]} maxBarSize={52} fill="url(#barGrad)">
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
      <div className="grid grid-cols-5 border-t border-gray-100">
        {[...data].reverse().map((row, i) => (
          <div
            key={row.year}
            className={`flex flex-col items-center text-center py-4 px-1 gap-1 border-r border-gray-100 last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}
          >
            <span className={`font-extrabold text-sm md:text-base ${i === 0 ? "text-primary" : "text-gray-700"}`}>
              {row.price}k
            </span>
            <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">سعر المتر</span>
            <span className={`text-[9px] md:text-[11px] font-semibold ${i === 0 ? "text-primary" : "text-gray-400"}`}>
              {row.year}
            </span>
            {row.growth && (
              <span className="text-green-600 text-[9px] font-bold hidden sm:block">{row.growth}</span>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
