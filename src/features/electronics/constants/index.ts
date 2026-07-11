import { Cpu, TrendingUp, Users } from "lucide-react";
import type { HighlightItem } from "@/components/shared";

export const ELECTRONICS_SECTION = "الكترونيات" as const;

export const ELECTRONICS_HERO = {
  staticImageAlt: "دور الإلكترونيات",
  badge: "دور الإلكترونيات — سيتي سنتر",
  title: "دور الإلكترونيات",
  subtitle: "سيتي سنتر المنصورة",
  description:
    "مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة وبيع جميع أنواع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة. دور الإلكترونيات هو الاختيار الأول والوحيد لكل المهتمين بكل شيء يخص التكنولوجيا.",
} as const;

export const ELECTRONICS_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Cpu,
    title: "متخصص في التكنولوجيا",
    desc: "موبايلات، لابتوب، كمبيوتر، ماكينات طباعة — كل شيء تكنولوجيا في مكان واحد",
  },
  {
    icon: TrendingUp,
    title: "أعلى عائد",
    desc: "عوائد إيجارية مميزة في أكبر مجمع إلكترونيات بالمنصورة",
  },
  {
    icon: Users,
    title: "جمهور ضخم",
    desc: "يستهدف أكثر من 10 مليون مواطن من أبناء الدقهلية والدلتا",
  },
];

export const ELECTRONICS_PRICE_CHART_DESCRIPTION =
  "رسم بياني يوضح ارتفاع سعر المتر في دور الإلكترونيات بسيتي سنتر المنصورة";

export const ELECTRONICS_WHY_INVEST = {
  title: "ليه تستثمر في الإلكترونيات؟",
  description:
    "مول سيتي سنتر بيوفر أكبر مجمع للإلكترونيات متخصص في تجارة وصيانة وبيع جميع أنواع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة. دور الإلكترونيات هو الاختيار الأول والوحيد لكل المهتمين بكل شيء يخص التكنولوجيا.",
  floorPlanImage: "/assets/projects/city-center/الالكترونيات.png",
  floorPlanAlt: "مخطط دور الإلكترونيات",
} as const;
