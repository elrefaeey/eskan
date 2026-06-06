"use client";
import React, { useState } from "react";
import ElbadrySelect from "@/components/ui/ReusableComponents/ElbadrySelect";
import UnitCard from "../UnitCard";
import { elbadryTradeConfig } from "../unitCardConfigs";
import type { BaseUnit } from "../UnitCard";
// ==== Static Data ====
const numbersData = [
  { id: "3", label: "3" },
  { id: "7", label: "7" },
  { id: "11", label: "11" },
  { id: "15", label: "15" },
  { id: "17", label: "17" },
  { id: "20", label: "20" },
  { id: "24", label: "24" },
  { id: "25", label: "25" },
  { id: "26", label: "26" },
  { id: "30", label: "30" },
  { id: "33", label: "33" },
  { id: "40", label: "40" },
  { id: "44", label: "44" },
  { id: "45", label: "45" },
  { id: "47", label: "47" },
  { id: "52", label: "52" },
];

const spacesData = [
  { id: "31.00", label: "31.00" },
  { id: "35.00", label: "35.00" },
  { id: "36.00", label: "36.00" },
  { id: "38.00", label: "38.00" },
  { id: "50.00", label: "50.00" },
  { id: "60.00", label: "60.00" },
  { id: "62.00", label: "62.00" },
  { id: "66.00", label: "66.00" },
  { id: "70.00", label: "70.00" },
  { id: "76.00", label: "76.00" },
  { id: "97.50", label: "97.50" },
  { id: "104.00", label: "104.00" },
  { id: "112.00", label: "112.00" },
  { id: "160.00", label: "160.00" },
];

const unitsData: BaseUnit[] = [
  {
    id: 1152,
    number: "7",
    space: 112,
    meter_price: 53000,
    revenue: 103880,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/QeaZ1zXHWhatsApp Image 2024-06-29 at 11.50.56 PM.jpeg",
    level_id: { id: 12, name: "ثانى علوى" },
    advance: 0,
    duration: "3",
    contract: true,
  },
  {
    id: 1155,
    number: "30",
    space: 104,
    meter_price: 58000,
    revenue: 105560,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/HCHakbT1WhatsApp Image 2024-06-29 at 11.50.57 PM (1).jpeg",
    level_id: { id: 12, name: "ثانى علوى" },
    advance: 0,
    duration: "2",
    contract: false,
  },
  {
    id: 1159,
    number: "45",
    space: 50,
    meter_price: 53000,
    revenue: 46375,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/0mZTC9C0WhatsApp Image 2024-06-29 at 11.50.56 PM (2).jpeg",
    level_id: { id: 12, name: "ثانى علوى" },
    advance: 0,
    duration: "1",
    contract: true,
  },
];

const BadryTradUnitsStatic = () => {
  const [unitNumber, setUnitNumber] = useState<string | number>("0");
  const [space, setSpace] = useState<string | number>("0");

  const filteredUnits = unitsData.filter((unit) => {
    let match = true;
    if (unitNumber !== "0") match = match && unit.number === unitNumber;
    if (space !== "0") match = match && String(unit.space) === String(space);
    return match;
  });

  return (
    <>
      <div className="bg-[linear-gradient(95.65deg,#6BAF6B_-.45%,#485C4C_95.86%)]
       gr-bg md:gap-8 gap-3 flex flex-col md:flex-row p-4 mt-0 rounded-xl">
        <div className="w-full gap-3 flex filter-containe">
          <div className="num-div w-full">
            <h4 className="white lg:text-2xl text-white text-lg bold pb-2">
              اختار رقم الوحدة
            </h4>
            <ElbadrySelect
              anotherBg={true}
              defaultLabel="كل الوحدات"
              data={numbersData}
              elName="number"
              onChange={(val) => setUnitNumber(val)}
            />
          </div>
          <div className="space-div w-full">
            <h4 className="white lg:text-2xl text-white text-lg bold pb-2">
              اختار المساحة
            </h4>
            <ElbadrySelect
              anotherBg={true}
              defaultLabel="كل المساحات"
              data={spacesData}
              elName="space"
              onChange={(val) => setSpace(val)}
            />
          </div>
        </div>
      </div>

      <br />

      <div className="grid gap-3 mt-0 units lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {filteredUnits.map((unit) => (
          <UnitCard
            key={unit.id}
            projectId={2}
            config={elbadryTradeConfig}
            unit={unit}
            
            data={filteredUnits}
          />
        ))}
      </div>
    </>
  );
};

export default BadryTradUnitsStatic;
