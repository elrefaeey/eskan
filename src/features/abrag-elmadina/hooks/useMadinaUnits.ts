import { useQuery } from "@tanstack/react-query";
import { fetchMadinaUnits } from "@/services/abrag-elmadina";

export default function useMadinaUnits(
  step: string = "ثانيه",
  type: string = "سكنى"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["madina-units", step, type],
    queryFn: () => fetchMadinaUnits(step, { type }),
  });

  return {
    units: data?.data || [],
    isLoading,
    error,
  };
}
