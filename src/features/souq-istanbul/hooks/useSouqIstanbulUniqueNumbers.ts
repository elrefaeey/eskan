import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulUniqueNumbers } from "@/services/souq-istanbul";

interface UseSouqIstanbulUniqueNumbersParams {
  meter_price?: number;
  space?: number;
  revenue?: number;
  level_id: number;
  type: string;
}

export const useSouqIstanbulUniqueNumbers = (
  params: UseSouqIstanbulUniqueNumbersParams
) => {
  return useQuery({
    queryKey: ["souq-istanbul-unique-numbers", params],
    queryFn: () => fetchSouqIstanbulUniqueNumbers(params),
  });
};
