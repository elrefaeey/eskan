import axios from "axios";
import { CafeRestaurantUnitsResponse } from "@/features/cafe-restaurants/types";

interface FetchCafeRestaurantUnitsParams {
  level_id: number;
  type: string;
  count?: number;
  page?: number;
}

export const fetchCafeRestaurantUnits = async (
  params: FetchCafeRestaurantUnitsParams
): Promise<CafeRestaurantUnitsResponse> => {
  const response = await axios.get<CafeRestaurantUnitsResponse>("/api/units", {
    params: {
      paginate: 1,
      meter_price: 0,
      space: 0,
      revenue: 0,
      level_id: params.level_id,
      type: params.type,
      number: 0,
      count: params.count || 3,
      project_id: 4,
      appear: 1,
      page: params.page || 1,
    },
  });
  return response.data;
};
