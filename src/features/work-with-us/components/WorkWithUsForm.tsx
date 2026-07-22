"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import FormInput from "@/components/ui/Form/FormInput";
import FormRadioGroup from "@/components/ui/Form/FormRadioGroup";
import SuccessModal from "@/components/ui/SuccessModal";
import {
  WORK_WITH_US_FORM_LABELS,
  WORK_WITH_US_FORM_PLACEHOLDERS,
  WORK_WITH_US_FORM_TITLE,
  WORK_WITH_US_SUCCESS_MODAL,
  WORK_WITH_US_YES_NO_OPTIONS,
} from "@/features/work-with-us/constants";
import {
  workWithUsSchema,
  type WorkWithUsFormValues,
} from "@/features/work-with-us/schemas/workWithUsSchema";
import { useWorkWithUs } from "../hooks/useWorkWithUs";

const WorkWithUsForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<WorkWithUsFormValues>({
    resolver: zodResolver(workWithUsSchema),
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useWorkWithUs();

  const onSubmit = async (data: WorkWithUsFormValues) => {
    submitForm(data, {
      onSuccess: () => {
        setShowSuccessModal(true);
      },
      onError: (error) => {
        alert(error.message || "حدث خطأ، حاول مرة أخرى");
      },
    });
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    reset();
  };

  const yesNoOptions = [...WORK_WITH_US_YES_NO_OPTIONS];

  return (
    <FormProvider {...methods}>
      <form
        className="bg-[#EFEFEF] md:px-8 p-4 lg:px-16 lg:py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-primary mt-4 mb-4 md:mb-8 text-center text-xl md:text-3xl lg:text-[1.9em] font-bold">
          {WORK_WITH_US_FORM_TITLE}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FormInput
            name="name"
            label={WORK_WITH_US_FORM_LABELS.name}
            placeholder={WORK_WITH_US_FORM_PLACEHOLDERS.name}
            required
          />

          <FormInput
            name="phone"
            label={WORK_WITH_US_FORM_LABELS.phone}
            placeholder={WORK_WITH_US_FORM_PLACEHOLDERS.phone}
            required
          />

          <FormInput
            name="address"
            label={WORK_WITH_US_FORM_LABELS.address}
            placeholder={WORK_WITH_US_FORM_PLACEHOLDERS.address}
            required
          />

          <FormInput
            name="job"
            label={WORK_WITH_US_FORM_LABELS.job}
            placeholder={WORK_WITH_US_FORM_PLACEHOLDERS.job}
            required
          />

          <FormRadioGroup
            name="face_book_active"
            label={WORK_WITH_US_FORM_LABELS.faceBookActive}
            options={yesNoOptions}
          />

          <FormRadioGroup
            name="work_background"
            label={WORK_WITH_US_FORM_LABELS.workBackground}
            options={yesNoOptions}
          />

          <FormRadioGroup
            name="has_wide_netWork"
            label={WORK_WITH_US_FORM_LABELS.hasWideNetwork}
            options={yesNoOptions}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary cursor-pointer text-white mt-8 lg:w-[720px] w-full block mx-auto h-fit py-2 md:py-3 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              {WORK_WITH_US_FORM_LABELS.submitting}
            </span>
          ) : (
            WORK_WITH_US_FORM_LABELS.submit
          )}
        </button>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title={WORK_WITH_US_SUCCESS_MODAL.title}
        message={WORK_WITH_US_SUCCESS_MODAL.message}
      />
    </FormProvider>
  );
};

export default WorkWithUsForm;
