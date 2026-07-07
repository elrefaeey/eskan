import type { AreaOption } from "../types";

export const SALES_MAP: Record<string, string> = {
  "0": "Roqaia",
  "1": "Mona",
  "2": "Diana",
  "3": "Amal",
  "4": "Sama",
};

export const DEFAULT_RESPONSIBLE = "Ziad";

export const RESIDENTIAL_OPTIONS: Record<string, AreaOption> = {
  "سكنى مميز من 82 متر الى 100": {
    label: "سكن مميز (من 82 متر حتى 100 متر)",
    downPayment: "450000 - 650000",
    downPaymentText: "من 450 الف الى 650 الف",
    installment: "11000 - 15000",
    installmentText: "من 11 الف الى 15 الف",
  },
  "سكنى اكثر تميز من 110 متر الى 130": {
    label: "سكن أكثر تميز (من 110 متر حتى 130 متر)",
    downPayment: "700000 - 890000",
    downPaymentText: "من 700 الف الى 890 الف",
    installment: "16000 - 22000",
    installmentText: "من 16 الف الى 22 الف",
  },
  "سكنى فاخر من 130 متر الى 200": {
    label: "سكن فاخر (من 130 متر حتى 200 متر)",
    downPayment: "900000 - 1200000",
    downPaymentText: "من 900 الف الى مليون و 200 الف",
    installment: "22000 - 40000",
    installmentText: "من 22 الف الى 40 الف",
  },
};

export const COMMERCIAL_OPTIONS: Record<string, AreaOption> = {
  تجاري_1: { downPayment: "350000 - 500000" },
  تجاري_2: { downPayment: "550000 - 750000" },
  تجاري_3: { downPayment: "800000 - 990000" },
};

export const MEDICAL_DURATION_OPTIONS = [
  {
    value: "تقسيط علي 6 سنين (استلام بعد سنتين)",
    label: "تقسيط علي 6 سنين (استلام بعد سنتين)",
  },
  {
    value: "تقسيط علي 3 سنين (استلام فوري)",
    label: "تقسيط علي 3 سنين (استلام فوري)",
  },
];

export const INVESTMENT_GOAL_OPTIONS = [
  { value: "استثمار بغرض عائد ايجاري", label: "استثمار بغرض عائد ايجاري" },
  { value: "استثمار بغرض عائد بيعي", label: "استثمار بغرض عائد بيعي" },
];

export const UNIT_TYPES = ["تجاري", "سكني", "طبي"] as const;

export const PURPOSE_OPTIONS = ["تملك", "استثمار"] as const;

/** Format a number to Arabic-friendly display (ألف / مليون) */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${parseFloat((num / 1_000_000).toFixed(1))} مليون جنيه`;
  }
  if (num >= 1_000) {
    return `${parseFloat((num / 1_000).toFixed(1))} الف جنيه`;
  }
  return num.toLocaleString("ar-EG");
}

/** Parse "min - max" downPayment string into [min, max] */
export function parseDownPaymentRange(dp: string): [number, number] {
  const [min, max] = dp.split(" - ").map(Number);
  return [min, max];
}
