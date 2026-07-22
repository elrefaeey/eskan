import type { JobSpecialty } from "../types";

export const JOBS_HERO = {
  staticImage: "/assets/workwithus/download.jpg",
  staticImageAlt: "اعمل معنا",
  badge: "فرص العمل",
  title: "إنضم لفريق العمل",
  description:
    "تسعي دائما اسكان المنصورة العقارية الي ضم الاكفاء والمبدعين وشباب والخريجين في مختلف التخصصات الي منظومة عملها، ولذلك نحن حريصين علي ان تكون احد افراد فريق عملنا ان كنت من هؤلاء المتميزين والموهوبين في مجال تخصصك، فلا تتردد في ارسال سيرتك الذاتية و نبذة عن اعمالك، من خلال التسجيل.",
} as const;

export const JOBS_SPECIALTY_HEADING = "حدد تخصصك";

export const JOBS_REQUIREMENTS_HEADING = "متطلبات الوظيفة";
export const JOBS_REGISTER_HEADING = "تسجيل البيانات";
export const JOBS_EMPTY_MESSAGE = "لا توجد بيانات لهذه الوظيفة.";
export const JOBS_REQUIREMENTS_SKELETON_ROWS = 5;

export const GRAPHIC_DESIGN_JOB_TITLE = "جرافيك ديزاين";
export const DIGITAL_MARKETING_JOB_TITLE = "التسويق الالكتروني";

export const JOBS: JobSpecialty[] = [
  { id: 4, jobTitl: "المبيعات" },
  { id: 1, jobTitl: GRAPHIC_DESIGN_JOB_TITLE },
  { id: 2, jobTitl: "هندسة" },
  { id: 3, jobTitl: "محاسبة التكاليف" },
  { id: 6, jobTitl: "علاقات عامة" },
  { id: 7, jobTitl: "الفيديو والمونتاج" },
  { id: 8, jobTitl: "تطبيقات الموبايل" },
  { id: 5, jobTitl: DIGITAL_MARKETING_JOB_TITLE },
  { id: 10, jobTitl: "التسويق الخارجي" },
  { id: 11, jobTitl: "كاتب محتوى" },
  { id: 12, jobTitl: "محامى" },
  { id: 13, jobTitl: "سكرتارية" },
  { id: 9, jobTitl: "مذيعين ومقدمين برامج عقارية" },
];
