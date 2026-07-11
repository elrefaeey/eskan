import {
  Building2,
  DoorOpen,
  HardHat,
  Layers,
  PaintBucket,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ConstructionPhase {
  label: string;
  icon: LucideIcon;
  done?: boolean;
  active?: boolean;
}

export const CITY_CENTER_CONSTRUCTION_PHASES: ConstructionPhase[] = [
  { label: "التراخيص", icon: DoorOpen, done: true },
  { label: "الأساسات", icon: Layers, done: true },
  { label: "الهيكل الإنشائي", icon: Building2, done: true },
  { label: "المباني", icon: HardHat, done: true },
  { label: "التشطيبات", icon: PaintBucket, active: true },
  { label: "الاندسكيب", icon: Wrench, done: false },
];

export const CITY_CENTER_CONSTRUCTION = {
  totalStages: 6,
  completedStages: 5.5,
  currentPhaseLabel: "التشطيبات",
  lastUpdated: "مايو 2026",
  summary:
    "تم الانتهاء من 5 مراحل ونصف من أصل 6 — نصف أعمال التشطيبات مكتمل والمشروع يسير وفق الجدول الزمني المحدد.",
} as const;

export const CITY_CENTER_CONSTRUCTION_PROGRESS = Math.round(
  (CITY_CENTER_CONSTRUCTION.completedStages / CITY_CENTER_CONSTRUCTION.totalStages) * 100,
);

export const CITY_CENTER_CONSTRUCTION_TIMELINE_PROGRESS = `${(CITY_CENTER_CONSTRUCTION.completedStages / CITY_CENTER_CONSTRUCTION.totalStages) * 100}%`;
