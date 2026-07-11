import { cn } from "@/lib/utils";
import { formatChartPrice } from "@/hooks/usePriceChartLayout";
import { MADINA_PRICE_CHART } from "../../constants/price-chart";

export interface MadinaPriceChartRow {
  year: string;
  price: number;
  growth: string | null;
}

interface MadinaPriceChartSummaryProps {
  rows: MadinaPriceChartRow[];
}

export default function MadinaPriceChartSummary({ rows }: MadinaPriceChartSummaryProps) {
  return (
    <div className="grid grid-cols-4 border-t border-gray-100 bg-white" dir="ltr">
      {rows.map((row) => (
        <div
          key={row.year}
          className={cn(
            "flex min-w-0 flex-col items-center justify-center gap-0.5 text-center bg-white",
            "py-2 px-0.5 sm:py-4 sm:px-2 md:py-5 md:px-4",
            "border-r border-gray-100 last:border-0",
          )}
        >
          <span className="font-extrabold leading-none tabular-nums whitespace-nowrap text-[9px] sm:text-sm md:text-lg text-gray-700">
            {formatChartPrice(row.price)}
          </span>
          <span className="text-gray-400 text-[8px] sm:text-xs leading-tight">
            {MADINA_PRICE_CHART.meterPriceLabel}
          </span>
          <span className="text-gray-500 text-[8px] sm:text-xs">{row.year}</span>
          {row.growth && (
            <span className="text-primary text-[8px] sm:text-xs font-bold">{row.growth}</span>
          )}
        </div>
      ))}
    </div>
  );
}
