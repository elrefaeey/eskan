"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { MdUpload } from "react-icons/md";

interface FormFileUploadProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  icon?: React.ReactNode;
  required?: boolean;
}

const FormFileUpload = ({
  name,
  label,
  accept = "*",
  multiple = false,
  icon,
  required = false, 
}: FormFileUploadProps) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);

    setValue(name, multiple ? fileArray : fileArray[0], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-primary text-lg font-medium">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>

      <div
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer border transition bg-[#e8e8e8]",
          "hover:bg-[#dcdcdc] hover:border-primary",
          errors[name] ? "border-red-500" : "border-gray-300"
        )}
      >
        {/* Icon */}
        {icon || <MdUpload className="text-xl opacity-70" />}

        {/* File names or placeholder */}
        <span className="text-gray-700">
          {selectedFiles.length > 0
            ? selectedFiles.map((f) => f.name).join(", ")
            : "اختر ملف"}
        </span>
      </div>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {/* Error */}
      {errors[name] && (
        <p className="text-sm text-red-600">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default FormFileUpload;
