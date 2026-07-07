import type React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

/** لون الـ badge أعلى العنوان */
export type HeroBadgeColor = "primary" | "purple" | "teal" | "red" | "custom";

/** لون accent للعنوان والأزرار والفواصل داخل الـ Hero */
export type HeroAccentScheme = "primary" | "purple";

/** نوع الجانب المرئي في الـ Hero */
export type HeroVisualType =
  | "slider"    // Swiper slider من مصفوفة صور
  | "static"    // صورة ثابتة واحدة
  | "gradient"; // خلفية gradient بدون صورة (للصفحات التي لا تملك صوراً)

/** زر CTA */
export interface HeroCtaButton {
  text: string;
  /** أيقونة اختيارية من lucide-react أو أي مكون */
  icon?: React.ReactNode;
  /** يُستخدم عندما يكون الزر scroll داخل الصفحة */
  scrollToId?: string;
  /** يُستخدم عندما يكون الزر navigate لرابط خارجي */
  href?: string;
  /** callback مخصص */
  onClick?: () => void;
  /** تمكين/تعطيل الزر */
  disabled?: boolean;
  /** variant مرئي للزر */
  variant?: "primary" | "outline";
}

/** حقول مشتركة بين جميع أنواع الـ Hero */
type ProjectHeroBase = {
  /** حالة التحميل — يعرض skeleton loader داخلياً */
  isLoading?: boolean;
  badge?: {
    text: string;
    color?: HeroBadgeColor;
    className?: string;
  };
  title: string;
  subtitle?: string;
  location?: string;
  description: string | React.ReactNode;
  highlightText?: string;
  videoId?: string;
  videoButtonText?: string;
  ctaButtons?: HeroCtaButton[];
  /** لون accent — الافتراضي primary (أخضر) */
  accentScheme?: HeroAccentScheme;
  dir?: "rtl" | "ltr";
  className?: string;
  contentClassName?: string;
  mediaClassName?: string;
};

export type ProjectHeroSliderProps = ProjectHeroBase & {
  visualType: "slider";
  images: string[];
};

export type ProjectHeroStaticProps = ProjectHeroBase & {
  visualType: "static";
  staticImage: string;
  staticImageAlt: string;
};

export type ProjectHeroGradientProps = ProjectHeroBase & {
  visualType: "gradient";
  gradientClassName?: string;
  gradientContent?: React.ReactNode;
};

/** Props الكاملة لـ ProjectHero — Discriminated Union على visualType */
export type ProjectHeroProps =
  | ProjectHeroSliderProps
  | ProjectHeroStaticProps
  | ProjectHeroGradientProps;
