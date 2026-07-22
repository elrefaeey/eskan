"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InvestmentGoalSelectorProps {
  label?: string;
  onGoalChange: (goal: string) => void;
}

const OPTIONS = ["تملك", "استثمار"] as const;

function InvestmentGoalSelector({
  label = "ما هو الغرض من الاستثمار؟",
  onGoalChange,
}: InvestmentGoalSelectorProps) {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const selectGoal = (value: string, onFieldChange: (value: string) => void) => {
    onFieldChange(value);
    clearErrors("investment_goal");
    onGoalChange(value);
  };

  return (
    <div className="flex flex-col w-full gap-5 lg:gap-10">
      <Controller
        name="investment_goal"
        control={control}
        rules={{ required: "هذا الحقل مطلوب" }}
        render={({ field }) => (
          <div className="flex flex-wrap items-center gap-3">
            <h5 className="text-[#2D2D2D] font-semibold text-xl md:text-2xl">
              {label}
            </h5>
            <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
              {OPTIONS.map((opt) => {
                const isSelected = field.value === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => selectGoal(opt, field.onChange)}
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
                    <span className="text-gray-800 font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      />

      {errors.investment_goal && (
        <p className="text-sm text-red-600">
          {errors.investment_goal.message as string}
        </p>
      )}
    </div>
  );
}
export default InvestmentGoalSelector;
