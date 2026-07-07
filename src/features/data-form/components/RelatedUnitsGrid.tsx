"use client";

import { Spinner } from "@/components/ui/Spinner";
import type { RelatedUnit } from "../types";
import RelatedUnitCard from "./RelatedUnitCard";

interface RelatedUnitsGridProps {
  units: RelatedUnit[];
  isLoading: boolean;
  selectedUnitId: number | null;
  onSelect: (unitId: number) => void;
}

function RelatedUnitsGrid({
  units,
  isLoading,
  selectedUnitId,
  onSelect,
}: RelatedUnitsGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (units.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {units.map((unit) => (
        <RelatedUnitCard
          key={unit.id}
          unit={unit}
          isSelected={selectedUnitId === unit.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default RelatedUnitsGrid;
