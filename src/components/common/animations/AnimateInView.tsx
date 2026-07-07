"use client";

import AnimatedSection from "./AnimatedSection";
import type { AnimatedSectionProps } from "./AnimatedSection";

type AnimateInViewProps = Omit<AnimatedSectionProps, "duration" | "variant"> & {
  /** مدة الأنيميشن (افتراضي: 0.5) */
  duration?: number;
};

/**
 * AnimateInView — alias لـ AnimatedSection بإعدادات fade-up الافتراضية.
 * duration 0.5, y قابل للتخصيص.
 */
export default function AnimateInView({
  duration = 0.5,
  y = 20,
  ...props
}: AnimateInViewProps) {
  return <AnimatedSection duration={duration} y={y} {...props} />;
}
