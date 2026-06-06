"use client";

import { useSearchParams } from "next/navigation";
import UnitCard from "@/components/Projects/UnitCard";
import { galleryGroundConfig } from "@/components/Projects/unitCardConfigs";

// Static data based on your example
const galleryGroundUnitsData = [
  {
    id: 1270,
    duration: "سنتين",
    number: "55",
    contract: null,
    space: 28,
    meter_price: 40000,
    advance: 392000,
    appear: 1,
    block_id: "null",
    images: "null",
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/9FL1KPqfتجارى مدينة 1  محل 55.jpg",
    installment: 15100,
    level_id: "null",
    levelimg:
      "https://back.mansoura-eco-build.com/storage/app/public/images/Units/8tiRaeE2تجارى مدينة 1  محل 55.jpg",
    location: "ابراج المدينة 1",
    project: "أرض المعارض",
    receiving: 0,
    revenue: 0,
    step: null,
    type: "تجارى",
  },
  {
    id: 1271,
    duration: "سنتين",
    number: "11",
    contract: null,
    space: 22,
    meter_price: 43000,
    advance: 331000,
    appear: 1,
    block_id: "null",
    images: "null",
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/6MlZcEYdتجارى مدينة 2 محل 11 copy.jpg",
    installment: 12800,
    level_id: "null",
    levelimg:
      "https://back.mansoura-eco-build.com/storage/app/public/images/Units/UxQQXhSTتجارى مدينة 2 محل 11 copy.jpg",
    location: "ابراج المدينة 2",
    project: "أرض المعارض",
    receiving: 0,
    revenue: 0,
    step: null,
    type: "تجارى",
  },
  {
    id: 1272,
    duration: "سنتين",
    number: "44",
    contract: null,
    space: 22,
    meter_price: 42000,
    advance: 323400,
    appear: 1,
    block_id: "null",
    images: "null",
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/L0ArU7fjتجارى مدينة 1  محل 44.jpg",
    installment: 12500,
    level_id: "null",
    levelimg:
      "https://back.mansoura-eco-build.com/storage/app/public/images/Units/RRqBNlRUتجارى مدينة 1  محل 44.jpg",
    location: "ابراج المدينة 1",
    project: "أرض المعارض",
    receiving: 0,
    revenue: 0,
    step: null,
    type: "تجارى",
  },
  {
    id: 1273,
    duration: "سنتين",
    number: "20",
    contract: null,
    space: 43,
    meter_price: 41000,
    advance: 617050,
    appear: 1,
    block_id: "null",
    images: "null",
    img: "https://back.mansoura-eco-build.com/storage/app/public/images/Units/pzmAJSCRتجارى مدينة 2 محل 20.jpg",
    installment: 23800,
    level_id: "null",
    levelimg:
      "https://back.mansoura-eco-build.com/storage/app/public/images/Units/sVZfLi10تجارى مدينة 2 محل 20.jpg",
    location: "ابراج المدينة 2",
    project: "أرض المعارض",
    receiving: 0,
    revenue: 0,
    step: null,
    type: "تجارى",
  },
];

const GalleryGroundUnits = () => {
  const searchParams = useSearchParams();

  // Get filter values from URL params
  const locationFilter = searchParams.get("location");
  const meterPriceFilter = searchParams.get("meter_price");
  const spaceFilter = searchParams.get("space");

  // Filter units based on search params
  const filteredUnits = galleryGroundUnitsData.filter((unit) => {
    const matchesLocation = !locationFilter || unit.location === locationFilter;
    const matchesMeterPrice =
      !meterPriceFilter ||
      unit.meter_price.toString() === meterPriceFilter.replace(".00", "");
    const matchesSpace =
      !spaceFilter || unit.space.toString() === spaceFilter.replace(".00", "");

    return matchesLocation && matchesMeterPrice && matchesSpace;
  });

  if (filteredUnits.length === 0) {
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
      {filteredUnits.map((unit) => (
        <UnitCard
          key={unit.id}
          unit={unit}
          data={filteredUnits}
          projectId={7}
          config={galleryGroundConfig}
        />
      ))}
    </div>
  );
};

export default GalleryGroundUnits;
