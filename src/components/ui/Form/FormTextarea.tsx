"use client";

import { useFormContext } from "react-hook-form";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  required?: boolean;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  required = false,
  className = "",
  rows = 4,
  ...textareaProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col text-right gap-1.5">
      <Label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </Label>

      <Textarea
        id={name}
        rows={rows}
        {...register(name)}
        {...textareaProps}
        className={`${error ? "border-red-500" : ""} ${className}`}
      />

      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default FormTextarea;
