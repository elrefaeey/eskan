import { Api } from "./api";
import type { GpiSharesPayload, GpiSharesResponse } from "@/features/gpi/types";

export const submitGpiShares = async (data: GpiSharesPayload) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("phone", data.phone);
  formData.append("value", data.value);

  const response = await Api.post<GpiSharesResponse>(
    "/educational-center-units",
    formData,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء الإرسال");
  }

  return response.data;
};
