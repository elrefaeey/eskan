"use client";
import React, { useState, useEffect } from "react";
import ElbadrySelect from "@/components/ui/ReusableComponents/ElbadrySelect";
import UnitCard from "../UnitCard";
import { elbadryTradeConfig } from "../unitCardConfigs";
import type { BaseUnit } from "../UnitCard";
import { useSouqIstanbulUnits } from "@/features/souq-istanbul/hooks/useSouqIstanbulUnits";
import { useSouqIstanbulUniqueNumbers } from "@/features/souq-istanbul/hooks/useSouqIstanbulUniqueNumbers";
import { useSouqIstanbulUniqueSpaces } from "@/features/souq-istanbul/hooks/useSouqIstanbulUniqueSpaces";
import { ChevronDown } from "lucide-react";
import { BrandSpinner } from "@/components/common/BrandSpinner";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";

const SouqIstanbulUnits = () => {
  const [unitNumber, setUnitNumber] = useState<number>(0);
  const [space, setSpace] = useState<number>(0);
  const [itemsToShow, setItemsToShow] = useState<number>(3);

  const level_id = 12;
  const type = "تجارى";

  const { data: numbersData } = useSouqIstanbulUniqueNumbers({
    level_id,
    type,
    space,
  });

  const { data: spacesData } = useSouqIstanbulUniqueSpaces({
    level_id,
    type,
    number: unitNumber,
  });

  // Fetch units with pagination
  const { data: unitsResponse, isLoading } = useSouqIstanbulUnits({
    level_id,
    type,
    number: unitNumber,
    space,
    count: itemsToShow,
    page: 1,
  });

  // Reset space and items when number or space filter changes
  useEffect(() => {
    setItemsToShow(3);
  }, [unitNumber, space]);

  const numbers =
    numbersData?.data?.map((num) => ({
      id: num,
      label: num,
    })) || [];

  const spaces =
    spacesData?.data?.map((sp) => ({
      id: sp,
      label: sp,
    })) || [];

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
  const currentCount = unitsResponse?.data?.length || 0;
  const hasMore = totalUnits > itemsToShow;

  console.log("Full Response:", unitsResponse);
  console.log("Pagination Debug:", {
    totalUnits,
    itemsToShow,
    currentCount,
    hasMore,
    unitsResponse: unitsResponse ? "exists" : "null",
  });

  const handleShowMore = () => {
    setItemsToShow((prev) => prev + 3);
  };

  return (
    <>
      <div
        className="bg-[linear-gradient(95.65deg,#6BAF6B_-.45%,#485C4C_95.86%)]
       gr-bg md:gap-8 gap-3 flex flex-col md:flex-row p-4 mt-0 rounded-xl"
      >
        <div className="w-full gap-3 flex filter-containe">
          <div className="num-div w-full">
            <h4 className="white lg:text-2xl text-white text-lg bold pb-2">
              اختار رقم الوحدة
            </h4>
            <ElbadrySelect
              anotherBg={true}
              defaultLabel="كل الوحدات"
              data={numbers}
              elName="number"
              onChange={(val) => setUnitNumber(Number(val))}
            />
          </div>
          <div className="space-div w-full">
            <h4 className="white lg:text-2xl text-white text-lg bold pb-2">
              اختار المساحة
            </h4>
            <ElbadrySelect
              anotherBg={true}
              defaultLabel="كل المساحات"
              data={spaces}
              elName="space"
              onChange={(val) => setSpace(Number(val))}
            />
          </div>
        </div>
      </div>

      <br />

      <div className="grid gap-3 mt-0 units lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {isLoading && itemsToShow === 3 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <BrandSpinner size="md" />
          </div>
        ) : (
          units.map((unit) => (
            <UnitCard
              key={unit.id}
              projectId={4}
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
          <BrandSpinner size="sm" />
        </div>
      )}
    </>
  );
};

export default SouqIstanbulUnits;
