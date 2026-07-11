export interface MadinaPricePoint {
  year: string;
  price: number;
}

export const MADINA_PRICE_POINTS: MadinaPricePoint[] = [
  { year: "2023", price: 6500 },
  { year: "2024", price: 8500 },
  { year: "2025", price: 11000 },
  { year: "2026", price: 16000 },
];

export const MADINA_CHART_COLORS = ["#a8d5b5", "#5cb888", "#3d9a6e", "#1F503B"] as const;

export const MADINA_PRICE_CHART = {
  title: "تطور سعر المتر — 2023 — 2026",
  subtitle: "رسم بياني يوضح ارتفاع سعر المتر في الوحدات السكنية في مشروع أبراج المدينة",
  growthLabel: "نمو خلال 4 سنوات",
  meterPriceLabel: "سعر المتر",
  yDomain: [5500, 17000] as [number, number],
  yTicks: [6000, 9000, 12000, 15000],
  barGradId: "barGradMadina",
  areaGradId: "areaGradMadina",
} as const;
