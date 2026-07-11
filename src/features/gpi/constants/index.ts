import { GraduationCap, TrendingUp, Users, BookOpen } from "lucide-react";
import type { StatItem } from "@/components/shared";

export const GPI_INVESTMENT_PROJECT_ID = 8;
export const GPI_SHARES_SECTION_ID = "investment-shares";

export const GPI_IMAGES = [
  "/assets/projects/gpi/lab-gpi.png",
  "/assets/projects/gpi/lecture-hall.png",
  "/assets/projects/gpi/section-hall.png",
] as const;

export const GPI_HERO = {
  badge: "مشروع تدريبي استثماري",
  badgeClassName: "bg-[#1F4B57]/10 text-[#1F4B57]",
  title: "معهد إعداد الخريجين (GPI)",
  description:
    "مشروع تعليمي تدريبي بعائد شهري مستقر ونمو متوقع عاماً بعد عام. أكثر من مليون خريج جامعي خلال آخر خمس سنوات في محافظات الدقهلية وكفر الشيخ والغربية، أغلبهم يحتاج إلى تأهيل عملي حقيقي لدخول سوق العمل بكفاءة.",
  ctaText: "احجز حصتك الاستثمارية الآن",
} as const;

export const GPI_STATS: StatItem[] = [
  { label: "مسطحات بنائية", value: "6156م" },
  { label: "متدرب سنوياً", value: "4000" },
  { label: "أدوار", value: "4" },
  { label: "قطاع تدريب غير مشبع", value: "فرصة" },
];

export const GPI_WHY_TITLE = "لماذا معهد إعداد الخريجين؟";
export const GPI_WHY_SUBTITLE = "لأن السوق لا يحتاج إلى شهادات فقط... بل يحتاج إلى مهارات حقيقية.";

export const GPI_WHY_ITEMS = [
  "أعداد خريجين ضخمة سنوياً تحتاج تأهيل مهني حقيقي",
  "سوق تدريب غير مشبع في الدقهلية والدلتا",
  "عائد شهري مستقر للمستثمرين",
  "إمكانية التوسع في البرامج والفروع",
  "مشروع مرخّص وتحت الإنشاء — أمان وثقة في التنفيذ",
] as const;

export const GPI_INVESTMENT_SECTION_TITLE = "فرصة استثمارية قوية";

export const GPI_INVESTMENT_FEATURES = [
  {
    icon: TrendingUp,
    title: "عائد شهري مستقر",
    desc: "كل برنامج تدريبي مصدر دخل متكرر يتضاعف مع زيادة المتدربين",
  },
  {
    icon: Users,
    title: "سوق ضخم",
    desc: "أكثر من مليون خريج جامعي خلال آخر 5 سنوات في الدقهلية وكفر الشيخ والغربية",
  },
  {
    icon: BookOpen,
    title: "احتياج حقيقي",
    desc: "الفجوة بين التعليم الأكademي ومتطلبات الشركات تخلق طلباً متزايداً على التدريب",
  },
  {
    icon: GraduationCap,
    title: "أثر مجتمعي",
    desc: "تحويل الخريجين من باحثين عن وظيفة إلى أشخاص مؤهلين للعمل والإنتاج",
  },
] as const;

export const GPI_FOR_WHO_TITLE = "لمن هذه الفرصة؟";
export const GPI_FOR_WHO_SUBTITLE = "هذه الفرصة مناسبة لكل مستثمر يبحث عن:";

export const GPI_FOR_WHO_ITEMS = [
  "دخل شهري منتظم",
  "استثمار في قطاع واعد",
  "مشروع قابل للنمو والتوسع",
  "أثر اجتماعي حقيقي",
  "فرصة دخول مبكر في سوق مطلوب بقوة",
] as const;

export const GPI_MISSION = {
  title: "رسالتنا",
  description:
    "أن يصبح معهد إعداد الخريجين (GPI) بوابة الخريجين لاكتساب المهارات العملية، والتحول من مجرد باحث عن وظيفة إلى شخص مؤهل للعمل والإنتاج.",
  ctaHint: "استثمر اليوم في مشروع يصنع المستقبل",
} as const;
