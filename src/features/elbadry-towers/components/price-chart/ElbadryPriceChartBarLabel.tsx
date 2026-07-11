"use client";

import { formatChartPrice } from "@/hooks/usePriceChartLayout";

interface ElbadryPriceChartBarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  viewBox?: { width?: number };
}

export default function ElbadryPriceChartBarLabel({
  x = 0,
  y = 0,
  width = 0,
  value = 0,
  viewBox,
}: ElbadryPriceChartBarLabelProps) {
  const chartWidth = viewBox?.width || 300;
  const fontSize = chartWidth < 300 ? 10 : 13;

  return (
    <text
      x={x + width / 2}
      y={y - 6}
      fill="#1F503B"
      textAnchor="middle"
      fontSize={fontSize}
      fontWeight={700}
    >
      {formatChartPrice(value)}
    </text>
  );
}
