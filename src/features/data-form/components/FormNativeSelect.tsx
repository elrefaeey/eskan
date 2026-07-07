"use client";

import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormNativeSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  required?: boolean;
}

function FormNativeSelect({
  name,
  label,
  placeholder = "اختر",
  options,
  onChange,
  required = false,
}: FormNativeSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center w-full">
      <h5 className="font-medium text-[#1E1E1E] text-lg md:text-2xl sm:whitespace-nowrap">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </h5>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NativeSelect
            value={field.value || ""}
            onChange={(event) => {
              const value = event.target.value;
              field.onChange(value);
              onChange?.(value);
            }}
            className={cn(
              "w-full lg:w-125! border-[3px] border-[#BEBEBE] rounded-md px-3 py-2 h-auto text-base focus:bg-white bg-[#F0F0F0]",
              error && "border-red-500",
            )}
          >
            <NativeSelectOption value="" disabled>
              {placeholder}
            </NativeSelectOption>
            {options.map((opt) => (
              <NativeSelectOption key={opt.value} value={opt.value}>
                {opt.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        )}
      />

      {error && (
        <p className="text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
}

export default FormNativeSelect;
