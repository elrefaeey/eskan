import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/investment";
import { GPI_UNITS_RETURN_TYPE } from "../constants";

export function useGpiInvestmentUnits() {
  return useQuery({
    queryKey: ["gpi-investment-units", GPI_UNITS_RETURN_TYPE],
    queryFn: () =>
      investmentService.getUnits({
        return_type: GPI_UNITS_RETURN_TYPE,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
