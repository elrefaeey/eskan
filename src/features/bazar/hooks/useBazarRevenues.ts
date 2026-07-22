import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchBazarRevenues } from "@/services/bazar";

interface UseBazarRevenuesParams {
  space?: string;
}

export const useBazarRevenues = (params: UseBazarRevenuesParams = {}) => {
  const space = params.space?.trim() || "";

  return useQuery({
    queryKey: ["bazar-revenues", space],
    queryFn: () => fetchBazarRevenues(compactFilterParams({ space })),
    enabled: Boolean(space),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
