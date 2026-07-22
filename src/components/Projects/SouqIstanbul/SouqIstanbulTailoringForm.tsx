"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import FormInput from "@/components/ui/Form/FormInput";
import FormSelect from "@/components/ui/Form/FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { showErrorToast } from "@/lib/toast";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { useSubmitSouqIstanbulTradeForm } from "@/features/souq-istanbul/hooks/useSubmitSouqIstanbulTradeForm";
import {
  CONTACT_TIME_OPTIONS,
  SOUQ_ISTANBUL_TAILORING_REGION,
} from "@/features/souq-istanbul/constants";
import { formItemVariant, formVariant } from "@/lib/animations";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
  shop_number: z.string().min(1, "رقم المحل مطلوب"),
  contact_time: z.string().min(1, "وقت التواصل مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

const SouqIstanbulTailoringForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-60px" });

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      shop_number: "",
      contact_time: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useSubmitSouqIstanbulTradeForm();

  const onSubmit = (data: FormValues) => {
    submitForm(
      {
        ...data,
        region: SOUQ_ISTANBUL_TAILORING_REGION,
      },
      {
        onSuccess: () => {
          reset();
          setShowSuccessModal(true);
        },
        onError: (error: unknown) => {
          const message =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ??
            (error instanceof Error ? error.message : "حدث خطأ أثناء الإرسال");
          showErrorToast(message);
        },
      }
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <motion.form
          ref={formRef}
          variants={formVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="rounded-2xl bg-white p-5 md:p-6 space-y-4 shadow-sm ring-1 ring-gray-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div variants={formItemVariant}>
            <FormInput name="name" label="الاسم" placeholder="الاسم الثلاثي" />
          </motion.div>
          <motion.div variants={formItemVariant}>
            <FormInput
              name="phone"
              label="رقم الهاتف"
              placeholder="01XXXXXXXXX"
              type="tel"
            />
          </motion.div>
          <motion.div variants={formItemVariant}>
            <FormInput
              name="shop_number"
              label="رقم المحل"
              placeholder="رقم المحل"
              type="number"
            />
          </motion.div>
          <motion.div variants={formItemVariant}>
            <FormSelect
              name="contact_time"
              label="وقت التواصل المفضل"
              placeholder="اختر الوقت المناسب"
              options={[...CONTACT_TIME_OPTIONS]}
            />
          </motion.div>

          <motion.div variants={formItemVariant}>
            <ActionButton
              type="submit"
              disabled={isPending}
              className="w-full !py-3 mt-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جاري الإرسال...
                </span>
              ) : (
                "حجز"
              )}
            </ActionButton>
          </motion.div>
        </motion.form>
      </FormProvider>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم الإرسال بنجاح"
        message="شكراً لك، سيتم التواصل معك في أقرب وقت"
      />
    </>
  );
};

export default SouqIstanbulTailoringForm;
