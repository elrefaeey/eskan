"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormFieldError } from "./FormFieldError";

interface FormTextareaProps {
  name: string;
  placeholder: string;
}

export function FormTextarea({ name, placeholder }: FormTextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <textarea
        {...register(name)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          "!bg-[#FCFCFC] text-[#585858] md:text-base text-sm",
          "placeholder:text-[#585858] border border-gray-300 font-semibold",
          "rounded-xl px-4 py-3 focus:ring-0 focus:border-black focus:outline-none",
          "resize-none min-h-[100px]",
          error && "border-red-400 focus:border-red-500",
        )}
        rows={3}
      />
      <FormFieldError message={error} />
    </div>
  );
}
