import { Building2, Store, GraduationCap, type LucideIcon } from "lucide-react";
import type { LocationContainerVariant } from "@/components/shared/LocationSection/types";

export const MADINA_HERO = {
  badge: "مشروع سكني تجاري إداري",
  title: "أبراج المدينة",
  description:
    "مجتمع عمراني متكامل على مساحة 15 ألف متر (سكني - تجاري - عيادات طبية - مجمع تعليمي - إداري) يتكون من عدد 14 عمارة مقسمة على 4 مراحل وعدد يزيد عن 200 وحدة سكنية تتميز بمساحات تناسب الأسرة المصرية تبدأ من 85 متر حتى 159 متر، يحقق المشروع المعادلة الصعبة التي تعطى مساحة وحدة سكنية صغيرة ومتوسطة بمقدم يبدأ من 25% وبالتقسيط على 6 سنوات وبدون فوايد.",
  videoId: "jWCRs6Oc_0g",
} as const;

export const MADINA_RESIDENTIAL_HERO = {
  badge: "وحدات سكنية",
  title: "أبراج المدينة",
  description: MADINA_HERO.description,
  videoId: MADINA_HERO.videoId,
} as const;

export const MADINA_SECTIONS = {
  departments: "أقسام المشروع",
  priceChart: "مخطط المشروع",
} as const;

export const MADINA_LOCATION = {
  embedUrl:
    "https://www.google.com/maps?q=أبراج+المدينة،+طريق+المنصورة+دمياط،+المنصورة،+الدقهلية،+مصر&output=embed&t=k",
  title: "موقع أبراج المدينة",
  description:
    "يتمتع مشروع أبراج المدينة بموقع عبقري واستراتيجي، دقيقة واحدة فقط من شارع قناة السويس، و10 دقائق من جامعة المنصورة، و5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية. حيث يقع المشروع في الاتجاه المقابل لـ كوبري جديلة، مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة كذلك الدلتا.",
  externalMapHref: "https://maps.app.goo.gl/vwqecvwAo2n7ZtP77",
  planImage: "/assets/projects/abrag-elmadina/aaa.png",
  planImageAlt: "مخطط أبراج المدينة",
} as const;

export const MADINA_LOCATION_SECTION_DEFAULTS = {
  mediaPosition: "start",
  containerVariant: "gray-flat" satisfies LocationContainerVariant,
  mediaSlotClassName: "h-64 md:h-auto shadow-md rounded-xl overflow-hidden",
} as const;

export interface MadinaProjectCardData {
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

export const MADINA_PROJECT_CARDS: MadinaProjectCardData[] = [
  {
    icon: Building2,
    title: "أبراج المدينة",
    desc: "مجتمع متكامل (سكني وتجاري وخدمي) يضم 14 عمارة وأكثر من 200 وحدة. مساحات من 85 لـ 159 م² تناسب كل الاحتياجات. مقدم 25% وتقسيط حتى 6 سنوات بدون فوائد.",
    btn: "عرض المشروع",
    href: "/abrag-elmadina/residential",
    border: "border-primary",
    iconBg: "bg-primary",
    btnClass: "bg-primary hover:bg-primary/90",
    tag: "سكني",
    tagClass: "bg-primary/10 text-primary",
    cardBg: "bg-primary/5",
  },
  {
    icon: Store,
    title: "أرض المعارض",
    desc: "مشروع تجاري ضخم على مساحة 15 ألف م²، يُعد الأول من نوعه في المنصورة والدلتا، يجمع كل احتياجات البناء والتشطيب والديكور والأثاث في مكان واحد.",
    btn: "عرض المشروع",
    href: "/gallery-ground",
    border: "border-[#4A36A2]",
    iconBg: "bg-[#4A36A2]",
    btnClass: "bg-[#4A36A2] hover:bg-[#3b2a8a]",
    tag: "تجاري",
    tagClass: "bg-[#4A36A2]/15 text-[#4A36A2]",
    cardBg: "bg-[#4A36A2]/5",
  },
  {
    icon: GraduationCap,
    title: "معهد إعداد الخريجين (GPI)",
    desc: "مشروع تعليمي تدريبي بعائد شهري مستقر ونمو متوقع عاماً بعد عام. أكثر من مليون خريج جامعي خلال آخر خمس سنوات، أغلبهم يحتاج إلى تأهيل عملي حقيقي لدخول سوق العمل بكفاءة.",
    btn: "عرض المشروع",
    href: "/gpi",
    border: "border-[#1F4B57]",
    iconBg: "bg-[#1F4B57]",
    btnClass: "bg-[#1F4B57] hover:bg-[#183d47]",
    tag: "تدريبي استثماري",
    tagClass: "bg-[#1F4B57]/10 text-[#1F4B57]",
    cardBg: "bg-[#1F4B57]/5",
  },
];
