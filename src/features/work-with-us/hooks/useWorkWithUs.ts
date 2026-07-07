import { useMutation } from "@tanstack/react-query";
import { WorkWithUsData } from "../types";
import { submitWorkWithUs } from "@/services/work-with-us";

export const useWorkWithUs = () => {
  return useMutation({
    mutationFn: async (data: WorkWithUsData) => {
      return await submitWorkWithUs(data);
    },
  });
};
