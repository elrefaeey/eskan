import { useState } from "react";
import {
  investmentService,
  InvestmentCreatePayload,
  InvestmentResponseData,
  saveFormIdToStorage,
} from "@/services/investment";
import type { InvestmentFormData } from "./useInvestmentSteps";

interface UseSubmitInvestmentReturn {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  investmentData: InvestmentResponseData | null;
  submitInvestment: (
    formData: InvestmentFormData,
    existingFormId?: string | null,
  ) => Promise<void>;
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
  ) => {
    setIsSubmitting(true);
    setError(null);

    // Transform form data to match API payload
    const payload: InvestmentCreatePayload = {
      investment_goal: formData.goal,
      budget_range: formData.budget,
      funding_source: formData.payment,
    };

    try {
      let response;

      if (existingFormId) {
        response = await investmentService.recreate(existingFormId, payload);
      } else {
        // Create new investment
        response = await investmentService.create(payload);
      }

      // Call /investments endpoint as well
      // await investmentService.submitInvestment(payload);

      if (response.status === "ok" && response.data) {
        setIsSuccess(true);
        setInvestmentData(response.data);
        saveFormIdToStorage(response.data.form_id);

        if (response.data.project?.external_link) {
          window.location.href = response.data.project.external_link;
          return;
        }
      } else {
        setError(response.message?.ar || "فشل في إرسال البيانات");
      }
    } catch (err) {
      console.error("Investment submission error:", err);
      setError("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
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
