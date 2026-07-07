export interface ClothesUnit {
  id: number;
  number: string | number;
  space: number;
  meter_price: number;
  advance: number;
  installment: number;
  revenue: number;
  img: string;
  duration?: string;
  contract?: string | null;
  level_id?: number;
  type?: string;
  project_id?: number;
  appear?: number;
  [key: string]: any;
}

export interface ClothesUnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: ClothesUnit[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export interface ClothesImage {
  id: number;
  name: string;
  img: string;
}
