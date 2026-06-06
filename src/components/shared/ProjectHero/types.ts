import type React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

/** لون الـ badge أعلى العنوان */
export type HeroBadgeColor = "primary" | "purple" | "teal" | "red" | "custom";

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

/** Props الكاملة لـ ProjectHero */
export interface ProjectHeroProps {
  // ─── Loading State ───────────────────────────────
  /** حالة التحميل — يعرض skeleton loader داخلياً */
  isLoading?: boolean;

  // ─── Visual ──────────────────────────────────────
  /** نوع العنصر المرئي */
  visualType?: HeroVisualType;
  /** مصفوفة الصور — مطلوبة عند visualType === 'slider' */
  images?: string[];
  /** مسار صورة ثابتة — مطلوبة عند visualType === 'static' */
  staticImage?: string;
  /** نص alt للصورة الثابتة */
  staticImageAlt?: string;
  /** كلاس CSS للـ gradient — يُستخدم عند visualType === 'gradient' */
  gradientClassName?: string;
  /** محتوى مخصص يُعرض فوق الـ gradient */
  gradientContent?: React.ReactNode;

  // ─── Badge ───────────────────────────────────────
  badge?: {
    text: string;
    /** لون محدد مسبقاً */
    color?: HeroBadgeColor;
    /** كلاس CSS مخصص يتجاوز color (للألوان غير القياسية مثل #4A36A2) */
    className?: string;
  };

  // ─── Content ─────────────────────────────────────
  title: string;
  /** نص فرعي أسفل العنوان (اسم المشروع الأصلي) */
  subtitle?: string;
  location?: string;
  description: string | React.ReactNode;
  /** نص مميّز يُعرض أسفل الوصف (مثل "امتلك الآن…") */
  highlightText?: string;

  // ─── Video ───────────────────────────────────────
  /** معرف فيديو YouTube — إذا مُرر يظهر زر الفيديو تلقائياً */
  videoId?: string;
  /** نص زر الفيديو */
  videoButtonText?: string;

  // ─── CTA Buttons ─────────────────────────────────
  /** أزرار CTA تحت الوصف — يمكن تمرير زر أو أكثر */
  ctaButtons?: HeroCtaButton[];

  // ─── Layout ──────────────────────────────────────
  /** اتجاه RTL (افتراضي: true) */
  dir?: "rtl" | "ltr";
  /** كلاس CSS إضافي على الـ section الكاملة */
  className?: string;
  /** كلاس CSS على حاوية النص */
  contentClassName?: string;
  /** كلاس CSS على wrapper الجانب المرئي — يُستخدم لتخصيص الارتفاع */
  mediaClassName?: string;
}
