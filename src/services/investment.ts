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
  /** Full image URL from list API */
  path?: string;
  project_name?: string;
  share_advance?: string;
  share_installment?: string;
  installment_duration?: number;
  rental_return_type?: string;
  rental_return_value?: string;
  created_at?: string;
}

export interface InvestmentUnitsPage {
  current_page: number;
  count: number;
  data: InvestmentUnit[];
  next_page_url: string | null;
  prev_page_url: string | null;
  total_pages: number;
}

export interface InvestmentUnitsListResponse {
  success: boolean;
  message: string;
  data: InvestmentUnitsPage;
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
  data: InvestmentResponseData | null;
}

const INVESTMENT_NOT_FOUND_MESSAGE = "object was not found";

export function isInvestmentSessionNotFound(
  response?: Pick<InvestmentCreateResponse, "status" | "status_code" | "message"> | null,
): boolean {
  if (!response) return false;

  return (
    response.status_code === 400 ||
    response.status === "bad request" ||
    response.message?.en?.toLowerCase().includes(INVESTMENT_NOT_FOUND_MESSAGE) ||
    response.message?.ar?.includes("غير موجود")
  );
}

export function isInvestmentNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object" || !("response" in error)) {
    return false;
  }

  const axiosError = error as {
    response?: { data?: InvestmentCreateResponse; status?: number };
  };

  return (
    axiosError.response?.status === 400 ||
    isInvestmentSessionNotFound(axiosError.response?.data ?? null)
  );
}

async function createSessionFromStoredData(): Promise<InvestmentResponseData | null> {
  const storedFormData = getFormDataFromStorage();
  if (!storedFormData) return null;

  const response = await investmentService.create(storedFormData);

  if (response.status === "ok" && response.data) {
    saveFormIdToStorage(response.data.form_id);
    return response.data;
  }

  return null;
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

  getUnits: async (params?: {
    return_type?: string;
  }): Promise<InvestmentUnit[]> => {
    const response = await Api.get<InvestmentUnitsListResponse>(
      "investment-units",
      params,
    );

    return response.data?.data?.data ?? [];
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

  restoreSession: async (): Promise<InvestmentResponseData | null> => {
    const storedFormId = getFormIdFromStorage();
    if (!storedFormId) return null;

    try {
      const response = await investmentService.getByFormId(storedFormId);

      if (response.status === "ok" && response.data) {
        return response.data;
      }

      if (isInvestmentSessionNotFound(response)) {
        clearFormIdFromStorage();
        return createSessionFromStoredData();
      }

      return null;
    } catch (error) {
      if (isInvestmentNotFoundError(error)) {
        clearFormIdFromStorage();
        return createSessionFromStoredData();
      }

      throw error;
    }
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

/** Maps backend external URLs to on-site routes when possible. */
export function resolveProjectLink(externalLink: string): string {
  if (!externalLink) return "";
  try {
    const url = new URL(externalLink, window.location.origin);
    const path = url.pathname.toLowerCase();
    if (path.includes("bazar-level")) return "/bazar-level";
    if (path.includes("electronics-level")) return "/electronics-level";
    if (path.includes("clothes-level")) return "/clothes-level";
    if (externalLink.startsWith("/")) return externalLink;
    return externalLink;
  } catch {
    if (externalLink.includes("bazar-level")) return "/bazar-level";
    return externalLink;
  }
}

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
