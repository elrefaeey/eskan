import { Api } from "./api";

interface PartnerRegistrationResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const submitPartnerRegistration = async (formData: FormData) => {
  const response = await Api.post<PartnerRegistrationResponse>(
    "/marketing-partners",
    formData,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء إرسال البيانات");
  }

  return response.data;
};
