"use client";

import { formatChartPrice } from "@/hooks/usePriceChartLayout";

interface MadinaPriceChartBarLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  hide?: boolean;
}

export default function MadinaPriceChartBarLabel({
  x = 0,
  y = 0,
  width = 0,
  value = 0,
  hide,
}: MadinaPriceChartBarLabelProps) {
  if (hide) return null;

  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#1F503B"
      textAnchor="middle"
      fontSize={11}
      fontWeight={700}
    >
      {formatChartPrice(value)}
    </text>
  );
}
