"use client";

import { Coffee, TrendingUp, Users } from "lucide-react";
import type { HighlightItem } from "@/components/shared";
import { MALL_LOCATION_SUBTITLE } from "@/features/mall/constants";

export const CAFE_HERO_IMAGES = [
  "/assets/elbadry-trade/cafe1.jpg",
  "/assets/elbadry-trade/cafe2.jpg",
] as const;

export const CAFE_HERO = {
  badge: "مطاعم وكافيهات — مول البدري",
  title: "مطاعم وكافيهات",
  subtitle: MALL_LOCATION_SUBTITLE,
  description:
    "يعتبر مشروع المطاعم والكافيهات طفرة وإضافة كبيرة للمشاريع التجارية بالمنصورة، والذي تنشئه حاليًا مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة المطور العقاري للمشروع ضمن أكبر مركز تجاري متعدد الأسواق بالمنصورة وعلى مسطحات بنائية تتجاوز 21 ألف متر، ليكون المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية.",
  ctaText: "حدد مواصفات محلك",
} as const;

export const CAFE_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Coffee,
    title: "مطاعم وكافيهات",
    desc: "دور كامل مخصص للمطاعم والكافيهات في موقع يستهدف ملايين الزوار",
  },
  {
    icon: TrendingUp,
    title: "عائد مميز",
    desc: "عوائد إيجارية مرتفعة في أكبر مركز تجاري متعدد الأسواق بالمنصورة",
  },
  {
    icon: Users,
    title: "جمهور ضخم",
    desc: "المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية للترفيه والتسوق",
  },
];

export const CAFE_FEATURES = [
  "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
  "دور كامل مخصص للمطاعم والكافيهات بتصميم عصري متكامل",
  "مستهدف ليكون الوجهة الرئيسية للترفيه والتسوق لأكثر من 10 مليون من أبناء الدقهلية",
  "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
  "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
] as const;
