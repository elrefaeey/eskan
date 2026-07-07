"use client";

import Image from "next/image";

interface ChatAvatarProps {
  imageSrc: string;
  size?: "sm" | "md" | "lg";
}

export const ChatAvatar = ({ imageSrc, size = "md" }: ChatAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20 md:w-28 md:h-28",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-[3px] border-white bg-white rounded-full overflow-hidden flex-shrink-0`}
    >
      <Image
        src={imageSrc}
        alt="صورة المساعد"
        width={size === "lg" ? 112 : size === "md" ? 48 : 32}
        height={size === "lg" ? 112 : size === "md" ? 48 : 32}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
