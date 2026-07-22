import { Award, Layers, Store, TrendingUp } from "lucide-react";
import type { StatItem } from "@/components/shared";
import type { LocationContainerVariant } from "@/components/shared/LocationSection/types";

export const GALLERY_GROUND_UNITS_SECTION_ID = "gallery-ground-units";

export const GALLERY_GROUND_FEATURES_TITLE = "ما يميز الاستثمار في أرض المعارض";

export const GALLERY_GROUND_FEATURES = [
  "أول مجمع تجاري متخصص في الدلتا في بيع وتجارة مواد البناء، التشطيب، الديكور، الأثاث، والفرش المنزلي",
  "مجمع تجاري مرخّص بالكامل وتحت الإنشاء، مما يمنح ليك أمان وثقة في التنفيذ",
  "موقع استراتيجي سهل الوصول، دقيقة واحدة فقط من شارع قناة السويس، 10 دقائق من جامعة المنصورة، 5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية",
  "أعلى عائد استثماري يتخطى 40% خلال سنة و100% خلال فترة التسليم",
  "أنت بتتملك في مشروع بيستهدف 20 مليون مواطن من أهالي الدلتا",
] as const;

export const GALLERY_GROUND_STATS: StatItem[] = [
  { label: "الأول من نوعه في الدلتا", value: "#1", icon: Award },
  { label: "ألف متر مربع", value: "15", icon: Layers },
  { label: "طوابق تجارية", value: "6", icon: Store },
  { label: "عائد استثماري خلال سنة", value: "40%+", icon: TrendingUp },
];

export const GALLERY_GROUND_LOCATIONS = [
  { value: "ابراج المدينة 1", label: "ابراج المدينة 1" },
  { value: "ابراج المدينة 2", label: "ابراج المدينة 2" },
] as const;

export const GALLERY_GROUND_LOCATION = {
  embedUrl: "https://www.google.com/maps?q=31.050302,31.410547&output=embed&t=k",
  title: "موقع أرض المعارض",
  description:
    "موقع استراتيجي سهل الوصول، دقيقة واحدة فقط من شارع قناة السويس، 10 دقائق من جامعة المنصورة، 5 دقائق من شارع الجيش، مع قرب مباشر من جميع الخدمات والمرافق الحيوية. يقع المشروع في الاتجاه المقابل لـ كوبري جديلة مما يمنحه سهولة وصول استثنائية من مختلف أنحاء المنصورة والدلتا.",
  externalMapHref: "https://maps.app.goo.gl/unEGE1Y6QCEZP2wM6",
} as const;

export const GALLERY_GROUND_LOCATION_SECTION_DEFAULTS = {
  mediaPosition: "end",
  containerVariant: "card-flat" satisfies LocationContainerVariant,
  gridClassName: "gap-6",
  mediaSlotClassName: "rounded-xl overflow-hidden",
  contentSlotClassName: "gap-3 p-4 md:p-8",
} as const;

export const GALLERY_GROUND_UNITS_TITLE = "احجز الآن";
