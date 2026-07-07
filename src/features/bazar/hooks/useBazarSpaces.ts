import { useQuery } from "@tanstack/react-query";
import { fetchBazarSpaces } from "@/services/bazar";

export const useBazarSpaces = () => {
  return useQuery({
    queryKey: ["bazar-spaces"],
    queryFn: fetchBazarSpaces,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
