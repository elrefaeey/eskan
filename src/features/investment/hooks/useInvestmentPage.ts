"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  INVESTMENT_FORM_DEFAULTS,
  INVESTMENT_QUERY,
  INVESTMENT_ROUTES,
  INVESTMENT_STEPS,
  INVESTMENT_TIMING,
  INVESTMENT_VIEW,
  RENTAL_GOAL_VALUE,
  RENTAL_INSTALLMENT_VALUE,
} from "@/features/investment/constants";
import type { InvestmentFormData } from "@/features/investment/types";
import {
  clearFormDataFromStorage,
  clearFormIdFromStorage,
  getFormDataFromStorage,
  type InvestmentResponseData,
} from "@/services/investment";
import { useInvestmentSteps } from "./useInvestmentSteps";
import { useLoadInvestment } from "./useLoadInvestment";
import { useSubmitInvestment } from "./useSubmitInvestment";

export function useInvestmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldRestart = searchParams.get(INVESTMENT_QUERY.START) === "1";
  const shouldResume = searchParams.get(INVESTMENT_QUERY.RESUME) === "1";
  const view = searchParams.get(INVESTMENT_QUERY.VIEW);

  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const restartHandled = useRef(false);
  const resumeHandled = useRef(false);
  const rentalFetchHandled = useRef(false);

  const { formId: storedFormId, restoredData, isRestoring } =
    useLoadInvestment({ restoreSession: shouldResume && !shouldRestart });

  const {
    currentStep,
    maxReachedStep,
    isTransitioning,
    direction,
    hasLoaded,
    currentStepData,
    handleStepChange,
    goToNextStep,
    resetSteps,
  } = useInvestmentSteps();

  const {
    isSubmitting,
    investmentData,
    error: submitError,
    submitInvestment,
    reset: resetSubmit,
    setInvestmentData,
  } = useSubmitInvestment();

  const { watch, setValue, getValues, reset: resetForm } = useForm<InvestmentFormData>({
    defaultValues: INVESTMENT_FORM_DEFAULTS,
  });

  // لينك قديم rental-method → صفحة التقسيط مباشرة
  useEffect(() => {
    if (view === INVESTMENT_VIEW.RENTAL_METHOD) {
      router.replace(INVESTMENT_ROUTES.rentalShares);
    }
  }, [view, router]);

  const showRentalShares =
    view === INVESTMENT_VIEW.RENTAL && !shouldRestart;
  const showResults =
    view === INVESTMENT_VIEW.RESULTS &&
    !shouldRestart &&
    (isFormCompleted || !!investmentData);

  const handleOptionClick = async (value: string) => {
    if (!currentStepData) return;

    // العائد الإيجاري → تقسيط مباشرة (من غير اختيار كاش)
    if (
      currentStepData.field === "goal" &&
      value === RENTAL_GOAL_VALUE
    ) {
      setValue("goal", value);
      setValue("payment", RENTAL_INSTALLMENT_VALUE);
      const success = await submitInvestment(
        {
          goal: RENTAL_GOAL_VALUE,
          budget: getValues("budget") || "",
          payment: RENTAL_INSTALLMENT_VALUE,
        },
        storedFormId,
        { skipExternalRedirect: true },
      );
      if (success) {
        router.push(INVESTMENT_ROUTES.rentalShares);
      }
      return;
    }

    setValue(currentStepData.field, value);

    if (currentStep < INVESTMENT_STEPS.length) {
      setTimeout(() => {
        goToNextStep();
      }, INVESTMENT_TIMING.stepTransitionMs);
      return;
    }

    setTimeout(async () => {
      const success = await submitInvestment(getValues(), storedFormId);
      if (success) {
        setIsFormCompleted(true);
        router.push(INVESTMENT_ROUTES.results);
      }
    }, INVESTMENT_TIMING.submitDelayMs);
  };

  const handleProjectSelect = (data: InvestmentResponseData) => {
    setInvestmentData(data);
  };

  const handleBackToGoal = () => {
    setValue("goal", "");
    setValue("payment", "");
    rentalFetchHandled.current = false;
    router.push(INVESTMENT_ROUTES.investment);
  };

  useEffect(() => {
    if (!shouldRestart) {
      restartHandled.current = false;
      return;
    }
    if (restartHandled.current) return;
    restartHandled.current = true;

    clearFormIdFromStorage();
    clearFormDataFromStorage();
    resetForm(INVESTMENT_FORM_DEFAULTS);
    resetSteps();
    resetSubmit();
    setIsFormCompleted(false);
    rentalFetchHandled.current = false;
    resumeHandled.current = false;
    router.replace(INVESTMENT_ROUTES.investment);
  }, [shouldRestart, router, resetForm, resetSteps, resetSubmit]);

  useEffect(() => {
    if (shouldRestart || !shouldResume) {
      resumeHandled.current = false;
      return;
    }
    if (!restoredData || resumeHandled.current) return;
    resumeHandled.current = true;

    setInvestmentData(restoredData);
    setIsFormCompleted(true);

    const storedForm = getFormDataFromStorage();
    if (storedForm) {
      resetForm({
        goal: storedForm.investment_goal,
        budget: storedForm.budget_range || "",
        payment: storedForm.funding_source || "",
      });
    }

    const isRental =
      storedForm?.investment_goal === RENTAL_GOAL_VALUE ||
      storedForm?.funding_source === RENTAL_INSTALLMENT_VALUE;

    router.replace(
      isRental ? INVESTMENT_ROUTES.rentalShares : INVESTMENT_ROUTES.results,
    );
  }, [
    shouldRestart,
    shouldResume,
    restoredData,
    setInvestmentData,
    resetForm,
    router,
  ]);

  useEffect(() => {
    if (!showRentalShares || shouldRestart || isSubmitting) return;
    if (investmentData?.message?.trim()) return;
    if (rentalFetchHandled.current) return;

    rentalFetchHandled.current = true;
    setValue("goal", RENTAL_GOAL_VALUE);
    setValue("payment", RENTAL_INSTALLMENT_VALUE);
    void submitInvestment(
      {
        goal: RENTAL_GOAL_VALUE,
        budget: "",
        payment: RENTAL_INSTALLMENT_VALUE,
      },
      storedFormId,
      { skipExternalRedirect: true },
    );
  }, [
    showRentalShares,
    shouldRestart,
    isSubmitting,
    investmentData?.message,
    storedFormId,
    submitInvestment,
    setValue,
  ]);

  useEffect(() => {
    if (shouldRestart) return;
    if (!view) {
      setValue("goal", "");
      setValue("payment", "");
      rentalFetchHandled.current = false;
    }
  }, [view, shouldRestart, setValue]);

  useEffect(() => {
    if (showResults || showRentalShares) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showResults, showRentalShares]);

  const selectedValue = watch(currentStepData?.field || "goal");

  return {
    shouldRestart,
    isRestoring,
    showResults,
    showRentalShares,
    selectedValue,
    currentStep,
    maxReachedStep,
    isTransitioning,
    direction,
    hasLoaded,
    currentStepData,
    handleStepChange,
    handleOptionClick,
    handleBackToGoal,
    handleProjectSelect,
    isSubmitting,
    investmentData,
    submitError,
  };
}
