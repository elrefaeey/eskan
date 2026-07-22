import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchClothesRevenues } from "@/services/clothes";

interface UseClothesRevenuesParams {
  space?: string;
}

export const useClothesRevenues = (params: UseClothesRevenuesParams = {}) => {
  const space = params.space?.trim() || "";

  return useQuery({
    queryKey: ["clothes-revenues", space],
    queryFn: () => fetchClothesRevenues(compactFilterParams({ space })),
    enabled: Boolean(space),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
