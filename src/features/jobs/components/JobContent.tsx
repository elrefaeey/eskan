"use client";
import { useJobsText } from "@/features/jobs/hooks/useJobsText";
import JobForm from "./JobsForm";

interface JobsContentProps {
  jobTitle: string;
}

export default function JobsContent({ jobTitle }: JobsContentProps) {
  const { data, isLoading, error } = useJobsText();

  if (!jobTitle) return null;

  const jobData = data?.find((job) => job.name === jobTitle);

  return (
    <div className="my-8 ">
      <div className="bg-[#EFEFEF] rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4  border-b border-gray-300">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex justify-center items-center">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary">
            متطلبات الوظيفة
          </h3>
        </div>

        <div className="p-3 sm:p-4 text-gray-700 prose max-w-full rtl ">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 sm:h-4 md:h-5 w-full bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : jobData ? (
            <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
          ) : (
            <p>لا توجد بيانات لهذه الوظيفة.</p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4  border-t border-gray-300">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex justify-center items-center">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
          </div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-primary">
            تسجيل البيانات
          </h3>
        </div>
        <JobForm
          jobTitle={jobTitle}
        />
      </div>
    </div>
  );
}
