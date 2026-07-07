export interface Unit {
  id: number;
  duration: string;
  number: string;
  contract: string | null;
  space: number;
  meter_price: number;
  revenue: number;
  level_id: number;
  type: string;
  project_id: number;
  appear: number;
}

export interface UnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: Unit[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface UniqueNumbersResponse {
  status: boolean;
  message: string;
  data: string[];
}

export interface UniqueSpacesResponse {
  status: boolean;
  message: string;
  data: string[];
}
