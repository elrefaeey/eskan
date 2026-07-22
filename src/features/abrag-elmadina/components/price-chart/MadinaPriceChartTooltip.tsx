"use client";

import { ArrowUpRight } from "lucide-react";
import { formatChartPrice } from "@/hooks/usePriceChartLayout";

interface MadinaPriceChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { year: string; price: number; growth?: string | null } }>;
}

export default function MadinaPriceChartTooltip({
  active,
  payload,
}: MadinaPriceChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const row = payload[0].payload;

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl text-right"
    >
      <p className="text-primary font-extrabold text-lg">{row.year}</p>
      <p className="text-primary font-extrabold text-xl sm:text-2xl mt-1">
        {formatChartPrice(row.price)}{" "}
        <span className="text-sm font-normal text-gray-400">جنيه / م²</span>
      </p>
      {row.growth && (
        <p className="text-primary font-bold text-sm mt-1 flex items-center gap-1 justify-end">
          <ArrowUpRight className="w-3 h-3" />
          {row.growth} نمو
        </p>
      )}
    </div>
  );
}
