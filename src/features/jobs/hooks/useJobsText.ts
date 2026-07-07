import { useQuery } from "@tanstack/react-query";
import { JobItem } from "../types";
import { fetchJobsText } from "@/services/jobs";

export const useJobsText = () => {
  return useQuery<JobItem[], Error>({
    queryKey: ["jobsText"],
    queryFn: fetchJobsText,
    staleTime: 1000 * 60 * 5, // 5 دقائق
    refetchOnWindowFocus: false,
  });
};
