import { useQuery } from "@tanstack/react-query";
import { fetchBazarRevenues } from "@/services/bazar";

export const useBazarRevenues = () => {
  return useQuery({
    queryKey: ["bazar-revenues"],
    queryFn: fetchBazarRevenues,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
