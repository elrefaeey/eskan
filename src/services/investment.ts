import axios from "axios";
import { Api } from "./api";

// Use environment variable or fallback to rewrite proxy
const INVESTMENT_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://chat.enterprise-egy.com";

export interface InvestmentCreatePayload {
  investment_goal: string; // "rental" | "resale" | "both"
  budget_range: string; // "less100" | "100to500" | "more500"
  funding_source: string; // "cash" | "installment" | "both"
}

export interface InvestmentUnit {
  id: number;
  investment_project_id: number;
  number: string;
  share_meter_num: string;
  share_price: string;
  shares_num: number;
  contracted_shares: number;
  return_type: string;
  return_value: string;
  img: string;
}

export interface InvestmentProject {
  id: number;
  project_name: string;
  project_type: string;
  share_type: string;
  mini_content: string;
  location: string;
  profit_rate: string;
  installment_options: string;
  img: string;
  name: string | null;
  units: InvestmentUnit[];
  external_link: string;
}

export interface InvestmentResponseData {
  form_id: string;
  message: string;
  project: InvestmentProject;
  suggested_projects: InvestmentProject[];
  units: InvestmentUnit[];
}

export interface InvestmentCreateResponse {
  status: string;
  status_code: number;
  message: {
    en: string;
    ar: string;
  };
  data: InvestmentResponseData;
}

export const investmentService = {
  create: async (
    data: InvestmentCreatePayload,
  ): Promise<InvestmentCreateResponse> => {
    const response = await axios.post<InvestmentCreateResponse>(
      `${INVESTMENT_API_URL}/investment/create`,
      data,
    );
    return response.data;
  },
  submitInvestment: async (
    data: InvestmentCreatePayload,
  ): Promise<InvestmentCreateResponse> => {
    const response = await Api.post<InvestmentCreateResponse>(
      `investments`,
      data,
    );
    return response.data;
  },
  getByFormId: async (formId: string): Promise<InvestmentCreateResponse> => {
    const response = await axios.get<InvestmentCreateResponse>(
      `${INVESTMENT_API_URL}/investment/${formId}`,
    );
    return response.data;
  },

  recreate: async (
    formId: string,
    data: InvestmentCreatePayload,
  ): Promise<InvestmentCreateResponse> => {
    const response = await axios.post<InvestmentCreateResponse>(
      `${INVESTMENT_API_URL}/investment/${formId}/recreate`,
      data,
    );
    return response.data;
  },

  getUnitById: async (unitId: string): Promise<InvestmentUnit> => {
    const response = await Api.get<{ data: InvestmentUnit }>(
      `investment-units/${unitId}`,
    );
    return response.data.data;
  },

  getProjectById: async (
    formId: string,
    projectId: string,
  ): Promise<InvestmentResponseData> => {
    const response = await axios.get<{ data: InvestmentResponseData }>(
      `${INVESTMENT_API_URL}/investment/${formId}/show-details?project_id=${projectId}`,
    );
    return response.data.data;
  },
};

// Local storage utility functions
const FORM_ID_KEY = "investment_form_id";
const FORM_DATA_KEY = "investment_form_data";

export const saveFormIdToStorage = (formId: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(FORM_ID_KEY, formId);
  }
};

export const getFormIdFromStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(FORM_ID_KEY);
  }
  return null;
};

export const clearFormIdFromStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(FORM_ID_KEY);
  }
};

export const saveFormDataToStorage = (data: InvestmentCreatePayload): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
  }
};

export const getFormDataFromStorage = (): InvestmentCreatePayload | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(FORM_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const clearFormDataFromStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(FORM_DATA_KEY);
  }
};

export const reserveInvestmentUnit = async (formData: FormData) => {
  const response = await Api.post<{
    success: boolean;
    message: string;
    data?: any;
  }>("/user/investment_unit", formData);

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء الحجز");
  }

  return response.data;
};
