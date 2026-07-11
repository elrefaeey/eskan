"use client";

import { MoveDown } from "lucide-react";
import SouqIstanbulUnits from "@/components/Projects/SouqIstanbul/SouqIstanbulUnits";
import { ProjectUnitsSection } from "@/components/shared";

export default function SouqIstanbulUnitsSection() {
  return (
    <ProjectUnitsSection icon={MoveDown}>
      <SouqIstanbulUnits />
    </ProjectUnitsSection>
  );
}
