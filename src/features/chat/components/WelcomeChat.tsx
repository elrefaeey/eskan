"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ChatWindow } from "./ChatWindow";
import { useChatConnection, useChatId, useWelcomeMessages } from "../hooks";

interface WelcomeChatProps {
  chatImageSrc?: string;
}

export const WelcomeChat = ({
  chatImageSrc = "/assets/chat/ai_chat-71165f62.png",
}: WelcomeChatProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showBadge, setShowBadge] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const chatId = useChatId();
  const { connectionStatus, messages, isLoading, sendMessage } =
    useChatConnection(chatId);
  const { stackedMessages } = useWelcomeMessages(isChatOpen);

  // Show messages one by one, then hide all together
  useEffect(() => {
    if (isChatOpen) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setVisibleMessages([0]);
        setShowBadge(true);
        const audio = new Audio("/assets/chat/notification.mp3");
        audio.volume = 1;
        audio.play().catch(() => {});
      }, 5000),
    );

    timers.push(
      setTimeout(() => {
        setVisibleMessages([0, 1]);
      }, 8000),
    );

    timers.push(
      setTimeout(() => {
        setVisibleMessages([0, 1]);
      }, 11000),
    );

    timers.push(
      setTimeout(() => {
        setVisibleMessages([]);
      }, 14000),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isChatOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isChatOpen &&
        chatRef.current &&
        !chatRef.current.contains(event.target as Node)
      ) {
        setIsChatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Prevent body scroll when chat is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    // Hide badge when chat opens
    if (!isChatOpen) {
      setShowBadge(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000]" ref={chatRef}>
      {/* Welcome Message Bubble */}

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && chatId && (
          <ChatWindow
            isOpen={isChatOpen}
            onClose={toggleChat}
            messages={messages}
            connectionStatus={connectionStatus}
            isLoading={isLoading}
            chatId={chatId}
            onSendMessage={sendMessage}
            chatImage={chatImageSrc}
          />
        )}
      </AnimatePresence>

      {/* Floating Messages Stack Above Button */}
      <AnimatePresence>
        {!isChatOpen && visibleMessages.length > 0 && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2 w-60">
            {visibleMessages.map((index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-200 "
                variants={fadeUp}
                transition={{ duration: 0.3 }}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <p className="text-sm text-gray-800 font-medium">
                  {stackedMessages[index]}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <div className="relative">
        <motion.button
          aria-label={isChatOpen ? "إغلاق الدردشة" : "فتح الدردشة"}
          className="relative cursor-pointer bg-linear-to-br from-[#1F503B] to-[#2a6d4f]
            text-white rounded-full shadow-2xl hover:shadow-xl
            w-14 h-14 flex items-center justify-center
            transition-all duration-300 z-10"
          initial={{ scale: 1 }}
          animate={isChatOpen ? { scale: 0.9 } : { scale: [1, 1.05, 1] }}
          transition={
            isChatOpen
              ? { duration: 0.3 }
              : {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }
          }
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {!isChatOpen && (
            <span className="absolute inset-0 rounded-full bg-[#1F503B]/30 animate-ping" />
          )}

          {isChatOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 relative z-10"
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </motion.button>

        {/* Unread Messages Badge */}
        {!isChatOpen && showBadge && (
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white
              rounded-full w-5 h-5 flex items-center justify-center
              text-xs font-bold shadow-lg z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            key={visibleMessages.length}
          >
            {visibleMessages.length > 0 ? visibleMessages.length : 3}
          </motion.div>
        )}
      </div>
    </div>
  );
};
