"use client";

import { useEffect, useState } from "react";
import { createChatId } from "@/services/chat";

export const useChatId = () => {
  const [chatId, setChatId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("chatId") : null
  );

  useEffect(() => {
    const initializeChatId = async () => {
      const existingChatId = localStorage.getItem("chatId");

      if (!existingChatId) {
        try {
          const newChatId = await createChatId();
          localStorage.setItem("chatId", newChatId);
          setChatId(newChatId);
        } catch {
          // Chat service unavailable — widget stays hidden until a valid id exists
        }
      } else {
        setChatId(existingChatId);
      }
    };

    initializeChatId();
  }, []);

  return chatId;
};
