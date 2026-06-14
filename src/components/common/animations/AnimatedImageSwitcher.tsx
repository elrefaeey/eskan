"use client";

import { motion, AnimatePresence } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AnimatedImageSwitcherProps {
  /** مفتاح فريد لكل صورة — يُمرَّر لـ AnimatePresence */
  imageKey: string | number;
  children: ReactNode;
  className?: string;
  mode?: "wait" | "sync" | "popLayout";
}

/**
 * AnimatedImageSwitcher — wrapper لـ AnimatePresence + scaleIn.
 * يُستخدم في UnitCard وبطاقات الوحدات الأخرى.
 */
export default function AnimatedImageSwitcher({
  imageKey,
  children,
  className,
  mode = "wait",
}: AnimatedImageSwitcherProps) {
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={imageKey}
        variants={scaleIn}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
