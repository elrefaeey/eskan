import { useQuery } from "@tanstack/react-query";
import { fetchVideoLinks } from "@/services/elbadry-trade";

export const useVideoLinks = () => {
  return useQuery({
    queryKey: ["video-links"],
    queryFn: fetchVideoLinks,
  });
};
