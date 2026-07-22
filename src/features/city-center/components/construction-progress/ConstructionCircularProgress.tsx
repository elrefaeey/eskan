"use client";

import { motion } from "framer-motion";
import { constructionCircleStrokeTransition } from "@/lib/animations";
import { CITY_CENTER_CONSTRUCTION_PROGRESS } from "../../constants/construction";
import { useAnimatedPercentage } from "./useAnimatedPercentage";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_DASHOFFSET =
  CIRCUMFERENCE - (CITY_CENTER_CONSTRUCTION_PROGRESS / 100) * CIRCUMFERENCE;

export function ConstructionCircularProgress() {
  const { ref, isInView, display } = useAnimatedPercentage(CITY_CENTER_CONSTRUCTION_PROGRESS);

  return (
    <div ref={ref} className="relative w-32 h-32 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="url(#circleGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={isInView ? { strokeDashoffset: STROKE_DASHOFFSET } : {}}
          transition={constructionCircleStrokeTransition}
        />
        <defs>
          <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f503b" />
            <stop offset="100%" stopColor="#4a9e6e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-0.5 text-center">
          <span className="text-gray-400 text-[10px] leading-none">تم التنفيذ</span>
          <motion.span className="text-primary font-extrabold text-2xl leading-none tabular-nums">
            {display}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}
