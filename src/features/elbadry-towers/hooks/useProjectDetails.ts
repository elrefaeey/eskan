import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetails } from "@/services/elbadry-towers";

export default function useProjectDetails(projectId: number = 1) {
  const {
    data: projectDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["elbadry-project-details", projectId],
    queryFn: () => fetchProjectDetails(projectId),
  });

  return {
    projectDetails,
    isLoading,
    error,
  };
}
