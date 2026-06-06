"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function ActionButton({
  children,
  variant = "primary",
  className,
  ...props
}: ActionButtonProps) {
  const baseStyle =
    "relative px-6 py-2 lg:py-3 rounded-md text-white font-medium transition-all duration-500 cursor-pointer overflow-hidden text-lg lg:text-[22px]";

  const variantStyle =
    variant === "primary"
      ? "bg-primary hover:shadow-[0_0_15px_rgba(57,158,79,0.5)]"
      : "bg-[#498E56] hover:shadow-[0_0_15px_rgba(25,80,60,0.5)]";

  return (
    <motion.button
      {...props} // أي prop مدعوم من HTMLMotionProps
      className={cn(baseStyle, variantStyle, className)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      suppressHydrationWarning
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-md" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
