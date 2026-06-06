"use client";

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
  className?: string;
}

export const FormSelect = ({
  name,
  label,
  placeholder = "اختر...",
  options,
  className = "",
}: FormSelectProps) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Select onValueChange={(value) => setValue(name, value)}>
        <SelectTrigger
          className={`${error ? "border-red-500" : ""} ${className} flex-row-reverse w-full`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-xs font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};
