"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
}

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  rows = 4,
  required = false,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-primary text-lg font-medium">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}{" "}
        {/* 👈 النجمة */}
      </label>

      {as === "textarea" ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "rounded-md border border-gray-300 px-3 py-2 bg-[#e8e8e8] resize-none focus:outline-none focus:ring-2 focus:ring-primary",
            error && "border-red-500",
          )}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={cn(
            "rounded-md border border-gray-300 px-3 py-2 bg-[#e8e8e8] focus:outline-none focus:ring-2 focus:ring-primary",
            error && "border-red-500",
          )}
        />
      )}

      {error && (
        <p className="text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormInput;
