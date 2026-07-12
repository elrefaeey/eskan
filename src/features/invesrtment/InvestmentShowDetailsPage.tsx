"use client";
import { useSearchParams, useParams } from "next/navigation";
import { useInvestmentProjectDetails } from "@/features/invesrtment/hooks";
import Image from "next/image";

export default function InvestmentShowDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const formId = params.formId as string;
  const projectId = searchParams.get("project_id") ?? "";

  const { data, isLoading, isError } = useInvestmentProjectDetails(
    formId,
    projectId,
  );

  const project = data?.project;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">
          {!formId
            ? "معرف النموذج مطلوب"
            : !projectId
              ? "معرف المشروع مطلوب"
              : "لم يتم العثور على المشروع"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* صورة المشروع */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={project.img || "/assets/investment/default.png"}
            alt={project.project_name || project.name || ""}
            fill
            className="object-cover"
          />
        </div>

        {/* محتوى التفاصيل */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {project.project_name || project.name}
            </h1>
            <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm">
              {project.share_type}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  نوع المشروع
                </h3>
                <p className="text-gray-600">{project.project_type}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  الموقع
                </h3>
                <p className="text-gray-600">{project.location}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  معدل الربح
                </h3>
                <p className="text-primary font-bold text-xl">
                  {project.profit_rate}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  خيارات التقسيط
                </h3>
                <p className="text-gray-600">{project.installment_options}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  الوصف
                </h3>
                <p className="text-gray-600">{project.mini_content}</p>
              </div>
            </div>
          </div>

          {/* الوحدات المتاحة */}
          {project.units && project.units.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                الوحدات المتاحة
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.units.map((unit) => (
                  <div
                    key={unit.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <p className="font-semibold">وحدة رقم: {unit.number}</p>
                      <p className="text-body-sm text-gray-600">
                        متر السهم: {unit.share_meter_num}
                      </p>
                      <p className="text-body-sm text-gray-600">
                        سعر السهم: {unit.share_price}
                      </p>
                      <p className="text-body-sm text-gray-600">
                        عدد الأسهم: {unit.shares_num}
                      </p>
                      <p className="text-body-sm text-gray-600">
                        نوع العائد: {unit.return_type}
                      </p>
                      <p className="text-primary font-bold">
                        العائد: {unit.return_value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
