import { Sparkles } from "lucide-react";

interface InvestmentAnalysisMessageProps {
  message: string;
}

export function InvestmentAnalysisMessage({
  message,
}: InvestmentAnalysisMessageProps) {
  return (
    <div className="relative bg-white border border-primary/10 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden">
      <Sparkles className="absolute top-3 left-3 w-5 h-5 text-[#498E56]/30" />
      <p className="text-[#333] text-body-base md:text-lg leading-relaxed text-right pr-0 pl-6">
        {message}
      </p>
    </div>
  );
}
