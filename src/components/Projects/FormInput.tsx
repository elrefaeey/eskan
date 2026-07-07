"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required = false,
  className = "",
  ...inputProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col text-right gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>
      <Input
        id={name}
        {...register(name)}
        {...inputProps}
        className={`${error ? "border-red-500" : ""} ${className} placeholder:text-right`}
      />
      {error && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};
