import { Api } from "@/services/api";
import type { RelatedUnit, InvestmentLeadPayload } from "../types";

interface RelatedUnitsResponse {
  data: RelatedUnit[];
}

export const dataFormService = {
  /** Fetch related units by down payment range */
  getRelatedUnitsByDownPayment: async (
    minDownPayment: number,
    maxDownPayment: number,
    type: string,
  ): Promise<RelatedUnit[]> => {
    const res = await Api.get<RelatedUnitsResponse>(
      "investment-leads/related-units-down-payment",
      {
        min_down_payment: minDownPayment,
        max_down_payment: maxDownPayment,
        type,
      },
    );
    return res.data?.data ?? [];
  },

  /** Fetch related units by duration (medical) */
  getRelatedUnitsByDuration: async (
    duration: string,
    type: string,
  ): Promise<RelatedUnit[]> => {
    const res = await Api.get<RelatedUnitsResponse>(
      "investment-leads/related-units-duration",
      { duration, type },
    );
    return res.data?.data ?? [];
  },

  /** Submit investment lead */
  submitLead: async (payload: InvestmentLeadPayload): Promise<void> => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    await Api.post("investment-leads", formData);
  },
};
