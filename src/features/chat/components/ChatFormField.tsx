"use client";

import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import type { ChatFormData } from "../types";

interface ChatFormFieldProps {
  name: keyof ChatFormData;
  children: (hasError: boolean) => ReactNode;
  errorMessage?: string;
  errorClassName?: string;
}

const getFieldError = (errors: unknown, name: keyof ChatFormData) => {
  if (!errors || typeof errors !== "object") {
    return undefined;
  }

  return (errors as Record<string, unknown>)[name as string];
};

const getFieldErrorMessage = (fieldError: unknown) => {
  if (!fieldError || typeof fieldError !== "object") {
    return undefined;
  }

  const message = (fieldError as { message?: unknown }).message;

  return typeof message === "string" ? message : undefined;
};

export const ChatFormField = ({
  name,
  children,
  errorMessage = "هذا الحقل مطلوب",
  errorClassName = "text-xs text-red-500 -mt-1",
}: ChatFormFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<ChatFormData>();

  const fieldError = getFieldError(errors, name);
  const hasError = Boolean(fieldError);
  const message = getFieldErrorMessage(fieldError) ?? errorMessage;

  return (
    <>
      {children(hasError)}
      {hasError && <span className={errorClassName}>{message}</span>}
    </>
  );
};
