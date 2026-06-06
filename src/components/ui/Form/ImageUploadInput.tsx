"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

export interface Image {
  id: number;
  url: string;
  order: number;
}

interface ImageUploadInputProps {
  label?: string;
  fieldName?: string;
  existingImagesFieldName?: string;
  multiple?: boolean;
  required?: boolean;
  onDeleteImage?: (image: Image) => void | Promise<void>;
}

export function ImageUploadInput({
  label = "الصور",
  fieldName = "images",
  existingImagesFieldName,
  multiple = false,
  required = false,
  onDeleteImage,
}: ImageUploadInputProps) {
  const { setValue, getValues, watch, formState } = useFormContext();
  const resolvedExistingFieldName =
    existingImagesFieldName ?? `${fieldName}Url`;
  const existingImages = watch(resolvedExistingFieldName) as
    | (string | Image)[]
    | string
    | Image
    | null
    | undefined;
  const uploadedImages = watch(fieldName) as File[] | File | null | undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<(string | Image)[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingImages, setLoadingImages] = useState<(string | Image)[]>([]);

  // Load existing images
  useEffect(() => {
    if (existingImages) {
      const arr = Array.isArray(existingImages)
        ? existingImages
        : [existingImages];
      setPreviews(arr);
    }
  }, [existingImages]);

  useEffect(() => {
    const hasUploadedImages = multiple
      ? Array.isArray(uploadedImages) && uploadedImages.length > 0
      : !!uploadedImages;

    if (!hasUploadedImages && !existingImages) {
      setPreviews([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [uploadedImages, existingImages, multiple]);

  // Generate previews
  const generatePreviews = async (files: File[]) => {
    const newPreviews: string[] = [];
    for (const file of files) {
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onload = (e) => {
          if (e.target?.result) newPreviews.push(e.target.result as string);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    return newPreviews;
  };

  // Handle new uploaded files
  const handleFiles = async (files: File[]) => {
    const newPreviews = await generatePreviews(files);
    setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews);

    if (multiple) {
      const existingFiles = getValues(fieldName) || [];
      setValue(fieldName, [...existingFiles, ...files], {
        shouldValidate: true,
      });
    } else {
      setValue(fieldName, files[0], { shouldValidate: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    handleFiles(files);
  };

  const handleRemove = async (index: number) => {
    const removed = previews[index];
    if (!removed) return;

    if (typeof removed === "object" && onDeleteImage) {
      setLoadingImages((prev) => [...prev, removed]);
      try {
        await onDeleteImage(removed);
      } finally {
        setLoadingImages((prev) => prev.filter((img) => img !== removed));
      }
    }

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    const currentFiles = getValues(fieldName);
    if (multiple) {
      if (Array.isArray(currentFiles)) {
        const newFiles = currentFiles.filter((_, i) => i !== index);
        setValue(fieldName, newFiles.length > 0 ? newFiles : undefined, {
          shouldValidate: true,
        });
      }
    } else {
      setValue(fieldName, undefined, { shouldValidate: true });
    }
  };

  const openFileDialog = () => inputRef.current?.click();
  const hasError = !!formState.errors[fieldName];

  return (
    <div className="space-y-2">
      <Label
        className={hasError ? "text-rose-600" : "text-foreground font-semibold"}
      >
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </Label>

      {previews.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {previews.map((p, i) => {
            const isLoading = loadingImages.includes(p);
            return (
              <div
                key={i}
                className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border flex items-center justify-center"
              >
                <img
                  src={typeof p === "string" ? p : p.url}
                  className={`w-full h-full object-cover ${
                    isLoading ? "opacity-50" : ""
                  }`}
                />

                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="animate-spin text-white w-6 h-6" />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive hover:opacity-70 transition-all cursor-pointer text-destructive-foreground p-1 rounded-full"
                    onClick={() => handleRemove(i)}
                  >
                    <X size={12} className="text-white" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div
        onClick={openFileDialog}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : hasError
              ? "border-rose-600 bg-rose-50 dark:bg-rose-900"
              : "border-border hover:border-primary hover:bg-primary/5"
        }`}
      >
        <Upload
          size={32}
          className={hasError ? "text-rose-600" : "text-muted-foreground"}
        />

        <p
          className={
            hasError
              ? "text-rose-600 font-medium"
              : "text-foreground font-medium"
          }
        >
          {hasError
            ? (formState.errors[fieldName]?.message as string) || "ملف غير صالح"
            : "اسحب الملفات هنا أو ارفعها"}
        </p>

        {!hasError && (
          <p className="text-sm text-muted-foreground">
            اضغط هنا لتصفح الملفات
          </p>
        )}

        <Input
          type="file"
          multiple={multiple}
          id={`file-input-${fieldName}`}
          onChange={handleChange}
          className="hidden"
          ref={inputRef}
        />
      </div>
    </div>
  );
}
