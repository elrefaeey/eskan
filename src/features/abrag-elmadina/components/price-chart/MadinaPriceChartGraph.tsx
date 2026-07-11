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
import { cn } from "@/lib/utils";
import {
  MADINA_CHART_COLORS,
  MADINA_PRICE_CHART,
} from "../../constants/price-chart";
import { formatChartPrice, usePriceChartLayout } from "@/hooks/usePriceChartLayout";
import MadinaPriceChartTooltip from "./MadinaPriceChartTooltip";
import MadinaPriceChartBarLabel from "./MadinaPriceChartBarLabel";
import type { MadinaPriceChartRow } from "./MadinaPriceChartSummary";

interface MadinaPriceChartGraphProps {
  data: MadinaPriceChartRow[];
}

export default function MadinaPriceChartGraph({ data }: MadinaPriceChartGraphProps) {
  const { isCompact, chartMargin, yAxisWidth, yAxisTick } = usePriceChartLayout();

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
              <linearGradient id={MADINA_PRICE_CHART.barGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F503B" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4da876" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id={MADINA_PRICE_CHART.areaGradId} x1="0" y1="0" x2="0" y2="1">
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
              domain={MADINA_PRICE_CHART.yDomain}
              tick={yAxisTick}
              axisLine={false}
              tickLine={false}
              tickMargin={0}
              tickFormatter={(v) => formatChartPrice(v)}
              ticks={[...MADINA_PRICE_CHART.yTicks]}
              width={yAxisWidth}
            />
            <Tooltip
              content={<MadinaPriceChartTooltip />}
              cursor={{ fill: "#f0faf4", radius: 8 }}
            />
            <Area
              type="monotone"
              dataKey="price"
              fill={`url(#${MADINA_PRICE_CHART.areaGradId})`}
              stroke="none"
            />
            <Bar
              dataKey="price"
              radius={[8, 8, 0, 0]}
              maxBarSize={isCompact ? 34 : 52}
              fill={`url(#${MADINA_PRICE_CHART.barGradId})`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={MADINA_CHART_COLORS[i]} />
              ))}
              {!isCompact && <LabelList content={<MadinaPriceChartBarLabel hide={false} />} />}
            </Bar>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#1F503B"
              strokeWidth={isCompact ? 2 : 2.5}
              dot={{
                fill: "#fff",
                stroke: "#1F503B",
                strokeWidth: 2,
                r: isCompact ? 4 : 5,
              }}
              activeDot={{ r: isCompact ? 6 : 7, fill: "#1F503B" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
