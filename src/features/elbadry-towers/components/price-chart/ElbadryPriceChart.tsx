import { ELBADRY_PRICE_POINTS } from "../../constants";
import {
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
} from "@/hooks/usePriceChartLayout";
import ElbadryPriceChartHeader from "./ElbadryPriceChartHeader";
import ElbadryPriceChartGraph from "./ElbadryPriceChartGraph";
import ElbadryPriceChartSummary from "./ElbadryPriceChartSummary";

const chartData = buildPriceChartGrowthData(ELBADRY_PRICE_POINTS);
const totalGrowth = calcTotalGrowthFromBase(ELBADRY_PRICE_POINTS);

export default function ElbadryPriceChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
      <ElbadryPriceChartHeader totalGrowth={totalGrowth} />
      <ElbadryPriceChartGraph data={chartData} />
      <ElbadryPriceChartSummary rows={chartData} />
    </div>
  );
}
