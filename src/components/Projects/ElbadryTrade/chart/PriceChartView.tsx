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
import { ArrowUpRight } from "lucide-react";
import { COLORS } from "./data";
import { formatPrice, formatYAxisTick } from "./utils";

type ChartRow = {
  period: string;
  price: number;
  growth: string | null;
};

type PriceChartViewProps = {
  data: ChartRow[];
  chartMargin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  yAxisWidth: number;
  chartWrapperClass: string;
  yAxisTick: {
    fill: string;
    fontSize: number;
    dx: number;
  };
};

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

export default function PriceChartView({
  data,
  chartMargin,
  yAxisWidth,
  chartWrapperClass,
  yAxisTick,
}: PriceChartViewProps) {
  return (
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
            tickFormatter={(v) => formatYAxisTick(v)}
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
  );
}
