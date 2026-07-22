import { Api } from "./api";
import type {
  SalesClientPayload,
  SalesClientResponse,
  SalesSiteResponse,
} from "@/features/sales-page-user/types";

export const getSalesSite = async (userId: string, projectId: string) => {
  const response = await Api.get<SalesSiteResponse>("/sells/site", {
    user_id: userId,
    project_id: projectId,
  });

  if (!response.data?.success || !response.data?.data) {
    throw new Error(response.data?.message || "تعذر تحميل بيانات الصفحة");
  }

  return response.data.data;
};

export const submitSalesClient = async (data: SalesClientPayload) => {
  const response = await Api.post<SalesClientResponse>(
    "/sells/project/client",
    data,
  );

  if (response.data?.error || response.data?.errors) {
    const firstError = response.data.errors
      ? Object.values(response.data.errors)[0]?.[0]
      : response.data.message;
    throw new Error(firstError || "حدث خطأ أثناء التسجيل");
  }

  return response.data;
};
