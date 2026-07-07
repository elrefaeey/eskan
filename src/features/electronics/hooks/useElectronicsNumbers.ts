import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsNumbers } from "@/services/electronics";

export const useElectronicsNumbers = () => {
  return useQuery({
    queryKey: ["electronics-numbers"],
    queryFn: fetchElectronicsNumbers,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
