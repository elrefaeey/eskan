import { Building2, Store, type LucideIcon } from "lucide-react";
import type { LocationContainerVariant } from "@/components/shared/LocationSection/types";

export const ELBADRY_HERO = {
  badge: { text: "مشروع سكني تجاري", color: "primary" as const },
  title: "أبراج البدري",
  videoId: "jWCRs6Oc_0g",
} as const;

export const ELBADRY_LOCATION = {
  embedUrl:
    "https://www.google.com/maps?q=أبراج+البدري،+المنصورة،+الدقهلية،+مصر&output=embed&t=k",
  title: "موقع أبراج البدري",
  description:
    "يقع مشروع أبراج البدري في موقع استراتيجي متميز بالمنصورة، آخر شارع الأتوبيس الجديد من اتجاه البحر الصغير، مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة والدقهلية.",
  externalMapHref: "https://maps.app.goo.gl/vW6CVHK8YDKEyaKV9",
} as const;

export const ELBADRY_LOCATION_SECTION_DEFAULTS = {
  mediaPosition: "start",
  containerVariant: "gray-flat" satisfies LocationContainerVariant,
  mediaSlotClassName: "h-64 md:h-auto shadow-md rounded-xl overflow-hidden",
} as const;

export const ELBADRY_CARDS_SECTION_TITLE = "اختر ما يناسبك";

export interface ElbadryProjectCardData {
  icon: LucideIcon;
  title: string;
  desc: string;
  btn: string;
  href: string;
  border: string;
  iconBg: string;
  btnClass: string;
  tag: string;
  tagClass: string;
  cardBg: string;
}

export const ELBADRY_PROJECT_CARDS: ElbadryProjectCardData[] = [
  {
    icon: Building2,
    title: "أبراج البدري السكني",
    desc: "وحدات سكنية متميزة بمواصفات عالية في موقع استراتيجي بالمنصورة، تناسب كل الاحتياجات.",
    btn: "عرض المشروع",
    href: "/abrag-elbadry/towers",
    border: "border-primary",
    iconBg: "bg-primary",
    btnClass: "bg-primary hover:bg-primary/90",
    tag: "سكني",
    tagClass: "bg-primary/10 text-primary",
    cardBg: "bg-primary/5",
  },
  {
    icon: Store,
    title: "مول البدري التجاري",
    desc: "أكبر مركز تجاري متعدد الأسواق بالمنصورة على مسطحات بنائية تتجاوز 21 ألف متر، المقصد الرئيسي لأكثر من 10 مليون من أبناء الدقهلية.",
    btn: "عرض المشروع",
    href: "/elbadry-trade",
    border: "border-[#4A36A2]",
    iconBg: "bg-[#4A36A2]",
    btnClass: "bg-[#4A36A2] hover:bg-[#3b2a8a]",
    tag: "تجاري",
    tagClass: "bg-[#4A36A2]/20 text-[#4A36A2]",
    cardBg: "bg-[#F2F2F5]",
  },
];

export * from "./towers";
