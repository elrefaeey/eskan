"use client";
import React, { useState } from "react";
import UnitCard from "../UnitCard";
import { elbadryTradeConfig } from "../unitCardConfigs";
import type { BaseUnit } from "../UnitCard";
import { useCafeRestaurantUnits } from "@/features/cafe-restaurants/hooks/useCafeRestaurantUnits";
import { Loader2, ChevronDown } from "lucide-react";

const CafeRestaurantUnits = () => {
  const [itemsToShow, setItemsToShow] = useState<number>(3);

  const level_id = 10;
  const type = "تجارى";

  // Fetch units with pagination
  const { data: unitsResponse, isLoading } = useCafeRestaurantUnits({
    level_id,
    type,
    count: itemsToShow,
    page: 1,
  });

  const units: BaseUnit[] =
    unitsResponse?.data?.map((unit) => ({
      id: unit.id,
      number: unit.number,
      space: unit.space,
      meter_price: unit.meter_price,
      revenue: unit.revenue,
      level_id: unit.level_id,
      advance: unit.advance,
      duration: unit.duration,
      contract: unit.contract !== null,
      img: unit.img,
    })) || [];

  const totalUnits = unitsResponse?.total || 0;
  const hasMore = totalUnits > itemsToShow;

  const handleShowMore = () => {
    setItemsToShow((prev) => prev + 3);
  };

  return (
    <>
      <div className="grid gap-3 mt-0 units lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {isLoading && itemsToShow === 3 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          units.map((unit) => (
            <UnitCard
              key={unit.id}
              projectId={1}
              config={elbadryTradeConfig}
              unit={unit}
              data={units}
            />
          ))
        )}
      </div>

      {hasMore && !isLoading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="flex items-center gap-2 text-black hover:text-primary transition-colors"
          >
            <span className="text-lg font-medium">عرض المزيد</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      )}

      {isLoading && itemsToShow > 3 && (
        <div className="flex justify-center mt-6">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
    </>
  );
};

export default CafeRestaurantUnits;
