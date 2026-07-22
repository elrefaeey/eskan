import { cn } from "@/lib/utils";
import type { InvestmentFlowStep } from "../constants";

interface InvestmentStepsGridProps {
  title?: string;
  steps: InvestmentFlowStep[];
  variant?: "light" | "filled";
  centered?: boolean;
  className?: string;
}

export function InvestmentStepsGrid({
  title,
  steps,
  variant = "light",
  centered = false,
  className,
}: InvestmentStepsGridProps) {
  const isFilled = variant === "filled";

  return (
    <div
      className={cn(
        isFilled &&
          "bg-white border border-primary/10 rounded-2xl p-5 md:p-6 shadow-sm",
        !isFilled &&
          "rounded-2xl bg-[#F0F4F2]/80 border border-[#498E56]/10 px-4 py-5 sm:bg-transparent sm:border-0 sm:px-0 sm:py-0",
        className,
      )}
    >
      {title && (
        <div className={cn("mb-4", centered && "text-center")}>
          <p className="text-[11px] sm:text-xs font-semibold text-[#498E56] tracking-wide mb-1">
            {isFilled ? "خطوات الحجز" : "دليل سريع"}
          </p>
          <h3
            className={cn(
              "text-base sm:text-lg font-extrabold text-[#1F503B]",
              centered && "mx-auto",
            )}
          >
            {title}
          </h3>
        </div>
      )}

      <div
        className={cn(
          "grid gap-3",
          isFilled
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-3",
        )}
      >
        {steps.map((item) =>
          isFilled ? (
            <div
              key={item.step}
              className="bg-[#F3FAF6] rounded-xl p-4 border border-primary/10 flex items-start gap-3 text-right"
            >
              <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                {item.step}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-[#1F503B] text-body-base">
                  {item.title}
                </p>
                <p className="text-[#666] text-body-sm mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={item.step}
              className="flex items-start gap-3 text-right bg-white rounded-xl px-3.5 py-3 border border-[#498E56]/10 shadow-sm sm:flex-col sm:items-center sm:text-center sm:px-4 sm:py-4"
            >
              <span className="flex shrink-0 w-9 h-9 sm:w-8 sm:h-8 items-center justify-center rounded-full bg-[#498E56] text-white font-bold text-sm sm:text-body-sm sm:mb-2">
                {item.step}
              </span>
              <div className="min-w-0 flex-1 sm:flex-none">
                <p className="font-extrabold text-[#1F503B] text-sm sm:text-body-base">
                  {item.title}
                </p>
                <p className="text-[#888] text-xs sm:text-body-sm mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
