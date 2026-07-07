"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "ghost";
  ariaLabel?: string;
}

export function IconButton({
  icon,
  onClick,
  className,
  size = "md",
  variant = "default",
  ariaLabel,
}: IconButtonProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "sm:h-12 sm:w-12 w-[42] h-[42]",
  };

  const baseColor =
    variant === "secondary"
      ? "bg-[#DFDFDF] text-[#285240] hover:bg-[#cfcfcf]"
      : variant === "ghost"
      ? "bg-transparent text-[#285240] hover:bg-[#285240]/10"
      : "bg-[#285240] text-white hover:bg-[#326c50]";

  return (
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.08 }}>
      <Button
        size="icon"
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(
          "rounded-lg shadow-sm transition-all duration-300 !p-1",
          baseColor,
          sizeClasses[size],
          className
        )}
      >
        {icon}
      </Button>
    </motion.div>
  );
}
