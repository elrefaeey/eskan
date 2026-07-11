import { TrendingUp, ArrowUpRight } from "lucide-react";
import { ELBADRY_PRICE_CHART } from "../../constants";

interface ElbadryPriceChartHeaderProps {
  totalGrowth: string;
}

export default function 
ElbadryPriceChartHeader({ totalGrowth }: ElbadryPriceChartHeaderProps) {
  return (
    <div className="bg-gradient-to-l from-primary to-[#2d8a57] px-5 md:px-8 py-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-white shrink-0" />
          <h3 className="text-white font-extrabold text-lg md:text-xl">
            {ELBADRY_PRICE_CHART.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-white/15 rounded-xl px-3 py-1.5 border border-white/20">
          <ArrowUpRight className="w-4 h-4 text-white" />
          <span className="text-white font-extrabold text-sm">{totalGrowth}</span>
          <span className="text-white/70 text-xs">{ELBADRY_PRICE_CHART.growthLabel}</span>
        </div>
      </div>
      <p className="text-white/60 text-xs md:text-sm mt-1">{ELBADRY_PRICE_CHART.subtitle}</p>
    </div>
  );
}
