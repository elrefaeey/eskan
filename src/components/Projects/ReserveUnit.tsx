"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import React, { useState } from "react";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import SuccessModal from "@/components/ui/SuccessModal";
import { useCreateReservation } from "@/features/reservation/hooks/useCreateReservation";
import { showErrorToast } from "@/lib/toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن يحتوي الاسم على أحرف فقط"),
  phone: z
    .string()
    .min(5, "رقم الهاتف مطلوب")
    .regex(/^[0-9]+$/, "يجب أن يحتوي رقم الهاتف على أرقام فقط"),
  job: z
    .string()
    .min(2, "المهنة مطلوبة")
    .regex(/^[a-zA-Zء-ي\s]+$/, "يجب أن تحتوي المهنة على أحرف فقط"),
  contact_time: z.string().min(1, "وقت التواصل مطلوب"),
});

type FormValues = z.infer<typeof formSchema>;

const times = [
  {
    value: "من 10 صباحا الي 2 مساء",
    label: "من 10 صباحا الي 2 مساء",
  },
  {
    value: "من 2 ظهرا الي 7 مساء",
    label: "من 2 ظهرا الي 7 مساء",
  },
  {
    value: "من 7 مساء الي 10 مساء",
    label: "من 7 مساء الي 10 مساء",
  },
];

interface ReserveUnitFormProps {
  projectId: number;
  unitId: number;
}

const ReserveUnitForm = ({ projectId, unitId }: ReserveUnitFormProps) => {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { mutate: submitReservation, isPending } = useCreateReservation();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      job: "",
      contact_time: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: FormValues) => {
    submitReservation(
      {
        ...data,
        project_id: projectId,
        unit_id: unitId,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "حدث خطأ أثناء الحجز";
          showErrorToast(errorMessage);
        },
      }
    );
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-linear-to-r cursor-pointer from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-base sm:text-lg text-white rounded-xl w-full py-2.5 sm:py-3 mt-4 block mx-auto transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02]">
          حجز الوحدة
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white border-0 shadow-2xl rounded-2xl p-5 sm:p-6 gap-0">
        <DialogHeader className="pb-3 mb-3 border-b">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-primary">
            حجز وحدة
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormInput
              name="name"
              label="الاسم الكامل"
              placeholder="أدخل اسمك الكامل"
            />

            <FormInput
              name="phone"
              label="رقم الهاتف"
              placeholder="01XXXXXXXXX"
              type="tel"
            />

            <FormInput name="job" label="المهنة" placeholder="أدخل مهنتك" />

            <FormSelect
              name="contact_time"
              label="وقت التواصل المفضل"
              placeholder="اختر الوقت المناسب"
              options={times}
            />

            <div className="pt-2 mt-4 border-t">
              <ActionButton
                onClick={handleSubmit(onSubmit)}
                variant="primary"
                disabled={isPending}
                className="w-full px-0 
                 text-base rounded-xl  disabled:opacity-50  py-1! disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2 text-lg ">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>جاري الإرسال...</span>
                  </span>
                ) : (
                  <span className="text-lg ">تأكيد الحجز</span>
                )}
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </DialogContent>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="تم الحجز بنجاح"
        message="شكراً لك، سيتم التواصل معك في أقرب وقت لتأكيد الحجز"
      />
    </Dialog>
  );
};

export default ReserveUnitForm;
