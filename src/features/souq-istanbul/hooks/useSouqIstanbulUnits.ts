import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulUnits } from "@/services/souq-istanbul";

interface UseSouqIstanbulUnitsParams {
  meter_price?: number;
  space?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number?: number;
  count?: number;
  page?: number;
}

export const useSouqIstanbulUnits = (params: UseSouqIstanbulUnitsParams) => {
  return useQuery({
    queryKey: ["souq-istanbul-units", params],
    queryFn: () => fetchSouqIstanbulUnits(params),
  });
};
