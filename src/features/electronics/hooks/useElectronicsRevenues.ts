import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsRevenues } from "@/services/electronics";

export const useElectronicsRevenues = () => {
  return useQuery({
    queryKey: ["electronics-revenues"],
    queryFn: fetchElectronicsRevenues,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
