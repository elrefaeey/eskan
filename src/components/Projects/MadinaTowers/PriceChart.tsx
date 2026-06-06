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
  Area,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { year: "2022", price: 60, growth: null },
  { year: "2023", price: 72, growth: 20 },
  { year: "2024", price: 85, growth: 18 },
  { year: "2025", price: 95, growth: 12 },
  { year: "2026", price: 110, growth: 16 },
];

const CustomBar = (props: any) => {
  const { x, y, width, height } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(31,122,62,0.85)"
      stroke="rgba(31,122,62,0.9)"
      strokeWidth={1.5}
      rx={6}
      ry={6}
    />
  );
};

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={5} fill="white" stroke="#1f7a3e" strokeWidth={2} />
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-right" dir="rtl">
        <p className="font-bold text-primary text-base mb-1">{label}</p>
        <p className="text-gray-700 text-sm">سعر المتر: <span className="font-bold">{payload[0]?.value}k</span></p>
      </div>
    );
  }
  return null;
};

export default function PriceChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 mb-10 text-[#1a1a1a]" dir="rtl">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-1">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h2 className="text-lg md:text-2xl font-extrabold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
            تطور سعر المتر 2022 — 2026
          </h2>
          <div className="bg-primary/10 border border-primary/20 text-primary font-bold text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            نمو 83%+ خلال 5 سنوات
          </div>
        </div>
        <p className="text-gray-500 text-xs md:text-sm font-medium">السعر بالألف جنيه مع تقدم مراحل الإنشاء</p>
      </div>

      {/* Chart */}
      <div className="h-52 md:h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradMadina" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(31,122,62,0.15)" stopOpacity={1} />
                <stop offset="95%" stopColor="rgba(31,122,62,0)" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "#888", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v}k`}
              tick={{ fill: "#888", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={[50, 120]}
              ticks={[50, 70, 90, 110]}
              width={32}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Bar dataKey="price" shape={<CustomBar />} barSize={40} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="rgba(31,122,62,0.8)"
              strokeWidth={2}
              fill="url(#areaGradMadina)"
              dot={<CustomDot />}
              activeDot={{ r: 7, fill: "#1f7a3e", stroke: "rgba(31,122,62,0.3)", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom summary */}
      <div className="grid grid-cols-5 gap-1 mt-4 border-t border-gray-100 pt-4">
        {[...data].reverse().map((d, i) => (
          <div key={d.year} className={`text-center rounded-xl py-2 px-1 ${i === 0 ? "bg-primary/5" : ""}`}>
            <p className="text-primary font-extrabold text-sm md:text-lg leading-tight">{d.price}k</p>
            <p className="text-gray-400 text-[9px] md:text-xs mt-0.5">سعر المتر</p>
            <p className="text-gray-500 text-[9px] md:text-xs">{d.year}</p>
            {d.growth && (
              <p className="text-primary text-[9px] md:text-xs font-bold mt-0.5">{d.growth}%+</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
