"use client";
import InvestmentUnit from "@/features/invesrtment/components/InvestmentUnit";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  useInvestmentSteps,
  useSubmitInvestment,
  useLoadInvestment,
  type InvestmentFormData,
  investmentSteps,
} from "@/features/invesrtment/hooks";
import {
  InvestmentStep,
  StepIndicator,
  LoadingScreen,
  InvestmentStepsGrid,
} from "@/features/invesrtment/components";
import { HOW_IT_WORKS } from "@/features/invesrtment/constants/flow-steps";
import {
  InvestmentResponseData,
  clearFormDataFromStorage,
  clearFormIdFromStorage,
  getFormDataFromStorage,
} from "@/services/investment";

function Investment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldRestart = searchParams.get("start") === "1";

  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const { formId: storedFormId, restoredData, isRestoring } =
    useLoadInvestment({ restoreSession: !shouldRestart });

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

  const {
    watch,
    setValue,
    getValues,
    reset: resetForm,
  } = useForm<InvestmentFormData>({
    defaultValues: {
      goal: "",
      budget: "",
      payment: "",
    },
  });

  const handleOptionClick = async (value: string) => {
    if (!currentStepData) return;

    if (value === "rental") {
      router.push("/bazar-level");
      return;
    }

    setValue(currentStepData.field, value);

    if (currentStep < investmentSteps.length) {
      setTimeout(() => {
        goToNextStep();
      }, 300);
    } else {
      setTimeout(async () => {
        const formData = getValues();
        const success = await submitInvestment(formData, storedFormId);
        if (success) {
          setIsFormCompleted(true);
        }
      }, 400);
    }
  };

  const handleProjectSelect = (data: InvestmentResponseData) => {
    setInvestmentData(data);
  };

  const displayData = investmentData;
  const selectedValue = watch(currentStepData?.field || "goal");
  const showResults = isFormCompleted && !shouldRestart;
  const restartHandled = useRef(false);
  const resumeHandled = useRef(false);

  useEffect(() => {
    if (!shouldRestart) {
      restartHandled.current = false;
      return;
    }
    if (restartHandled.current) return;
    restartHandled.current = true;

    clearFormIdFromStorage();
    clearFormDataFromStorage();
    resetForm({ goal: "", budget: "", payment: "" });
    resetSteps();
    resetSubmit();
    setIsFormCompleted(false);
    resumeHandled.current = false;
    router.replace("/investment");
  }, [shouldRestart, router, resetForm, resetSteps, resetSubmit]);

  useEffect(() => {
    if (shouldRestart) {
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

    if (searchParams.get("resume") === "1") {
      router.replace("/investment");
    }
  }, [shouldRestart, restoredData, setInvestmentData, resetForm, router, searchParams]);

  useEffect(() => {
    if (isFormCompleted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFormCompleted]);

  if (isRestoring && !shouldRestart) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!showResults ? (
        isSubmitting ? (
          <LoadingScreen />
        ) : (
          <main className="bg-[#FAFBFC] page pt-5 sm:pt-6 text-center mx-auto pb-10 lg:mt-[82px]">
            <div className="container max-w-4xl">
              <div
                className={`transition-all duration-1000 ease-out transform ${
                  hasLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
                }`}
              >
                <h1 className="font-extrabold text-[1.625rem] sm:text-3xl lg:text-[2rem] text-[#1F503B] leading-tight">
                  استثمر مع{" "}
                  <span className="text-[#498E56]">اسكان المنصورة</span>
                </h1>
                <p className="text-[#888] text-sm sm:text-body-base md:text-lg mt-2 max-w-lg mx-auto leading-relaxed">
                  خطوة واحدة ونوصّيك بأفضل فرصة استثمارية تناسبك
                </p>
              </div>

              <div
                className={`mt-6 sm:mt-8 transition-all duration-1000 ease-out transform delay-200 ${
                  hasLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {investmentSteps.length > 1 && (
                  <StepIndicator
                    currentStep={currentStep}
                    maxReachedStep={maxReachedStep}
                    onStepChange={handleStepChange}
                    totalSteps={investmentSteps.length}
                  />
                )}

                {currentStepData && (
                  <InvestmentStep
                    title={currentStepData.title}
                    options={currentStepData.options}
                    selectedValue={selectedValue}
                    onOptionClick={handleOptionClick}
                    isTransitioning={isTransitioning}
                    direction={direction}
                  />
                )}

                {submitError && (
                  <p className="text-red-600 text-body-base mt-4 max-w-xl mx-auto bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {submitError}
                  </p>
                )}

                <InvestmentStepsGrid
                  title="إزاي تستثمر معانا؟"
                  steps={HOW_IT_WORKS}
                  variant="light"
                  centered
                  className="max-w-3xl mx-auto mt-8 sm:mt-10"
                />
              </div>
            </div>
          </main>
        )
      ) : (
        <InvestmentUnit
          investmentData={displayData}
          onProjectSelect={handleProjectSelect}
        />
      )}
    </>
  );
}

export default Investment;
