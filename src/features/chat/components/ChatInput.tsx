"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      handleSend();
    }
  };

  return (
    <div className="relative p-2 bg-linear-to-t from-white to-gray-50/50">
      <div
        className="flex items-center gap-2 bg-white rounded-xl
       shadow-md border border-gray-100 p-1 hover:shadow-lg transition-shadow
        duration-300"
      >
        <input
          type="text"
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 disabled:cursor-not-allowed disabled:opacity-70
             outline-none bg-transparent text-[16px] text-right text-gray-900
             placeholder:text-gray-400 px-2.5 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={disabled}
          onKeyPress={handleKeyPress}
        />

        <button
          disabled={newMessage.length === 0 || disabled}
          aria-label="إرسال الرسالة"
          className="bg-linear-to-br
           from-[#1F503B] to-[#2a6d4f] hover:from-[#164029] hover:to-[#1F503B]
            transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed 
            text-white p-2 rounded-lg  shadow-sm hover:shadow-md hover:scale-105
            flex items-center justify-center shrink-0 group"
          onClick={handleSend}
        >
          <Send className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};
