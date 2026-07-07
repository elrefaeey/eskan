import { useQuery } from "@tanstack/react-query";
import { fetchElbadryBlocks } from "@/services/elbadry-towers";

export default function useElbadryBlocks(projectId: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["elbadry-blocks", projectId],
    queryFn: () => fetchElbadryBlocks(projectId),
  });

  const blocks =
    data?.map((block) => ({
      value: block.id.toString(),
      label: block.name,
    })) || [];

  return {
    blocks,
    blocksData: data || [],
    isLoading,
    error,
  };
}
