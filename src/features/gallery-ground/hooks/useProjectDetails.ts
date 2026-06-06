import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetails } from "@/services/gallery-ground";

export default function useProjectDetails(projectId: number = 7) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project-details", projectId],
    queryFn: () => fetchProjectDetails(projectId),
  });

  return {
    projectDetails: data,
    isLoading,
    error,
  };
}
