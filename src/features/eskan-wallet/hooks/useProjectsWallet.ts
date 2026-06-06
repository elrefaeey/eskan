import { useQuery } from "@tanstack/react-query";
import { getProjectsWallet } from "@/services/eskan-wallet";
import { ProjectWalletItem } from "../types";

function useProjectsWallet() {
  return useQuery<ProjectWalletItem[]>({
    queryKey: ["projects-wallet"],
    queryFn: getProjectsWallet,
    staleTime: 1000 * 60, 
    retry: 1,
  });
}

export default useProjectsWallet;
