"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { dataFormService } from "../services";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import type { UnitType, InvestmentLeadPayload, RelatedUnit } from "../types";
import {
  SALES_MAP,
  DEFAULT_RESPONSIBLE,
  RESIDENTIAL_OPTIONS,
  COMMERCIAL_OPTIONS,
  parseDownPaymentRange,
  formatNumber,
} from "../constants";

interface UseSubmitLeadParams {
  salesId?: string;
  relatedUnits: RelatedUnit[];
}

export function useSubmitLead({ salesId, relatedUnits }: UseSubmitLeadParams) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submitLead = useCallback(
    async (formValues: {
      name: string;
      phone: string;
      unitType: UnitType;
      residentialArea: string;
      commercialArea: string;
      medicalDuration: string;
      investmentGoal: string;
      selectedUnitId: number | null;
    }) => {
      const {
        name,
        phone,
        unitType,
        residentialArea,
        commercialArea,
        medicalDuration,
        investmentGoal,
        selectedUnitId,
      } = formValues;

      setIsSubmitting(true);

      const payload: InvestmentLeadPayload = {
        name,
        phone,
        category: unitType,
        responsible: SALES_MAP[salesId ?? ""] ?? DEFAULT_RESPONSIBLE,
      };

      // Residential specifics
      if (unitType === "سكني" && residentialArea) {
        const opt = RESIDENTIAL_OPTIONS[residentialArea];
        if (opt) {
          const [min, max] = parseDownPaymentRange(opt.downPayment);
          payload.down_payment = `مقدم من ${min} الى ${max}`;
        }
        if (selectedUnitId) payload.unit_id = selectedUnitId;
      }

      // Commercial specifics
      if (unitType === "تجاري") {
        if (commercialArea) {
          const opt = COMMERCIAL_OPTIONS[commercialArea];
          if (opt) {
            const [min, max] = parseDownPaymentRange(opt.downPayment);
            payload.down_payment = `من ${formatNumber(min)} حتى ${formatNumber(max)}`;
          }
        }
        if (selectedUnitId) {
          const selectedUnit = relatedUnits.find(
            (u) => u.id === selectedUnitId,
          );
          if (selectedUnit?.unit_type === "bazar") {
            payload.bazar_id = selectedUnit.id;
          } else {
            payload.unit_id = selectedUnitId;
          }
        }
        if (investmentGoal) payload.investment_goal = investmentGoal;
      }

      // Medical specifics
      if (unitType === "طبي") {
        payload.installment_period = medicalDuration;
        if (selectedUnitId) payload.unit_id = selectedUnitId;
        if (investmentGoal) payload.investment_goal = investmentGoal;
      }

      // استثمار specifics
      if (unitType === "استثمار" && investmentGoal) {
        payload.investment_goal = investmentGoal;
      }

      try {
        await dataFormService.submitLead(payload);
        setShowSuccessModal(true);
      } catch (error: unknown) {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? "حدث خطأ اثناء التسجيل";
        showErrorToast(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [salesId, relatedUnits],
  );

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    router.push("/");
  }, [router]);

  return {
    isSubmitting,
    showSuccessModal,
    submitLead,
    handleCloseSuccessModal,
  };
}
