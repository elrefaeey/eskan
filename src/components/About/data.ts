import {
  Calculator,
  Code2,
  Handshake,
  Megaphone,
  Palette,
  PencilRuler,
  type LucideIcon,
} from "lucide-react";

export interface TeamDepartment {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

export const teamSectionContent = {
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
};

export const teamDepartments: TeamDepartment[] = [
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
