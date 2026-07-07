"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";

// ─── Types ───────────────────────────────────────────────────────────────────

/** عنصر ميزة / highlight واحد */
export interface HighlightItem {
  /** أيقونة من lucide-react */
  icon: LucideIcon;
  /** عنوان الميزة */
  title: string;
  /** وصف مختصر */
  desc: string;
}

/** Props الكاملة لـ FeaturesHighlights */
export interface FeaturesHighlightsProps {
  /** مصفوفة الميزات */
  highlights: HighlightItem[];
  /**
   * عدد الأعمدة:
   * - 2: مناسب لصفحات بمساحة أقل
   * - 3: النمط الأكثر استخداماً (bazar, clothes, electronics, café, istanbul)
   */
  cols?: 2 | 3;
  /** كلاس CSS إضافي على الحاوية */
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * FeaturesHighlights — شبكة بطاقات مميزات المشروع.
 *
 * مستخلصة من: bazar-level, clothes-level, electronics-level,
 *             elbadry-cafe-restaurants, elbadry-souq-istanbul
 *
 * كل بطاقة تحتوي على: أيقونة + عنوان + وصف
 * الألوان ثابتة (primary) لأن جميع الصفحات تستخدم نفس اللون.
 *
 * الاستخدام:
 * ```tsx
 * <FeaturesHighlights
 *   highlights={[
 *     { icon: Store, title: "تأجير يومي", desc: "..." },
 *     { icon: TrendingUp, title: "أعلى عائد", desc: "..." },
 *   ]}
 *   cols={3}
 * />
 * ```
 */
export default function FeaturesHighlights({
  highlights,
  cols = 3,
  className,
}: FeaturesHighlightsProps) {
  return (
    <AnimatedSection
      duration={0.4}
      className={cn(
        "grid gap-4 mb-10",
        cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3",
        className,
      )}
    >
      {highlights.map((h) => (
        <div
          key={h.title}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-4"
        >
          {/* حاوية الأيقونة */}
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <h.icon className="w-5 h-5 text-primary" />
          </div>

          {/* النص */}
          <div>
            <p className="font-extrabold text-primary text-base">{h.title}</p>
            <p className="text-[#555] text-body-sm leading-relaxed mt-1">{h.desc}</p>
          </div>
        </div>
      ))}
    </AnimatedSection>
  );
}
