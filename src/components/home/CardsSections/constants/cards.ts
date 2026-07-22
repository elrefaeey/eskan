import { TrendingUp, Users } from "lucide-react";
import type { CardsSectionItem } from "../types";

export const CARDS_SECTION_ITEMS: CardsSectionItem[] = [
  {
    title: "الإستثمار العقاري",
    description:
      "الأسلوب الأضمن لتحقيق أعلى عائد استثماري هو الاستثمار العقاري من خلال شراء وحدات تجارية وطبية في المشروعات العقارية المرخصة مع تحقيق عوائد مزدوجة من البيع والإيجار، حيث يمكن للمستثمر الاستفادة من زيادة قيمة الوحدة على المدى الطويل والحصول على دخل ثابت من تأجيرها أو عائد من إعادة البيع.",
    link: "/investment?start=1",
    icon: TrendingUp,
    variant: "primary",
    background: "network",
    backgroundTone: "dark",
    highlights: ["عوائد مزدوجة", "بيع وإيجار", "مشاريع مرخصة"],
  },
  {
    title: "علاقاتك استثمارك",
    description:
      "عميلنا العزيز إذا كنت من هؤلاء الذين يتميزون بشبكة علاقات واسعة ودائرة معارف كبيرة ولديك قدرة على التواصل مع الآخرين، فيمكنك تحويل هذه الميزة إلى أرباح مالية رائعة من خلال برنامج حق السعي. لمعرفة التفاصيل تواصل معنا.",
    link: "/work-with-us",
    icon: Users,
    variant: "light",
    background: "growth",
    backgroundTone: "light",
    highlights: ["شبكة علاقات", "برنامج حق السعي", "أرباح مالية"],
  },
];
