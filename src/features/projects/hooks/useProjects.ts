import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/services/projects";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};
