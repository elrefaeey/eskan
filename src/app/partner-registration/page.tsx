"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { FormInput } from "@/components/Projects/FormInput";
import { ImageUploadInput } from "@/components/ui/Form/ImageUploadInput";
import FormTextarea from "@/components/ui/Form/FormTextarea";
import SuccessModal from "@/components/ui/SuccessModal";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import { showErrorToast } from "@/lib/toast";
import { usePartnerRegistration } from "@/features/partner-registration/hooks/usePartnerRegistration";

const formSchema = z.object({
  city_center: z.string().min(1, "اسم مركز المدينة التابع له مطلوب"),
  address: z.string().min(2, "عنوان المكتب أو المقر مطلوب"),
  phone: z
    .string()
    .min(7, "رقم التليفون مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم التليفون على أرقام فقط"),
  manager_name: z
    .string()
    .min(2, "اسم المسئول مطلوب")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن يحتوي اسم المسئول على أحرف فقط"),
  experience_summary: z.string().optional(),
  tax_card_img: z
    .instanceof(File, { message: "صورة البطاقة الضريبية أو السجل مطلوبة" })
    .refine((file) => file.size > 0, "صورة البطاقة الضريبية أو السجل مطلوبة"),
  id_card_image: z
    .instanceof(File, { message: "صورة البطاقة الشخصية مطلوبة" })
    .refine((file) => file.size > 0, "صورة البطاقة الشخصية مطلوبة"),
  exterior_img: z
    .instanceof(File, { message: "صورة غير صالحة" })
    .optional()
    .or(z.undefined()),
});

type FormValues = z.infer<typeof formSchema>;

function PartnerRegistrationPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { mutate: submitPartnerData, isPending } = usePartnerRegistration();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_center: "",
      address: "",
      phone: "",
      manager_name: "",
      experience_summary: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormValues) => {
    submitPartnerData(data, {
      onSuccess: () => {
        setShowSuccessModal(true);
        reset();
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء إرسال البيانات";
        showErrorToast(errorMessage);
      },
    });
  };

  return (
    <main className="container page md:bg-transparent">
      <section className="py-4 lg:py-8 rounded-lg">
        <h1 className="text-[#1F503B] mb-4 md:mb-8 text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          تسجيل كشريك تسويق
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 lg:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <FormInput
                name="city_center"
                label="اسم مركز المدينة التابع له"
                required
              />

              <FormInput
                name="address"
                label="عنوان المكتب أو المقر"
                required
              />

              <FormInput name="phone" label="رقم تليفون" type="tel" required />

              <FormInput name="manager_name" label="اسم المسئول" required />
            </div>

            <FormTextarea
              name="experience_summary"
              label="نبذة عن خبرتك في مجال العمل"
              rows={4}
              className="bg-white min-h-24"
            />

            <ImageUploadInput
              fieldName="tax_card_img"
              label="صورة البطاقة الضريبة أو السجل"
              required
            />

            <ImageUploadInput
              fieldName="id_card_image"
              label="صورة البطاقة الشخصية"
              required
            />

            <ImageUploadInput
              fieldName="exterior_img"
              label="صورة خارجية للمقر إن وجد"
            />

            <div className="pt-2 mt-4 border-t">
              <ActionButton
                type="submit"
                variant="primary"
                disabled={isPending}
                className="w-full px-0 text-base rounded-xl disabled:opacity-50 py-1! disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2 text-lg ">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>جاري الإرسال...</span>
                  </span>
                ) : (
                  <span className="text-lg ">تسجيل البيانات</span>
                )}
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </section>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم تسجيل البيانات بنجاح"
        message="شكراً لك، سيتم التواصل معك قريبًا"
      />
    </main>
  );
}

export default PartnerRegistrationPage;
