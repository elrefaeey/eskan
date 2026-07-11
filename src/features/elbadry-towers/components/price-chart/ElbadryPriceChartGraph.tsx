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
import { ELBADRY_CHART_COLORS, ELBADRY_PRICE_CHART } from "../../constants";
import { formatChartPrice, usePriceChartLayout } from "@/hooks/usePriceChartLayout";
import ElbadryPriceChartTooltip from "./ElbadryPriceChartTooltip";
import ElbadryPriceChartBarLabel from "./ElbadryPriceChartBarLabel";
import type { ElbadryPriceChartRow } from "./ElbadryPriceChartSummary";

interface ElbadryPriceChartGraphProps {
  data: ElbadryPriceChartRow[];
}

export default function ElbadryPriceChartGraph({ data }: ElbadryPriceChartGraphProps) {
  const { isCompact, chartMargin, yAxisWidth, chartWrapperClass, yAxisTick } =
    usePriceChartLayout();

  return (
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
            domain={ELBADRY_PRICE_CHART.yDomain}
            tick={yAxisTick}
            axisLine={false}
            tickLine={false}
            tickMargin={0}
            tickFormatter={(v) => formatChartPrice(v)}
            ticks={[...ELBADRY_PRICE_CHART.yTicks]}
            width={yAxisWidth}
          />
          <Tooltip
            content={<ElbadryPriceChartTooltip />}
            cursor={{ fill: "#f0faf4", radius: 8 }}
          />
          <Area type="monotone" dataKey="price" fill="url(#areaGradBadry)" stroke="none" />
          <Bar
            dataKey="price"
            radius={[10, 10, 0, 0]}
            maxBarSize={isCompact ? 36 : 52}
            fill="url(#barGradBadry)"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={ELBADRY_CHART_COLORS[i]} />
            ))}
            {!isCompact && <LabelList content={<ElbadryPriceChartBarLabel />} />}
          </Bar>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#1F503B"
            strokeWidth={isCompact ? 2 : 2.5}
            dot={{
              fill: "#fff",
              stroke: "#1F503B",
              strokeWidth: 2.5,
              r: isCompact ? 4 : 5,
            }}
            activeDot={{ r: 7, fill: "#1F503B" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
