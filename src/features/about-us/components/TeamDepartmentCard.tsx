"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  aboutUsDepartmentCardHover,
  aboutUsDepartmentCardHoverTransition,
} from "@/features/about-us/animations";
import { cn } from "@/lib/utils";

export interface TeamDepartmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  order?: number;
  className?: string;
}

export default function TeamDepartmentCard({
  title,
  description,
  icon: Icon,
  image,
  order,
  className,
}: TeamDepartmentCardProps) {
  return (
    <motion.article
      whileHover={aboutUsDepartmentCardHover}
      transition={aboutUsDepartmentCardHoverTransition}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white",
        "shadow-sm transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/35 hover:shadow-[0_12px_32px_rgba(31,80,59,0.12)]",
        className,
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-l from-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {image && (
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 text-right md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10 transition-colors duration-300 group-hover:bg-primary group-hover:ring-primary/20">
            <Icon
              className="size-6 text-primary transition-colors duration-300 group-hover:text-white"
              aria-hidden
            />
          </div>

          {order !== undefined && (
            <span className="text-xs font-bold tabular-nums text-primary/40">
              {String(order).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg font-extrabold text-[#1a1a1a] md:text-xl">{title}</h3>
          <p className="text-body-sm leading-relaxed text-[#555] md:text-base">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
