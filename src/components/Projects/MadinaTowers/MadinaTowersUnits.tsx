"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UnitCard from "../UnitCard";
import { madinaTowersConfig } from "../unitCardConfigs";
import useMadinaUnits from "@/features/abrag-elmadina/hooks/useMadinaUnits";
import { BrandSpinner } from "@/components/common/BrandSpinner";

function MadinaTowersUnits() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("step") || "ثانيه";
  const [currentType,] = useState("سكنى");

  const { units, isLoading } = useMadinaUnits(step, currentType);

  return (
    <div className="sec-padding">

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <BrandSpinner size="md" />
        </div>
      ) : (
        <>
          {units.length > 0 ? (
            <div className="grid gap-3 units xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {units.map((unit: any) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  data={units}
                  projectId={5}
                  config={madinaTowersConfig}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">
              لا توجد وحدات متاحة حالياً
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MadinaTowersUnits;
