import { useQuery } from "@tanstack/react-query";
import { fetchElbadryTradeConstructionImages } from "@/services/elbadry-trade";

export const useElbadryTradeConstructionImages = () => {
  return useQuery({
    queryKey: ["elbadry-trade-construction-images"],
    queryFn: fetchElbadryTradeConstructionImages,
  });
};
