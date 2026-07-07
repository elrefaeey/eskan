"use client";

import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  maxReachedStep: number;
  onStepChange: (step: number) => void;
  totalSteps?: number;
}

export function StepIndicator({
  currentStep,
  maxReachedStep,
  onStepChange,
  totalSteps = 3,
}: StepIndicatorProps) {
  const getStepClasses = (step: number) => {
    const baseClasses =
      "shadow-lg transition-all duration-700 ease-in-out transform text-xs pb-1";
    if (step < currentStep) {
      return `bg-[#498E56] text-white ${baseClasses} scale-100 opacity-80`;
    } else if (step === currentStep) {
      return `!border-[0px] border-[#498E56] text-[#498E56] bg-white ${baseClasses} scale-[120deg] shadow-2xl ring-2 ring-[#498E56] ring-opacity-20`;
    } else {
      return `bg-gray-200 text-gray-500 ${baseClasses} scale-95 opacity-60`;
    }
  };

  const getLineClasses = (step: number) => {
    return step < currentStep
      ? "bg-[#498E56] transition-all duration-1000 ease-in-out transform scale-x-100 shadow-sm"
      : "bg-gray-200 transition-all duration-1000 ease-in-out transform scale-x-75 opacity-50";
  };

  return (
    <div className="flex items-center justify-center w-full lg:max-w-3xl mx-auto px-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            {/* <button
              type="button"
              onClick={() => onStepChange(step)}
              disabled={maxReachedStep < step}
              className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center
                rounded-[8px] sm:rounded-[12px] text-base font-semibold ${getStepClasses(
                  step,
                )} ${
                  maxReachedStep >= step
                    ? "cursor-pointer hover:scale-110"
                    : "cursor-not-allowed"
                }`}
            >
              {step}
            </button> */}
            {step < totalSteps && (
              <div
                className={`h-0.5 w-12 sm:w-16 md:w-20 lg:w-44 ${getLineClasses(
                  step,
                )} mx-1 sm:mx-2`}
              ></div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
