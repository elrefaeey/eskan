import {
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
  formatChartPrice,
  formatChartYAxisTick,
} from "@/hooks/usePriceChartLayout";
import { CITY_CENTER_PRICE_POINTS } from "./data";

export const formatPrice = formatChartPrice;

export { formatChartYAxisTick };

export const data = buildPriceChartGrowthData(CITY_CENTER_PRICE_POINTS);

export const totalGrowth = calcTotalGrowthFromBase(CITY_CENTER_PRICE_POINTS);
