import { useQuery } from "@tanstack/react-query";
import { fetchBazarNumbers } from "@/services/bazar";

export const useBazarNumbers = () => {
  return useQuery({
    queryKey: ["bazar-numbers"],
    queryFn: fetchBazarNumbers,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
