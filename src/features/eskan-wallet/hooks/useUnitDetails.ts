import { useQuery } from "@tanstack/react-query";
import { getUnitDetails } from "@/services/eskan-wallet";

export const useUnitDetails = (unitId: string) => {
  return useQuery({
    queryKey: ["unit-details", unitId],
    queryFn: () => getUnitDetails(unitId),
    enabled: !!unitId,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
