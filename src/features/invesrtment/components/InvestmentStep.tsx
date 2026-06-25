"use client";

import { ChevronLeft, TrendingUp, Wallet } from "lucide-react";

interface StepOption {
  value: string;
  label: string;
  description?: string;
}

interface InvestmentStepProps {
  title: string;
  subtitle?: string;
  options: StepOption[];
  selectedValue: string;
  onOptionClick: (value: string) => void;
  isTransitioning: boolean;
  direction: "forward" | "backward";
}

const OPTION_ICONS: Record<string, typeof Wallet> = {
  rental: Wallet,
  resale: TrendingUp,
};

export function InvestmentStep({
  title,
  subtitle = "اختر الهدف الأقرب ليك — هنعرضلك المشروع والحصص المناسبة فوراً",
  options,
  selectedValue,
  onOptionClick,
  isTransitioning,
  direction,
}: InvestmentStepProps) {
  return (
    <div
      className={`max-w-xl mx-auto my-4 sm:my-7 px-1 transition-all duration-300 ease-out transform ${
        isTransitioning
          ? direction === "forward"
            ? "opacity-0 translate-x-3 scale-[0.99]"
            : "opacity-0 -translate-x-3 scale-[0.99]"
          : "opacity-100 translate-x-0 scale-100"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#498E56]/15 shadow-[0_8px_30px_rgba(31,80,59,0.07)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#498E56] to-[#1F503B]" />

        <div className="px-4 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-6 text-center border-b border-[#498E56]/8">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#1F503B] leading-snug">
            {title}
          </h3>
          <p className="text-[#888] text-sm sm:text-body-base mt-2 leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="px-3 sm:px-6 py-4 sm:pb-6 space-y-3">
          {options.map((option) => {
            const isSelected = selectedValue === option.value;
            const Icon = OPTION_ICONS[option.value] ?? Wallet;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onOptionClick(option.value)}
                className={`group w-full flex items-center gap-3 text-right rounded-xl px-3.5 py-3.5 sm:px-4 sm:py-4 border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-[#498E56] bg-[#F3FAF6] shadow-md ring-2 ring-[#498E56]/15"
                    : "border-[#E8ECE9] bg-white hover:border-[#498E56]/35 hover:bg-[#FAFBFC]"
                }`}
              >
                <span
                  className={`flex shrink-0 items-center justify-center w-11 h-11 rounded-xl transition-all ${
                    isSelected
                      ? "bg-[#498E56] text-white shadow-sm"
                      : "bg-[#F3FAF6] border border-[#498E56]/15 text-[#498E56]"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2.2} />
                </span>

                <div className="flex-1 min-w-0 text-right">
                  <p className="font-extrabold text-[#1F503B] text-base sm:text-body-lg leading-snug">
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-[#777] text-sm sm:text-body-sm mt-1 leading-relaxed">
                      {option.description}
                    </p>
                  )}
                </div>

                <ChevronLeft
                  className={`w-5 h-5 shrink-0 transition-all ${
                    isSelected
                      ? "text-[#498E56]"
                      : "text-[#D0D0D0] group-hover:text-[#498E56]/50"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
