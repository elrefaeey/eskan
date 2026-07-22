"use client";

import { Controller, useFormContext } from "react-hook-form";
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
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const selectType = (value: UnitType, onFieldChange: (value: UnitType) => void) => {
    onFieldChange(value);
    clearErrors("category");
    onTypeChange(value);
  };

  return (
    <div className="flex flex-col w-full gap-5 lg:gap-10">
      <Controller
        name="category"
        control={control}
        rules={{ required: "هذا الحقل مطلوب" }}
        render={({ field }) => (
          <div className="flex flex-wrap items-center gap-3">
            <h5 className="text-[#2D2D2D] font-semibold text-xl md:text-2xl">
              حدد نوع العقار:
            </h5>
            <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
              {UNIT_TYPE_OPTIONS.map(({ value, label }) => {
                const isSelected = field.value === value;

                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectType(value, field.onChange)}
                    className={cn(
                      "flex items-center gap-3 cursor-pointer px-4 py-2 border rounded-lg transition-all duration-200",
                      "hover:border-primary hover:bg-primary/10",
                      isSelected && "border-primary bg-primary/10 ring-1 ring-primary/30"
                    )}
                  >
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-400 bg-white"
                      )}
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="text-gray-800 font-medium">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      />

      {errors.category && (
        <p className="text-sm text-red-600">
          {errors.category.message as string}
        </p>
      )}
    </div>
  );
}

export default UnitTypeSelector;
