"use client";

import { MoveDown } from "lucide-react";
import CafeRestaurantUnits from "@/components/Projects/CafeRestaurants/CafeRestaurantUnits";
import { ProjectUnitsSection } from "@/components/shared";

export default function CafeUnitsSection() {
  return (
    <ProjectUnitsSection icon={MoveDown}>
      <CafeRestaurantUnits />
    </ProjectUnitsSection>
  );
}
