"use client";

import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import type { Message } from "../types";

interface ChatMessageProps {
  message: Message;
  onImageClick: (imageUrl: string) => void;
  chatImage: string;
}

export const ChatMessage = ({
  message,
  onImageClick,
  chatImage,
}: ChatMessageProps) => {
  const isSystem = message.sender === "SYSTEM";

  // Clean and validate image URLs
  const cleanImageUrl = (url: string) => {
    try {
      // Decode URI components and re-encode properly
      const decoded = decodeURIComponent(url);
      return encodeURI(decoded);
    } catch {
      return url;
    }
  };

  const validImages =
    message.images?.filter((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }) || [];

  return (
    <div
      className={`flex text-end ${
        isSystem ? "justify-start" : "justify-end"
      } mb-3 gap-1`}
    >
      {isSystem && (
        <div className="w-8 h-8 border-2 border-white bg-white rounded-full overflow-hidden ml-1.5 shrink-0">
          <Image
            src={chatImage}
            alt="صورة المساعد"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={`rounded-xl px-3.5 py-2.5 max-w-[85%] shadow-sm ${
          isSystem
            ? "bg-white text-gray-900 border border-gray-100"
            : "bg-[#1F503B] text-white"
        }`}
      >
        <div className="relative z-10">
          {validImages.length > 0 && (
            <div className="mb-3 space-y-2">
              {validImages.map((imageUrl, imgIndex) => {
                const cleanUrl = cleanImageUrl(imageUrl);
                return (
                  <div
                    key={`img-${imgIndex}-${cleanUrl.slice(-20)}`}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => onImageClick(cleanUrl)}
                  >
                    <Image
                      src={cleanUrl}
                      alt={`صورة ${imgIndex + 1}`}
                      width={400}
                      height={200}
                      className="w-full rounded-lg object-cover max-h-48 transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          className="w-5 h-5 text-gray-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-start text-lg leading-relaxed">{message.text}</p>

          {message.show_contact && (
            <div className="mt-2.5 flex flex-col gap-1">
              <a href="tel:01095665809">
                <div className="bg-[#1F503B] hover:bg-[#164029] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white justify-between shadow-sm">
                  <FaPhone className="text-lg" />
                  <p className="font-medium text-lg">01095665809</p>
                </div>
              </a>

              <a href="tel:0502228618">
                <div className="bg-[#1F503B] hover:bg-[#164029] transition-colors px-3 py-2 rounded-lg flex items-center gap-2 text-white justify-between shadow-sm">
                  <FaPhone className="text-lg" />
                  <p className="font-medium text-lg">0502228618</p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
