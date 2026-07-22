"use client";

import InvestmentUnit from "@/features/investment/components/InvestmentUnit";
import RentalSharesListing from "@/features/investment/components/RentalSharesListing";
import {
  InvestmentStep,
  StepIndicator,
  LoadingPage,
} from "@/features/investment/components";
import {
  INVESTMENT_HERO,
  INVESTMENT_STEPS,
} from "@/features/investment/constants";
import { useInvestmentPage } from "@/features/investment/hooks/useInvestmentPage";

function InvestmentPage() {
  const {
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
  } = useInvestmentPage();

  if (isRestoring && !shouldRestart) {
    return <LoadingPage />;
  }

  if (isSubmitting && !showRentalShares && !showResults) {
    return <LoadingPage />;
  }

  if (showRentalShares) {
    return (
      <RentalSharesListing
        onBack={handleBackToGoal}
        investmentData={investmentData}
        isLoadingMessage={isSubmitting && !investmentData?.message}
        messageError={submitError}
      />
    );
  }

  if (showResults) {
    return (
      <InvestmentUnit
        investmentData={investmentData}
        onProjectSelect={handleProjectSelect}
        onBack={handleBackToGoal}
      />
    );
  }

  if (isSubmitting) {
    return <LoadingPage />;
  }

  return (
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
            {INVESTMENT_HERO.title}{" "}
            <span className="text-[#498E56]">{INVESTMENT_HERO.brandHighlight}</span>
          </h1>
          <p className="text-[#555] text-base sm:text-[18px] md:text-xl mt-2 max-w-lg mx-auto leading-relaxed">
            {INVESTMENT_HERO.subtitle}
          </p>
        </div>

        <div
          className={`mt-6 sm:mt-8 transition-all duration-1000 ease-out transform delay-200 ${
            hasLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {INVESTMENT_STEPS.length > 1 && (
            <StepIndicator
              currentStep={currentStep}
              maxReachedStep={maxReachedStep}
              onStepChange={handleStepChange}
              totalSteps={INVESTMENT_STEPS.length}
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
        </div>
      </div>
    </main>
  );
}

export default InvestmentPage;
