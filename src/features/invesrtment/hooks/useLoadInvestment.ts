import { useState, useEffect } from "react";
import { getFormIdFromStorage } from "@/services/investment";

interface UseLoadInvestmentReturn {
  formId: string | null;
}

export function useLoadInvestment(): UseLoadInvestmentReturn {
  const [formId, setFormId] = useState<string | null>(null);

  useEffect(() => {
    // Only retrieve the stored form ID for potential recreate calls
    // Never load cached data - always show fresh questions
    const storedFormId = getFormIdFromStorage();
    if (storedFormId) {
      setFormId(storedFormId);
    }
  }, []);

  return {
    formId,
  };
}
