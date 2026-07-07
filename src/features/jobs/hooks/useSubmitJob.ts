import { useMutation } from "@tanstack/react-query";
import { submitJobApplication } from "@/services/jobs";

interface JobSubmitData {
  job_title: string;
  name: string;
  phone: string;
  facebook?: string;
  cv: File;
  last_project?: File | null;
  last_project_info?: string;
}

export const useSubmitJob = () => {
  return useMutation({
    mutationFn: async (data: JobSubmitData) => {
      const formData = new FormData();

      // Add fields in the exact order as old website
      formData.append("job_title", data.job_title);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("facebook", data.facebook || "");
      formData.append("cv", data.cv);

      // Add optional fields
      if (data.last_project) {
        formData.append("last_project", data.last_project);
      }

      if (data.last_project_info) {
        formData.append("last_project_info", data.last_project_info);
      }

      return submitJobApplication(formData);
    },
  });
};
