import { Shirt, TrendingUp, Users } from "lucide-react";
import type { HighlightItem } from "@/components/shared";

export const CLOTHES_SECTION = "ملابس" as const;

export const CLOTHES_HERO = {
  staticImageAlt: "دور الملابس",
  badge: "دور الملابس — سيتي سنتر",
  title: "دور الملابس",
  subtitle: "سيتي سنتر المنصورة",
  description:
    "دور كامل مخصص لتجارة الملابس بكل أنواعها وأحجامها في موقع استراتيجي يخدم الدلتا بالكامل. مساحات مناسبة بمقدم ميسر وتقسيط حتى 3 سنوات.",
} as const;

export const CLOTHES_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Shirt,
    title: "متخصص في الملابس",
    desc: "دور كامل مخصص لتجارة الملابس بكل أنواعها وأحجامها",
  },
  {
    icon: TrendingUp,
    title: "عائد مميز",
    desc: "عوائد إيجارية مستقرة في موقع يخدم الدلتا بالكامل",
  },
  {
    icon: Users,
    title: "جمهور واسع",
    desc: "يستهدف أكثر من 10 مليون مواطن من أبناء الدقهلية والدلتا",
  },
];

export const CLOTHES_PRICE_CHART_DESCRIPTION =
  "رسم بياني يوضح ارتفاع سعر المتر في دور الملابس بسيتي سنتر المنصورة";
