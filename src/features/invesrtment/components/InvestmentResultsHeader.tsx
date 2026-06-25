import { RotateCcw } from "lucide-react";
import { InvestmentSectionHeading } from "./InvestmentSectionHeading";

interface InvestmentResultsHeaderProps {
  goalLabel?: string | null;
  onReanalyze?: () => void;
}

export function InvestmentResultsHeader({
  goalLabel,
  onReanalyze,
}: InvestmentResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p className="text-body-sm text-[#888] mb-1">نتيجة تحليلك الاستثماري</p>
        <InvestmentSectionHeading
          title="المشروع المناسب ليك"
          level="page"
        />
        {goalLabel && (
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-body-sm font-semibold bg-[#498E56]/10 text-[#1F503B] border border-[#498E56]/20">
            هدفك: {goalLabel}
          </span>
        )}
      </div>

      {onReanalyze && (
        <button
          type="button"
          onClick={onReanalyze}
          className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white border border-primary/25 text-primary font-semibold text-body-sm hover:bg-[#F3FAF6] hover:border-primary/40 transition-colors shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة التحليل
        </button>
      )}
    </div>
  );
}
