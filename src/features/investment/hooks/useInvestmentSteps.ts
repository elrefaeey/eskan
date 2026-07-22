import { useState, useEffect } from "react";
import {
  INVESTMENT_STEPS,
  INVESTMENT_TIMING,
} from "@/features/investment/constants";
import type { InvestmentStep } from "@/features/investment/types";

interface UseInvestmentStepsReturn {
  currentStep: number;
  maxReachedStep: number;
  isTransitioning: boolean;
  direction: "forward" | "backward";
  hasLoaded: boolean;
  currentStepData: InvestmentStep | undefined;
  handleStepChange: (newStep: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetSteps: () => void;
}

export function useInvestmentSteps(): UseInvestmentStepsReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, INVESTMENT_TIMING.pageLoadAnimationMs);

    return () => clearTimeout(timer);
  }, []);

  const currentStepData = INVESTMENT_STEPS.find(
    (step) => step.id === currentStep,
  );

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep) return;
    if (newStep < 1 || newStep > INVESTMENT_STEPS.length) return;

    setDirection(newStep > currentStep ? "forward" : "backward");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep(newStep);
      setMaxReachedStep((prev) => Math.max(prev, newStep));
      setIsTransitioning(false);
    }, INVESTMENT_TIMING.stepChangeAnimationMs);
  };

  const goToNextStep = () => {
    if (currentStep < INVESTMENT_STEPS.length) {
      handleStepChange(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(1);
    setMaxReachedStep(1);
    setIsTransitioning(false);
    setDirection("forward");
  };

  return {
    currentStep,
    maxReachedStep,
    isTransitioning,
    direction,
    hasLoaded,
    currentStepData,
    handleStepChange,
    goToNextStep,
    goToPreviousStep,
    resetSteps,
  };
}
