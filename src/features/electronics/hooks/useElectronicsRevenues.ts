import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchElectronicsRevenues } from "@/services/electronics";

interface UseElectronicsRevenuesParams {
  space?: string;
}

export const useElectronicsRevenues = (params: UseElectronicsRevenuesParams = {}) => {
  const space = params.space?.trim() || "";

  return useQuery({
    queryKey: ["electronics-revenues", space],
    queryFn: () => fetchElectronicsRevenues(compactFilterParams({ space })),
    enabled: Boolean(space),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
