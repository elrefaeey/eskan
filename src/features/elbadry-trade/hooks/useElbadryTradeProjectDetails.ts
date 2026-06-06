import { useQuery } from "@tanstack/react-query";
import { fetchElbadryTradeProjectDetails } from "@/services/elbadry-trade";

export const useElbadryTradeProjectDetails = () => {
  return useQuery({
    queryKey: ["elbadry-trade-project-details"],
    queryFn: fetchElbadryTradeProjectDetails,
  });
};
