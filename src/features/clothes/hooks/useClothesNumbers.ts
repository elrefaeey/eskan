import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchClothesNumbers } from "@/services/clothes";

interface UseClothesNumbersParams {
  space?: string;
  revenue?: string;
}

export const useClothesNumbers = (params: UseClothesNumbersParams = {}) => {
  const space = params.space?.trim() || "";

  return useQuery({
    queryKey: ["clothes-numbers", space],
    queryFn: () =>
      fetchClothesNumbers(compactFilterParams({ space })),
    enabled: Boolean(space),
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
