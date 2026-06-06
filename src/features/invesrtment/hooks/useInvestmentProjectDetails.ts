import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/investment";

export const useInvestmentProjectDetails = (
  formId: string,
  projectId: string,
) => {
  return useQuery({
    queryKey: ["investment-project-details", formId, projectId],
    queryFn: () => investmentService.getProjectById(formId, projectId),
    enabled: !!formId && !!projectId,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
