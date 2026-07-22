"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChatMessage } from "./ChatMessage";
import { ChatForm } from "./ChatForm";
import { ChatInput } from "./ChatInput";
import { QuickMessages } from "./QuickMessages";
import { ChatAvatar } from "./ChatAvatar";
import type { Message, ChatFormData, ConnectionStatus } from "../types";
import { QUICK_MESSAGES } from "../constants";
import { submitChatInfo } from "@/services/chat";
import { logChatError } from "../utils/logChatError";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  chatId: string;
  onSendMessage: (message: string) => void;
  chatImage: string;
}

export const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  connectionStatus,
  isLoading,
  chatId,
  onSendMessage,
  chatImage,
}: ChatWindowProps) => {
  const [showQuickMessages, setShowQuickMessages] = useState(true);
  const [showForm, setShowForm] = useState<string | number | false>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowQuickMessages(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "SYSTEM") {
      if (
        lastMessage.show_form ||
        lastMessage.show_unavailable_preference_form
      ) {
        setShowForm(lastMessage.id);
      } else {
        setShowForm(false);
      }
    }
  }, [messages]);

  const handleQuickMessageClick = (message: string) => {
    onSendMessage(message);
    setShowQuickMessages(false);
  };

  const handleUserSendMessage = (message: string) => {
    onSendMessage(message);
    setShowQuickMessages(false);
  };

  const handleFormSubmit = async (data: ChatFormData, message: Message) => {
    let messageText = `الاسم: ${data.name}\nرقم الهاتف: ${data.phone}`;

    if (message.show_unavailable_preference_form) {
      messageText += `\nمواصفات الوحدة: ${data.description}`;
    }

    if (message.show_form && !message.show_unavailable_preference_form) {
      messageText += `\nنوع المشروع: ${data.type
        ?.map((i) => i.value)
        .join(" , ")}`;
    }

    onSendMessage(messageText);

    const payload: any = {
      name: data.name,
      phone: data.phone,
      chat_id: chatId,
      job: "-",
    };

    if (message.show_unavailable_preference_form) {
      payload.preference = data.description;
      payload.with_preferences = true;
    }

    if (message.show_form && !message.show_unavailable_preference_form) {
      payload.projects = data?.type?.map((i) => i.value);
      payload.with_preferences = false;
    }

    try {
      await submitChatInfo(payload);
      setShowForm(false);
    } catch (error) {
      logChatError("Chat form submit failed", error, { chatId });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="fixed z-[5000000000001] rounded-none sm:rounded-2xl shadow-2xl
          inset-0 sm:inset-auto sm:bottom-32 sm:right-8
          w-full h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh_-_130px)]
          sm:w-[450px] flex flex-col overflow-hidden"
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-primary border-b border-gray-200 shrink-0 sm:rounded-t-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatAvatar imageSrc={chatImage} />
            <div>
              <h2 className="font-semibold text-white text-lg">نافع</h2>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    connectionStatus === "connected"
                      ? "bg-green-500"
                      : connectionStatus === "connecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs text-gray-100">
                  {connectionStatus === "connected"
                    ? "متصل"
                    : "جاري الاتصال..."}
                </span>
                <span className="text-white text-sm"> (تحت التجربة)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="إغلاق الدردشة"
            className="text-gray-400 scale-[-1] rotate-180 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
            <div className="p-2 flex-grow">
              {messages.map((message, index) => (
                <div key={`${message.id}-${index}`}>
                  {showForm === message.id ? (
                    <ChatForm
                      message={message}
                      chatId={chatId}
                      onSubmit={handleFormSubmit}
                    />
                  ) : (
                    <ChatMessage
                      message={message}
                      onImageClick={setSelectedImage}
                      chatImage={chatImage}
                    />
                  )}
                </div>
              ))}
            </div>

            <div ref={messagesEndRef} />

            {showQuickMessages && !showForm && (
              <QuickMessages
                messages={QUICK_MESSAGES}
                onMessageClick={handleQuickMessageClick}
              />
            )}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start gap-1.5 px-4 pb-3">
              <ChatAvatar imageSrc={chatImage} size="sm" />
              <div className="rounded-xl px-3 py-2 bg-white shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-1 border-t border-gray-200 bg-white shrink-0">
          {!showForm && (
            <ChatInput
              onSendMessage={handleUserSendMessage}
              disabled={isLoading}
            />
          )}
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[50000000000002] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="صورة مكبرة"
              width={800}
              height={600}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90
                text-white rounded-full w-8 h-8 flex items-center justify-center
                transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};
