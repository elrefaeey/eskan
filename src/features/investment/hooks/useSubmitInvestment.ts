"use client";

import { useState } from "react";
import {
  investmentService,
  InvestmentCreatePayload,
  InvestmentResponseData,
  saveFormIdToStorage,
  saveFormDataToStorage,
  clearFormIdFromStorage,
  resolveProjectLink,
  isInvestmentNotFoundError,
  isInvestmentSessionNotFound,
} from "@/services/investment";
import type { InvestmentFormData } from "@/features/investment/types";

export interface SubmitInvestmentOptions {
  /** لا تعمّل redirect لو المشروع له external_link (مسار العائد الإيجاري) */
  skipExternalRedirect?: boolean;
}

interface UseSubmitInvestmentReturn {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  investmentData: InvestmentResponseData | null;
  submitInvestment: (
    formData: InvestmentFormData,
    existingFormId?: string | null,
    options?: SubmitInvestmentOptions,
  ) => Promise<boolean>;
  reset: () => void;
  setInvestmentData: (data: InvestmentResponseData) => void;
}

export function useSubmitInvestment(): UseSubmitInvestmentReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [investmentData, setInvestmentData] =
    useState<InvestmentResponseData | null>(null);

  const submitInvestment = async (
    formData: InvestmentFormData,
    existingFormId?: string | null,
    options?: SubmitInvestmentOptions,
  ) => {
    setIsSubmitting(true);
    setError(null);

    const payload: InvestmentCreatePayload = {
      investment_goal: formData.goal,
      budget_range: formData.budget,
      funding_source: formData.payment,
    };

    try {
      let response;

      if (existingFormId) {
        try {
          response = await investmentService.recreate(existingFormId, payload);
        } catch (error) {
          if (isInvestmentNotFoundError(error)) {
            clearFormIdFromStorage();
            response = await investmentService.create(payload);
          } else {
            throw error;
          }
        }

        if (isInvestmentSessionNotFound(response)) {
          clearFormIdFromStorage();
          response = await investmentService.create(payload);
        }
      } else {
        response = await investmentService.create(payload);
      }

      if (response.status === "ok" && response.data) {
        setIsSuccess(true);
        setInvestmentData(response.data);
        saveFormIdToStorage(response.data.form_id);
        saveFormDataToStorage(payload);

        if (
          !options?.skipExternalRedirect &&
          response.data.project?.external_link
        ) {
          window.location.href = resolveProjectLink(
            response.data.project.external_link,
          );
          return true;
        }

        return true;
      }

      setError(response.message?.ar || "فشل في إرسال البيانات");
      return false;
    } catch (err) {
      console.error("Investment submission error:", err);
      setError("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
    setInvestmentData(null);
  };

  return {
    isSubmitting,
    isSuccess,
    error,
    investmentData,
    submitInvestment,
    reset,
    setInvestmentData,
  };
}
