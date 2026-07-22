import {
  Calculator,
  Code2,
  Handshake,
  Megaphone,
  Palette,
  PencilRuler,
} from "lucide-react";
import type { StatItem } from "@/components/shared";
import type { TeamDepartment } from "../types";

export const ABOUT_US_HERO = {
  staticImage: "/assets/about-us/about-us.png",
  staticImageAlt: "من نحن - إسكان المنصورة",
  badge: "إسكان المنصورة",
  title: "من نحن",
  description:
    "شركة مساهمة مصرية تعمل تحت مظلة هيئة الاستثمار في مجال التطوير العقاري وإدارة المشروعات والاستشارات العقارية الفنية والإدارية، وتتميز الشركة بخبرتها الواسعة التي تتجاوز 17 عامًا في هذا المجال مما جعلها تنفرد بسمعة وخبرة ممتازة في مجالها.",
} as const;

export const ABOUT_US_STATS: StatItem[] = [
  { value: "200M+", label: "استثمارات عملائنا" },
  { value: "2,000+", label: "وحدة مباعة" },
  { value: "4+", label: "مشاريع قيد التنفيذ" },
];

export const ABOUT_US_TEAM_SECTION = {
  badge: "فريقنا",
  title: "فريق عملنا المتميز",
  image: "/assets/about-us/whhoo.png",
  imageAlt: "فريق عمل إسكان المنصورة",
  imageWidth: 1216,
  imageHeight: 700,
  paragraphs: [
    "فريق عمل إسكان المنصورة يضم نخبة من الأقسام المحترفة التي تعمل في تناغم لإنتاج منتج عقاري محترف ومتميز.",
    "كما تعمل الشركة على مواكبة التطورات في مجال التكنولوجيا وتقديم حلول برمجية ترفع من كفاءة العمل وتساعد العميل في الحصول على تجربة متميزة.",
  ],
} as const;

export const ABOUT_US_TEAM_DEPARTMENTS: TeamDepartment[] = [
  {
    id: "engineering",
    order: 1,
    title: "المكتب الهندسي",
    description:
      "يتولى إعداد المخططات الهندسية ومراجعة المشروعات وضمان تنفيذ المعايير الهندسية بأعلى مستوى من الجودة.",
    icon: PencilRuler,
  },
  {
    id: "programming",
    order: 2,
    title: "قسم البرمجة",
    description:
      "يقوم بتطوير الأنظمة الرقمية والموقع الإلكتروني وتقديم حلول تقنية تساهم في تحسين تجربة العملاء ورفع كفاءة العمل.",
    icon: Code2,
  },
  {
    id: "accounting",
    order: 3,
    title: "قسم الحسابات",
    description:
      "مسؤول عن إدارة العمليات المالية ومتابعة المدفوعات والتقارير المالية لضمان دقة وسلامة الإجراءات المحاسبية.",
    icon: Calculator,
  },
  {
    id: "sales",
    order: 4,
    title: "قسم المبيعات",
    description:
      "يعمل على مساعدة العملاء في اختيار الوحدات المناسبة وتقديم الاستشارات العقارية ومتابعة عملية البيع حتى إتمامها.",
    icon: Handshake,
  },
  {
    id: "graphic-design",
    order: 5,
    title: "قسم الجرافيك ديزاين",
    description:
      "مسؤول عن الهوية البصرية للشركة وتصميم المواد التسويقية والإعلانية بشكل احترافي يعكس جودة العلامة التجارية.",
    icon: Palette,
  },
  {
    id: "marketing",
    order: 6,
    title: "قسم التسويق",
    description:
      "يضع استراتيجيات التسويق والترويج للمشروعات، ويدير الحملات الإعلانية ومنصات التواصل لزيادة الوعي بالعلامة وجذب العملاء المحتملين.",
    icon: Megaphone,
  },
];
