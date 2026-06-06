"use client";
import InvestmentUnit from "@/features/invesrtment/components/InvestmentUnit";
import React, { useState } from "react";
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
} from "@/features/invesrtment/components";
import { InvestmentResponseData } from "@/services/investment";

function Investment() {
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const { formId: storedFormId } = useLoadInvestment();

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

    setValue(currentStepData.field, value);

    if (currentStep < investmentSteps.length) {
      setTimeout(() => {
        goToNextStep();
      }, 300);
    } else {
      setTimeout(async () => {
        const formData = getValues();
        await submitInvestment(formData, storedFormId);
        setIsFormCompleted(true);
      }, 400);
    }
  };

  const handleReanalyze = () => {
    resetForm();
    resetSteps();
    resetSubmit();
    setIsFormCompleted(false);
  };

  const handleProjectSelect = (data: InvestmentResponseData) => {
    setInvestmentData(data);
  };

  const displayData = investmentData;

  const selectedValue = watch(currentStepData?.field || "goal");

  return (
    <>
      {!isFormCompleted ? (
        isSubmitting ? (
          <LoadingScreen />
        ) : (
          <main className="bg-[#FAFBFC] page pt-4 text-center mx-auto pb-4 px-4 lg:mt-[82px] ">
            <div className="container ">
              <div
                className={`transition-all  duration-1000 ease-out transform ${
                  hasLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
                }`}
              >
                <h2 className="font-extrabold text-2xl md:text-3xl lg:text-4xl text-[#1F503B]">
                  استثمر مع{" "}
                  <span className="text-[#498E56]">اسكان المنصورة</span>
                </h2>
                {/* <p className="text-[#1E1E1E] text-lg lg:text-xl xl:text-2xl mt-2">
                  للحصول علي افضل استثمار برجاء الاجابة علي تلك الاسئلة
                </p> */}
              </div>

              <div
                className={`my-4  transition-all duration-1000 ease-out transform delay-200 ${
                  hasLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <StepIndicator
                  currentStep={currentStep}
                  maxReachedStep={maxReachedStep}
                  onStepChange={handleStepChange}
                  totalSteps={investmentSteps.length}
                />

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

                {/* <div className="mt-4 sm:mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="text-[#2D2D2DB8] underline hover:text-[#498E56] transition-colors duration-300 text-sm sm:text-base md:text-lg font-medium"
                  >
                    تخطي
                  </button>
                </div> */}
              </div>
            </div>
          </main>
        )
      ) : (
        <InvestmentUnit
          investmentData={displayData}
          onReanalyze={handleReanalyze}
          onProjectSelect={handleProjectSelect}
        />
      )}
    </>
  );
}

export default Investment;
