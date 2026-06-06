import { useQuery } from "@tanstack/react-query";
import { fetchMedicalProjectDetails } from "@/services/medical-city-center";

export default function useMedicalProjectDetails() {
  const {
    data: projectDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["medical-project-details"],
    queryFn: () => fetchMedicalProjectDetails(),
  });

  return {
    projectDetails,
    isLoading,
    error,
  };
}
