import { JobItem, JobsResponse } from "@/features/jobs/types";
import { Api } from "./api";
import axios from "axios";

export const fetchJobsText = async (): Promise<JobItem[]> => {
  const res = await Api.get<JobsResponse>("/text");
  if (!res.data.success)
    throw new Error(res.data.message || "حدث خطأ في جلب البيانات");
  return res.data.data;
};

export const submitJobApplication = async (formData: FormData) => {
  // Simply post without CSRF token - backend should exclude /api/jobs from CSRF protection
  const response = await Api.post<{
    success: boolean;
    message: string;
    data?: any;
  }>("/jobs", formData);

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء إرسال البيانات");
  }

  return response.data;
};
