import { useMutation } from "@tanstack/react-query";
import { ContactUsData } from "../types";
import { submitContactUs } from "@/services/contact-us";

export const useContactUs = () => {
  return useMutation({
    mutationFn: async (data: ContactUsData) => {
      return await submitContactUs(data);
    },
  });
};
