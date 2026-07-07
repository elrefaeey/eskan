import { useQuery } from "@tanstack/react-query";
import { fetchMadinaProjectDetails } from "@/services/abrag-elmadina";

export default function useMadinaProjectDetails() {
  const {
    data: projectDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["madina-project-details"],
    queryFn: () => fetchMadinaProjectDetails(),
  });

  return {
    projectDetails,
    isLoading,
    error,
  };
}
