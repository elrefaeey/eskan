import { Building2, Clock, Layers, Home } from "lucide-react";
import type { StatItem } from "@/components/shared";

export interface MadinaPhaseData {
  title: string;
  description: string;
  image: string;
  closed: boolean;
  step: string | null;
}

export const MADINA_PHASES: MadinaPhaseData[] = [
  {
    title: "المرحلة الأولى",
    description:
      "7 عمارات بإجمالي 112 وحدة سكنية و36 محل تجاري و24 عيادة طبية — مساحات 100م² — 3 غرف وصالة قطعتين.",
    image: "/assets/projects/abrag-elmadina/step1.webp",
    closed: true,
    step: null,
  },
  {
    title: "المرحلة الثانية",
    description:
      "عمارتان بعدد 50 وحدة سكنية و25 محل تجاري — مساحات من 115م² حتى 130م² — 3 غرف وصالة قطعتين أو ثلاث.",
    image: "/assets/projects/abrag-elmadina/step2.webp",
    closed: false,
    step: "ثانيه",
  },
  {
    title: "المرحلة الثالثة",
    description:
      "8 أبراج سكنية تجارية — 180 وحدة سكنية و66 محل تجاري — مساحات من 84م² حتى 150م² — تقسيط حتى 6 سنوات.",
    image: "/assets/projects/abrag-elmadina/step3.webp",
    closed: false,
    step: "ثالثه",
  },
];

export const MADINA_RESIDENTIAL_STATS: StatItem[] = [
  { label: "عمارة", value: "14", icon: Building2 },
  { label: "مرحلة", value: "4", icon: Layers },
  { label: "وحدة سكنية", value: "+200", icon: Home },
  { label: "سنوات تقسيط", value: "6", icon: Clock },
];

export const MADINA_PHASE_OPTIONS = MADINA_PHASES.filter((p) => !p.closed && p.step).map(
  (p) => ({ value: p.step!, label: p.title }),
);
