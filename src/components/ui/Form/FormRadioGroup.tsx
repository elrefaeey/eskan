"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: string[];
}

const FormRadioGroup = ({ name, label, options }: FormRadioGroupProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-primary text-lg font-semibold">{label}</label>
      <div className="flex gap-6 flex-wrap">
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "flex items-center gap-3 cursor-pointer relative px-4 py-2 border rounded-lg transition-all duration-200",
              errors[name] && "border-red-500",
              "hover:border-primary hover:bg-primary/10"
            )}
          >
            <input
              {...register(name)}
              type="radio"
              value={opt}
              className="absolute opacity-0 w-0 h-0 peer"
            />
            {/* Custom radio circle */}
            <span
              className={cn(
                "w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0 flex items-center justify-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary",
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white invisible peer-checked:visible"></span>
            </span>
            <span className="text-gray-800 font-medium">{opt}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormRadioGroup;
