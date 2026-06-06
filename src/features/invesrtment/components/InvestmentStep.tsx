"use client";

import React from "react";

interface StepOption {
  value: string;
  label: string;
}

interface InvestmentStepProps {
  title: string;
  options: StepOption[];
  selectedValue: string;
  onOptionClick: (value: string) => void;
  isTransitioning: boolean;
  direction: "forward" | "backward";
}

export function InvestmentStep({
  title,
  options,
  selectedValue,
  onOptionClick,
  isTransitioning,
  direction,
}: InvestmentStepProps) {
  return (
    <div className="max-w-2xl bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-md mx-auto my-6 sm:my-8 overflow-hidden relative">
      <div
        className={`transition-all duration-300 ease-out transform ${
          isTransitioning
            ? direction === "forward"
              ? "opacity-0 translate-x-6 scale-95"
              : "opacity-0 -translate-x-6 scale-95"
            : "opacity-100 translate-x-0 scale-100"
        }`}
      >
        <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto">
          <h4 className="text-xl lg:text-2xl font-semibold text-[#2D2D2D] mb-4 sm:mb-6">
            {title}
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onOptionClick(option.label)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`w-full bg-white rounded-xl
                  sm:rounded-2xl p-2.5 sm:p-3 md:p-4 text-lg
                  text-[#2D2D2D] shadow-[0px_4px_4px_0px_#00000040] hover:shadow-xl
                  transition-all duration-300 hover:scale-[1.02] border-2 sm:border-[3px] ${
                    selectedValue === option.value
                      ? "border-[#498E56] bg-[#498E5610]"
                      : "border-[#BEBEBE]"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
