export interface Message {
  id: string | number;
  text: string;
  sender: "USER" | "SYSTEM";
  show_contact?: boolean;
  show_unavailable_preference_form?: boolean;
  show_form?: boolean;
  images?: string[];
  timestamp?: number;
}

export interface ChatFormData {
  name: string;
  phone: string;
  type?: { value: string; label: string }[];
  description?: string;
}

export interface QuickMessage {
  title: string;
  desc: string;
}

export interface ChatConfig {
  chatHttpUrl: string;
  chatWsUrl: string;
}

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export interface ChatInfoPayload {
  name: string;
  phone: string;
  chat_id: string;
  preference?: string;
  with_preferences?: boolean;
  projects?: string[];
}
