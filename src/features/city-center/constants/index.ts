import { Building2, TrendingUp, BarChart3, Maximize2 } from "lucide-react";
import type { StatItem } from "@/components/shared";

export const CITY_CENTER_LEVELS_SECTION_ID = "city-center-levels";

export const CITY_CENTER_UNITS_SECTION_ID = "units-section";

export const CITY_CENTER_STATS: StatItem[] = [
  { label: "طوابق تجارية", value: "6", icon: Building2 },
  { label: "مباع من المشروع", value: "80%", icon: BarChart3 },
  { label: "مسطحات بنائية", value: "13000م", icon: Maximize2 },
  { label: "أعلى عائد استثماري", value: "25%", icon: TrendingUp },
];

export const CITY_CENTER_PROJECT_FEATURES = [
  "مول مرخص وفي مرحلة متقدمة في الإنشاءات",
  "أول مول متخصص في المنصورة وأكبر تنوع للمحلات التجارية في الدلتا",
  "منظومة خدمات متكاملة: تكييف مركزي، سلالم كهربائية، نظام أمني، بدروم وجراج واسع",
  "مساحات ترفيهية مصممة لإسعاد الأطفال وإضفاء جو من المتعة على العائلات",
] as const;

export const CITY_CENTER_CONTRACT_STEPS = [
  "فور التوقيع على العقد يتم نقل حصة من أرض المشروع تمثل قيمة مبلغ مقدم التعاقد",
  "أسلوب السداد من خلال حسابات بنك الإسكان والتعمير — حساب شركات",
  "نظام سداد مرتبط بتقدم الأعمال في المشروع",
] as const;

export const CITY_CENTER_MANAGEMENT_ITEMS = [
  {
    label: "الشركة المالكة:",
    text: "شركة توب براون — حامد الطنطاوي (المالك لمول الطنطاوي للأدوات المنزلية ومطاعم قصر الأسماك)",
  },
  {
    label: "المطور العقاري وإدارة المشروعات:",
    text: "إسكان المنصورة العقارية بخبرة تتجاوز 17 سنة في إدارة المشروعات العقارية الكبرى",
  },
  {
    label: "الاستشاري الهندسي:",
    text: "مهندس ربيع السعدني",
  },
] as const;

export const CITY_CENTER_HERO = {
  badge: "مول تجاري متكامل",
  description:
    "مول متخصص يضم الإلكترونيات والملابس، دور بازارات، فود كورت، وهايبر بيت الجملة لكي يجذب آلاف الزوار يوميًا. وحدات صغيرة ومتوسطة في موقع يخدم الدلتا بالكامل.",
  highlightText: "امتلك الآن… مشروع متكامل مش مجرد محل",
  defaultVideoId: "jWCRs6Oc_0g",
} as const;

export const CITY_CENTER_LEVELS_TITLE = "اختر النشاط التجاري المناسب لك";

export const CITY_CENTER_INVESTMENT = {
  title: "الاستثمار في سيتي سنتر",
  description:
    "الاستثمار في محلات التجارية في مول سيتي سنتر هو الأفضل لأنه يحقق عائد استثماري سريع. توفر إسكان المنصورة فرصة الاستثمار بغرض إعادة البيع أو العائد الإيجاري بعقود ملزمة من شركة الإدارة، مما يعني توفُر كل شهر دخل ثابت يُأمن لك حياتك وحياة أسرتك.",
  featuresTitle: "ما يميز المشروع",
} as const;

export const CITY_CENTER_CONTRACT = {
  title: "أسلوب تعاقد يضمن لك أموالك",
  intro:
    "سيتي سنتر المنصورة يتم تنفيذه بنظام اتحاد الملاك — أقوى وأضمن نظام تعاقد يحقق الأمان للمتعاقدين:",
  managementTitle: "نظام إدارة قوي",
} as const;
