"use client";

import type { QuickMessage } from "../types";

interface QuickMessagesProps {
  messages: QuickMessage[];
  onMessageClick: (message: string) => void;
}

export const QuickMessages = ({
  messages,
  onMessageClick,
}: QuickMessagesProps) => {
  return (
    <div className="w-full pb-3 mt-auto">
      <div className="overflow-x-auto scrollbar-hide px-4">
        <div className="flex gap-3 min-w-max">
          {messages.map((msg, idx) => (
            <button
              key={idx}
              aria-label={`${msg.title}: ${msg.desc}`}
              className="bg-[#1F503B] hover:bg-[#164029] transition-all
                text-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md
                border border-[#1F503B] hover:border-[#164029]
                text-right min-w-[200px] max-w-[240px] flex-shrink-0"
              onClick={() => onMessageClick(msg.title)}
              type="button"
            >
              <div className="font-semibold text-sm mb-1">{msg.title}</div>
              <div className="text-xs text-white/90">{msg.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
