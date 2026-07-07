import { useQuery } from "@tanstack/react-query";
import { fetchCafeRestaurantUnits } from "@/services/cafe-restaurants";

interface UseCafeRestaurantUnitsParams {
  level_id: number;
  type: string;
  count?: number;
  page?: number;
}

export const useCafeRestaurantUnits = (
  params: UseCafeRestaurantUnitsParams
) => {
  return useQuery({
    queryKey: ["cafe-restaurant-units", params],
    queryFn: () => fetchCafeRestaurantUnits(params),
  });
};
