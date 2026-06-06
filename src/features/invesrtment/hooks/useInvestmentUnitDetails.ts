import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/investment";

export const useInvestmentUnitDetails = (unitId: string) => {
  return useQuery({
    queryKey: ["investment-unit-details", unitId],
    queryFn: () => investmentService.getUnitById(unitId),
    enabled: !!unitId,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
