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
import { formatPrice, formatChartYAxisTick } from "./utils";

type ChartRow = {
  year: string;
  price: number;
  growth: string | null;
};

type PriceChartViewProps = {
  data: ChartRow[];
  isCompact: boolean;
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
  const fontSize = chartWidth < 300 ? 9 : 11;
  return (
    <text x={x + width / 2} y={y - 6} fill="#1F503B" textAnchor="middle" fontSize={fontSize} fontWeight={700}>
      {formatPrice(value)}
    </text>
  );
};

export default function PriceChartView({
  data,
  isCompact,
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
            <linearGradient id="barGradCityCenter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F503B" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4da876" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="areaGradCityCenter" x1="0" y1="0" x2="0" y2="1">
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
            domain={[40000, 105000]}
            tick={yAxisTick}
            axisLine={false}
            tickLine={false}
            tickMargin={0}
            tickFormatter={(v) => formatChartYAxisTick(v, isCompact, true)}
            ticks={[45000, 60000, 80000, 100000]}
            width={yAxisWidth}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf4", radius: 8 }} />
          <Area type="monotone" dataKey="price" fill="url(#areaGradCityCenter)" stroke="none" />
          <Bar dataKey="price" radius={[10, 10, 0, 0]} maxBarSize={isCompact ? 36 : 52} fill="url(#barGradCityCenter)">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
            {!isCompact && <LabelList content={<CustomLabel />} />}
          </Bar>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#1F503B"
            strokeWidth={2.5}
            dot={{ fill: "#fff", stroke: "#1F503B", strokeWidth: 2.5, r: 5 }}
            activeDot={{ r: 7, fill: "#1F503B" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
