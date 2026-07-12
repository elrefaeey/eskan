import {
  buildPriceChartGrowthData,
  calcTotalGrowthFromBase,
} from "@/hooks/usePriceChartLayout";
import { pricePoints } from "./data";

export const data = buildPriceChartGrowthData(pricePoints);

export const totalGrowth = calcTotalGrowthFromBase(pricePoints);

export const formatPrice = (value: number) => value.toLocaleString();

export const formatYAxisTick = (value: number) =>
  `${(value / 1000).toFixed(0)}k`;
