export interface SalesUser {
  id: number;
  name: string;
  phone: string;
  img: string | null;
}

export interface SellProject {
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface SalesSiteData {
  user: SalesUser;
  sellproject: SellProject;
}

export interface SalesSiteResponse {
  success: boolean;
  message: string;
  data: SalesSiteData;
}

export interface SalesClientPayload {
  name: string;
  phone: string;
  date: string;
  user_id: string;
  sellproject_id: string;
}

export interface SalesClientResponse {
  success: boolean;
  message: string;
  error?: boolean;
  errors?: Record<string, string[]>;
}
