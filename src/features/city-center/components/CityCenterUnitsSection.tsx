"use client";

import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MdExpandMore } from "react-icons/md";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import { BrandSpinner } from "@/components/common/BrandSpinner";
import SelectInput from "@/components/SelectInput";
import { fadeUp, springButtonTransition } from "@/lib/animations";
import { CITY_CENTER_UNITS_SECTION_ID } from "../constants";
import { CityCenterUnitCard, type CityCenterUnit } from "./CityCenterUnitCard";

interface SelectOption {
  value: string;
  label: string;
}

interface CityCenterUnitsSectionProps {
  section: string;
  units: CityCenterUnit[];
  isLoading: boolean;
  hasMore: boolean;
  onPaginate: () => void;
  filterOptions: {
    spaces?: SelectOption[];
    revenues?: SelectOption[];
    numbers?: SelectOption[];
  };
  filtersLoading?: {
    spaces?: boolean;
    revenues?: boolean;
    numbers?: boolean;
  };
  showRevenueFilter?: boolean;
}

export function CityCenterUnitsSection({
  section,
  units,
  isLoading,
  hasMore,
  onPaginate,
  filterOptions,
  filtersLoading = {},
  showRevenueFilter = true,
}: CityCenterUnitsSectionProps) {
  const searchParams = useSearchParams();
  const selectedSpace = searchParams.get("space") || "";
  const selectedRevenue = searchParams.get("revenue") || "";

  const { spaces = [], revenues = [], numbers = [] } = filterOptions;
  const numberFilterDisabled = showRevenueFilter
    ? !selectedSpace || !selectedRevenue || filtersLoading.numbers
    : !selectedSpace || filtersLoading.numbers;

  return (
    <div id={CITY_CENTER_UNITS_SECTION_ID}>
      <AnimatedSection variant={fadeUp} className="sec-padding">
        <div className="bg-[#364138] rounded-2xl p-4 mb-6">
          <h3 className="text-white font-extrabold text-xl text-center mb-5 flex items-center justify-center gap-2">
            <MoveDown className="w-5 h-5" />
            حدد مواصفات محلك
          </h3>

          <div
            className={`grid grid-cols-1 gap-3 ${
              showRevenueFilter ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            <SelectInput
              options={spaces}
              name="space"
              placeholder="مساحة الوحدة"
              disabled={filtersLoading.spaces}
              clearParams={
                showRevenueFilter ? ["revenue", "number"] : ["number"]
              }
            />
            {showRevenueFilter && (
              <SelectInput
                options={revenues}
                name="revenue"
                placeholder="العائد الإيجاري"
                disabled={!selectedSpace || filtersLoading.revenues}
                clearParams={["number"]}
              />
            )}
            <SelectInput
              options={numbers}
              name="number"
              placeholder="رقم الوحدة"
              disabled={numberFilterDisabled}
            />
          </div>
        </div>

        {isLoading && units.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <BrandSpinner size="md" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {units.map((unit) => (
              <CityCenterUnitCard
                key={unit.id ?? String(unit.number)}
                unit={unit}
                section={section}
                appear
              />
            ))}
          </div>
        )}

        {hasMore && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={springButtonTransition}
            disabled={isLoading}
            onClick={onPaginate}
            className="flex items-center mx-auto mt-6 gap-2 text-black font-bold text-lg disabled:opacity-50"
          >
            {isLoading ? (
              <BrandSpinner size="sm" />
            ) : (
              "رؤية المزيد"
            )}
            {!isLoading && <MdExpandMore className="text-primary font-bold" size={28} />}
          </motion.button>
        )}
      </AnimatedSection>
    </div>
  );
}
