"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface InvestmentAnalysisMessageProps {
  message: string;
  onComplete?: () => void;
}

const CHAR_DELAY_MS = 18;

export function InvestmentAnalysisMessage({
  message,
  onComplete,
}: InvestmentAnalysisMessageProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setDisplayedText(message.slice(0, index));
      if (index >= message.length) {
        clearInterval(timer);
        setIsComplete(true);
        onComplete?.();
      }
    }, CHAR_DELAY_MS);

    return () => clearInterval(timer);
  }, [message, onComplete]);

  return (
    <div className="relative bg-white border border-primary/10 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden">
      <Sparkles className="absolute top-3 left-3 w-5 h-5 text-[#498E56]/30" />
      <p className="text-[#333] text-body-base md:text-lg leading-relaxed text-right pr-0 pl-6 min-h-[4.5rem]">
        {displayedText}
        {!isComplete && (
          <span
            aria-hidden
            className="inline-block w-0.5 h-[1.1em] bg-primary/70 align-middle mr-0.5 animate-pulse"
          />
        )}
      </p>
    </div>
  );
}
