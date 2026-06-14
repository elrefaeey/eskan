"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { progressBarTransition } from "@/lib/animations";
import {
  Hammer,
  Building2,
  Layers,
  PaintBucket,
  Fence,
  Trees,
  CheckCircle2,
  Clock,
  Circle,
} from "lucide-react";

interface Phase {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
  status: "done" | "active" | "pending";
  percent: number;
  date: string;
}

const phases: Phase[] = [
  {
    id: 1,
    title: "الأساسات",
    desc: "تم الانتهاء من أعمال الحفر والأساسات بالكامل لجميع المراحل",
    icon: Hammer,
    status: "done",
    percent: 100,
    date: "مارس 2024",
  },
  {
    id: 2,
    title: "الهيكل الإنشائي",
    desc: "تم رفع الهيكل الخرساني لـ 8 عمارات من أصل 14",
    icon: Building2,
    status: "done",
    percent: 100,
    date: "أغسطس 2024",
  },
  {
    id: 3,
    title: "المباني",
    desc: "جاري تنفيذ أعمال البناء والطوب للمرحلة الثانية والثالثة",
    icon: Layers,
    status: "active",
    percent: 60,
    date: "جاري التنفيذ",
  },
  {
    id: 4,
    title: "التشطيبات",
    desc: "لم تبدأ بعد — مخططة للمرحلة الثانية من 2025",
    icon: PaintBucket,
    status: "pending",
    percent: 0,
    date: "2025",
  },
  {
    id: 5,
    title: "الواجهات الخارجية",
    desc: "لم تبدأ بعد — ستبدأ بعد الانتهاء من التشطيبات",
    icon: Fence,
    status: "pending",
    percent: 0,
    date: "2025",
  },
  {
    id: 6,
    title: "اللاندسكيب",
    desc: "المرحلة النهائية — تشمل الحدائق والممرات والإضاءة الخارجية",
    icon: Trees,
    status: "pending",
    percent: 0,
    date: "2026",
  },
];

const OVERALL = 52;

function CircleProgress({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (count / 100) * circ;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += 1;
      setCount(start);
      if (start < value) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="relative w-36 h-36 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1F503B" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-primary font-extrabold text-3xl leading-none">{count}%</span>
        <span className="text-gray-400 text-xs mt-1">إنجاز</span>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Phase["status"] }) {
  if (status === "done") return <CheckCircle2 className="w-4 h-4 text-white" />;
  if (status === "active") return <Clock className="w-4 h-4 text-white" />;
  return <Circle className="w-4 h-4 text-gray-400" />;
}

export default function ConstructionProgress() {
  const [tooltip, setTooltip] = useState<number | null>(null);
  const doneCount = phases.filter((p) => p.status === "done").length;
  const progressWidth = `${(doneCount / (phases.length - 1)) * 100}%`;

  return (
    <AnimatedSection
      as="section"
      y={24}
      className="mb-12 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden [direction:rtl]"
    >
      {/* Header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-extrabold text-xl md:text-2xl">تقدم الإنشاءات</h2>
          <p className="text-white/60 text-sm mt-0.5">آخر تحديث: مايو 2025</p>
        </div>
        <span className="bg-white/10 text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/20">
          المرحلة الحالية: المباني
        </span>
      </div>

      <div className="p-6 md:p-8">
        {/* Overall progress */}
        <div className="flex items-center gap-6 mb-10 flex-wrap">
          <CircleProgress value={OVERALL} />
          <div className="flex-1 min-w-[200px]">
            <p className="text-gray-500 text-sm mb-1">نسبة الإنجاز الكلية للمشروع</p>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${OVERALL}%` }}
                viewport={{ once: true }}
                transition={progressBarTransition}
                className="h-full rounded-full bg-gradient-to-l from-green-400 to-primary"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
            <p className="text-[#333] text-sm mt-3 leading-relaxed">
              تم الانتهاء من <span className="text-primary font-bold">{doneCount} مراحل</span> من أصل {phases.length} —
              المشروع يسير وفق الجدول الزمني المحدد.
            </p>
          </div>
        </div>

        {/* Timeline — desktop */}
        <div className="hidden md:block relative">
          {/* خط الـ timeline */}
          <div className="absolute top-6 right-6 left-6 h-1 bg-gray-200 rounded-full z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: progressWidth }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-l from-green-400 to-primary"
            />
          </div>

          {/* المحطات */}
          <div className="relative z-10 grid grid-cols-6 gap-2">
            {phases.map((phase) => {
              const Icon = phase.icon;
              const isActive = phase.status === "active";
              const isDone = phase.status === "done";

              return (
                <div
                  key={phase.id}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onMouseEnter={() => setTooltip(phase.id)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* النقطة */}
                  <div className="relative">
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-60" />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 ${
                        isDone
                          ? "bg-primary border-primary"
                          : isActive
                          ? "bg-yellow-400 border-yellow-400"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isDone || isActive ? "text-white" : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* الاسم */}
                  <span
                    className={`text-xs font-semibold text-center leading-tight ${
                      isDone ? "text-primary" : isActive ? "text-yellow-600" : "text-gray-400"
                    }`}
                  >
                    {phase.title}
                  </span>

                  {/* Tooltip */}
                  {tooltip === phase.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-16 z-20 bg-[#1a1a1a] text-white text-xs rounded-xl px-3 py-2 w-40 shadow-xl text-center"
                    >
                      <p className="font-bold mb-1">{phase.title}</p>
                      <p className="text-white/70 leading-relaxed">{phase.desc}</p>
                      <p className="text-green-400 mt-1 font-semibold">{phase.date}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline — mobile vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            const isDone = phase.status === "done";
            const isActive = phase.status === "active";
            const isLast = i === phases.length - 1;

            return (
              <div key={phase.id} className="flex gap-4">
                {/* العمود الأيمن */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                      isDone
                        ? "bg-primary border-primary"
                        : isActive
                        ? "bg-yellow-400 border-yellow-400"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isDone || isActive ? "text-white" : "text-gray-300"}`}
                    />
                  </div>
                  {!isLast && (
                    <div
                      className={`w-0.5 flex-1 mt-1 ${isDone ? "bg-primary" : "bg-gray-200"}`}
                      style={{ minHeight: 32 }}
                    />
                  )}
                </div>

                {/* المحتوى */}
                <div className="pb-6 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-bold text-sm ${
                        isDone ? "text-primary" : isActive ? "text-yellow-600" : "text-gray-400"
                      }`}
                    >
                      {phase.title}
                    </span>
                    {isActive && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                        جاري
                      </span>
                    )}
                    {isDone && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">
                        مكتمل
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{phase.desc}</p>
                  <p className={`text-xs mt-1 font-semibold ${isDone ? "text-primary" : isActive ? "text-yellow-600" : "text-gray-400"}`}>
                    {phase.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
