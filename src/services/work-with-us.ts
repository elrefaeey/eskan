import { Api } from "./api";
import {
  WorkWithUsData,
  WorkWithUsResponse,
} from "@/features/work-with-us/types";

export const submitWorkWithUs = async (data: WorkWithUsData) => {
  const response = await Api.post<WorkWithUsResponse>("/seek_money", data);

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء التسجيل");
  }

  return response.data;
};
