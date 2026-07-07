import { useState, useEffect } from "react";
import {
  getFormIdFromStorage,
  investmentService,
  type InvestmentResponseData,
} from "@/services/investment";

interface UseLoadInvestmentOptions {
  restoreSession?: boolean;
}

interface UseLoadInvestmentReturn {
  formId: string | null;
  restoredData: InvestmentResponseData | null;
  isRestoring: boolean;
}

export function useLoadInvestment(
  options: UseLoadInvestmentOptions = {},
): UseLoadInvestmentReturn {
  const { restoreSession = false } = options;
  const [formId, setFormId] = useState<string | null>(null);
  const [restoredData, setRestoredData] =
    useState<InvestmentResponseData | null>(null);
  const [isRestoring, setIsRestoring] = useState(restoreSession);

  useEffect(() => {
    setFormId(getFormIdFromStorage());
  }, []);

  useEffect(() => {
    if (!restoreSession) {
      setIsRestoring(false);
      setRestoredData(null);
      return;
    }

    let cancelled = false;

    async function loadStoredSession() {
      const storedFormId = getFormIdFromStorage();

      if (!storedFormId) {
        if (!cancelled) setIsRestoring(false);
        return;
      }

      try {
        const response = await investmentService.getByFormId(storedFormId);
        if (
          !cancelled &&
          response.status === "ok" &&
          response.data
        ) {
          setRestoredData(response.data);
        }
      } catch (error) {
        console.error("Failed to restore investment session:", error);
      } finally {
        if (!cancelled) setIsRestoring(false);
      }
    }

    setIsRestoring(true);
    loadStoredSession();

    return () => {
      cancelled = true;
    };
  }, [restoreSession]);

  return {
    formId,
    restoredData,
    isRestoring,
  };
}
