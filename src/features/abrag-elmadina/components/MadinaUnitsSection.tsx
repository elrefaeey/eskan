"use client";

import { useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import MadinaTowersUnits from "@/components/Projects/MadinaTowers/MadinaTowersUnits";

export default function MadinaUnitsSection() {
  const selectedStep = useSearchParams().get("step");

  if (!selectedStep) {
    return (
      <div className="sec-padding text-center py-16 text-[#888] text-lg border-2 border-dashed border-gray-200 rounded-2xl">
        <Clock className="w-10 h-10 mx-auto mb-3 text-primary/40" />
        اختر المرحلة من الأعلى لعرض الوحدات المتاحة
      </div>
    );
  }

  return (
    <AnimatedSection variant={fadeUp} className="sec-padding">
      <MadinaTowersUnits />
    </AnimatedSection>
  );
}
