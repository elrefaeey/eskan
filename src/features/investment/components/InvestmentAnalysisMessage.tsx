"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InvestmentAnalysisMessageProps {
  message: string;
  onComplete?: () => void;
}

const CHAR_DELAY_MS = 16;
const NAFIE_AVATAR = "/assets/chat/ai_chat-71165f62.png";

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
    <section
      className="mb-6 sm:mb-8"
      aria-label="رسالة من نافع"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-[3px] border-white bg-white shadow-md ring-1 ring-primary/15">
          <Image
            src={NAFIE_AVATAR}
            alt="نافع"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5 px-0.5">
            <p className="font-bold text-primary text-sm sm:text-base">نافع</p>
            <span className="text-[11px] sm:text-xs text-[#888] bg-[#F3F4F6] rounded-full px-2 py-0.5">
              مستشارك العقاري
            </span>
          </div>

          <div className="relative bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tr-md px-4 py-3.5 sm:px-5 sm:py-4 shadow-sm">
            <p className="text-start text-base sm:text-lg leading-relaxed text-[#222] min-h-[3rem]">
              {displayedText}
              {!isComplete && (
                <span
                  aria-hidden
                  className="inline-block w-0.5 h-[1.1em] bg-primary/70 align-middle mr-0.5 animate-pulse"
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
