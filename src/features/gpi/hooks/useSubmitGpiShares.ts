import { useMutation } from "@tanstack/react-query";
import { submitGpiShares } from "@/services/gpi";
import type { GpiSharesPayload } from "../types";

export const useSubmitGpiShares = () => {
  return useMutation({
    mutationFn: (data: GpiSharesPayload) => submitGpiShares(data),
  });
};
