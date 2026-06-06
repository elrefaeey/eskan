import { useMutation } from "@tanstack/react-query";
import { submitPartnerRegistration } from "@/services/partner-registration";

interface PartnerRegistrationPayload {
  city_center: string;
  address: string;
  phone: string;
  manager_name: string;
  experience_summary?: string;
  tax_card_img: File;
  id_card_image: File;
  exterior_img?: File;
}

export const usePartnerRegistration = () => {
  return useMutation({
    mutationFn: async (data: PartnerRegistrationPayload) => {
      const formData = new FormData();

      formData.append("city_center", data.city_center);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("manager_name", data.manager_name);
      formData.append("experience_summary", data.experience_summary || "");
      formData.append("tax_card_img", data.tax_card_img);
      formData.append("id_card_img", data.id_card_image);

      if (data.exterior_img) {
        formData.append("exterior_img", data.exterior_img);
      }

      return submitPartnerRegistration(formData);
    },
  });
};
