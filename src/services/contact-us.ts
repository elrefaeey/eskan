import { Api } from "./api";
import { ContactUsData, ContactUsResponse } from "@/features/contact-us/types";

export const submitContactUs = async (data: ContactUsData) => {
  const response = await Api.post<ContactUsResponse>("/contact_us", {
    name: data.name,
    phone: data.phone,
    unit_type: data.unit_type,
    job: data.job,
    space: "لا يوجد",
    breif: data.breif,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء الإرسال");
  }

  return response.data;
};
