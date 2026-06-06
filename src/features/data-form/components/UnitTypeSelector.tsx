"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { UnitType } from "../types";

interface UnitTypeSelectorProps {
  onTypeChange: (type: UnitType) => void;
}

const UNIT_TYPE_OPTIONS: { value: UnitType; label: string }[] = [
  { value: "تجاري", label: "تجاري" },
  { value: "سكني", label: "سكني" },
  { value: "طبي", label: "طبي" },
];

function UnitTypeSelector({ onTypeChange }: UnitTypeSelectorProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col w-full gap-5 lg:gap-10">
      <div className="flex flex-wrap items-center gap-3">
        <h5 className="text-[#2D2D2D] font-semibold text-xl md:text-2xl">
          حدد نوع العقار:
        </h5>
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
          {UNIT_TYPE_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              htmlFor={`unit-type-${value}`}
              className={cn(
                "flex items-center gap-3 cursor-pointer relative px-4 py-2 border rounded-lg transition-all duration-200",
                "hover:border-primary hover:bg-primary/10",
              )}
            >
              <input
                {...register("category", { required: "هذا الحقل مطلوب" })}
                type="radio"
                value={value}
                id={`unit-type-${value}`}
                className="absolute opacity-0 w-0 h-0 peer"
                onChange={() => onTypeChange(value)}
              />
              <span className="w-5 h-5 rounded-full border-2 border-gray-400 shrink-0 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                <span className="w-2.5 h-2.5 rounded-full bg-white invisible peer-checked:visible" />
              </span>
              <span className="text-gray-800 font-medium">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {errors.category && (
        <p className="text-sm text-red-600">
          {errors.category.message as string}
        </p>
      )}
    </div>
  );
}

export default UnitTypeSelector;
