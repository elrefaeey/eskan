"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UnitCard from "../UnitCard";
import { madinaTowersConfig } from "../unitCardConfigs";
import useMadinaUnits from "@/features/abrag-elmadina/hooks/useMadinaUnits";
import { Loader2 } from "lucide-react";

function MadinaTowersUnits() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("step") || "ثانيه";
  const [currentType, setCurrentType] = useState("سكنى");

  const { units, isLoading } = useMadinaUnits(step, currentType);

  return (
    <div className="sec-padding">
      {/* <h3 className="h3">حدد نوع وحدتك</h3> */}
      {/* <div className="flex items-center gap-4 my-4">
        <button
          className={`px-12 rounded-[30px] text-xl font-semibold py-2 transition-all duration-300 ${
            currentType === "سكنى"
              ? "bg-primary text-white"
              : "bg-[#D9D9D9] text-[#1E1E1E] hover:text-white cursor-pointer hover:bg-primary"
          }`}
          onClick={() => setCurrentType("سكنى")}
        >
          سكنى
        </button>
        <button
          className={`px-12 rounded-[30px] text-xl font-semibold py-2 transition-all cursor-pointer duration-300 ${
            currentType === "تجارى"
              ? "bg-primary text-white"
              : "bg-[#D9D9D9] text-[#1E1E1E] hover:text-white hover:bg-primary"
          }`}
          onClick={() => router.push("/gallery-ground")}
        >
          تجاري
        </button>
      </div> */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
