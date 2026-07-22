import { useMutation } from "@tanstack/react-query";
import { submitSalesClient } from "@/services/sales-page";
import type { SalesClientPayload } from "../types";

export function useSubmitSalesClient() {
  return useMutation({
    mutationFn: (data: SalesClientPayload) => submitSalesClient(data),
  });
}
