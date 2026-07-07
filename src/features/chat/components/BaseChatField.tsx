import type { ReactNode } from "react";

interface BaseChatFieldProps {
  children: ReactNode;
  hasError?: boolean;
  className?: string;
  label?: string;
  labelClassName?: string;
}

export const BaseChatField = ({
  children,
  hasError = false,
  className = "",
  label,
  labelClassName = "text-sm font-medium text-gray-700",
}: BaseChatFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className={labelClassName}>{label}</span>}
      <div
        className={`rounded-lg px-3 py-2 text-sm border bg-gray-50 text-gray-900 placeholder:text-gray-400 focus-within:ring-1 focus-within:ring-[#1F503B] focus-within:border-[#1F503B] transition-all ${
          hasError ? "border-red-500" : "border-gray-200"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
