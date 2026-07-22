import { MADINA_PRICE_POINTS } from "../../constants/price-chart";
import {
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
} from "@/hooks/usePriceChartLayout";
import MadinaPriceChartHeader from "./MadinaPriceChartHeader";
import MadinaPriceChartGraph from "./MadinaPriceChartGraph";
import MadinaPriceChartSummary from "./MadinaPriceChartSummary";

const chartData = buildPriceChartGrowthData(MADINA_PRICE_POINTS);
const totalGrowth = calcTotalGrowthFromBase(MADINA_PRICE_POINTS);

export default function MadinaPriceChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      <MadinaPriceChartHeader totalGrowth={totalGrowth} />
      <MadinaPriceChartGraph data={chartData} />
      <MadinaPriceChartSummary rows={chartData} />
    </div>
  );
}
