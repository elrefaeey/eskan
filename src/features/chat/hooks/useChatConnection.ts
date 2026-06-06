"use client";

import { useEffect, useRef, useState } from "react";
import type { ConnectionStatus, Message } from "../types";
import { chatConfig } from "@/services/chat";

export const useChatConnection = (chatId: string | null) => {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
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
      let data = JSON.parse(event.data);
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      const id = Date.now() + Math.random();

      setMessages((prev) => {
        const isDuplicate = prev.some(
          (msg) =>
            msg.text === data.message &&
            msg.sender === data.sender &&
            Math.abs(Date.now() - (msg.timestamp || 0)) < 1000
        );

        if (isDuplicate) {
          return prev;
        }

        return [
          ...prev,
          {
            text: data.message,
            sender: data.sender,
            show_contact: data?.show_contact || false,
            show_unavailable_preference_form:
              data?.show_unavailable_preference_form || false,
            show_form: data?.show_form || false,
            id,
            images: data.images || [],
            timestamp: Date.now(),
          },
        ];
      });

      if (data.sender === "SYSTEM") {
        setIsLoading(false);
      }
    };

    socketRef.current.onerror = () => {
      setConnectionStatus("disconnected");
      setIsLoading(false);
    };

    socketRef.current.onclose = () => {
      setConnectionStatus("disconnected");
      setIsLoading(false);

      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        const delay = Math.pow(2, reconnectAttempts.current) * 1000;

        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, delay);
      } else {
        localStorage.removeItem("chatId");
        setMessages([]);
      }
    };
  };

  useEffect(() => {
    if (!chatId) return;

    connectWebSocket();

    return () => {
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
