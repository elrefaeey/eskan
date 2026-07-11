import { TrendingUp, ArrowUpRight } from "lucide-react";
import { MADINA_PRICE_CHART } from "../../constants/price-chart";

interface MadinaPriceChartHeaderProps {
  totalGrowth: string;
}

export default function MadinaPriceChartHeader({ totalGrowth }: MadinaPriceChartHeaderProps) {
  return (
    <div
      className="bg-gradient-to-l from-primary to-[#2d8a57] px-4 py-4 sm:px-6 sm:py-5 md:px-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-2 min-w-0">
          <TrendingUp className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h3 className="text-white font-extrabold text-base leading-snug sm:text-lg md:text-xl">
              {MADINA_PRICE_CHART.title}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
              {MADINA_PRICE_CHART.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-2 border border-white/20 shrink-0 self-start sm:self-auto">
          <ArrowUpRight className="w-4 h-4 text-white" />
          <span className="text-white font-extrabold text-sm">{totalGrowth}</span>
          <span className="text-white/70 text-xs whitespace-nowrap">
            {MADINA_PRICE_CHART.growthLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
