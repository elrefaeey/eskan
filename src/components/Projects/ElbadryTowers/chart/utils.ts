import {
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
  formatChartPrice,
} from "@/hooks/usePriceChartLayout";
import { pricePoints } from "./data";

export const formatPrice = formatChartPrice;

export const data = buildPriceChartGrowthData(pricePoints);

export const totalGrowth = calcTotalGrowthFromBase(pricePoints);
