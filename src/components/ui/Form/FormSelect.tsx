"use client";

import { useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
}

const FormSelect = ({
  name,
  label,
  placeholder = "اختر...",
  options,
  required = false,
}: FormSelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-primary text-lg font-medium">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>

      <div className="relative">
        <select
          id={name}
          {...register(name)}
          className={cn(
            "w-full rounded-md border border-gray-300 py-2.5 ps-3 pe-10 bg-[#e8e8e8] appearance-none focus:outline-none focus:ring-2 focus:ring-primary",
            error && "border-red-500"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormSelect;
