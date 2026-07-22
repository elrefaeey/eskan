import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchBazarNumbers } from "@/services/bazar";

interface UseBazarNumbersParams {
  space?: string;
  revenue?: string;
}

export const useBazarNumbers = (params: UseBazarNumbersParams = {}) => {
  const space = params.space?.trim() || "";
  const revenue = params.revenue?.trim() || "";

  return useQuery({
    queryKey: ["bazar-numbers", space, revenue],
    queryFn: () => fetchBazarNumbers(compactFilterParams({ space, revenue })),
    enabled: Boolean(space && revenue),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
