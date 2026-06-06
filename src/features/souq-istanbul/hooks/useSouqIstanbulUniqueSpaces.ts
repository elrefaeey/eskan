import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulUniqueSpacesByNumber } from "@/services/souq-istanbul";

interface UseSouqIstanbulUniqueSpacesParams {
  meter_price?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number?: number;
}

export const useSouqIstanbulUniqueSpaces = (
  params: UseSouqIstanbulUniqueSpacesParams
) => {
  return useQuery({
    queryKey: ["souq-istanbul-unique-spaces", params],
    queryFn: () =>
      fetchSouqIstanbulUniqueSpacesByNumber({
        meter_price: params.meter_price,
        revenue: params.revenue,
        level_id: params.level_id,
        type: params.type,
        number: params.number || 0,
      }),
  });
};
