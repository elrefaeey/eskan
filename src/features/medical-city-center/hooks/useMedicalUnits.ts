import { useQuery } from "@tanstack/react-query";
import { fetchMedicalUnits } from "@/services/medical-city-center";

export default function useMedicalUnits(type: string = "طبى") {
  const { data, isLoading, error } = useQuery({
    queryKey: ["medical-units", type],
    queryFn: () => fetchMedicalUnits({ type }),
  });

  return {
    units: data?.data || [],
    isLoading,
    error,
  };
}
