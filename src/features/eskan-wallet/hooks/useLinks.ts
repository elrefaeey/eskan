import { getLinks } from "@/services/eskan-wallet";
import { useQuery } from "@tanstack/react-query";
import { LinksResponse } from "../types";



function useLinks() {
  return useQuery<LinksResponse>({
    queryKey: ["links"],

    queryFn: getLinks,

    staleTime: 1000 * 60, 
    retry: 1,
  });
}

export default useLinks;
