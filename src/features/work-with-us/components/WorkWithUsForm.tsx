"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { Loader2 } from "lucide-react";
import FormInput from "@/components/ui/Form/FormInput";
import FormRadioGroup from "@/components/ui/Form/FormRadioGroup";
import SuccessModal from "@/components/ui/SuccessModal";
import { useWorkWithUs } from "../hooks/useWorkWithUs";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب")
    .regex(/^[\u0600-\u06FF\sA-Za-z]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(7, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي على أرقام فقط"),
  address: z.string().min(2, "محل الإقامة مطلوب"),
  job: z.string().min(2, "المهنة مطلوبة"),
  face_book_active: z
    .enum(["نعم", "لا"], { message: "هذا الحقل مطلوب" })
    .optional()
    .refine((val) => val !== undefined, {
      message: "هذا الحقل مطلوب",
    }),
  work_background: z
    .enum(["نعم", "لا"], { message: "هذا الحقل مطلوب" })
    .optional()
    .refine((val) => val !== undefined, {
      message: "هذا الحقل مطلوب",
    }),
  has_wide_netWork: z
    .enum(["نعم", "لا"], { message: "هذا الحقل مطلوب" })
    .optional()
    .refine((val) => val !== undefined, {
      message: "هذا الحقل مطلوب",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const WorkWithUsForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset } = methods;
  const { mutate: submitForm, isPending } = useWorkWithUs();

  const onSubmit = async (data: FormValues) => {
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

  return (
    <FormProvider {...methods}>
      <form
        className="bg-[#EFEFEF] md:px-8 p-4 lg:px-16 lg:py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-primary mt-4 mb-4 md:mb-8 text-center text-xl md:text-3xl lg:text-[1.9em] font-bold">
          للانضمام معنا سجل بياناتك
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FormInput
            name="name"
            label="الاسم"
            placeholder="أدخل اسمك الثلاثي"
            required
          />

          <FormInput
            name="phone"
            label="رقم الموبايل"
            placeholder="أدخل رقم الهاتف"
            required
          />

          <FormInput
            name="address"
            label="محل الإقامة"
            placeholder="أدخل مكان المشروع المقترح"
            required
          />

          <FormInput
            name="job"
            label="المهنة"
            placeholder="أدخل المهنة"
            required
          />

          <FormRadioGroup
            name="face_book_active"
            label="هل لديك حساب علي الفيس بوك؟"
            options={["نعم", "لا"]}
          />

          <FormRadioGroup
            name="work_background"
            label="هل عملت من قبل في مجال العقارات؟"
            options={["نعم", "لا"]}
          />

          <FormRadioGroup
            name="has_wide_netWork"
            label="هل تمتلك شبكة علاقات واسعة؟"
            options={["نعم", "لا"]}
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
              جاري الإرسال...
            </span>
          ) : (
            "تسجيل"
          )}
        </button>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="تم التسجيل بنجاح"
        message="شكراً لتسجيلك، سيتم التواصل معك قريباً"
      />
    </FormProvider>
  );
};

export default WorkWithUsForm;
