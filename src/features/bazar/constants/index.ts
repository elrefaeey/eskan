import { Calendar, Store, TrendingUp } from "lucide-react";
import type { HighlightItem } from "@/components/shared";

export const BAZAR_SECTION = "بازار" as const;

export const BAZAR_HERO = {
  staticImage:
    "https://back.mansoura-eco-build.com/storage/app/public/images/Eskan/km1aV1odUntitled-2.jpg",
  staticImageAlt: "دور البازار",
  badge: "دور البازار — سيتي سنتر",
  title: "دور البازار",
  subtitle: "سيتي سنتر المنصورة",
  description:
    "سيتي سنتر خصص دور كامل للبازارات — مجموعة مساحات لعرض وبيع منتجات مختلفة ومتنوعة زي الملابس والاكسسوار والمعطرات ومنتجات عناية البشرة والأنشطة الموسمية. يتم تأجير البازار يومياً بعوائد إيجارية هي الأعلى بالمول وبالمنصورة.",
} as const;

export const BAZAR_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: Store,
    title: "تأجير يومي",
    desc: "يتم تأجير البازار يومياً وليس شهرياً بأعلى عوائد إيجارية في المول",
  },
  {
    icon: TrendingUp,
    title: "أعلى عائد",
    desc: "عوائد إيجارية هي الأعلى بالمول وبالمنصورة",
  },
  {
    icon: Calendar,
    title: "أنشطة موسمية",
    desc: "شنط المدارس، معارض رمضان والعيد، دخلة رأس السنة",
  },
];

export const BAZAR_PRICE_CHART_DESCRIPTION =
  "رسم بياني يوضح ارتفاع سعر المتر في دور البازار بسيتي سنتر المنصورة";

export const BAZAR_WHY_INVEST = {
  title: "ليه تستثمر في البازار؟",
  description:
    "سيتي سنتر خصص دور كامل للبازارات وهي مجموعة مساحات لعرض وبيع منتجات مختلفة ومتنوعة زي الملابس والاكسسوار والمعطرات ومنتجات عناية البشرة والأنشطة الموسمية مثل شنط المدارس ومعارض رمضان والعيد ودخلة رأس السنة. ويتم تأجير البازار يومياً وليس شهرياً بعوائد إيجارية هي الأعلى بالمول وبالمنصورة.",
  floorPlanImage: "/assets/projects/city-center/دور البازارات.png",
  floorPlanAlt: "مخطط دور البازار",
} as const;
