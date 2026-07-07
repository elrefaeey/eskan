"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Loader2, FileArchive } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

function PartnerRegistrationModal() {
  const [open, setOpen] = useState(false);
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
        setOpen(false);
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-white py-3  md:px-14! md:w-fit rounded-xl
           h-fit font-bold md:font-extrabold mt-2 md:mt-5 hover:bg-white cursor-pointer hover:opacity-45 w-full
            text-primary text-xl  flex items-center gap-2  "
          >
            <FileArchive size={28} /> تسجيل البيانات
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[95vw] sm:max-w-180 bg-white border-0 shadow-2xl rounded-2xl p-5 sm:p-6 gap-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-3 mb-3 border-b">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary rounded-3xl">
              تسجيل كشريك تسويق
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <FormInput
                  name="phone"
                  label="رقم تليفون"
                  type="tel"
                  required
                />

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
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="تم تسجيل البيانات بنجاح"
        message="شكراً لك، سيتم التواصل معك قريبًا"
      />
    </>
  );
}

export default PartnerRegistrationModal;
