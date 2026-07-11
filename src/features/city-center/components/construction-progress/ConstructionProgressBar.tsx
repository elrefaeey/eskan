"use client";

import { motion } from "framer-motion";
import { constructionProgressWidthVariant } from "@/lib/animations";
import { CITY_CENTER_CONSTRUCTION_PROGRESS } from "../../constants/construction";
import { useAnimatedPercentage } from "./useAnimatedPercentage";

export function ConstructionProgressBar() {
  const { ref, isInView, display } = useAnimatedPercentage(CITY_CENTER_CONSTRUCTION_PROGRESS);
  const widthVariant = constructionProgressWidthVariant(`${CITY_CENTER_CONSTRUCTION_PROGRESS}%`);

  return (
    <div ref={ref} className="relative w-full h-4">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          variants={widthVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute right-0 top-0 h-full rounded-full bg-gradient-to-l from-primary to-[#4a9e6e]"
        />
      </div>
      {display > 0 && (
        <span
          className="absolute top-1/2 z-10 -translate-y-1/2 translate-x-1/2 whitespace-nowrap rounded border border-primary/20 bg-white px-1 py-px text-[9px] font-bold leading-none text-primary shadow-sm"
          style={{ right: `${display}%` }}
        >
          {display}%
        </span>
      )}
    </div>
  );
}
