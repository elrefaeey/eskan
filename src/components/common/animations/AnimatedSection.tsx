"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  viewportOnce,
} from "@/lib/animations";
import type { Variants } from "framer-motion";
import { useMemo, type ComponentType, type ReactNode, type ElementType } from "react";

type VariantDefaults = {
  x?: number;
  y?: number;
  duration: number;
};

const OVERRIDABLE_VARIANTS = new Set<Variants>([
  fadeUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
]);

const VARIANT_DEFAULTS = new Map<Variants, VariantDefaults>([
  [fadeUp, { y: 20, duration: 0.55 }],
  [fadeIn, { duration: 0.5 }],
  [fadeInLeft, { x: -30, duration: 0.5 }],
  [fadeInRight, { x: 30, duration: 0.5 }],
]);

type MotionComponent = ComponentType<{
  children?: ReactNode;
  className?: string;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewport?: { once: true; amount?: number };
  transition?: { delay?: number };
}>;

function resolveMotionComponent(Tag: ElementType): MotionComponent {
  if (typeof Tag === "string" && Tag in motion) {
    return motion[Tag as keyof typeof motion] as MotionComponent;
  }
  return motion(Tag as "div") as MotionComponent;
}

function buildResolvedVariants(
  baseVariant: Variants,
  opts: { x?: number; y?: number; duration?: number; delay?: number }
): Variants {
  const defaults = VARIANT_DEFAULTS.get(baseVariant) ?? { y: 20, duration: 0.55 };
  const resolvedX = opts.x ?? defaults.x;
  const resolvedY = opts.y ?? defaults.y;
  const resolvedDuration = opts.duration ?? defaults.duration;
  const resolvedDelay = opts.delay ?? 0;

  if (baseVariant === fadeIn) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: resolvedDuration, ease: "easeOut", delay: resolvedDelay },
      },
    };
  }

  const hidden: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  if (resolvedX !== undefined) hidden.x = resolvedX;
  if (resolvedY !== undefined) hidden.y = resolvedY;

  const visible: {
    opacity: number;
    x?: number;
    y?: number;
    transition: { duration: number; ease: "easeOut"; delay: number };
  } = {
    opacity: 1,
    transition: { duration: resolvedDuration, ease: "easeOut", delay: resolvedDelay },
  };
  if (resolvedX !== undefined) visible.x = 0;
  if (resolvedY !== undefined) visible.y = 0;

  return { hidden, visible };
}

function needsCustomVariants(
  baseVariant: Variants,
  opts: { x?: number; y?: number; duration?: number; delay?: number }
): boolean {
  if (!OVERRIDABLE_VARIANTS.has(baseVariant)) return false;

  const defaults = VARIANT_DEFAULTS.get(baseVariant) ?? { y: 20, duration: 0.55 };
  return (
    (opts.x !== undefined && opts.x !== defaults.x) ||
    (opts.y !== undefined && opts.y !== defaults.y) ||
    (opts.duration !== undefined && opts.duration !== defaults.duration) ||
    (opts.delay !== undefined && opts.delay !== 0)
  );
}

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  amount?: number;
  as?: ElementType;
  variant?: Variants;
}

/**
 * AnimatedSection — Primary wrapper لـ initial + whileInView + viewport.
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  duration,
  x,
  y,
  amount,
  as: Tag = "div",
  variant: baseVariant = fadeUp,
}: AnimatedSectionProps) {
  const MotionTag = useMemo(() => resolveMotionComponent(Tag), [Tag]);
  const viewport = amount !== undefined ? { ...viewportOnce, amount } : viewportOnce;

  const isOverridable = OVERRIDABLE_VARIANTS.has(baseVariant);
  const useCustom = isOverridable && needsCustomVariants(baseVariant, { x, y, duration, delay });
  const variants = useCustom
    ? buildResolvedVariants(baseVariant, { x, y, duration, delay })
    : baseVariant;

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={useCustom ? undefined : delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
