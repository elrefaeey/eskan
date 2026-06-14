"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collapseVariant } from "@/lib/animations";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { CheckCircle2, Clock, Circle, ChevronDown } from "lucide-react";

type Status = "done" | "active" | "pending";

interface SubPhase {
  name: string;
  status: Status;
}

interface Phase {
  name: string;
  status: Status;
  sub?: SubPhase[];
}

const phases: Phase[] = [
  { name: "الأساسات", status: "done" },
  { name: "الهيكل الإنشائي", status: "done",
    sub: [
      { name: "الدور الأرضي", status: "done" },
      { name: "الدور الأول", status: "active" },
      { name: "الدور الثاني", status: "pending" },
      { name: "الدور الثالث", status: "pending" },
      { name: "الدور الرابع", status: "pending" },
    ],
  },
  { name: "الواجهات", status: "active" },
  { name: "الداخلية", status: "active" },
  { name: "التسليم", status: "pending" },
];

const totalProgress = 81;

const stats = [
  { label: "مراحل مكتملة", value: "2" },
  { label: "مراحل جارية", value: "2" },
  { label: "دور مكتمل", value: "18" },
  { label: "موعد التسليم", value: "2025" },
];

const statusConfig: Record<Status, { color: string; bg: string; border: string; label: string }> = {
  done:    { color: "text-primary",     bg: "bg-primary",      border: "border-primary",     label: "مكتمل" },
  active:  { color: "text-amber-500",   bg: "bg-amber-500",    border: "border-amber-500",   label: "قيد التنفيذ" },
  pending: { color: "text-gray-400",    bg: "bg-gray-300",     border: "border-gray-300",    label: "لم يبدأ" },
};

const StatusIcon = ({ status, size = 5 }: { status: Status; size?: number }) => {
  const s = `w-${size} h-${size}`;
  if (status === "done")    return <CheckCircle2 className={`${s} text-primary`} />;
  if (status === "active")  return <Clock className={`${s} text-amber-500`} />;
  return <Circle className={`${s} text-gray-300`} />;
};

export default function ProjectProgress() {
  const [activePhase, setActivePhase] = useState<number | null>(1);

  return (
    <AnimatedSection
      y={24}
      className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm [direction:rtl]"
    >
      {/* ── Section Header ── */}
      <div className="text-center px-6 pt-8 pb-6 border-b border-gray-100">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
          مراحل التنفيذ
        </span>
        <h2 className="text-gray-800 text-2xl md:text-3xl font-extrabold mb-2">
          حالة الإنجاز التفصيلية
        </h2>
        <p className="text-gray-400 text-sm">
          تابع كل مرحلة من مراحل إنشاء المشروع — شفافية كاملة وإنجاز حقيقي
        </p>
        <div className="w-10 h-1 bg-primary rounded mx-auto mt-3" />
      </div>

      {/* ── Overall Progress Card ── */}
      <div className="p-4 md:p-6">
        <div className="bg-primary rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-5">

          {/* دائرة النسبة */}
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <motion.circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - totalProgress / 100) }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-extrabold text-lg leading-none">{totalProgress}%</span>
              <span className="text-white/60 text-[10px]">إنجاز</span>
            </div>
          </div>

          {/* النص والبار */}
          <div className="flex-1 w-full">
            <h3 className="text-white font-extrabold text-lg mb-1">الإنجاز الإجمالي للمشروع</h3>
            <p className="text-white/60 text-sm mb-3">
              المشروع في مراحله النهائية — الاستلام المتوقع خلال أشهر قليلة
            </p>
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${totalProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 shrink-0">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl px-3 py-2 text-center">
                <p className="text-white font-extrabold text-base leading-none">{s.value}</p>
                <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="px-4 md:px-8 pb-2">
        {/* الخط الأفقي مع النقاط */}
        <div className="relative flex items-center justify-between mb-2">
          {/* خط الربط */}
          <div className="absolute top-5 right-5 left-5 h-0.5 bg-gray-200 z-0" />
          {/* خط الإنجاز */}
          <motion.div
            className="absolute top-5 right-5 h-0.5 bg-primary z-0"
            initial={{ width: 0 }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {phases.map((phase, i) => {
            const cfg = statusConfig[phase.status];
            const isActive = activePhase === i;
            return (
              <button
                key={i}
                onClick={() => setActivePhase(isActive ? null : i)}
                className="relative z-10 flex flex-col items-center gap-1.5 group"
              >
                {/* الدائرة */}
                <div className={`w-10 h-10 rounded-full border-2 ${cfg.border} bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${isActive ? "ring-2 ring-offset-2 ring-primary/30" : ""}`}>
                  {phase.status === "done" && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                  {phase.status === "active" && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-3 h-3 rounded-full bg-amber-500"
                    />
                  )}
                  {phase.status === "pending" && (
                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                  )}
                </div>

                {/* الاسم والحالة */}
                <span className="text-gray-700 font-bold text-xs md:text-sm text-center leading-tight">
                  {phase.name}
                </span>
                <span className={`text-[10px] font-medium ${cfg.color}`}>
                  {cfg.label}
                </span>
                {phase.sub && (
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isActive ? "rotate-180" : ""}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sub Phases ── */}
      <AnimatePresence>
        {activePhase !== null && phases[activePhase]?.sub && (
          <motion.div
            variants={collapseVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="mx-4 md:mx-8 mb-6 bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <p className="text-gray-500 text-xs font-semibold mb-3 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                تفاصيل مرحلة {phases[activePhase].name}
              </p>
              <div className="flex flex-col gap-2">
                {phases[activePhase].sub!.map((sub, j) => {
                  const cfg = statusConfig[sub.status];
                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.06 }}
                      className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <StatusIcon status={sub.status} size={4} />
                        <span className="text-gray-700 text-sm font-medium">{sub.name}</span>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        sub.status === "done"   ? "bg-primary/10 text-primary" :
                        sub.status === "active" ? "bg-amber-100 text-amber-600" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {cfg.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </AnimatedSection>
  );
}
