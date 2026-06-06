import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulUniqueSpacesByNumber } from "@/services/souq-istanbul";

interface UseSouqIstanbulUniqueSpacesByNumberParams {
  meter_price?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number: number;
}

export const useSouqIstanbulUniqueSpacesByNumber = (
  params: UseSouqIstanbulUniqueSpacesByNumberParams,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["souq-istanbul-unique-spaces-by-number", params],
    queryFn: () => fetchSouqIstanbulUniqueSpacesByNumber(params),
    enabled: enabled && params.number > 0,
  });
};
