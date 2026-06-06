import { useQuery } from "@tanstack/react-query";
import { fetchCityCenterProjectDetails } from "@/services/city-center";

export const useCityCenterProjectDetails = () => {
  return useQuery({
    queryKey: ["city-center-project-details"],
    queryFn: fetchCityCenterProjectDetails,
  });
};
