"use client";

import { motion, useInView, animate } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { progressBarTransition } from "@/lib/animations";
import { Building2, HardHat, Layers, PaintBucket, DoorOpen, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const phases = [
  { label: "التراخيص", icon: DoorOpen, done: true },
  { label: "الأساسات", icon: Layers, done: true },
  { label: "الهيكل الإنشائي", icon: Building2, done: true },
  { label: "المباني", icon: HardHat, done: true },
  { label: "التشطيبات", icon: PaintBucket, active: true },
  { label: "الاندسكيب", icon: Wrench, done: false },
];

const TOTAL_STAGES = 6;
const COMPLETED_STAGES = 5.5; // 5 مراحل مكتملة + نصف التشطيبات
const TOTAL_PROGRESS = Math.round((COMPLETED_STAGES / TOTAL_STAGES) * 100);
const TIMELINE_PROGRESS = `${(COMPLETED_STAGES / TOTAL_STAGES) * 100}%`;

// SVG circular progress
const radius = 54;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = circumference - (TOTAL_PROGRESS / 100) * circumference;

function ProgressBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, TOTAL_PROGRESS, {
        duration: 1.4,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-full h-4">
      <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${TOTAL_PROGRESS}%` } : { width: 0 }}
          transition={progressBarTransition}
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

function CircularProgress() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, TOTAL_PROGRESS, {
        duration: 1.4,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative w-32 h-32 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* track */}
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        {/* progress */}
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="url(#circleGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.4, ease: "easeOut" }}
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

export default function ConstructionProgress() {
  return (
    <AnimatedSection duration={0.6} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm [direction:rtl]">
      {/* Header */}
      <div className="px-4 md:px-8 py-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-primary font-extrabold text-xl md:text-2xl">تقدم الإنشاءات</h3>
          <p className="text-gray-400 text-xs mt-1">آخر تحديث: مايو 2026</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 text-primary text-sm font-bold px-4 py-1.5 rounded-full">
          المرحلة الحالية: التشطيبات
        </div>
      </div>

      {/* Progress bar + circle */}
      <div className="px-4 md:px-8 pb-6">
        <div className="flex items-center gap-6 flex-row-reverse">
          {/* bar side */}
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-gray-400 text-xs">0%</span>
              <span className="text-gray-400 text-xs">100%</span>
            </div>
            <ProgressBar />
            <p className="text-gray-500 text-body-sm mt-3">
              تم الانتهاء من <span className="text-primary font-bold">5 مراحل ونصف</span> من أصل 6 — نصف أعمال التشطيبات مكتمل والمشروع يسير وفق الجدول الزمني المحدد.
            </p>
          </div>
          {/* circular progress */}
          <CircularProgress />
        </div>
      </div>

      {/* Phases timeline */}
      <div className="px-4 md:px-8 pb-6">
        <div className="relative flex items-center justify-between">
          <div className="absolute top-5 right-5 left-5 h-0.5 bg-gray-200 z-0" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: TIMELINE_PROGRESS }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-5 right-5 h-0.5 bg-primary z-0"
          />
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const isDone = phase.done;
            const isActive = phase.active;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isDone ? "bg-primary border-primary" : isActive ? "bg-[#DE9A47] border-[#DE9A47]" : "bg-gray-100 border-gray-300"}`}>
                  <Icon className={`w-4 h-4 ${isDone || isActive ? "text-white" : "text-gray-400"}`} />
                </div>
                <span className={`text-[10px] md:text-xs text-center leading-tight
                  ${isDone ? "text-primary font-bold" : isActive ? "text-[#DE9A47] font-bold" : "text-gray-400"}`}>
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
