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
import { cn } from "@/lib/utils";
import { COLORS } from "./data";
import { formatPrice } from "./utils";

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
        <p className="text-primary font-extrabold text-xl sm:text-2xl mt-1">
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

function CustomLabel({ x, y, width, value, hide }: any) {
  if (hide) return null;

  return (
    <text x={x + width / 2} y={y - 8} fill="#1F503B" textAnchor="middle" fontSize={11} fontWeight={700}>
      {formatPrice(value)}
    </text>
  );
}

export default function PriceChartView({
  data,
  isCompact,
  chartMargin,
  yAxisWidth,
  yAxisTick,
}: PriceChartViewProps) {
  return (
    <div className="overflow-hidden px-0 pt-4 pb-1 sm:pt-6 md:px-4 md:pb-2 lg:px-6">
      <div className={cn("h-[250px] sm:h-[270px] md:h-[300px]")}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            barCategoryGap={isCompact ? "12%" : "20%"}
            margin={chartMargin}
          >
            <defs>
              <linearGradient id="barGradMadina" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4da876" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="areaGradMadina" x1="0" y1="0" x2="0" y2="1">
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
              interval={0}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              domain={[5500, 17000]}
              tick={yAxisTick}
              axisLine={false}
              tickLine={false}
              tickMargin={0}
              tickFormatter={(v) => formatPrice(v)}
              ticks={[6000, 9000, 12000, 15000]}
              width={yAxisWidth}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf4", radius: 8 }} />
            <Area type="monotone" dataKey="price" fill="url(#areaGradMadina)" stroke="none" />
            <Bar
              dataKey="price"
              radius={[8, 8, 0, 0]}
              maxBarSize={isCompact ? 34 : 52}
              fill="url(#barGradMadina)"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              {!isCompact && <LabelList content={<CustomLabel hide={false} />} />}
            </Bar>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1F503B"
              strokeWidth={isCompact ? 2 : 2.5}
              dot={{ fill: "#fff", stroke: "#1F503B", strokeWidth: 2, r: isCompact ? 4 : 5 }}
              activeDot={{ r: isCompact ? 6 : 7, fill: "#1F503B" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
