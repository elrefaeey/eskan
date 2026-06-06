export interface CafeRestaurantUnit {
  id: number;
  duration: string;
  number: string;
  contract: string | null;
  space: number;
  meter_price: number;
  revenue: number;
  level_id: {
    id: number;
    name: string;
  };
  type: string;
  project_id: number;
  appear: number;
  advance: number;
  img: string;
  images: string;
  installment: number;
  levelimg: string;
  location: string | null;
  project: string;
  receiving: number;
  step: string | null;
  block_id: string;
}

export interface CafeRestaurantUnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: CafeRestaurantUnit[];
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
