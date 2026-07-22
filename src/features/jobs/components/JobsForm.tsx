"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import FormFileUpload from "@/components/ui/Form/FormFileUploadInput";
import SubmitButton from "@/components/ui/Form/SubmitFormButton";
import FormInput from "@/components/ui/Form/FormInput";
import SuccessModal from "@/components/ui/SuccessModal";
import {
  JOBS_FORM_IN_VIEW,
  jobsFormFieldTransition,
} from "@/features/jobs/animations";
import {
  DIGITAL_MARKETING_JOB_TITLE,
  GRAPHIC_DESIGN_JOB_TITLE,
} from "@/features/jobs/constants";
import { jobFormSchema, type JobFormValues } from "@/features/jobs/schemas/jobFormSchema";
import { useSubmitJob } from "../hooks/useSubmitJob";

interface JobFormProps {
  jobTitle: string;
}

const JobForm = ({ jobTitle }: JobFormProps) => {
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
  });

  const { handleSubmit, reset } = methods;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: submitJob, isPending } = useSubmitJob();

  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, JOBS_FORM_IN_VIEW);

  const submitHandler = async (data: JobFormValues) => {
    if (!data.cv) return;

    if (jobTitle === GRAPHIC_DESIGN_JOB_TITLE && !data.last_project) return;

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
          transition={jobsFormFieldTransition}
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

          {jobTitle === DIGITAL_MARKETING_JOB_TITLE && (
            <FormInput
              name="project_info"
              required
              label="اكتب نبذة عن آخر مشروع عملت عليه"
              placeholder="أدخل تفاصيل المشروع"
              as="textarea"
            />
          )}
        </motion.div>

        <FormFileUpload
          name="cv"
          label="سيرة ذاتية / CV"
          required
          accept="application/pdf,image/jpeg,image/png"
        />

        {jobTitle === GRAPHIC_DESIGN_JOB_TITLE && (
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
