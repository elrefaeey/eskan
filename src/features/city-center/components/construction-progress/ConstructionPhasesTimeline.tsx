"use client";

import { motion } from "framer-motion";
import { constructionTimelineWidthVariant, viewportOnce } from "@/lib/animations";
import {
  CITY_CENTER_CONSTRUCTION_PHASES,
  CITY_CENTER_CONSTRUCTION_TIMELINE_PROGRESS,
} from "../../constants/construction";

const timelineWidthVariant = constructionTimelineWidthVariant(
  CITY_CENTER_CONSTRUCTION_TIMELINE_PROGRESS,
);

export function ConstructionPhasesTimeline() {
  return (
    <div className="px-4 md:px-8 pb-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-5 right-5 left-5 h-0.5 bg-gray-200 z-0" />
        <motion.div
          variants={timelineWidthVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="absolute top-5 right-5 h-0.5 bg-primary z-0"
        />
        {CITY_CENTER_CONSTRUCTION_PHASES.map((phase) => {
          const Icon = phase.icon;
          const isDone = phase.done;
          const isActive = phase.active;

          return (
            <div key={phase.label} className="relative z-10 flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isDone ? "bg-primary border-primary" : isActive ? "bg-[#DE9A47] border-[#DE9A47]" : "bg-gray-100 border-gray-300"}`}
              >
                <Icon
                  className={`w-4 h-4 ${isDone || isActive ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <span
                className={`text-[10px] md:text-xs text-center leading-tight
                  ${isDone ? "text-primary font-bold" : isActive ? "text-[#DE9A47] font-bold" : "text-gray-400"}`}
              >
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
