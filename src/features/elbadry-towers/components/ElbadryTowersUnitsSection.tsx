"use client";

import { useSearchParams } from "next/navigation";
import { HiBellAlert } from "react-icons/hi2";
import SelectInput from "@/components/SelectInput";
import UnitCard from "@/components/Projects/UnitCard";
import { elbadryTowersConfig } from "@/components/Projects/unitCardConfigs";
import useElbadryBlocks from "@/features/elbadry-towers/hooks/useElbadryBlocks";
import useElbadryLevels from "@/features/elbadry-towers/hooks/useElbadryLevels";
import useElbadrySpaces from "@/features/elbadry-towers/hooks/useElbadrySpaces";
import useElbadryMeterPrices from "@/features/elbadry-towers/hooks/useElbadryMeterPrices";
import useElbadryUnits from "@/features/elbadry-towers/hooks/useElbadryUnits";
import { Loader2 } from "lucide-react";

const ElbadryTowersUnitsSection = () => {
  const searchParams = useSearchParams();

  // Get filter values from URL
  const blockId = searchParams.get("block_id");
  const levelId = searchParams.get("level_id");
  const space = searchParams.get("space");
  const meterPrice = searchParams.get("meter_price");

  // Fetch dynamic data from API
  const { blocks, isLoading: blocksLoading } = useElbadryBlocks(1);
  const { levels, isLoading: levelsLoading } = useElbadryLevels(
    blockId ? parseInt(blockId) : undefined
  );
  const { spaces, isLoading: spacesLoading } = useElbadrySpaces(
    blockId ? parseInt(blockId) : undefined
  );
  const { meterPrices, isLoading: meterPricesLoading } = useElbadryMeterPrices(
    blockId ? parseInt(blockId) : undefined
  );
  const { data: units, isLoading: unitsLoading } = useElbadryUnits({
    block_id: blockId,
    level_id: levelId,
    space: space,
    meter_price: meterPrice,
  });

  // Show loading state
  if (blocksLoading) {
    return (
      <div className="sec-padding flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="sec-padding">
      <div
        data-aos="fade-up"
        data-duration="500"
        className="flex items-center gap-2 my-2 lg:text-2xl font-bold"
      >
        <h2 className="text-primary h2">رجاء اختيار مواصفات شقتك</h2>
      </div>

      <div
        className="md:grid-cols-4 grid-cols-2 py-2 grid md:w-fit relative z-50 gap-4"
        data-aos="fade-up"
        data-duration="500"
      >
        <SelectInput
          name="block_id"
          options={blocks}
          placeholder="البلوك"
          className="w-full md:w-[130px]"
        />
        {blockId && (
          <>
            <SelectInput
              name="level_id"
              options={levels}
              placeholder="الدور"
              className="w-full md:w-[130px]"
              disabled={levelsLoading}
            />
            <SelectInput
              name="space"
              options={spaces}
              placeholder="المساحة"
              className="w-full md:w-[130px]"
              disabled={spacesLoading}
            />
            <SelectInput
              name="meter_price"
              options={meterPrices}
              placeholder="سعر المتر"
              className="w-full md:w-[130px]"
              disabled={meterPricesLoading}
            />
          </>
        )}
      </div>

      {units && units.length > 0 && (
        <h4
          data-aos="fade-up"
          data-duration="500"
          className="text-[#364138] relative bold bg-[#EDEDED]
           overflow-hidden w-fit p-2 rounded-xl mt-3 lg:text-2xl
            text-lg flex gap-2 items-start"
        >
          <HiBellAlert className="text-2xl text-[#364138] font-semibold mt-1 relative z-50" />
          <span className="flex-1 text-[#364138] font-semibold!">
            نظرا لوجود اكثر من نظام للدفع يتم مناقشة اسلوب سداد الاقساط مع قسم
            المبيعات في الشركة
          </span>
        </h4>
      )}

      <div className="mt-2 lg:mt-4">
        {unitsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid gap-3 units xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {units.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                data={units}
                projectId={1}
                config={elbadryTowersConfig}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-bold col-span-12 my-8">
            {blockId && "لا توجد وحدات بهذه الخصائص"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ElbadryTowersUnitsSection;
