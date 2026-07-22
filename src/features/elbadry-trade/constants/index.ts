import {
  CHINESE_MARKET_ACCENT,
  CHINESE_MARKET_ACCENT_LIGHT,
  CHINESE_MARKET_CARD_DESCRIPTION,
  CHINESE_MARKET_CARD_IMAGE,
} from "@/constants/chineseMarket";

export const ELBADRY_TRADE_HERO = {
  badge: "مشروع تجاري",
  badgeClassName: "bg-[#4A36A2]/10 text-[#4A36A2]",
  videoLinkName: "gomla mall",
  defaultVideoId: "jWCRs6Oc_0g",
} as const;

export const ELBADRY_TRADE_FEATURES = [
  "موقع استراتيجي مميز داخل المنصورة ضمن أكبر مركز تجاري متعدد الأسواق",
  "مشروع ضخم بمسطحات بنائية تتجاوز 21 ألف متر مربع",
  "مستهدف ليكون الوجهة الرئيسية للتسوق لأكثر من 10 مليون من أبناء الدقهلية",
  "تنفيذ مجموعة البدري للتجارة والمقاولات بالتعاون مع إسكان المنصورة",
  "مجتمع متكامل بخدمات متطورة (أمن وحراسة، جراجات، مصاعد، ونادي ترفيهي)",
] as const;

export interface ElbadryTradeActivity {
  title: string;
  description: string;
  link: string;
  img: string;
  accent: string;
  accentLight: string;
}

export const ELBADRY_TRADE_ACTIVITIES: ElbadryTradeActivity[] = [
  {
    title: "سوق اسطنبول",
    description: "مساحات تبدأ من 29م ومقدم يبدأ من 600 ألف جنية",
    link: "/elbadry-souq-istanbul",
    img: "/assets/projects/elbadry-trade/istanbulCardImg.png",
    accent: "#d23a2e",
    accentLight: "#d23a2e15",
  },
  {
    title: "مطاعم وكافيهات",
    description: "مساحات تبدأ من 29م ومقدم يبدأ من 760 ألف جنية",
    link: "/elbadry-cafe-restaurants",
    img: "/assets/projects/elbadry-trade/cafeCardImg.png",
    accent: "#1F503B",
    accentLight: "#1F503B15",
  },
  {
    title: "سوق الصين العظيم",
    description: CHINESE_MARKET_CARD_DESCRIPTION,
    link: "/elbadry-chinese-market",
    img: CHINESE_MARKET_CARD_IMAGE,
    accent: CHINESE_MARKET_ACCENT,
    accentLight: CHINESE_MARKET_ACCENT_LIGHT,
  },
];
