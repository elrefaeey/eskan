"use client";

import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  required?: boolean;
}

function FormSelect({
  name,
  label,
  placeholder = "اختر",
  options,
  onChange,
  required = false,
}: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div  className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center w-full">
      <h5 className="font-medium text-[#1E1E1E] text-lg md:text-2xl sm:whitespace-nowrap">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </h5>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
          >
            <SelectTrigger
              className={cn(
                "w-full lg:w-125! border-[3px] border-[#BEBEBE] rounded-md px-3 py-2 h-auto text-base focus:bg-white bg-[#F0F0F0]",
                error && "border-red-500",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && (
        <p className="text-sm text-red-600">{error.message as string}</p>
      )}
    </div>
  );
}

export default FormSelect;
