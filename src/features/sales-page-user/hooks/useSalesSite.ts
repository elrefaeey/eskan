import { useQuery } from "@tanstack/react-query";
import { getSalesSite } from "@/services/sales-page";

export function useSalesSite(userId: string | null, projectId: string | null) {
  return useQuery({
    queryKey: ["sales-site", userId, projectId],
    queryFn: () => getSalesSite(userId!, projectId!),
    enabled: Boolean(userId && projectId),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60_000,
  });
}
