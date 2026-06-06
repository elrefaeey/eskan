"use client";

import React from "react";
import UnitCard from "../UnitCard";
import { cafeRestaurantsConfig } from "../unitCardConfigs";
import type { BaseUnit } from "../UnitCard";

// Static data for cafe and restaurants units
const cafeUnits: BaseUnit[] = [
  {
    id: 1108,
    number: "3",
    space: 72,
    meter_price: 85000,
    revenue: 107100,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/kbFn3Af63.jpg",
    level_id: { id: 10, name: "أرضى" },
    advance: 2142000,
    duration: "3 سنوات",
    contract: false,
  },
  {
    id: 1130,
    number: "44",
    space: 109,
    meter_price: 80000,
    revenue: 152600,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/WoLl9Ano44.jpg",
    level_id: { id: 10, name: "أرضى" },
    advance: 2052000,
    duration: "3 سنوات",
    contract: true,
  },
  {
    id: 1138,
    number: "59",
    space: 85,
    meter_price: 90000,
    revenue: 133875,
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/kmOZcmkS59.jpg",
    level_id: { id: 10, name: "أرضى" },
    advance: 2677500,
    duration: "3 سنوات",
    contract: false,
  },
];

const CafeUnits = () => {
  return (
    <div className="w-full">
      <h2 className="text-primary h2 lg:mb-5 mb-2">تفاصيل الوحدات التجارية:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cafeUnits.map((unit) => (
          <UnitCard
            key={unit.id}
            projectId={1}
            config={cafeRestaurantsConfig}
            unit={unit}
            data={cafeUnits}
          />
        ))}
      </div>
    </div>
  );
};

export default CafeUnits;
