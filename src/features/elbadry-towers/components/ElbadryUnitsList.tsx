"use client";

import UnitCard from "@/components/Projects/UnitCard";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ElbadryUnit } from "../types";
import useElbadryUnits from "../hooks/useElbadryUnits";

interface ElbadryUnitsListProps {
  config: any;
  projectId: number;
}

const ElbadryUnitsList = ({ config, projectId }: ElbadryUnitsListProps) => {
  const searchParams = useSearchParams();
  const blockId = searchParams.get("block_id");
  const levelId = searchParams.get("level_id");
  const space = searchParams.get("space");
  const meterPrice = searchParams.get("meter_price");

  const { data: units, isLoading } = useElbadryUnits({
    block_id: blockId,
    level_id: levelId,
    space: space,
    meter_price: meterPrice,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">
          لا توجد وحدات متاحة بهذه المواصفات
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {units.map((unit: ElbadryUnit) => (
        <UnitCard
          key={unit.id}
          unit={unit}
          data={units}
          projectId={projectId}
          config={config}
        />
      ))}
    </div>
  );
};

export default ElbadryUnitsList;
