import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/investment";
import { GPI_INVESTMENT_PROJECT_ID } from "../constants";

export function useVocationalShares() {
  return useQuery({
    queryKey: ["vocational-shares", GPI_INVESTMENT_PROJECT_ID],
    queryFn: () => investmentService.getUnits(GPI_INVESTMENT_PROJECT_ID),
    staleTime: 5 * 60 * 1000,
  });
}
