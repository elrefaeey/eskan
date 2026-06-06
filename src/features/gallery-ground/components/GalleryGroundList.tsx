"use client";

import UnitCard from "@/components/Projects/UnitCard";
import { galleryGroundConfig } from "@/components/Projects/unitCardConfigs";
import useGalleryGroundUnits from "../hooks/useGalleryGroundUnits";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GalleryGroundUnit } from "../types";

const GalleryGroundList = () => {
  const searchParams = useSearchParams();
  const locationFilter = searchParams.get("location");
  const meterPriceFilter = searchParams.get("meter_price");
  const spaceFilter = searchParams.get("space");

  const { data: units, isLoading } = useGalleryGroundUnits({
    location: locationFilter,
    meter_price: meterPriceFilter,
    space: spaceFilter,
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
      {units.map((unit: GalleryGroundUnit) => (
        <UnitCard
          key={unit.id}
          unit={unit}
          data={units}
          projectId={7}
          config={galleryGroundConfig}
        />
      ))}
    </div>
  );
};

export default GalleryGroundList;
