"use client";

import { useState } from "react";
import UnitCard from "../UnitCard";
import { medicalCityConfig } from "../unitCardConfigs";
import useMedicalUnits from "@/features/medical-city-center/hooks/useMedicalUnits";
import { BrandSpinner } from "@/components/common/BrandSpinner";

function MedicalCityUnits() {
  const [currentType, setCurrentType] = useState("طبى");

  const { units, isLoading } = useMedicalUnits(currentType);


  return (
    <div className="sec-padding">
      <p className="  mb-4 p text-xl lg:text-2xl">
        <span className=" text-primary font-medium  text-2xl lg:text-3xl">التخصصات المتاحة: </span>عيادة اسنان - عيادة انف واذن - عيادة عظام
        - عيادة نسا - عيادة قلب - عيادة مخ واعصاب - عيادة عيون - عيادة الطب
        النفسي - عيادة أورام - عيادة تغذية علاجية - عيادة الطب البيطري - عيادة
        علاج طبيعي - عيادة جلدية - عيادة اطفال.
      </p>

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
                  projectId={12}
                  config={medicalCityConfig}
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

export default MedicalCityUnits;
