"use client";

import { useFormContext, Controller } from "react-hook-form";
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
  placeholder: string;
  options: Option[];
}

export function FormSelect({ name, placeholder, options }: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col ">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              aria-label={placeholder}
              className="bg-[#FCFCFC] text-[#585858]! w-full text-start placeholder:text-start
                                                     justify-between flex-row-reverse font-semibold  placeholder:text-[#585858]! border h-14! border-gray-300 rounded-xl focus:ring-0 focus:border-black"
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
        <p className="text-[#F9AEAE] mt-2  px-3 rounded-lg  shadow-sm">
          *{error}
        </p>
      )}{" "}
    </div>
  );
}
