import { useMutation } from "@tanstack/react-query";
import { submitSouqIstanbulTradeForm } from "@/services/souq-istanbul";
import { SouqIstanbulTradeFormData } from "../types/images";

export const useSubmitSouqIstanbulTradeForm = () => {
  return useMutation({
    mutationFn: (data: SouqIstanbulTradeFormData) =>
      submitSouqIstanbulTradeForm(data),
  });
};
