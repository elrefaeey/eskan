export interface BazarUnit {
  id: number;
  number: string;
  space: number;
  meter_price: number;
  advance: number;
  installment: number;
  revenue: string;
  img: string;
  section: string;
  appear: number;
  contract: string | null;
}

export interface BazarUnitsResponse {
  current_page: number;
  data: BazarUnit[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface BazarImage {
  id: number;
  name: string;
  img: string;
}
