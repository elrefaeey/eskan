import { ChatInfoPayload } from "@/features/chat/types";
import axios from "axios";

const CHAT_WS_URL =
  process.env.NEXT_PUBLIC_CHAT_WS_URL || "wss://chat.enterprise-egy.com";

export const chatConfig = {
  chatWsUrl: CHAT_WS_URL,
};

export const createChatId = async (): Promise<string> => {
  const response = await axios.post<{ chat_id?: string; error?: string }>(
    "/api/chat/create",
  );

  if (!response.data?.chat_id) {
    throw new Error(response.data?.error || "Failed to create chat ID");
  }

  return response.data.chat_id;
};

export const submitChatInfo = async (
  payload: ChatInfoPayload,
): Promise<void> => {
  await axios.post("/api/chat/info", payload);
};
