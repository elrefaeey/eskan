"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormFieldError } from "./FormFieldError";

interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
  dir?: "rtl" | "ltr";
}

export function FormInput({
  name,
  placeholder,
  type = "text",
  className,
  dir = "rtl",
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          "!bg-[#FCFCFC] text-[#585858] md:text-base text-sm text-right placeholder:text-right",
          "placeholder:text-[#585858] border border-gray-300 font-semibold",
          "rounded-xl h-14 focus:ring-0 focus:border-black",
          error && "border-red-400 focus:border-red-500",
          className,
        )}
        dir={dir}
      />
      <FormFieldError message={error} />
    </div>
  );
}
