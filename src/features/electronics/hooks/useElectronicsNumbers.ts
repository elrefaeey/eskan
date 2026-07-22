import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchElectronicsNumbers } from "@/services/electronics";

interface UseElectronicsNumbersParams {
  space?: string;
  revenue?: string;
}

export const useElectronicsNumbers = (params: UseElectronicsNumbersParams = {}) => {
  const space = params.space?.trim() || "";
  const revenue = params.revenue?.trim() || "";

  return useQuery({
    queryKey: ["electronics-numbers", space, revenue],
    queryFn: () => fetchElectronicsNumbers(compactFilterParams({ space, revenue })),
    enabled: Boolean(space && revenue),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
