"use client";

import { useEffect, useState } from "react";

type PriceChartLayoutOptions = {
  yAxisWidthCompact?: number;
  yAxisWidthDesktop?: number;
};

export function usePriceChartLayout({
  yAxisWidthCompact = 38,
  yAxisWidthDesktop = 42,
}: PriceChartLayoutOptions = {}) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return {
    isCompact,
    chartMargin: {
      top: isCompact ? 12 : 28,
      right: isCompact ? 4 : 5,
      left: isCompact ? -28 : -14,
      bottom: 0,
    },
    yAxisWidth: isCompact ? yAxisWidthCompact : yAxisWidthDesktop,
    chartWrapperClass: isCompact ? "px-0 pt-4 pb-1" : "px-1 md:px-6 pt-6 pb-2",
    yAxisTick: {
      fill: "#aaa",
      fontSize: isCompact ? 8 : 9,
      dx: isCompact ? -4 : 0,
    },
  };
}

export const formatChartPrice = (value: number) => value.toLocaleString("en-US");

export const formatChartYAxisTick = (value: number, compact: boolean, useCompactK = false) => {
  if (compact && useCompactK && value >= 10000) {
    return `${Math.round(value / 1000)}k`;
  }
  return formatChartPrice(value);
};

type PricePoint = { price: number };

export function buildPriceChartGrowthData<T extends PricePoint>(points: T[]) {
  const basePrice = points[0]?.price ?? 0;

  return points.map((point, index) => ({
    ...point,
    growth:
      index === 0 || basePrice === 0
        ? null
        : `+${Math.round(((point.price - basePrice) / basePrice) * 100)}%`,
  }));
}

export function calcTotalGrowthFromBase(points: PricePoint[]) {
  if (points.length < 2 || points[0].price === 0) return "+0%";
  const { price: basePrice } = points[0];
  const { price: lastPrice } = points[points.length - 1];
  return `+${Math.round(((lastPrice - basePrice) / basePrice) * 100)}%`;
}
