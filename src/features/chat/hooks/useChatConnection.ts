"use client";

import { useEffect, useRef, useState } from "react";
import type { ConnectionStatus, Message } from "../types";
import { chatConfig } from "@/services/chat";
import { logChatError } from "../utils/logChatError";

export const useChatConnection = (chatId: string | null) => {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const isClosingIntentionallyRef = useRef(false);
  const maxReconnectAttempts = 5;

  const connectWebSocket = () => {
    if (!chatId) return;

    const wsUrl = `${chatConfig.chatWsUrl}/chats/${chatId}/send`;
    setConnectionStatus("connecting");
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      setConnectionStatus("connected");
      reconnectAttempts.current = 0;
      setMessages([]);
    };

    socketRef.current.onmessage = (event) => {
      let data: Record<string, unknown>;

      try {
        data = JSON.parse(event.data);
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
      } catch (error) {
        logChatError("Failed to parse WebSocket message", error, { chatId });
        return;
      }

      const messageText = data.message;
      const senderValue = data.sender;
      if (
        typeof messageText !== "string" ||
        (senderValue !== "USER" && senderValue !== "SYSTEM")
      ) {
        logChatError("Invalid WebSocket message payload", new Error("missing message or sender"), {
          chatId,
        });
        return;
      }
      const sender = senderValue;

      const id = Date.now() + Math.random();

      setMessages((prev) => {
        const isDuplicate = prev.some(
          (msg) =>
            msg.text === messageText &&
            msg.sender === sender &&
            Math.abs(Date.now() - (msg.timestamp || 0)) < 1000
        );

        if (isDuplicate) {
          return prev;
        }

        return [
          ...prev,
          {
            text: messageText,
            sender,
            show_contact: Boolean(data.show_contact),
            show_unavailable_preference_form: Boolean(
              data.show_unavailable_preference_form
            ),
            show_form: Boolean(data.show_form),
            id,
            images: Array.isArray(data.images)
              ? data.images.filter((img): img is string => typeof img === "string")
              : [],
            timestamp: Date.now(),
          },
        ];
      });

      if (sender === "SYSTEM") {
        setIsLoading(false);
      }
    };

    socketRef.current.onerror = (event) => {
      logChatError("WebSocket error", event, { chatId, wsUrl });
      setConnectionStatus("disconnected");
      setIsLoading(false);
    };

    socketRef.current.onclose = (event) => {
      if (isClosingIntentionallyRef.current) {
        return;
      }

      setConnectionStatus("disconnected");
      setIsLoading(false);

      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        const delay = Math.pow(2, reconnectAttempts.current) * 1000;

        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, delay);
      } else {
        logChatError("WebSocket max reconnect attempts reached", event, {
          chatId,
          code: event.code,
          reason: event.reason,
        });
        localStorage.removeItem("chatId");
        setMessages([]);
      }
    };
  };

  useEffect(() => {
    if (!chatId) return;

    connectWebSocket();

    return () => {
      isClosingIntentionallyRef.current = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const sendMessage = (msg: string) => {
    if (!msg.trim()) return;

    if (socketRef.current && socketRef.current.readyState === 1) {
      socketRef.current.send(msg);
      setIsLoading(true);
    } else {
      logChatError("Cannot send message, socket not ready", new Error("socket not ready"), {
        chatId,
        readyState: socketRef.current?.readyState,
        connectionStatus,
      });
      setIsLoading(false);
      if (connectionStatus === "disconnected") {
        connectWebSocket();
      }
    }
  };

  return {
    connectionStatus,
    messages,
    isLoading,
    sendMessage,
    setIsLoading,
  };
};
