import {
  Shield,
  Bus,
  Dumbbell,
  Tv2,
  Car,
  ArrowUpDown,
  type LucideIcon,
} from "lucide-react";

export const ELBADRY_UNITS_SECTION_ID = "units-section";

export const ELBADRY_TOWERS_HERO = {
  badge: "مشروع سكني",
  videoId: "jWCRs6Oc_0g",
  videoButtonText: "مشاهدة فيديو المشروع",
  videoDialogTitle: "فيديو المشروع",
  unitsButtonText: "عرض الوحدات",
} as const;

export const ELBADRY_TOWERS_SECTIONS = {
  features: "ما يتميز به المشروع",
  priceChart: "مخطط المشروع",
  tour3d: "جولة 3D للمشروع",
  unitsLocation: "موقع المشروع السكني",
} as const;

export const ELBADRY_TOWERS_FEATURES = [
  "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
  "مشروع ضخم بمسطحات بنائية تتجاوز 21 ألف متر مربع",
  "مستهدف ليكون الوجهة الرئيسية للتسوق لأكثر من 10 مليون من أبناء الدقهلية",
  "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
  "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
] as const;

export const ELBADRY_TOUR_3D = {
  src: "https://momento360.com/e/u/36a8763404934b80a8f94f1ea11c3e65?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
  title: "جولة 3D أبراج البدري",
} as const;

export const ELBADRY_MAP_FALLBACK_IMAGE =
  "https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/Rauno8Hapl.png";

export const ELBADRY_BLOCKS_INTRO =
  "يتكون المشروع من أربع بلوكات مقسمة كالآتي:";

export interface ElbadryBlockData {
  id: string;
  color: string;
  text: string;
}

export const ELBADRY_BLOCKS: ElbadryBlockData[] = [
  {
    id: "A",
    color: "bg-purple-600",
    text: "يقع علي واجهه رئيسيه علي شارع عبد السلام عارف وبواجهه رئيسيه علي شارع جانبي ١٠ متر",
  },
  {
    id: "B",
    color: "bg-green-600",
    text: "يقع علي واجهه مميزه علي الميدان الداخلي بمسطح 1000 متر وبواجهة جانبيه علي الشارع 10 متر وواجهه علي شارع خلفي",
  },
  {
    id: "C",
    color: "bg-yellow-500",
    text: "يقع علي واجهه مميزه علي الميدان الداخلي بمسطح ١٠٠٠ متر، واجهه جانبيه شارع البحر الصغير وبناصيه علي شارع داخلي بعرض ١٥ متر",
  },
  {
    id: "D",
    color: "bg-orange-500",
    text: "يقع علي واجهه رئيسيه علي شارع عبد السلام عارف وبواجهه جانبيه علي شارع البحر الصغير وبناصيه علي شارع داخلي بعرض ١٥ متر",
  },
];

export interface ElbadryServiceCardData {
  icon: LucideIcon;
  title: string;
  color: string;
  bg: string;
}

export const ELBADRY_SERVICE_CARDS: ElbadryServiceCardData[] = [
  { icon: Shield, title: "أمن وحراسة", color: "text-primary", bg: "bg-primary/10" },
  { icon: ArrowUpDown, title: "مصاعد ومداخل خاصة للسكان", color: "text-primary", bg: "bg-primary/10" },
  { icon: Bus, title: "خدمات نقل للسكان", color: "text-primary", bg: "bg-primary/10" },
  { icon: Dumbbell, title: "نادي ترفيهي", color: "text-primary", bg: "bg-primary/10" },
  { icon: Tv2, title: "دش مركزي", color: "text-primary", bg: "bg-primary/10" },
  { icon: Car, title: "جراج للسيارات", color: "text-primary", bg: "bg-primary/10" },
];

export interface ElbadryPricePoint {
  year: string;
  price: number;
}

export const ELBADRY_PRICE_POINTS: ElbadryPricePoint[] = [
  { year: "2023", price: 9000 },
  { year: "2024", price: 12000 },
  { year: "2025", price: 16000 },
  { year: "2026", price: 19000 },
];

export const ELBADRY_CHART_COLORS = ["#a8d5b5", "#5cb888", "#3d9a6e", "#1F503B"] as const;

export const ELBADRY_PRICE_CHART = {
  title: "تطور سعر المتر — 2023 — 2026",
  subtitle:
    "رسم بياني يوضح ارتفاع سعر المتر في الوحدات السكنية في مشروع أبراج البدري",
  growthLabel: "نمو خلال 4 سنوات",
  meterPriceLabel: "سعر المتر",
  yDomain: [8000, 20000] as [number, number],
  yTicks: [9000, 12000, 16000, 19000],
} as const;
