"use client";

import { useFormContext } from "react-hook-form";

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
        className="!bg-[#FCFCFC] text-[#585858] md:text-base text-sm
                                     placeholder:text-[#585858] border border-gray-300 font-semibold
                                      rounded-xl px-4 py-3 focus:ring-0 focus:border-black focus:outline-none
                                      resize-none min-h-[100px]"
        rows={3}
      />
      {error && (
        <p className="text-[#F9AEAE] mt-2 px-3 rounded-lg shadow-sm">
          *{error}
        </p>
      )}
    </div>
  );
}
