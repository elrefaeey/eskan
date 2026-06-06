"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
}

export function FormInput({
  name,
  placeholder,
  type = "text",
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
        className="!bg-[#FCFCFC] text-[#585858] md:text-base text-sm
                                     placeholder:text-[#585858] border border-gray-300 font-semibold
                                      rounded-xl h-14 focus:ring-0 focus:border-black"
      />
      {error && (
        <p className="text-[#F9AEAE] mt-2  px-3 rounded-lg  shadow-sm">
          *{error}
        </p>
      )}{" "}
    </div>
  );
}
