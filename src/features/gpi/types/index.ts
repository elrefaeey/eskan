export interface GpiSharesPayload {
  name: string;
  phone: string;
  value: string;
}

export interface GpiSharesRecord {
  id: number;
  name: string;
  phone: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface GpiSharesResponse {
  success: boolean;
  message: string;
  data: GpiSharesRecord;
}
