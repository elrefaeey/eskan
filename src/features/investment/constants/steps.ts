import type { InvestmentStep } from "../types";

export const GOAL_LABELS: Record<string, string> = {
  rental: "دخل شهري ثابت (عائد إيجاري)",
  resale: "ربح من اعادة البيع",
};

export const RENTAL_GOAL_VALUE = "rental";
export const RENTAL_INSTALLMENT_VALUE = "installment";

export const INVESTMENT_STEPS: InvestmentStep[] = [
  {
    id: 1,
    title: "ما هو هدفك الاستثماري؟",
    field: "goal",
    options: [
      {
        value: "rental",
        label: "دخل شهري ثابت (عائد إيجاري)",
        description:
          "عائد إيجار شهري مستقر بنظام التقسيط — مناسب لمستثمر يبحث عن دخل منتظم",
      },
      {
        value: "resale",
        label: "ربح من اعادة البيع",
        description:
          "ربح من فرق السعر — مناسب لمستثمر يبحث عن مكسب عند البيع",
      },
    ],
  },
];
