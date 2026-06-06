import { useState, useEffect } from "react";

export type InvestmentFormData = {
  goal: string;
  budget: string;
  payment: string;
};

type StepOption = {
  value: string;
  label: string;
};

export type Step = {
  id: number;
  title: string;
  field: keyof InvestmentFormData;
  options: StepOption[];
};

export const investmentSteps: Step[] = [
  {
    id: 1,
    title: "ما هو هدفك الاستثماري؟",
    field: "goal",
    options: [
      { value: "rental", label: "دخل شهري ثابت (عائد إيجاري)" },
      { value: "resale", label: "ربح من اعادة البيع" },
      // { value: "both", label: "مزيج بين الاثنين" },
    ],
  },
  // {
  //   id: 2,
  //   title: "ما هو المبلغ الذي ترغب في تخصيصه لبداية استثمارك؟",
  //   field: "budget",
  //   options: [
  //     { value: "less100", label: "أقل من 100 ألف" },
  //     { value: "100to500", label: "من 100 ألف إلى 500 ألف" },
  //     { value: "more500", label: "أكثر من 500 ألف" },
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "طريقة الدفع المناسبة لك",
  //   field: "payment",
  //   options: [
  //     { value: "cash", label: "كاش" },
  //     { value: "installment", label: "تقسيط" },
  //     { value: "both", label: "كاش او تقسيط" },
  //   ],
  // },
];

interface UseInvestmentStepsReturn {
  currentStep: number;
  maxReachedStep: number;
  isTransitioning: boolean;
  direction: "forward" | "backward";
  hasLoaded: boolean;
  currentStepData: Step | undefined;
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
    // تفعيل الأنيميشن بعد تحميل الصفحة
    setTimeout(() => {
      setHasLoaded(true);
    }, 100);
  }, []);

  const currentStepData = investmentSteps.find(
    (step) => step.id === currentStep,
  );

  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep) return;
    if (newStep < 1 || newStep > investmentSteps.length) return;

    setDirection(newStep > currentStep ? "forward" : "backward");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep(newStep);
      setMaxReachedStep(Math.max(maxReachedStep, newStep));
      setIsTransitioning(false);
    }, 200);
  };

  const goToNextStep = () => {
    if (currentStep < investmentSteps.length) {
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
