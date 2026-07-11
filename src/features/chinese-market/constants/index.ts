"use client";

import { Store, TrendingUp, Users } from "lucide-react";
import type { HighlightItem } from "@/components/shared";

export const CHINESE_MARKET_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Store,
    title: "سوق متخصص",
    desc: "أكبر تجمع للمنتجات الصينية في قلب الدلتا داخل مول البدري على مساحة تتجاوز 6000 متر مربع",
  },
  {
    icon: TrendingUp,
    title: "عائد مميز",
    desc: "فرصة استثمارية واعدة بعوائد إيجارية مرتفعة داخل مول البدري",
  },
  {
    icon: Users,
    title: "جمهور ضخم",
    desc: "موقع استراتيجي يستهدف آلاف الزوار يوميًا من الدقهلية والمحافظات المجاورة",
  },
];

export const CHINESE_MARKET_INQUIRY = {
  title: "للاستفسار عن الوحدات المتاحة",
  description:
    "تواصل معنا الآن لمعرفة المساحات المتاحة وفرص الاستثمار في سوق الصين العظيم بمول البدري.",
} as const;
