"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import FormFileUpload from "@/components/ui/Form/FormFileUploadInput";
import SubmitButton from "@/components/ui/Form/SubmitFormButton";
import FormInput from "@/components/ui/Form/FormInput";
import { useSubmitJob } from "../hooks/useSubmitJob";
import SuccessModal from "@/components/ui/SuccessModal";

const workWithUsSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب ويجب أن يكون أكثر من 3 حروف"),
  phone: z
    .string()
    .min(8, "رقم الهاتف غير صالح")
    .max(15, "رقم الهاتف غير صالح"),

  facebookLink: z.string().url("لينك فيسبوك غير صالح").optional(),
  project_info: z.string().optional(),

  cv: z
    .any()
    .refine((file) => file instanceof File, "يرجى رفع ملف الـ CV")
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
          file?.type
        ),
      "صيغة الملف يجب أن تكون PDF أو JPG أو PNG"
    ),

  last_project: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        (Array.isArray(files) &&
          (files as File[]).every((f: File) => f instanceof File)),
      "اختر ملفات صحيحة"
    )
    .refine(
      (files) =>
        !files ||
        (files as File[]).every((file: File) =>
          ["image/jpeg", "image/png"].includes(file.type)
        ),
      "الصيغ المسموحة لآخر 3 تصاميم هي JPG و PNG فقط"
    ),
});

type WorkWithUsSchema = z.infer<typeof workWithUsSchema>;

interface JobFormProps {
  jobTitle: string;
}

const JobForm = ({ jobTitle }: JobFormProps) => {
  const methods = useForm<WorkWithUsSchema>({
    resolver: zodResolver(workWithUsSchema),
  });

  const { handleSubmit, reset } = methods;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: submitJob, isPending } = useSubmitJob();

  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const submitHandler = async (data: WorkWithUsSchema) => {
    if (!data.cv) return;

    if (jobTitle === "جرافيك ديزاين" && !data.last_project) return;

    const submitData = {
      job_title: jobTitle,
      name: data.name,
      phone: data.phone,
      facebook: data.facebookLink || "",
      cv: data.cv,
      last_project: data.last_project
        ? Array.isArray(data.last_project)
          ? data.last_project[0]
          : null
        : null,
      last_project_info: data.project_info || "",
    };

    submitJob(submitData, {
      onSuccess: () => {
        setShowSuccessModal(true);
        reset();
        if (formRef.current) {
          formRef.current.reset();
        }
      },
      onError: (error) => {
        alert(error.message || "حدث خطأ، حاول مرة أخرى");
      },
    });
  };

  // -------------------- RENDER --------------------

  return (
    <FormProvider {...methods}>
      <motion.form
        ref={formRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-[#EFEFEF] px-3 pb-4 sm:px-4 rounded-lg"
        onSubmit={handleSubmit(submitHandler)}
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <FormInput
            name="name"
            label="الاسم"
            required
            placeholder="أدخل اسمك الثلاثي"
          />

          <FormInput
            name="phone"
            required
            label="رقم الموبايل"
            placeholder="أدخل رقم الهاتف"
          />

          {/* Textarea only for Marketing job */}
          {jobTitle === "التسويق الالكتروني" && (
            <FormInput
              name="project_info"
              required
              label="اكتب نبذة عن آخر مشروع عملت عليه"
              placeholder="أدخل تفاصيل المشروع"
              as="textarea"
            />
          )}
        </motion.div>

        {/* File Uploads */}
        <FormFileUpload
          name="cv"
          label="سيرة ذاتية / CV"
          required
          accept="application/pdf,image/jpeg,image/png"
        />

        {jobTitle === "جرافيك ديزاين" && (
          <FormFileUpload
            name="last_project"
            label="آخر 3 تصاميم"
            multiple
            accept="image/jpeg,image/png"
          />
        )}
        <FormInput
          name="facebookLink"
          label=" لينك صفحة الفيس بوك"
          placeholder="أدخل الرابط"
        />

        <SubmitButton isLoading={isPending} />
      </motion.form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم تسجيل بياناتك بنجاح"
        message="شكراً لتقديم طلبك، سيتم التواصل معك قريباً"
      />
    </FormProvider>
  );
};

export default JobForm;
