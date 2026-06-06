import { ChatInfoPayload } from "@/features/chat/types";
import axios from "axios";

// Use environment variable or fallback to rewrite proxy
const CHAT_HTTP_URL = process.env.NEXT_PUBLIC_CHAT_HTTP_URL || "/chat-api";
const CHAT_WS_URL =
  process.env.NEXT_PUBLIC_CHAT_WS_URL || "wss://chat.enterprise-egy.com";

export const chatConfig = {
  chatHttpUrl: CHAT_HTTP_URL,
  chatWsUrl: CHAT_WS_URL,
};

export const createChatId = async (): Promise<string> => {
  const response = await axios.post(`${CHAT_HTTP_URL}/chats/create`);
  return response.data.chat_id;
};

export const submitChatInfo = async (
  payload: ChatInfoPayload
): Promise<void> => {
  await axios.post(`${CHAT_HTTP_URL}/info/add`, payload);
};
