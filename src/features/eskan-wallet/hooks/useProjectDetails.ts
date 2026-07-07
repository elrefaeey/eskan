import { useQuery } from "@tanstack/react-query";
import { ProjectDetails } from "../types";
import { getProjectDetails } from "@/services/eskan-wallet";

export default function useProjectDetails(id: string) {
  return useQuery<ProjectDetails>({
    queryKey: ["project-details", id],
    queryFn: () => getProjectDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
